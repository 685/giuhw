import {IFilterOptions, IImageItem} from "@/src/interfaces";
import {useEffect, useState} from "react";
import DImage from "@/components/layout/DisplayImages/ui/DImage/DImage";
import {Grid} from "@mui/material";
import useInput from "@/hooks/useInput";
import useFetchImages from "@/hooks/useFetchImages";
import FilterImages from "@/components/layout/filterImages/FilterImages";

interface IDisplayImagesProps {
    count: number;
}

export function DisplayImages({count}: IDisplayImagesProps) {


    const baseImagesAmount = 30;

    const {
        value: imagesAmount,
        onChange: onImagesAmountChange
    } = useInput(baseImagesAmount);
    const [offsetLevel, setOffsetLevel] = useState<number>(0);
    const [filteredCategories, setFilteredCategories] = useState([]);

    const {data, change} = useFetchImages({
        _categories: [...filteredCategories],
        _amount: imagesAmount,
        _offset: offsetLevel,
    });


    const [currentItems, setCurrentItems] = useState<Array<IImageItem> | null>(null);
    const [currentFilterOptions, setCurrentFilterOptions] = useState<IFilterOptions | null>(null);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);


    useEffect(() => {

        if (data) {
            setCurrentItems(data.imageList);
            setCurrentFilterOptions(data.filterOptions);
            setNextPage(data.nextPage);
            setPrevPage(data.prevPage);
        }

    }, [data]);

    return (
        <div>
            {/*    <Box sx={{marginBottom: 40}}>*/}
            {/*    <Slider*/}
            {/*        aria-label="Temperature"*/}
            {/*        defaultValue={baseImagesAmount}*/}
            {/*        valueLabelDisplay="auto"*/}
            {/*        step={5}*/}
            {/*        min={10}*/}
            {/*        max={100}*/}
            {/*        onChange={onImagesAmountChange}*/}

            {/*    />*/}
            {/*        <span>{imagesAmount}</span>*/}

            {/*</Box>*/}

            <div style={{display: "flex"}}>
                {data !== null && (
                    <FilterImages filters={data.filterOptions} change={change}/>
                )}
                <Grid container spacing={8} gap={16} sx={{marginLeft: 20}}>

                {currentItems && currentItems.map((item: IImageItem) => (
                    <DImage key={item.id} item={item} w={"300px"} h={"300px"}/>
                ))}

            </Grid>
            </div>



        </div>
    )
}