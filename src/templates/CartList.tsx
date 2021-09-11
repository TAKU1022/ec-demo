import { List, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router';
import { useCallback, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartListItem } from '../components/products';
import { GreyButton, PrimaryButton } from '../components/UIkit';
import { RootState } from '../reducks/store/store';
import { getProductsInCart } from '../reducks/users/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 auto',
      maxWidth: 512,
      width: '100%',
    },
  })
);

const CartList: VFC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  const productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'));
  }, [dispatch]);

  const backToTop = useCallback(() => {
    dispatch(push('/'));
  }, [dispatch]);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">ショッピングカート</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 &&
          productsInCart.map((product) => (
            <CartListItem key={product.cartId} product={product} />
          ))}
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        <PrimaryButton label={'レジへ進む'} onClick={goToOrder} />
        <div className="module-spacer--extra-extra-small" />
        <GreyButton label={'ショッピングを続ける'} onClick={backToTop} />
      </div>
    </section>
  );
};

export default CartList;
