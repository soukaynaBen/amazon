import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useDispatch } from 'react-redux'
import { addToBasket,removeFromBasket } from '../features/basketSlice'

function CheckoutProduct({ id, title, price, description, category, image, rate, hasPrime }) {
    const dispatch=useDispatch()

    const addItemToBasket=(product)=>{
        dispatch(addToBasket({ id, title, price, description, category, image, rate, hasPrime }
            ))
    }
    const removeItemFromBasket=()=>{
        dispatch(removeFromBasket({id}))
    }
  return (
    <div className='grid grid-cols-5' key={id}>
        <Image src={image} height={200} width={200} objectFit="contain"/>
        <div className='col-span-3 mx-5'>
         <p>{title}</p>
         <div className='flex'>
             {Array(rate).fill().map((_,i)=>(
             <StarIcon className='h-5 text-yellow-500' key={i}/>
              ))}   
         </div>
         <p className='text-xs my-2 line-clamp-3'>
             {description}
         </p>

             <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'£'}  />
        {
          hasPrime && (
            <div className='flex items-center space-x-2 '>
              <img loading='lazy' className='w-12' src="https://links.papareact.com/fdw" alt="" />
              <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
            </div>
          )
        }
        </div>
        <div className='flex flex-col space-y-2 my-auto '>
            <button className='button mt-auto' onClick={addItemToBasket}>Add to Basket</button>
            <button className='button mt-auto' onClick={removeItemFromBasket}>Remove from Basket</button>
        </div>
    </div>
  )
}

export default CheckoutProduct