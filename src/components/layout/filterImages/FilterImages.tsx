import React, {useEffect, useState} from 'react';
import {IUseFetchImagesInitialStateProps} from "@/hooks/useFetchImages";
import {
    IFilterOption,
    IFilterOptions,
    TFilterIdDataType
} from "@/src/interfaces";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Collapse,
    Drawer,
    FormControlLabel,
    FormGroup
} from '@mui/material';
import {Check} from "@mui/icons-material";
import styles from "./FilterImages.module.scss";
import {observer} from "mobx-react-lite";
import AsideStore from "@/src/stores/aside";
import {
    ImagesAmount
} from "@/components/layout/DisplayImages/ui/ImagesAmount/ImagesAmount";
import {motion} from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { clsx } from 'clsx';

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

type IFilterActionFunctionType = (filter: TFilterIdDataType) => () => void;

interface IFilterCategoryProps {
    filters: IFilterOption[];
    title: string;
    assignedFilters: TFilterIdDataType[];
    addFilter: IFilterActionFunctionType;
    removeFilter: IFilterActionFunctionType;
}

export const FilterCategory = ({
                                   title,
                                   filters,
                                   assignedFilters,
                                   addFilter,
                                   removeFilter,
                               }: IFilterCategoryProps) => {

    const toggleFilter = (filter: TFilterIdDataType): () => void => {

        const isAssigned = assignedFilters.includes(filter);
        return isAssigned ? removeFilter(filter) : addFilter(filter)

    }

    const [opened, setOpened] = useState(false);

    return (
        <div className={styles.category}>
            <div className={clsx(styles.category__title, opened && styles.active)}
                 onClick={() => setOpened(v => !v)}
            >
                <span>
                    {title}
                </span>
                <motion.span animate={
                    {
                        rotate: opened ? 180 : 0,

                    }
                }>
                    <KeyboardArrowDownIcon/>
                </motion.span>
            </div>

            <FormGroup className={styles.category__group}>

                <Box sx={{width: "var(--min-menu-item-width)"}}>
                    <Collapse in={opened} timeout="auto" unmountOnExit>
                        {filters.map((_, index) => {
                                return (<FormControlLabel key={index}
                                                          control={<Checkbox
                                                              onChange={toggleFilter(_.id)}
                                                              defaultChecked={assignedFilters.includes(_.id)}/>}
                                                          label={_.name}/>)
                            }
                        )}
                    </Collapse>
                </Box>
                {/*{filters.map((_, index) => {*/}
                {/*        return (<FormControlLabel key={index}*/}
                {/*                                  control={<Checkbox*/}
                {/*                                      onChange={toggleFilter(_.id)}*/}
                {/*                                      defaultChecked={assignedFilters.includes(_.id)}/>}*/}
                {/*                                  label={_.name}/>)*/}
                {/*    }*/}
                {/*)}*/}

            </FormGroup>


        </div>
    )

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
    {change, filters: filterOptions, loading, error}: IFilterImagesProps
) => {
    // Just saves some data, and calls `change` function on submit button click 

    const baseAmount = 30;


    const [previousData, setPreviousData] = useState<IUseFetchImagesInitialStateProps | undefined>(undefined);
    const [isChanged, setIsChanged] = useState<boolean>(false);

    const [amount, setAmount] = useState<number>(baseAmount);
    const [offset, setOffset] = useState<number>(0);
    const [filters, setFilters] = useState<TFilterIdDataType[]>([]);

    const addFilter = (filter: TFilterIdDataType) => {
        return () => setFilters(oldFilters => [...oldFilters, filter])
    }

    const removeFilter = (filter: TFilterIdDataType) => {
        console.log("Removed", [filters])
        return () => setFilters(oldFilters => oldFilters.filter(item => item !== filter))
    }

    useEffect(() => {

        // @ToDo: Sort filters

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
                        <FilterCategory assignedFilters={filters}
                                        addFilter={addFilter}
                                        removeFilter={removeFilter}
                                        filters={filterOptions["popular games"]}
                                        title={"Popular games"}/>
                        <FilterCategory assignedFilters={filters}
                                        addFilter={addFilter}
                                        removeFilter={removeFilter}
                                        filters={filterOptions["NSFW categories"]}
                                        title={"NSFW categories"}/>
                        <FilterCategory assignedFilters={filters}
                                        addFilter={addFilter}
                                        removeFilter={removeFilter}
                                        filters={filterOptions["nsfw"]}
                                        title={"nsfw"}/>
                        <FilterCategory assignedFilters={filters}
                                        addFilter={addFilter}
                                        removeFilter={removeFilter}
                                        filters={filterOptions["Popular anime"]}
                                        title={"Popular anime"}/>
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