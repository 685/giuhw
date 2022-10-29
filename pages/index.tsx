import {
    DisplayImages
} from '@/src/components/layout/DisplayImages/DisplayImages';
import type {NextPage} from 'next'
import {SEO} from "@/components/layout/SEO/SEO";


const Images: NextPage = () => {

    return (
        <>
            <SEO
                title={"Hentai World"}
                description={"Hentai World is a website where you can find the best hentai images and videos."}
                keywords={"hentai, hentai world, hentai images, hentai videos, hentai gifs, hentai world images, hentai world videos, hentai world gifs"}


            />

            <DisplayImages/>
        </>
    )

}

export default Images;