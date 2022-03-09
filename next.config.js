
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'utils','component'], 
  },
  images:{
    domains:["links.papareact.com","fakestoreapi.com"],
  },
  env:{
    client_id: process.env.CLIENT_ID
  }
}
