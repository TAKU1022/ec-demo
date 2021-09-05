import { ChangeEvent, useCallback, useEffect, useState, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { ImageArea } from '../components/products';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { SetSizeArea } from '../components/products';
import { db } from '../firebase';
import { saveProduct } from '../reducks/products/operations';

const ProductEdit: VFC = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split('/product/edit')[1];
  if (id !== '') {
    id = id.split('/')[1];
  }

  const [images, setImages] = useState(
    [] as Array<{ id: string; path: string }>
  );
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState(
    [] as Array<{ size: string; quantity: number }>
  );

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

  useEffect(() => {
    if (id !== '') {
      db.collection('products')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setImages(data?.images);
          setName(data?.name);
          setDescription(data?.description);
          setCategory(data?.category);
          setGender(data?.gender);
          setPrice(data?.price);
          setSizes(data?.sizes);
        });
    }
  }, [id]);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
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
        <div className="module-spacer--small"></div>
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small"></div>
        <div className="center">
          <PrimaryButton
            label={'商品情報を保存'}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  images,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
