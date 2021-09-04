import { IconButton } from '@material-ui/core';
import { AddPhotoAlternate } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Dispatch, memo, useCallback, VFC } from 'react';
import { ImagePreview } from '.';
import { storage } from '../../firebase';

const useStyles = makeStyles({
  icon: {
    width: 48,
    height: 48,
  },
});

type Props = {
  images: { id: string; path: string }[];
  setImages: Dispatch<React.SetStateAction<{ id: string; path: string }[]>>;
};

const ImageArea: VFC<Props> = memo((props: Props) => {
  const { images, setImages } = props;

  const classes = useStyles();

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;
      let blob = new Blob(file, { type: 'images/jpeg' });

      const S =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('');

      const uploadRef = storage.ref('images').child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const newImage = { id: fileName, path: downloadUrl };
          setImages((prevState) => [...prevState, newImage]);
        });
      });
    },
    [setImages]
  );

  return (
    <div>
      <div className="p-grid__list-images">
        {images.map((image) => (
          <ImagePreview key={image.id} id={image.id} path={image.path} />
        ))}
      </div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternate />
            <input
              className="u-display-none"
              type="file"
              id="image"
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  );
});

export default ImageArea;
