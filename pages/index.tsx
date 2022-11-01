import {
    DisplayImages
} from '@/src/components/layout/DisplayImages/DisplayImages';
import type {GetServerSideProps, NextPage} from 'next'
import axios from "axios";
import {IFetchImagesResponse} from "@/src/interfaces";
import {getFullUrl} from "@/src/utils";

interface ImagesProps {
    preloadedData: IFetchImagesResponse;
    error: boolean;
}

type Data = {
    preloadedData: IFetchImagesResponse;
    error: boolean;
}

// preloading from the server
export const getServerSideProps: GetServerSideProps<Data> = async ({req}) => {

    let basePayload = {
        categories: [],
        amount: 30,
        offset: 0,
    }

    let error = false


    const response = await axios.post(getFullUrl(req).fullUrl + "api/images", {
        ...basePayload
    })

    console.log("Response", response)

    if (!response.status.toString().startsWith('2')) {
        error = true;
    }

    let preloadedData: IFetchImagesResponse = response.data;



    return {
        props: {
            preloadedData: preloadedData,
            error: error,
        }
    }
}


const Images: NextPage<ImagesProps> = ({preloadedData, error}: ImagesProps) => {

    return (
        <>
            {
                error ? (
                    <div>Something went wrong</div>
                ) : (
                    <DisplayImages preloadedData={preloadedData}/>
                )
            }
        </>
    )
}


export default Images;