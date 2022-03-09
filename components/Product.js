import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image'
import React from 'react'
import CurrencyFormat from 'react-currency-format';
import {useDispatch} from 'react-redux';
import { addToBasket } from '../features/basketSlice';

export default function Product({id,title,price,description,category,image,rating}) {
  
   const dispatch =useDispatch()
    const {rate}=rating;
    const hasPrime= rate < 2.5;
    
  const addItemToBasket= ()=>{
    const product={ id,
      title,
      price,
      description,
      category,
      image,
      rate: Math.round(rate),
      hasPrime
    }
    dispatch(addToBasket(product))
  }

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>

        <p className='absolute top-2 right-2 text-gray-400 italic '>
            {category}
        </p>
        
        <Image  src={image} height={200} width={200} objectFit="contain"/>
        <h4 className='my-3'>{title}</h4>
        <div className='flex'>
            {Array(Math.round(rate)).fill().map((_,i)=>(

            <StarIcon className='h-5 text-yellow-500' key={i}/>
             ))}
        </div>

        <p className='text-xs my-2 line-clamp-2'>{description}</p>

        <div className='mb-5'>  
             <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'£'}  />
        </div>
        {
          hasPrime && (
            <div className='flex items-center space-x-2 -mt-5'>
              <img className='w-12' src="https://links.papareact.com/fdw" alt="" />
              <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
            </div>
          )
        }
        <button onClick={addItemToBasket} className='button mt-auto'>Add to Basket</button>
        
    </div>
  )
}
