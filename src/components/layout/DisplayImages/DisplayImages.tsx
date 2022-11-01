import {IFetchImagesResponse, IImageItem} from "@/src/interfaces";
import React, {useEffect, useState} from "react";
import DImage from "@/components/layout/DisplayImages/ui/DImage/DImage";
import styles from "./DisplayImages.module.scss";
import useFetchImages from "@/hooks/useFetchImages";
import FilterImages from "@/components/layout/filterImages/FilterImages";
import {CircularProgress} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";
import {Pagination} from "./ui/Pagination/Pagination";


interface IDisplayImagesProps {
    preloadedData: IFetchImagesResponse;
}

export function DisplayImages({}: IDisplayImagesProps) {

    const baseImagesAmount = 30;


    const {data, change, loading, error, setOffset, payload} = useFetchImages({
        _categories: [],
        _amount: baseImagesAmount,
        _offset: 0,
    });


    const [currentItems, setCurrentItems] = useState<Array<IImageItem> | null>(null);
    const [displayLoading, setDisplayLoading] = useState(false);

    useEffect(() => {

        if (loading) {
            setDisplayLoading(true);
        } else if (data === null || currentItems === null) {
            setDisplayLoading(true);
        } else {
            setDisplayLoading(false);
        }

    }, [loading, data, currentItems]);
    useEffect(() => {

        if (data) {
            setCurrentItems(data.imageList);
        }

    }, [data]);


    // @ts-ignore
    return (


        <div className={styles.dImages}>
            {data !== null && (
                <FilterImages filters={data.filterOptions} change={change}
                              loading={loading} error={error}/>

            )}


            <div>

                <AnimatePresence>
                    <motion.div
                        key={`${displayLoading}`}
                        animate="animate"
                        initial="initial"
                        variants={{
                            initial: {
                                opacity: 0,
                                transform: "scale(0.9)"
                            },
                            animate: {
                                opacity: 1,
                                transform: "scale(1)"
                            }
                        }}
                        className={styles.imagesGrid}
                    >
                        {
                            !displayLoading && currentItems?.map((item: IImageItem) => (
                                <DImage key={item.id} item={item} w={300} h={300}/>
                            ))
                        }
                    </motion.div>
                </AnimatePresence>

                {
                    displayLoading && (
                        <div className={styles.loading}>
                            <CircularProgress/>
                        </div>
                    )
                }

            </div>

            {
                data !== null && (
                    <Pagination setOffset={setOffset} offset={payload._offset}
                                maxPage={data?.pageCount}/>
                )
            }


        </div>


    )
}