import React, {useEffect, useState} from 'react';
import {IUseFetchImagesInitialStateProps} from "@/hooks/useFetchImages";
import {IFilterOptions, TFilterIdDataType} from "@/src/interfaces";
import {Button, CircularProgress, Divider, Drawer} from '@mui/material';
import {Check} from "@mui/icons-material";
import styles from "./FilterImages.module.scss";
import {observer} from "mobx-react-lite";
import AsideStore from "@/src/stores/aside";
import {
    ImagesAmount
} from "@/components/layout/DisplayImages/ui/ImagesAmount/ImagesAmount";
import {motion} from 'framer-motion';
import {
    FilterCategory
} from "@/components/layout/filterImages/ui/FilterCategory/FilterCategory";

interface IFilterImagesProps {
    change: ({
                 _amount,
                 _offset,
                 _categories
             }: IUseFetchImagesInitialStateProps) => void;
    filters: IFilterOptions;

    loading: boolean;
    error: null | any;
}


const FilterLoading = () => {

    return (

        <div className={styles.loadingItem}>

            <CircularProgress/>

        </div>
        //
        // <Skeleton variant="rounded" style={{width: "80%", height: "40vh"}}/>
    )

}

const FilterImages = (
    {change, filters: filterOptions, loading, error,}: IFilterImagesProps
) => {
    // Just saves some data, and calls `change` function on submit button click 

    const baseAmount = 30;


    const [previousData, setPreviousData] = useState<IUseFetchImagesInitialStateProps | undefined>(undefined);
    const [isChanged, setIsChanged] = useState<boolean>(false);

    const [amount, setAmount] = useState<number>(baseAmount);
    const [offset] = useState<number>(0);
    const [filters, setFilters] = useState<TFilterIdDataType[]>([]);

    const addFilter = (filter: TFilterIdDataType) => {
        return () => setFilters(oldFilters => [...oldFilters, filter])
    }

    const removeFilter = (filter: TFilterIdDataType) => {
        console.log("Removed", [filters])
        return () => setFilters(oldFilters => oldFilters.filter(item => item !== filter))
    }


    useEffect(() => {

        setFilters(current => Array.from(new Set(current)))


    }, [filters]);

    useEffect(() => {
        const equals = (a: Array<TFilterIdDataType>, b: Array<TFilterIdDataType>) => JSON.stringify(a) === JSON.stringify(b)
        // if one of the values is not equals to the previous one, set `isChanged` to true
        let isChanged = false;
        if (previousData !== undefined) {
            if (previousData._amount !== amount) {
                isChanged = true;
            }
            if (previousData._offset !== offset) {
                isChanged = true;

            }
            if (!equals(previousData._categories, filters)) {
                isChanged = true;
            }
            console.log("Equals", equals(previousData?._categories, filters))
            console.log("!Equals", !equals(previousData?._categories, filters))
        } else {
            setPreviousData({
                    _amount: amount,
                    _offset: offset,
                    _categories: filters
                }
            )
        }

        console.log("Prev data", previousData)

        setIsChanged(isChanged);

    }, [amount, offset, filters, previousData]);

    const onChange = () => {
        setPreviousData({
            _amount: amount,
            _offset: offset,
            _categories: filters
        });
        change({_amount: amount, _categories: filters, _offset: offset})
    }


    return (
        <>

            <Drawer
                anchor={"left"}
                open={AsideStore.asideVisible}
                onClose={AsideStore.closeAside}
                sx={{minHeight: "100vh"}}
            >

                <div className={styles.filter}>
                    <motion.div animate={{
                        opacity: isChanged ? 1 : 0.5,
                        transform: isChanged ? "scale(1)" : "scale(.9)"
                    }}>
                        <Button onClick={onChange} size={"large"}
                                aria-label="delete"
                                color={"info"} style={{
                            backgroundColor: "limegreen",
                        }} className={styles.button}
                                disabled={!isChanged}>
                            <Check/>
                        </Button>
                    </motion.div>

                    <ImagesAmount disabled={loading} max={100} min={10} step={5}
                                  currentState={amount}
                                  onChange={(value) => setAmount(value)}/>
                    {
                        loading && (
                            <>
                                <FilterLoading/>
                                <FilterLoading/>
                                <FilterLoading/>
                                <FilterLoading/>
                                <FilterLoading/>
                            </>
                        )
                    }

                    <div style={{display: loading ? "none" : "block"}}>
                        <Divider light style={{marginBottom: ".4rem"}}/>

                        <FilterCategory assignedFilters={filters}
                                        addFilter={addFilter}
                                        removeFilter={removeFilter}
                                        filters={filterOptions["popular games"]}
                                        title={"Popular games"}/>
                        <Divider light style={{margin: ".4rem auto"}}/>

                        <FilterCategory assignedFilters={filters}
                                        addFilter={addFilter}
                                        removeFilter={removeFilter}
                                        filters={filterOptions["NSFW categories"]}
                                        title={"NSFW categories"}/>
                        <Divider light style={{margin: ".4rem auto"}}/>

                        <FilterCategory assignedFilters={filters}
                                        addFilter={addFilter}
                                        removeFilter={removeFilter}
                                        filters={filterOptions["nsfw"]}
                                        title={"nsfw"}/>
                        <Divider light style={{margin: ".4rem auto"}}/>

                        <FilterCategory assignedFilters={filters}
                                        addFilter={addFilter}
                                        removeFilter={removeFilter}
                                        filters={filterOptions["Popular anime"]}
                                        title={"Popular anime"}/>
                        <Divider light style={{margin: ".4rem auto"}}/>

                        <FilterCategory assignedFilters={filters}
                                        addFilter={addFilter}
                                        removeFilter={removeFilter}
                                        filters={filterOptions["nsfw part 2"]}
                                        title={"nsfw part 2"}/>


                    </div>

                </div>
                <div className={styles.filter__filler}></div>
            </Drawer>

        </>

    );
};

export default observer(FilterImages);