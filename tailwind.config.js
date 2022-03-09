module.exports = {
  mode:'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {
      screens:{
        "3xl":"2000px",
      }, 
      colors:{
        amazon_blue:{
          light:"#232F3E",
          DEFAULT:"#131921"
        }
      }    
    },
  },
  plugins: [ require('@tailwindcss/line-clamp')],

}
