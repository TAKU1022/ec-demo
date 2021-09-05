import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { push } from 'connected-react-router';
import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import NoImage from '../../assets/img/src/no_image.png';

const useStyles = makeStyles((theme) => ({
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
}));

type Props = {
  id: string;
  images: Array<{ id: string; path: string }>;
  name: string;
  price: number;
};

const ProductCard: VFC<Props> = (props: Props) => {
  const { id, images, name, price } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const productImage = images.length > 0 ? images : [{ path: NoImage }];

  return (
    <Card className={classes.root}>
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
            ¥{price.toLocaleString()}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
