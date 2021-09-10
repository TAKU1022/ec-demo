import { AppBar, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useCallback, useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducks/store/store';
import { getIsSignedIn } from '../../reducks/users/selectors';
import logo from '../../assets/img/icons/logo.png';
import { push } from 'connected-react-router';
import { ClosableDrawer, HeaderMenus } from '.';

const useStyles = makeStyles(
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuBar: {
      backgroundColor: '#fff',
      color: '#444',
    },
    toolBar: {
      margin: '0 auto',
      maxWidth: 1024,
      width: '100%',
    },
    iconButtons: {
      margin: '0 0 0 auto',
    },
  })
);

const Header: VFC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const isSignedIn = getIsSignedIn(selector);

  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === 'key' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
      setSideBarOpen(!sideBarOpen);
    },
    [sideBarOpen, setSideBarOpen]
  );

  return (
    <header className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img
            src={logo}
            alt="Torahack Logo"
            width="128px"
            onClick={() => dispatch(push('/'))}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer isOpen={sideBarOpen} onClose={handleDrawerToggle} />
    </header>
  );
};

export default Header;
