import { ChangeEvent, useCallback, useState, VFC } from 'react';
import { TextInput } from '../components/UIkit';

const ProductEdit: VFC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [price, setPrice] = useState('');

  const inputName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value),
    [setName]
  );

  const inputDescription = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setDescription(event.target.value),
    [setDescription]
  );

  const inputPrice = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setPrice(event.target.value),
    [setPrice]
  );

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <TextInput
          fullWidth={true}
          label={'商品名'}
          multiline={false}
          minRows={1}
          required={true}
          value={name}
          type={'text'}
          onChange={inputName}
        />
        <TextInput
          fullWidth={true}
          label={'商品説明'}
          multiline={true}
          minRows={5}
          required={true}
          value={description}
          type={'text'}
          onChange={inputDescription}
        />
        <TextInput
          fullWidth={true}
          label={'価格'}
          multiline={false}
          minRows={1}
          required={true}
          value={price}
          type={'number'}
          onChange={inputPrice}
        />
      </div>
    </section>
  );
};

export default ProductEdit;
