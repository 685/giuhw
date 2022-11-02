import styles from "./Ad.module.scss";
import React from "react";
import clsx from "clsx";

interface AdProps {
    children?: React.ReactNode;
    width?: number | string | "auto";
}

export function Ad({children, width}: AdProps) {
    return (
        <div className={clsx(styles.ad, "advertisement")} style={{width}}>

            {
                children
                    ?
                    children
                    : <span className={styles.ad__text}>
                    That is an advertisement
            </span>
            }

        </div>
    )
}