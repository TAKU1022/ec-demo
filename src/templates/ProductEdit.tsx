import { ChangeEvent, useCallback, useState, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { saveProduct } from '../reducks/products/operations';

const ProductEdit: VFC = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [price, setPrice] = useState('');

  const categories = [
    { id: 'tops', name: 'トップス' },
    { id: 'shirts', name: 'シャツ' },
    { id: 'pants', name: 'パンツ' },
  ];
  const genders = [
    { id: 'all', name: '全て' },
    { id: 'male', name: 'メンズ' },
    { id: 'female', name: 'レディース　' },
  ];

  const inputName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value),
    [setName]
  );

  const inputDescription = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setDescription(event.target.value),
    [setDescription]
  );

  const selectCategory = useCallback(
    (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) =>
      setCategory(event.target.value as string),
    [setCategory]
  );

  const selectGender = useCallback(
    (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) =>
      setGender(event.target.value as string),
    [setGender]
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
        <SelectBox
          label={'カテゴリー'}
          required={true}
          value={category}
          options={categories}
          select={selectCategory}
        />
        <SelectBox
          label={'性別'}
          required={true}
          value={gender}
          options={genders}
          select={selectGender}
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
        <div className="module-spacer--medium"></div>
        <div className="center">
          <PrimaryButton
            label={'商品情報を保存'}
            onClick={() =>
              dispatch(saveProduct(name, description, category, gender, price))
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
