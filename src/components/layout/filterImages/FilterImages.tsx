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
    FormControlLabel,
    FormGroup,
    IconButton
} from '@mui/material';
import {Check} from "@mui/icons-material";
import {inspect} from "util";
import styles from "./FilterImages.module.scss";

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
        <div>
            <div>
                <span>
                    {title}
                </span>
            </div>

            <FormGroup>
                {filters.map((_, index) => {
                        return (<FormControlLabel key={index}
                                                  control={<Checkbox
                                                      onChange={toggleFilter(_.id)}/>}
                                                  label={_.name}
                        style={{marginLeft: 10, marginTop: 2}}/>)
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

        // if one of the values is not equals to the previous one, set `isChanged` to true
        const isChanged = previousData === undefined || (
            previousData._amount !== amount ||
            previousData._offset !== offset ||
            previousData._categories !== filters
        );

        setIsChanged(isChanged);

    }, [amount, offset, filters, previousData]);

    const onChange = () =>
    {
        setPreviousData({_amount: amount, _offset: offset, _categories: filters});
        change({_amount: amount, _categories: filters, _offset: offset})
    }


    return (
        <div>
            <FilterCategory assignedFilters={filters} addFilter={addFilter}
                            removeFilter={removeFilter}
                            filters={filterOptions["popular games"]}
                            title={"Popular games"}/>
            <FilterCategory assignedFilters={filters} addFilter={addFilter}
                            removeFilter={removeFilter}
                            filters={filterOptions["NSFW categories"]}
                            title={"NSFW categories"}/>
            <FilterCategory assignedFilters={filters} addFilter={addFilter}
                            removeFilter={removeFilter}
                            filters={filterOptions["nsfw"]}
                            title={"nsfw"}/>
            <FilterCategory assignedFilters={filters} addFilter={addFilter}
                            removeFilter={removeFilter}
                            filters={filterOptions["Popular anime"]}
                            title={"Popular anime"}/>
            <FilterCategory assignedFilters={filters} addFilter={addFilter}
                            removeFilter={removeFilter}
                            filters={filterOptions["nsfw part 2"]}
                            title={"nsfw part 2"}/>

            <Button onClick={onChange} size={"large"} aria-label="delete" color={"info"} style={{backgroundColor: "limegreen"}} className={styles.button} disabled={!isChanged}>
                <Check/>
            </Button>

        </div>
    );
};

export default FilterImages;