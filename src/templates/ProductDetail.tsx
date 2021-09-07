import { useEffect, useState, VFC } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { RootState } from '../reducks/store/store';

const ProductDetail: VFC = () => {
  const selector = useSelector((state: RootState) => state);
  const router = selector.router as any;
  const path = router.location.pathname;
  const id = path.split('/product/')[1];

  const [product, setProduct] = useState(null);

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
      {product && <div className="p-grid__row"></div>}
    </section>
  );
};

export default ProductDetail;
