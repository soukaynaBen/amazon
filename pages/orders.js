// import { getSession, useSession } from 'next-auth/react';
// import React from 'react'
// import Header from '../components/Header'
// import { db } from '../firebase';
// import { collection, getDocs } from 'firebase/firestore';

// function Orders() {
//     const {data:session }=useSession();
//   return (
//     <div>
//         <Header/>
//         <main className='max-w-screen-lg mx-auto p-10'>
//             <h1 className='text-3xl border-b  pb-1 border-yellow-400'>Your orders</h1>
//             {session? (<h2>x Orders</h2>):(<h2>Please sign in to see your orders</h2>)}
//             <div className='mt-5 space-y-4'>

//             </div>
//         </main>
//     </div>
//   )
// }

// export default Orders;
// export async function getServerSideProps(context){
//     const stripe= require('stripe')(process.env.STRIPE_SECRET_KEY);
//     const  session =getSession(context);    
//     if(!session){
//         return {
//             props:{}
//         }
//     }
//         // const userscol= collection(db,'users')
//         // const userSnapshot =await getDocs(userscol);
//         // const usersList= userSnapshot.docs.map(doc => doc.data())
//         //get the user orders    const  stripeOrders=usersList;

// }
import { useEffect, useState } from "react";
import {
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";
import {  useSelector } from "react-redux";
import {  selectItems, selectTotal } from "../features/basketSlice";
import Header from "../components/Header";
import Image from "next/image";
import {  StarIcon } from "@heroicons/react/solid";
import CurrencyFormat from "react-currency-format";

// This values are the props in the UI
const currency = "USD";
const style = {"layout":"vertical","shape":"pill","color":"gold"};

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner,setMessage,setToggle }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const amount = useSelector(selectTotal)

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        // Your code here after capture the order
                        const name = details.payer.name.given_name;
                         setToggle(true)
                         setMessage(`Transaction completed by ${name}` )

                    });
                }}
               
            />
        </>
    );
}

export default function Orders() {
       const {data:session }=useSession();
       const items=useSelector(selectItems)
       const [message,setMessage]=useState("")
       const [toggle,setToggle]=useState(false)
       const Product= ({item,ind}) =>(<div className='grid grid-cols-5' key={ind} id={ind}>
       <Image src={item.image} height={200} width={200} objectFit="contain" alt={item.title}/>
       <div className='col-span-3 mx-5'>
        <p>{item.title}</p>
        <div className='flex'>
            {Array(item.rate).fill().map((_,i)=>(
            <StarIcon className='h-5 text-yellow-500' key={i}/>
             ))}   
        </div>
        <p className='text-xs my-2 line-clamp-3'>
            {item.description}
        </p>

            <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'£'}  />
       {
         item.hasPrime && (
           <div className='flex items-center space-x-2 '>
             <img loading='lazy' className='w-12' src="https://links.papareact.com/fdw" alt="" />
             <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
           </div>
         )
       }
       </div>
       </div>)
	return (<>
                <Header/>
                { toggle &&
                (<div className="fixed  top-1/4  left-1/2 translate-x-[-50%] translate-y-[-50%] z-50  bg-green-500 text-white text-lg fond-bold rounded-md p-5 px-5 w-[700px]" color="green">{message}<span onClick={()=>setToggle(false)} className="top-2 right-3 absolute text-2xl cursor-pointer   ">&times;</span></div>)}

         <main className='max-w-screen-lg mx-auto p-10'>
             <h1 className='text-3xl border-b  pb-1 border-yellow-400'>Your orders</h1>
             {session? (<h2> {items.length} Orders</h2>):(<h2>Please sign in to see your orders</h2>)}
                 {session && items.length !== 0 ? (
             <div className='mt-5 space-y-4'>

                {  items.map((item,i) => <Product item={item} ind={i} key={i}/>)}
                <div className="relative z-10 " style={{ maxWidth: "750px", minHeight: "200px" }}>
                        <ButtonWrapper
                            currency={currency}
                            showSpinner={false}
                            setMessage={setMessage}
                            setToggle={setToggle}
                            />
                </div>
             </div>
                 ):""}
       
         </main>
                        </>
	);
}