import {AppProps} from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import {router} from "next/client";
import ym, { YMInitializer } from 'react-yandex-metrika';

function MyApp({Component, pageProps}: AppProps): JSX.Element {

    router.events.on('routeChangeComplete', (url: string) => {
        if (typeof window != undefined) {
            ym('hit', url);
        }
    });

    return (
        <>
            <Head>
                <title>MyTop - мой лучший топ</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                />
                <link
                    rel="preconnect"
                    href="https://mc.yandex.ru"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap"
                    rel="stylesheet"
                />
                <meta property='og:url' content={process.env.NEXT_PIBLIC_DOMAIN + router.asPath}/>
                <meta property='og:locale' content='ru_RU'/>

            </Head>
            <YMInitializer
                accounts={[]}
                options={{ webvisor: true, defer: true }}
                version='2'
            />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
