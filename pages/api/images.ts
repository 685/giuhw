import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";
import config from "@/src/config";
import {IFetchImagesResponse} from "@/src/interfaces";

type Data = {
    [key: string]: any
}

interface IPostRequestBody {
    amount?: number,
    offset?: number,
    categories?: number[],
}

interface RequestData {
    amount: number,
    offset: number,
    categories: number[],
}

const validateData = (
    {amount, offset, categories}: IPostRequestBody
): RequestData | false => {

    let badRequest = false;


    // check if any of the values are undefined

    if (typeof amount !== "number") {
        return badRequest;
    }

    // check if offset is a number
    if (typeof offset !== "number") {
        return badRequest;
    }

    // check if categories is an array
    if (!Array.isArray(categories)) {
        return badRequest;
    }

    return {
        amount,
        offset,
        categories
    }
}

const createURL = (
    {amount, offset, categories}: RequestData
): string => {
    const categoriesString = categories.length > 0 ? categories.join(",") : "";
    const amountString = amount > 0 ? amount : "100";
    const offsetString = offset > 0 ? offset : "0";
    return `${config.apiUrl.current}${amountString}/${offsetString}/${categoriesString}`
}

const isVideo = (url: string): boolean => {
    const videoExtensions = ["mp4", "webm", "ogg", "MOV", 'mov'];
    const extension = url.split(".").pop();

    if (extension) {
        return videoExtensions.includes(extension);
    }
    return false;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'POST') {
        const body = req.body
        const validatedBody = validateData(body);

        if (validatedBody === false) {
            res.status(400).json({error: 'Bad request'})
            return;
        }

        const {amount, offset, categories} = validatedBody;
        const url = createURL({amount, offset, categories});


        let response = await axios.get(url)

        if (response.status.toString().startsWith('2')) {
            const data = response.data as IFetchImagesResponse;
            console.log(data);
            if (data.imageList.length < 1) {
                res.status(404).json({error: 'Not found'})
                return;
            }

            for(let item of data.imageList) {
                item.isVideo = isVideo(item.url);
            }

            res.status(200).json(data)
            return;

        } else {

            res.status(500).json({message: 'Something went wrong while fetching data from the server.'})
        }
    } else {
        res.status(405).json({message: 'Method not allowed'})
    }


}
