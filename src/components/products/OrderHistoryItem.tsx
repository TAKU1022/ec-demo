import { Divider } from '@material-ui/core';
import { VFC } from 'react';
import { OrderedProducts } from '.';
import { OrdersHistory } from '../../types/Order';
import TextDetail from '../UIkit/TextDetail';

const dateToString = (date: Date) => {
  return (
    date.getFullYear() +
    '-' +
    ('00' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + date.getDate()).slice(-2)
  );
};

const datetimeToString = (date: Date) => {
  return (
    date.getFullYear() +
    '-' +
    ('00' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + date.getDate()).slice(-2) +
    ' ' +
    ('00' + date.getHours()).slice(-2) +
    ':' +
    ('00' + date.getMinutes()).slice(-2) +
    ':' +
    ('00' + date.getSeconds()).slice(-2)
  );
};

type Props = {
  order: OrdersHistory;
};

const OrderHistoryItem: VFC<Props> = (props: Props) => {
  const orderedDatetime = datetimeToString(props.order.updatedAt.toDate());
  const shippingDate = dateToString(props.order.shippingDate.toDate());
  const totalPrice = '¥' + props.order.amount.toLocaleString();

  return (
    <div>
      <div className="module-spacer--small" />
      <TextDetail label={'注文ID'} value={props.order.id} />
      <TextDetail label={'注文日時'} value={orderedDatetime} />
      <TextDetail label={'発送予定日'} value={shippingDate} />
      <TextDetail label={'注文金額'} value={totalPrice} />
      {props.order.products.length > 0 && (
        <OrderedProducts products={props.order.products} />
      )}
      <div className="module-spacer--extra-extra-small" />
      <Divider />
    </div>
  );
};

export default OrderHistoryItem;
