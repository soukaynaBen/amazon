import Image from 'next/image'
import React, { memo } from 'react'
import {  MenuIcon,
          SearchIcon,
          ShoppingCartIcon
        } from '@heroicons/react/outline';

import { useSession,signIn,signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {   selectItems } from '../features/basketSlice';
 function Header() {
  const { data:session } = useSession();
  const router = useRouter();
  const items= useSelector(selectItems);


  return (
    <header className='sticky top-0 z-50'>
    {/* top nav */}
    <div className='flex items-center bg-amazon_blue p-1 py-2 grow'>
        <div onClick={() => router.push("/")} className='mt-2 flex items-center grow sm:grow-0'>
            <Image 
            
            src='https://links.papareact.com/f90' 
            width={150} 
            height={40} 
            objectFit='contain' 
            className='cursor-pointer'
            /> 
        </div>
        {/* search */}
        <div className='hidden sm:flex items-center h-10 rounded-md grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'> 
          <input type="text" className='p-2 h-full grow shrink rounded-l-md focus:outline-none'/>
          <SearchIcon className='h-12 p-4 px-4'/>
        </div>
          {/* right */}
          <div  className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
            <div className='link' onClick={!session ? signIn :signOut}> 
              <p>{session? `Hello, ${session.user.name}`:"Sign In"}</p>
              <p className='font-extrabold md:text-sm '>Account & List</p>
            </div>
            <div className='link'>  
              <p>Return</p>
              <p className='font-extrabold md:text-sm '> & Order</p>
            </div>
            <div onClick={()=> router.push('/checkout')} className='relative link flex items-center' >
              <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'> {items.length}</span>
              <ShoppingCartIcon className='h-10'/>
              <p className='hidden md:inline mt-2 font-extrabold md:text-sm '>Basket</p>
            </div>
          </div>
    </div>
    {/* bottom nav */}
    <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm '>
      <p className='link flex items-center'>
        <MenuIcon className='h-4 mr-1'/>
        All
      </p>
      <p className='link'>Prime Video</p>
      <p className='link'>Amazon Business</p>
      <p className='link'>Today's Deals</p>
      <p className='link hidden  lg:inline-flex'>Electonics</p>
      <p className='link hidden  lg:inline-flex'>Food & Grocery</p>
      <p className='link hidden  lg:inline-flex'>Prime</p>
      <p className='link hidden  lg:inline-flex'>Buy Again </p>
      <p className='link hidden  lg:inline-flex'>Shopper Toolkit</p>
      <p className='link hidden  lg:inline-flex'>Health & Personal Care</p>

    </div>
    </header>
  )
}
export default  memo(Header) ;