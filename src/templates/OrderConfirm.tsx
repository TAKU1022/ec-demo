import { Divider, List, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useCallback, useMemo, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartListItem } from '../components/products';
import { PrimaryButton } from '../components/UIkit';
import TextDetail from '../components/UIkit/TextDetail';
import { orderProduct } from '../reducks/products/operations';
import { RootState } from '../reducks/store/store';
import { getProductsInCart } from '../reducks/users/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    detailBox: {
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
        width: 320,
      },
      [theme.breakpoints.up('md')]: {
        width: 512,
      },
    },
    orderBox: {
      border: '1px solid rgba(0,0,0,0.2)',
      borderRadius: 4,
      boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
      height: 256,
      margin: '24px auto 16px auto',
      padding: 16,
      width: 288,
    },
  })
);

const OrderConfirm: VFC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const productsInCart = getProductsInCart(selector);

  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => (sum += product.price!), 0);
  }, [productsInCart]);

  const shippingFee = useMemo(() => (subtotal >= 10000 ? 0 : 210), [subtotal]);
  const tax = useMemo(
    () => (subtotal + shippingFee) * 0.1,
    [subtotal, shippingFee]
  );
  const total = useMemo(
    () => subtotal + shippingFee + tax,
    [subtotal, shippingFee, tax]
  );

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total));
  }, [productsInCart, total, dispatch]);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((product) => (
                <CartListItem product={product} key={product.cartId} />
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail
            label={'商品合計'}
            value={`¥${subtotal.toLocaleString()}`}
          />
          <TextDetail label={'消費税'} value={`¥${tax.toLocaleString()}`} />
          <TextDetail
            label={'送料'}
            value={`¥${shippingFee.toLocaleString()}`}
          />
          <Divider />
          <div className="module-spacer--extra-extra-small" />
          <TextDetail
            label={'合計(税込)'}
            value={`¥${total.toLocaleString()}`}
          />
          <PrimaryButton label={'注文を確定する'} onClick={order} />
        </div>
      </div>
    </section>
  );
};

export default OrderConfirm;
