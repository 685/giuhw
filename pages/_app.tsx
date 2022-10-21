import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {Header} from "@/components/layout/header/Header";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <div className={"app"}>
            <Header/>
            <div className={"container"}>
                <Component {...pageProps} />
            </div>
        </div>
    )
}

export default MyApp
