import {
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';
import { VFC } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { RootState } from '../../reducks/store/store';
import { getUserId } from '../../reducks/users/selectors';
import { ProductsInCart } from '../../types/Cart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      height: 128,
    },
    image: {
      objectFit: 'cover',
      margin: 16,
      height: 96,
      width: 96,
    },
    text: {
      width: '100%',
    },
  })
);

type Props = {
  product: ProductsInCart;
};

const CartListItem: VFC<Props> = (props: Props) => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const { product } = props;

  const image = product.images![0].path;
  const price = product.price?.toLocaleString();

  const removeProductFromCart = (id: string) => {
    const uid = getUserId(selector);
    return db.collection('users').doc(uid).collection('cart').doc(id).delete();
  };

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="商品のTOP画像" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText
            primary={product.name}
            secondary={`サイズ：${product.size}`}
          />
          <ListItemText primary={`¥${price}`} />
        </div>
        <IconButton onClick={() => removeProductFromCart(product.cartId)}>
          <Delete />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default CartListItem;
