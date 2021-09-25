import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
} from '@material-ui/core';
import {
  AddCircle,
  ExitToApp,
  History,
  Person,
  Search,
} from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router';
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
  VFC,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import { RootState } from '../../reducks/store/store';
import { signOut } from '../../reducks/users/operations';
import { getUserRole } from '../../reducks/users/selectors';
import { TextInput } from '../UIkit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        flexShrink: 0,
        width: 256,
      },
    },
    toolBar: theme.mixins.toolbar,
    drawerPaper: {
      width: 256,
    },
    searchField: {
      alignItems: 'center',
      display: 'flex',
      marginLeft: 32,
    },
  })
);

type Props = {
  container?: any;
  isOpen: boolean;
  onClose: (event: any) => void;
};

const ClosableDrawer: VFC<Props> = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { container, isOpen, onClose } = props;
  const selector = useSelector((state: RootState) => state);
  const userRole = getUserRole(selector);
  const isAdministrator = userRole === 'administrator';

  const [keyword, setKeyword] = useState('');

  const inputKeyword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    [setKeyword]
  );

  const selectMenu = (
    path: string,
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    dispatch(push(path));
    onClose(event);
  };

  const [filters, setFilters] = useState([
    { func: selectMenu, label: 'すべて', id: 'all', value: '/' },
    { func: selectMenu, label: 'メンズ', id: 'male', value: '/?gender=male' },
    {
      func: selectMenu,
      label: 'レディース',
      id: 'female',
      value: '/?gender=female',
    },
  ]);

  const menus = [
    {
      func: selectMenu,
      label: '商品登録',
      icon: <AddCircle />,
      id: 'register',
      value: '/product/edit',
    },
    {
      func: selectMenu,
      label: '注文履歴',
      icon: <History />,
      id: 'history',
      value: '/order/history',
    },
    {
      func: selectMenu,
      label: 'プロフィール',
      icon: <Person />,
      id: 'profile',
      value: '/user/mypage',
    },
  ];

  useEffect(() => {
    db.collection('categories')
      .get()
      .then((snapshots) => {
        const list: any[] = [];
        snapshots.forEach((snapshot) => {
          const category = snapshot.data();
          list.push({
            func: selectMenu,
            label: category.name,
            id: category.id,
            value: `/?category=${category.id}`,
          });
        });
        setFilters((prevState) => [...prevState, ...list]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={isOpen}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
        onClose={onClose}
      >
        <div onClick={onClose} onKeyDown={onClose}>
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label="キーワードを入力"
              multiline={false}
              minRows={1}
              required={false}
              value={keyword}
              type="text"
              onChange={inputKeyword}
            />
            <IconButton>
              <Search />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map(
              (menu) =>
                ((isAdministrator && menu.id === 'register') ||
                  menu.id !== 'register') && (
                  <ListItem
                    button
                    key={menu.id}
                    onClick={(event) => menu.func(menu.value, event)}
                  >
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText primary={menu.label} />
                  </ListItem>
                )
            )}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="logout" />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map((filter) => (
              <ListItem
                button
                key={filter.id}
                onClick={(event) => filter.func(filter.value, event)}
              >
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
