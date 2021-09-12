import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router';
import React, { useCallback, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../UIkit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      background: '#fff',
      height: 'auto',
    },
    image: {
      objectFit: 'cover',
      margin: '8px 16px 8px 0',
      height: 96,
      width: 96,
    },
    text: {
      width: '100%',
    },
  })
);

type Props = {
  products: Array<{
    id: string;
    images: Array<{ id: string; path: string }>;
    name: string;
    price: string;
    size: string;
  }>;
};

const OrderedProducts: VFC<Props> = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const goToProductPage = useCallback(
    (id) => {
      dispatch(push(`/product/${id}`));
    },
    [dispatch]
  );

  return (
    <List>
      {props.products.map((product, index) => {
        return (
          <React.Fragment key={index}>
            <ListItem className={classes.list}>
              <ListItemAvatar>
                <img
                  className={classes.image}
                  src={product.images[0].path}
                  alt="商品のTOP画像"
                />
              </ListItemAvatar>
              <div className={classes.text}>
                <ListItemText
                  primary={product.name}
                  secondary={`サイズ：${product.size}`}
                />
                <ListItemText primary={`¥${product.price.toLocaleString()}`} />
              </div>
              <PrimaryButton
                label={'商品詳細を見る'}
                onClick={() => goToProductPage(product.id)}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default OrderedProducts;
