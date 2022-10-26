import {Box, Slider} from "@mui/material";

interface ImagesAmountProps {
    currentState: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    disabled: boolean;
}

export const ImagesAmount = ({
                                 currentState,
                                 onChange,
                                 min,
                                 max,
                                 step,
                                 disabled,

                             }: ImagesAmountProps) => {
    function valueText(value: number) {

        return `${value} pics`;

    }

    return (


        <div>
            <span>Pictures per page - {currentState}</span>
            <Box sx={{minWidth: "var(--min-menu-item-width)"}}>
                <Slider
                    aria-label="Picture Amount"
                    defaultValue={currentState}
                    getAriaValueText={valueText}
                    valueLabelDisplay="auto"
                    step={step}
                    min={min}
                    max={max}
                    disabled={disabled}
                    onChange={(event, value) => {
                        onChange(value as number)
                    }
                    }
                />

            </Box>

        </div>
    )
}