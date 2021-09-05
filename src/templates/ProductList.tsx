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

  useEffect(() => {
    dispatch(fetchProducts());
  }, []); // eslint-disable-line

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
