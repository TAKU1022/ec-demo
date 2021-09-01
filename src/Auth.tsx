import { ReactNode, useEffect, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducks/store/store';
import { listenAuthState } from './reducks/users/operations';
import { getIsSignedIn } from './reducks/users/selecter';

type Props = {
  children: ReactNode;
};

const Auth: VFC<Props> = (props: Props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const selecter = useSelector((state: RootState) => state);
  const isSginedIn = getIsSignedIn(selecter);

  useEffect(() => {
    if (!isSginedIn) {
      dispatch(listenAuthState());
    }
    // eslint-disable-next-line
  }, []);

  if (!isSginedIn) {
    return <></>;
  } else {
    return <>{children}</>;
  }
};

export default Auth;
