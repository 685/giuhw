import styles from "./Ad.module.scss";
import React from "react";

interface AdProps {
    children?: React.ReactNode;
    width?: number | string | "auto";
}

export function Ad({children, width}: AdProps) {
    return (
        <div className={styles.ad} style={{width}}>

            <span className={styles.ad__text}>
                {
                    children ? children : "Ad"
                }
            </span>

        </div>
    )
}