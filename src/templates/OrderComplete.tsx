import { useCallback, VFC } from 'react';
import { PrimaryButton } from '../components/UIkit';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const OrderComplete: VFC = () => {
  const dispatch = useDispatch();

  const goBackToTop = useCallback(() => {
    dispatch(push('/'));
  }, [dispatch]);

  return (
    <div className="c-section-container">
      <p>ご注文ありがとうございました！</p>
      <div className="module-spacer--medium" />
      <PrimaryButton label="ショッピングを続ける" onClick={goBackToTop} />
    </div>
  );
};

export default OrderComplete;
