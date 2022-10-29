import {
    DisplayImages
} from '@/src/components/layout/DisplayImages/DisplayImages';
import type {NextPage} from 'next'
import {SEO} from "@/components/layout/SEO/SEO";


const Images: NextPage = () => {

    return (
        <>
            <SEO
                title={"HentaiWorld"}
                description={"HentaiWorld is a website where you can find the best hentai images and videos."}
                keywords={"hentai, hentaiworld, hentai images, hentai videos, hentai gifs, hentaiworld images, hentaiworld videos, hentaiworld gifs"}


            />

            <DisplayImages/>
        </>
    )

}

export default Images;