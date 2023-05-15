import '../styles/globals.scss'
import { Provider } from 'react-redux';
import store from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { SessionProvider } from "next-auth/react"
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

let persistor = persistStore(store);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>
          Інтернет-магазин PLUM: офіційний сайт найпопулярнішого
          онлайн-гіпермаркету в Україні
        </title>
        <meta
          name="description"
          content="Інтернет-магазин PLUM: електроніка, одяг і взуття, побутова техніка, автотовари, товари для дому та бізнесу. Купуйте в PLUM! ✓ Офіційна гарантія ✓ Доставка по всій Україні 🚚 ✓ Відгуки покупців, огляди і характеристики товарів $ Вигідні ціни та знижки %"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>

      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );

}
// MyApp.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   pageProps: PropTypes.object.isRequired,
// };
export default MyApp;

// export async function getServerSideProps(context) {
//   const { req, query } = context;
//   const session = await getSession({req});
//   const { callbackUrl } = query;
//   const countryData = await getCountryData();
//   if (session) {
//       return {
//           redirect: {
//               destination: callbackUrl,
//           },
//       };
//   };
//   const csrfToken = await getCsrfToken(context);
//   const providers = Object.values(await getProviders());
 
//   return {
//     pageProps: { providers, csrfToken, callbackUrl, country:countryData },
     
//   };
// }