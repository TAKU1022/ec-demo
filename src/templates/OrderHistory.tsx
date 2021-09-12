import { List, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useEffect, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderHistoryItem } from '../components/products';
import { fetchOrdersHistory } from '../reducks/products/operations';
import { RootState } from '../reducks/store/store';
import { getOrdersHistory } from '../reducks/users/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderList: {
      background: theme.palette.grey['100'],
      margin: '0 auto',
      padding: 32,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.up('md')]: {
        width: 768,
      },
    },
  })
);

const OrderHistory: VFC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const orders = getOrdersHistory(selector);

  useEffect(() => {
    dispatch(fetchOrdersHistory());
  }, [dispatch]);

  return (
    <section className="c-section-wrapin">
      <List className={classes.orderList}>
        {orders.length > 0 &&
          orders.map((order) => (
            <OrderHistoryItem key={order.id} order={order} />
          ))}
      </List>
    </section>
  );
};

export default OrderHistory;
