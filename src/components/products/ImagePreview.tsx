import { VFC } from 'react';

type Props = {
  id: string;
  path: string;
  deleteImage: (id: string) => Promise<any> | undefined;
};

const ImagePreview: VFC<Props> = (props: Props) => {
  const { id, path, deleteImage } = props;

  return (
    <div className="p-media__thumb" onClick={() => deleteImage(id)}>
      <img src={path} alt="プレビュー画像" />
    </div>
  );
};

export default ImagePreview;
