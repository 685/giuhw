import {useEffect, useState} from "react";
import useFetch from "@/hooks/useFetch";
import {IFetchImagesResponse, TFilterIdDataType} from "@/src/interfaces";

export interface IUseFetchImagesInitialStateProps {

    _amount: number;
    _offset: number;
    _categories: TFilterIdDataType[];


}

export default function useFetchImages({
                                           _amount,
                                           _offset,
                                           _categories
                                       }: IUseFetchImagesInitialStateProps) {

    const [payload, setPayload] = useState<IUseFetchImagesInitialStateProps>({
        _amount,
        _offset,
        _categories
    })

    const [data, setData] = useState<IFetchImagesResponse | null>(null);


    const {request, error, loading} = useFetch()

    useEffect(() => {

        const fetchData = async () => {
            const response = await request("/api/images", "POST", {amount: payload._amount, offset: payload._offset, categories: payload._categories})

            setData(response);

        }

        fetchData()
            .catch(console.error);


    }, [request, payload])


    const changeValues = ({
                              _amount,
                              _offset,
                              _categories
                          }: IUseFetchImagesInitialStateProps) => {
        setPayload({_amount, _offset, _categories});
    }

    return {
        payload,
        data: data,

        loading,
        error,

        change: changeValues


    }
}