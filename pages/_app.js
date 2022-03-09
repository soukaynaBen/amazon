import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { store } from '../store'
import {Provider} from 'react-redux'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AppWrapper from '../components/AppWrapper';

function MyApp({ Component, pageProps:{session,...pageProps} }) {
  
  return (
    <PayPalScriptProvider options={{ 
      "client-id":process.env.client_id,
      components: "buttons",
      currency: "USD"}}>
          <SessionProvider session={session}>
            <Provider store={store}>
               <AppWrapper>
                  <Component {...pageProps} />
               </AppWrapper>
            </Provider>
          </SessionProvider>
    </PayPalScriptProvider >
  )
}

export default MyApp

