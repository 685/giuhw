import {Button} from "@mui/material"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon
    from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon
    from '@mui/icons-material/KeyboardDoubleArrowRight';

interface PaginationProps {
    currentPage: number;
    setPage: (page: number) => void;


    maxPage: number;
}

export const Pagination = ({
                               currentPage,
                               setPage,
                               maxPage
                           }: PaginationProps) => {


    function firstPage() {
        setPage(1);

    }

    function lastPage() {
        setPage(maxPage);
    }

    function nextPage() {
        if (currentPage >= maxPage) {
            return;
        }

        setPage(maxPage);
    }

    function prevPage() {
        if (currentPage <= 1) {
            return;
        }

        setPage(1);

    }


    return (
        <div>

            <Button onClick={firstPage}><KeyboardDoubleArrowLeftIcon/></Button>
            <Button onClick={prevPage}><KeyboardArrowLeftIcon/></Button>
            <span>{currentPage}/{maxPage}</span>
            <Button onClick={nextPage}><KeyboardArrowRightIcon/></Button>
            <Button onClick={lastPage}><KeyboardDoubleArrowRightIcon/></Button>

        </div>
    )
}