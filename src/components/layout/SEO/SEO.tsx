import Head from "next/head";
import icon from "@/public/assets/icon.png";
import icon32 from "@/public/assets/icon.ico";


interface SEOProps {

    _title?: string;
    _description?: string;
    _keywords?: string;


}

export function SEO({_title, _description, _keywords}: SEOProps) {
    let title = _title ? _title : "HentaiWorld";
    let description = _description
        ? _description
        : "HentaiWorld is a website where you can find the best hentai" +
        " images and videos.";
    let keywords = _keywords
        ? _keywords
        : "hentai, hentaiworld, hentai images, hentai videos, hentai gifs," +
        " hentaiworld images, hentaiworld videos, hentaiworld gifs";

    return (
        <Head>
            {/* Default meta tags */}

            <title>{title}</title>
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