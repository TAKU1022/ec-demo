import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router';
import { memo, MouseEvent, useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoImage from '../../assets/img/src/no_image.png';
import { deleteProduct } from '../../reducks/products/operations';
import { RootState } from '../../reducks/store/store';
import { getUserRole } from '../../reducks/users/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        margin: 8,
        width: 'calc(50% - 16px)',
      },
      [theme.breakpoints.up('sm')]: {
        margin: 16,
        width: 'calc(33.3333% - 32px)',
      },
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px 8px',
      textAlign: 'left',
      '&:last-child': {
        paddingBottom: 16,
      },
    },
    media: {
      height: 0,
      paddingBottom: '100%',
    },
    price: {
      color: theme.palette.secondary.main,
      fontSize: 16,
    },
  })
);

type Props = {
  id: string;
  images: Array<{ id: string; path: string }>;
  name: string;
  price: number;
};

const ProductCard: VFC<Props> = memo((props: Props) => {
  const { id, images, name, price } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const userRole = getUserRole(selector);

  const productImage = images.length > 0 ? images : [{ path: NoImage }];

  const [anchorElement, setAnchorElement] = useState(null);

  const handleClick = (event: MouseEvent<any>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => setAnchorElement(null);

  return (
    <Card className={`${classes.root} pointer`}>
      <CardMedia
        className={classes.media}
        image={productImage[0].path}
        title=""
        onClick={() => dispatch(push(`/product/${id}`))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push(`/product/${id}`))}>
          <Typography color="textSecondary" component="p">
            {name}
          </Typography>
          <Typography className={classes.price} component="p">
            ??{price.toLocaleString()}
          </Typography>
        </div>
        {userRole === 'administrator' && (
          <IconButton onClick={handleClick}>
            <MoreVert />
          </IconButton>
        )}

        <Menu
          anchorEl={anchorElement}
          keepMounted
          open={Boolean(anchorElement)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(push(`/product/edit/${id}`));
              handleClose();
            }}
          >
            ????????????
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(id));
              handleClose();
            }}
          >
            ????????????
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
});

export default ProductCard;
