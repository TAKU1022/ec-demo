import { push } from 'connected-react-router';
import { ChangeEvent, useCallback, VFC } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PrimaryButton, TextInput } from '../components/UIkit';
import { signUp } from '../reducks/users/operations';

const SignUp: VFC = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [confirmPassword, setConfirmPasword] = useState('');

  const inputUsername = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value),
    [setUsername]
  );

  const inputEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value),
    [setEmail]
  );

  const inputPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setPasword(event.target.value),
    [setPasword]
  );

  const inputConfirmPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setConfirmPasword(event.target.value),
    [setConfirmPasword]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={'ユーザー名'}
        multiline={false}
        minRows={1}
        required={true}
        value={username}
        type={'text'}
        onChange={inputUsername}
      />
      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        minRows={1}
        required={true}
        value={email}
        type={'emial'}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード'}
        multiline={false}
        minRows={1}
        required={true}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード（再確認用）'}
        multiline={false}
        minRows={1}
        required={true}
        value={confirmPassword}
        type={'password'}
        onChange={inputConfirmPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={'アカウントを登録する'}
          onClick={() =>
            dispatch(signUp(username, email, password, confirmPassword))
          }
        />
        <div className="module-spacer--medium"></div>
        <p onClick={() => dispatch(push('/signin'))}>
          アカウントをお持ちの方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignUp;
