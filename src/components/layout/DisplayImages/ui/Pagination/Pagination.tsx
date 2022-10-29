import {Button} from "@mui/material";
import styles from "./Pagination.module.scss";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon
    from '@mui/icons-material/KeyboardDoubleArrowLeft';

import KeyboardDoubleArrowRightIcon
    from '@mui/icons-material/KeyboardDoubleArrowRight';

interface PaginationProps {
    offset: number;
    maxPage: number;
    setOffset: (offset: number) => void;
}

export const Pagination = ({
                               offset,
                               maxPage,
                               setOffset,
                           }: PaginationProps) => {

    function firstPage() {
        setOffset(0);
    }

    function previousPage() {

        if (offset > 0) {
            setOffset(offset - 1);
        }

    }

    function nextPage() {

        if (offset < maxPage - 1) {
            setOffset(offset + 1);
        }

    }

    function lastPage() {
        setOffset(maxPage - 1);
    }

    return (
        <div className={styles.pagination}>

            <Button onClick={firstPage} disabled={offset <= 0} className={styles.button}><KeyboardDoubleArrowLeftIcon/></Button>
            <Button onClick={previousPage} disabled={offset <= 0} className={styles.button}><KeyboardArrowLeftIcon/></Button>
            <span>{offset + 1}/{maxPage <= 0 ? 1 : maxPage}</span>
            <Button onClick={nextPage} disabled={offset >= (maxPage - 1)} className={styles.button}><KeyboardArrowRightIcon/></Button>
            <Button onClick={lastPage} disabled={offset >= (maxPage - 1)} className={styles.button}><KeyboardDoubleArrowRightIcon/></Button>

        </div>
    )
}