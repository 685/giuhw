import React, {useEffect, useState} from 'react';
import {IUseFetchImagesInitialStateProps} from "@/hooks/useFetchImages";
import {
    IFilterOption,
    IFilterOptions,
    TFilterIdDataType
} from "@/src/interfaces";
import {
    Button,
    Checkbox,
    Drawer,
    FormControlLabel,
    FormGroup
} from '@mui/material';
import {Check} from "@mui/icons-material";
import styles from "./FilterImages.module.scss";
import {observer} from "mobx-react-lite";
import AsideStore from "@/src/stores/aside";

interface IFilterImagesProps {
    change: ({
                 _amount,
                 _offset,
                 _categories
             }: IUseFetchImagesInitialStateProps) => void;
    filters: IFilterOptions;
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

    return (
        <div className={styles.category}>
            <div className={styles.category__title}>
                <span>
                    {title}
                </span>
            </div>

            <FormGroup className={styles.category__group}>
                {filters.map((_, index) => {
                        return (<FormControlLabel key={index}
                                                  control={<Checkbox
                                                      onChange={toggleFilter(_.id)}/>}
                                                  label={_.name}/>)
                    }
                )}

            </FormGroup>


        </div>
    )

}

const FilterImages = (
    {change, filters: filterOptions}: IFilterImagesProps
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
            >
                <div className={styles.filter}>

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

                    {isChanged &&
                        <Button onClick={onChange} size={"large"}
                                aria-label="delete"
                                color={"info"} style={{
                            backgroundColor: "limegreen", position: "fixed",
                            bottom: 0,
                            left: 0,
                        }} className={styles.button} disabled={!isChanged}>
                            <Check/>
                        </Button>}


                </div>

            </Drawer>
        </>

    );
};

export default observer(FilterImages);