
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'utils','component'], 
  },
  images:{
    domains:["links.papareact.com","fakestoreapi.com"],
  },
  env:{
    stripe_public_key : process.env.STRIPE_PUBLIC_KEY
  }
}
