import {useState} from "react";
import useFetch from "@/hooks/useFetch";
import {IFetchImagesResponse, TFilterIdDataType} from "@/src/interfaces";

export interface IUseFetchImagesInitialStateProps {

    _amount: number;
    _offset: number;
    _categories: TFilterIdDataType[];

}

interface IUseFetchImagesProps extends IUseFetchImagesInitialStateProps {
    preloadedData: IFetchImagesResponse;
}



export default function useFetchImages({
                                           _amount,
                                           _offset,
                                           _categories,
    preloadedData,
                                       }: IUseFetchImagesProps) {

    const {request, error, loading} = useFetch();

    const [payload, setPayload] = useState<IUseFetchImagesInitialStateProps>({
        _amount,
        _offset,
        _categories
    })

    const [data, setData] = useState<IFetchImagesResponse | null>(preloadedData);




    const fetchData = async ({_amount, _offset, _categories}: IUseFetchImagesInitialStateProps) => {
        const response = await request("/api/images", "POST", {
            amount: _amount,
            offset: _offset,
            categories: _categories
        })

        setData(response);

    }


    const changeValues = ({
                              _amount,
                              _offset,
                              _categories
                          }: IUseFetchImagesInitialStateProps) => {
        setPayload({_amount, _offset, _categories});
        fetchData({_amount, _offset, _categories})
            .catch(console.error);
    }

    const setOffset = (offset: number) => {
        let dt: IUseFetchImagesInitialStateProps = {
            _amount: payload._amount,
            _offset: offset,
            _categories: payload._categories,
        }
        setPayload(
            dt
        )
        fetchData(dt)
            .catch(console.error);

    }

    return {
        payload,
        data: data,

        loading,
        error,

        setOffset,
        change: changeValues,


    }
}