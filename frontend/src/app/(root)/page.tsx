import Carousel from '@/components/carousel/carousel';

import { carouselImages } from '@/constants';

export default function Home() {
  return (
    <div className='my-5 flex justify-center'>
      <Carousel carouselImages={carouselImages} />
    </div>
  );
}
