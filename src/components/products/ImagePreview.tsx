import { VFC } from 'react';

type Props = {
  id: string;
  path: string;
};

const ImagePreview: VFC<Props> = (props: Props) => {
  const { id, path } = props;

  return (
    <div className="p-media__thumb">
      <img src={path} alt="プレビュー画像" />
    </div>
  );
};

export default ImagePreview;
