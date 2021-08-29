import { useSelector } from 'react-redux';
import { RootState } from '../reducks/store/store';
import { getUserId } from '../reducks/users/selecter';

const Home = () => {
  const selecter = useSelector((state: RootState) => state);
  const uid = getUserId(selecter);

  return (
    <div>
      <h2>HOME</h2>
      <p>{uid}</p>
    </div>
  );
};

export default Home;
