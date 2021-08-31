import { ChangeEvent, useCallback, VFC } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PrimaryButton, TextInput } from '../components/UIkit';
import { signIn } from '../reducks/users/operations';

const SignIn: VFC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');

  const inputEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value),
    [setEmail]
  );

  const inputPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setPasword(event.target.value),
    [setPasword]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
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
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={'sign in'}
          onClick={() => dispatch(signIn(email, password))}
        />
      </div>
    </div>
  );
};

export default SignIn;
