import {
    DisplayImages
} from '@/src/components/layout/DisplayImages/DisplayImages';
import type {NextPage} from 'next'
import axios from "axios";
import {IFetchImagesResponse} from "@/src/interfaces";

interface ImagesProps {
    preloadedData: IFetchImagesResponse;
    error: boolean;
}

// preloading from the server
export const getServerSideProps = async () => {

    let basePayload = {}

    let error = false

    const response = await axios.get("/api/images", {
        headers: {},
        data: basePayload
    })

    if (!response.status.toString().startsWith('2')) {
        error = true;
    }


    return {
        props: {
            preloadedData: response.data,
            error: error,
        }
    }
}


const Images: NextPage<ImagesProps> = ({preloadedData, error}: ImagesProps) => {

    return (
        <>
            <DisplayImages preloadedData={preloadedData}/>
        </>
    )

}

export default Images;