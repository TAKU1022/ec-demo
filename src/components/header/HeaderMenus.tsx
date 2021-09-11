import { memo, MouseEvent, useEffect, VFC } from 'react';
import { Badge, IconButton } from '@material-ui/core';
import { FavoriteBorder, Menu, ShoppingCart } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducks/store/store';
import { getProductsInCart, getUserId } from '../../reducks/users/selectors';
import { db } from '../../firebase';
import { ProductInCart } from '../../types/Cart';
import { fetchProductsInCart } from '../../reducks/users/operations';
import { push } from 'connected-react-router';

type Props = {
  handleDrawerToggle: (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
};

const HeaderMenus: VFC<Props> = memo((props: Props) => {
  const { handleDrawerToggle } = props;
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);

  let productsInCart = getProductsInCart(selector);

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(uid)
      .collection('cart')
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const productData = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case 'added':
              productsInCart.push(productData as ProductInCart);
              break;
            case 'modified':
              const index = productsInCart.findIndex(
                (product) => product.cartId === change.doc.id
              );
              productsInCart[index] = productData as ProductInCart;
              break;
            case 'removed':
              // eslint-disable-next-line react-hooks/exhaustive-deps
              productsInCart = productsInCart.filter(
                (product) => product.cartId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });

        dispatch(fetchProductsInCart(productsInCart));
      });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton onClick={() => dispatch(push('/cart'))}>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorder />
      </IconButton>
      <IconButton onClick={handleDrawerToggle}>
        <Menu />
      </IconButton>
    </>
  );
});

export default HeaderMenus;
