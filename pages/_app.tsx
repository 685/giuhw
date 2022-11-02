import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {Header} from "@/components/layout/header/Header";
import {SEO} from "@/components/layout/SEO/SEO";
import {Ad} from "@/components/layout/Ad/Ad";
import {Footer} from "@/components/layout/footer/Footer";


function App({Component, pageProps}: AppProps) {


    return (
        <>
            <SEO/>
            <div className={"app"}>
                <Header/>
                <Ad/>
                <div className={"container"}>

                    <Component {...pageProps} />

                </div>
                <Ad/>
                <Footer/>

            </div>
        </>
    )
}

export default App
