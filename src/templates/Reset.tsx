import { push } from 'connected-react-router';
import { ChangeEvent, useCallback, VFC } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PrimaryButton, TextInput } from '../components/UIkit';
import { resetPassword } from '../reducks/users/operations';

const Reset: VFC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const inputEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value),
    [setEmail]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードのリセット</h2>
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
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={'Reset Password'}
          onClick={() => dispatch(resetPassword(email))}
        />
        <div className="module-spacer--medium"></div>
        <p className="pointer" onClick={() => dispatch(push('/signin'))}>
          ログイン画面に戻る
        </p>
      </div>
    </div>
  );
};

export default Reset;
