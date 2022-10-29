import Head from "next/head";
import icon from "@/public/assets/icon.png";
import icon32 from "@/public/assets/icon.ico";


interface Interface {

    title: string;
    description: string;
    keywords: string;


}

export function SEO({title, description, keywords}: Interface) {
    return (
        <Head>

            <title>{title}</title>

            {/* ico icon */}
            <link rel="icon" href={icon32.src}/>


            {/* og meta tags */}
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:site_name" content="HentaiWorld"/>

            {/* Image */}
            <meta property="og:image" content={icon.src}/>


            {/* twitter meta tags */}
            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>

            {/* other meta tags */}
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
            <meta name={"format-detection"} content={"telephone=no"}/>
        </Head>

    )
}