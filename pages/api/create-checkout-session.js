// const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)

// export default async (req,res)=>{

//     const {items, email} =  req.body;
//     const transformeditems = items.map(item =>( {
//         description: item.decription,
//         quantity:1,
//         price_data: {
//             currency: 'gbp',
//             unit_amount: item.price*100,
//             product_data: {
//               name: item.title,
//               images:[item.image],
//             },
//         }
//       }));

//     const session= await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       // shipping_rates:['shr_1KVJ8NBDWI4DHSmpaICLDnqY'],
//       shipping_address_collection:{
//         allowed_countries:['GB','US','CA']
//       },
//       line_items:transformeditems,
//       mode:'payment',
//       success_url:`${process.env.HOST}/success`,
//       cancel_url:`${process.env.HOST}/checkout`,
//       customer_email: email,
//       metadata:{
//         images:JSON.stringify(items.map(item => item.image )) 
//       }

//     })
//     res.status(200).json({id:session.id})
// }