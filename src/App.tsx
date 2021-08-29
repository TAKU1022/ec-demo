import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from './reducks/store/store';
import { signInAction } from './reducks/users/actions';

function App() {
  const dispatch = useDispatch();
  const selecter = useSelector((state: RootState) => state);

  console.log(selecter.users);

  return (
    <>
      <button
        onClick={() =>
          dispatch(signInAction({ uid: '00001', username: 'TAKU' }))
        }
      >
        Sign In
      </button>
    </>
  );
}

export default App;
