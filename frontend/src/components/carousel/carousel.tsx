'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Button } from '../ui/button';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/lib/utils';

export default function Carousel({
  carouselImages,
}: {
  carouselImages: { src: string; label: string }[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const currentImage = carouselImages[currentImageIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselImages.length, currentImageIndex]);

  const handleClickNext = () =>
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);

  const handleClickPrev = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );

  return (
    <div className='flex flex-col justify-center gap-6 items-center w-10/12 h-60 md:h-screen relative'>
      <div className='relative w-full h-full'>
        <Image
          key={currentImage.label}
          src={currentImage.src}
          alt={currentImage.label}
          fill
          className='rounded-xl'
        />
      </div>

      <div className='flex absolute w-full justify-between p-2'>
        <Button size='icon' className='rounded-full' onClick={handleClickPrev}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>

        <Button size='icon' className='rounded-full' onClick={handleClickNext}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>

      <div className='flex gap-2 absolute w-full justify-center p-2 bottom-0'>
        {carouselImages.map(({ label }, index) => (
          <Button
            key={label}
            size='icon-xs'
            className={cn(
              'rounded-full',
              currentImage.label === label && 'bg-white'
            )}
            onClick={() => setCurrentImageIndex(index)}
          ></Button>
        ))}
      </div>
    </div>
  );
}
