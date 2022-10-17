import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";


type Data = {
    [key: string]: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const {query} = req;
    const {count, page} = query;
    if (!count || !page) {
        let count = 10;
        let page = 1;
    }

    let response = await axios.get(`http://141.147.47.85:50080/images/api/${count}/${page}`)

    if (response.status.toString().startsWith('2')) {
        res.status(200).json(response.data)
    } else {

        res.status(500).json({message: 'Something went wrong while fetching data from the server.'})
    }


}
