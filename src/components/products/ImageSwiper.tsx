import { useState, VFC } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import NoImage from '../../assets/img/src/no_image.png';

type Props = {
  images: Array<{ id: string; path: string }>;
};

const ImageSwiper: VFC<Props> = (props: Props) => {
  const { images } = props;

  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
  });

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div className="p-media__thumb">
          <img src={NoImage} alt="商品画像が存在しておりません" />
        </div>
      ) : (
        images.map((image) => (
          <div className="p-media__thumb" key={image.id}>
            <img src={image.path} alt="商品画像" />
          </div>
        ))
      )}
    </Swiper>
  );
};

export default ImageSwiper;
