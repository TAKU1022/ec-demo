import { useEffect, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../components/products';
import { fetchProducts } from '../reducks/products/operations';
import { getProductList } from '../reducks/products/selectors';
import { RootState } from '../reducks/store/store';

const ProductList: VFC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const products = getProductList(selector);

  const router = selector.router as any;
  const query = router.location.search;
  const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : '';
  const category = /^\?category=/.test(query)
    ? query.split('?category=')[1]
    : '';

  useEffect(() => {
    dispatch(fetchProducts(gender, category));
  }, [dispatch, gender, category]);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              images={product.images}
              name={product.name}
              price={product.price}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductList;
