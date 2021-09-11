import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import HTMLReactParser from 'html-react-parser';
import { useCallback, useEffect, useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageSwiper, SizeTable } from '../components/products';
import { db, FirebaseTimestamp } from '../firebase';
import { RootState } from '../reducks/store/store';
import { addProductToCart } from '../reducks/users/operations';
import { Product } from '../types/Product';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sliderBox: {
      [theme.breakpoints.down('sm')]: {
        margin: '0 auto 24px auto',
        width: 320,
        height: 320,
      },
      [theme.breakpoints.up('sm')]: {
        margin: '0 auto',
        width: 400,
        height: 400,
      },
    },
    detail: {
      textAlign: 'left',
      [theme.breakpoints.down('sm')]: {
        margin: '0 auto 16px auto',
        width: 320,
        height: 'auto',
      },
      [theme.breakpoints.up('sm')]: {
        margin: '0 auto',
        width: 400,
        height: 'auto',
      },
    },
    price: {
      fontSize: 36,
    },
  })
);

const returnCodeToBr = (text: string) => {
  if (text === '') {
    return text;
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br />'));
  }
};

const ProductDetail: VFC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const router = selector.router as any;
  const path = router.location.pathname;
  const id = path.split('/product/')[1];

  const [product, setProduct] = useState<Product>();

  const addProduct = useCallback(
    (selectedSize) => {
      const timestamp = FirebaseTimestamp.now();
      dispatch(
        addProductToCart({
          addedAt: timestamp,
          description: product?.description,
          gender: product?.gender,
          images: product?.images,
          name: product?.name,
          price: product?.price,
          productId: product?.id,
          quantity: 1,
          size: selectedSize,
        })
      );
    },
    [product, dispatch]
  );

  useEffect(() => {
    db.collection('products')
      .doc(id)
      .get()
      .then((doc) => {
        const data: any = doc?.data();
        setProduct(data);
      });
  }, [id]);

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>{product.price.toLocaleString()}</p>
            <div className="module-spacer--small" />
            <SizeTable sizes={product.sizes} addProduct={addProduct} />
            <div className="module-spacer--small" />
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
