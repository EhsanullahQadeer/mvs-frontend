import React from 'react';

interface SmallCardProps {
  image: string;
  title: string;
  name: string;
  date: string;
}

const SmallCard: React.FC<SmallCardProps> = ({ image, title, name, date }) => {
  return (
    <div className='p-2.5 h-fit flex flex-col bg-[#1C1C1C] justify-center items-center gap-2 border rounded-md border-[#242424]'>
      <div className='w-20 h-20'>
        <img className='w-full h-full rounded-md object-cover' src={image} alt={title} />
      </div>
      <div className='flex flex-col justify-center items-center gap-0.5'>
        <span className='text-[#fff] font-semibold  small'>{title}</span>
        <span className='text-[#E5E5E5] smaller'>{name}</span>
        <span className='text-[#787878] smaller'>{date}</span>
      </div>
    </div>
  );
};

export default SmallCard;
