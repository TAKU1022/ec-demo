import { VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducks/store/store';
import { signOut } from '../reducks/users/operations';
import { getUserId, getUsername } from '../reducks/users/selecter';

const Home: VFC = () => {
  const dispatch = useDispatch();
  const selecter = useSelector((state: RootState) => state);
  const uid = getUserId(selecter);
  const username = getUsername(selecter);

  return (
    <div>
      <h2>HOME</h2>
      <p>ユーザーID：{uid}</p>
      <p>ユーザー名：{username}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  );
};

export default Home;
