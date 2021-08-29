import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducks/store/store';

const Login = () => {
  const dispatch = useDispatch();
  const selecter = useSelector((state: RootState) => state);

  console.log(selecter.router);

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispatch(push('/'))}>ログインする</button>
    </div>
  );
};

export default Login;
