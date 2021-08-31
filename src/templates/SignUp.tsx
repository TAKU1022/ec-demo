import { ChangeEvent, useCallback, VFC } from 'react';
import { useState } from 'react';
import { TextInput } from '../components/UIkit';

const SignUp: VFC = () => {
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
    </div>
  );
};

export default SignUp;
