import {IImageItem} from "@/src/interfaces";
import React, {useEffect, useState} from "react";
import DImage from "@/components/layout/DisplayImages/ui/DImage/DImage";
import styles from "./DisplayImages.module.scss";
import useFetchImages from "@/hooks/useFetchImages";
import FilterImages from "@/components/layout/filterImages/FilterImages";
import {Button, CircularProgress} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";
import {Pagination} from "./ui/Pagination/Pagination";


interface IDisplayImagesProps {
    userAdult: boolean;
    setUserAdult: (value: boolean) => void;
}

export function DisplayImages({userAdult, setUserAdult}: IDisplayImagesProps) {

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
        } else if (data === null) {
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
                              loading={loading} error={error} userAdult={userAdult}/>

            )}


            <div>

                <AnimatePresence>
                    <motion.div
                        key={`${displayLoading}${userAdult}`}
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
                            !displayLoading && userAdult && currentItems?.map((item: IImageItem) => (
                                <DImage key={item.id} item={item} userAdult={userAdult}/>
                            ))
                        }

                        {
                            !userAdult && (
                                <div className={styles.adultWarning}>
                                    <h1>Adult content</h1>
                                    <p>This website contains <b>adult</b> content. By clicking <b>`yes`</b>, you represent that you are <b>18 years of age or older</b>.</p>
                                    <Button onClick={() => setUserAdult(true)}>Yes</Button>
                                </div>
                            )
                        }


                        {
                            currentItems?.length === 0 || currentItems == null && (
                                <div className={styles.noImages}>
                                    <h1>No images found</h1>
                                </div>
                            )
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
                data !== null && !displayLoading && !(currentItems?.length === 0 || currentItems == null) && userAdult && (
                    <Pagination setOffset={setOffset} offset={payload._offset}
                                maxPage={data?.pageCount}/>
                )
            }


        </div>


    )
}