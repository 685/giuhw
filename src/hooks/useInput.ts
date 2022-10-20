import {useState} from "react";

const useInput = (initialValue?: any) => {
    const [value, setValue] = useState<any>(initialValue);

    const onChange = (_event: any, newValue: any) => {
        console.log(newValue);
        setValue(newValue);
    }

    return {value, onChange};
}

export default useInput;