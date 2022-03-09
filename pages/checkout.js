import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import Header from '../components/Header'
import { selectItems } from '../features/basketSlice'
import { selectTotal } from '../features/basketSlice'
// import {loadStripe} from "@stripe/stripe-js"
// import axios from 'axios'
import { useRouter } from 'next/router'

// const stripePromise=loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);

export default function Checkout() {
  const {data:session}=useSession();
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
   const router=useRouter();
    // const createCheckoutSession= async() => { 
    //      const stripe= await stripePromise;
    //       const checkoutSession= await axios.post('api/create-checkout-session',{
    //         items,
    //         email:session.user.email
    //       })
    //       //Redirect
    //       const  result= await  stripe.redirectionToCheckout({
    //         sessionId:checkoutSession.data.id
    //       })
    //       if(result.error){
    //         alert(result.error.message);
    //       }
    //  }
  
  return (
    <div className='bg-gray-100'>
        <Header/>
        <main className='lg:flex max-w-screen-2xl mx-auto'>
            {/* left hand section */}
            <div className=' grow m-5 shadow-sm'>
                <Image src="https://links.papareact.com/ikj"
                width={1020}
                height={250}
                objectFit='contain'
                alt="ads"
                />
                <div className='flex flex-col p-5 space-y-10 bg-white'>
                    {/* <h1>Your Amazon Basket is empty</h1> */}
                    <h1 className='text-3xl border-b pb-4'> 
                    {items.length ===0 ? "Your Amazon Basket is empty" : "Shopping Basket"}
                    </h1>
                     {items.length !==0 && items.map((item,i) => (
                          <CheckoutProduct  {...item} key={i} />
                     ))}
                     
                </div>
            </div>
            {/* right hand section */}
            <div className='font-bold bg-white flex flex-col p-10 shadow-md'>
              {items.length > 0 && (
                <>
                 <h2 className='whitespace-nowrap '>
                   Subtotal {items.length} items : {" "}
                   <CurrencyFormat 
                    value={ total} 
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'£'} 
                     />
                 </h2>
                    <button onClick={()=> router.push('/orders')}  role="link"   className={`button mt-2 ${!session? "from-gray-500 border to-gray-400 border-gray-200 text-gray-200 cursor-not-allowed":""}`}  disabled={!session} >
                      {!session? "Sign In to checkout ": "Proceed to checkout"}
                      
                    </button>

                </>
              )}
            </div>
        </main>
    </div>
  )
}
