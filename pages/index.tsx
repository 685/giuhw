import {
    DisplayImages
} from '@/src/components/layout/DisplayImages/DisplayImages';
import type {NextPage} from 'next'
import useLocalStorage from "@/hooks/useLocalStorage";
import {Alert, Snackbar} from "@mui/material";


const Images: NextPage = () => {
    const {value: userAdult, setValue: setUserAdult} = useLocalStorage(
        {
            key: "_iud",
            initialValue: false
        }
    )


    return (
        <>
            <DisplayImages userAdult={userAdult as boolean}/>
            <Snackbar open={!userAdult} autoHideDuration={null}
                      onClose={() => setUserAdult(true)}>
                <Alert onClose={() => {
                    setUserAdult(true)
                }} severity="info"
                       sx={{width: '100%'}}>
                    This website contains adult content. By clicking <b>X</b> you confirm that you are 18 years of age or older.
                </Alert>
            </Snackbar>
        </>
    )

}

export default Images;