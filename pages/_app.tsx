import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {Header} from "@/components/layout/header/Header";
import {SEO} from "@/components/layout/SEO/SEO";
import {Alert, Button, Snackbar} from "@mui/material";
import useLocalStorage from "@/hooks/useLocalStorage";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "../src/dev";

function App({Component, pageProps}: AppProps) {


    return (
        <>
            <SEO/>
            <div className={"app"}>
                <Header/>
                <div className={"container"}>
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}
                    >
                        <Component {...pageProps} />
                    </DevSupport>
                </div>

            </div>
        </>
    )
}

export default App
