import { useSelector } from 'react-redux';
import { RootState } from '../reducks/store/store';
import { getUserId, getUsername } from '../reducks/users/selecter';

const Home = () => {
  const selecter = useSelector((state: RootState) => state);
  const uid = getUserId(selecter);
  const username = getUsername(selecter);

  return (
    <div>
      <h2>HOME</h2>
      <p>ユーザーID：{uid}</p>
      <p>ユーザー名：{username}</p>
    </div>
  );
};

export default Home;
