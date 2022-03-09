// import { buffer } from 'micro';
// import * as admin from 'firebase-admin'; 

// //Secure a connection to Firebase from the backend 
// const  serviceAccount = require('../../permissions.json')
// const app=!admin.apps.length ? admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// }) : admin.app();

// // Establish connection to stripe
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
// const fufillOrder= async (session)=>{
//     //console.log('Fulfilling order', session);
    
// }

// export default async (req,res)=> {
//     if(req.method === 'POST'){
//         const requestBuffer = await buffer(req);
//         const payload = requestBuffer.toString();
//         const sig = request.headers['stripe-signature'];
//         let event;
//         //Verify that the event posted came from  stripe
//         try{

//             event= stripe.webhooks.constructEvent(payload,sig,endpointSecret);

//         }catch(err){
//             console.log('ERROR',err.message);
//             res.status(400).send(`Webhook Error: ${err.message}`);
//         }   
        
//         if(event.type === 'checkout.session.completed'){
//             const  session=event.data.object;
//         }

//         res.json({received: true});

//     }
// }