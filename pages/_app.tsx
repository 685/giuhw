import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {Header} from "@/components/layout/header/Header";
import {SEO} from "@/components/layout/SEO/SEO";

function App({Component, pageProps}: AppProps) {
    return (
        <>
            <SEO/>
            <div className={"app"}>
                <Header/>
                <div className={"container"}>
                    <Component {...pageProps} />
                </div>
            </div>
        </>
    )
}

export default App
