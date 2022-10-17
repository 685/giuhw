import {
    IFetchImagesResponse,
    IFilterOptions,
    IImageItem
} from "@/src/interfaces";
import {useEffect, useState} from "react";
import useFetch from "@/hooks/useFetch";
import DImage from "@/components/layout/DisplayImages/ui/DImage/DImage";

interface IDisplayImagesProps {
    count: number;
}

export function DisplayImages({count}: IDisplayImagesProps) {
    const {loading, request, error} = useFetch()

    const [currentItems, setCurrentItems] = useState<Array<IImageItem> | null>(null);
    const [currentFilterOptions, setCurrentFilterOptions] = useState<IFilterOptions | null>(null);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);


    useEffect(() => {


        const fetchData = async () => {
            const data: IFetchImagesResponse = await request('/api/images?count=100&page=1', 'GET', null, {})

            setCurrentItems(data.imageList);
            setCurrentFilterOptions(data.filterOptions);
            setNextPage(data.nextPage);
            setPrevPage(data.prevPage);

        }

        fetchData()
            .catch(console.error)


    }, [request]);


    return (
        <div>

            {loading && <div>Loading...</div>}
            {error && <div>Error</div>}
            {currentItems &&
                (currentItems.map((item, index) => <DImage key={index} item={item} w={"400px"} h={"400px"}/>))
            }

        </div>
    )
}