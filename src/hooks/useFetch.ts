import {useCallback, useState} from "react";
import axios from "axios";


interface IHeaders {
    [key: string]: string | any;
}

interface IUseFetch {
    loading: boolean
    request: (url: string, method?: HTTPMethod, body?: any, headers?: IHeaders) => Promise<any>;
    error: string | null;
    clearError: () => void;
}

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'


const useFetch = (): IUseFetch => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (
        url: string,
        method: HTTPMethod = 'GET',
        body: any = null,
        headers: IHeaders = {}
    ) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await axios(url, {method, headers, data: body})
            const data = await response.data;



            if (!response.status.toString().startsWith('2')) {
                // @ts-ignore
                throw new Error(
                    data.message ||
                    'Something went wrong while fetching data from the server.'
                )
            }

            setLoading(false)

            return data
        } catch (e: any) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}

export default useFetch;
