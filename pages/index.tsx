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

    // uselocalstorage hook for cookies
    const {
        value: useLocalAllowed,
        setValue: setUseLocalAllowed
    } = useLocalStorage({
        key: "_uls",
        initialValue: false
    })


    return (
        <>
            <DisplayImages userAdult={userAdult as boolean}
                           setUserAdult={setUserAdult}/>
            <Snackbar open={!useLocalAllowed} autoHideDuration={null}
                      onClose={() => setUseLocalAllowed(true)}>
                <Alert onClose={() => {
                    setUseLocalAllowed(true)
                }} severity="info"
                       sx={{width: '100%'}}>
                    This website may use <b>`cookies/LocalStorage`</b> to provide you with a better
                    user experience. By using this website, you agree to the use of
                    cookies.
                </Alert>
            </Snackbar>
        </>
    )

}

export default Images;