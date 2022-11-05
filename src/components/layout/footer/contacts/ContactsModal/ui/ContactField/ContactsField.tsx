import styles from "./ContactsField.module.scss"
// icon
import type {SvgIconComponent} from "@mui/icons-material";
import Link from "next/link";
import clsx from "clsx";
import {ReactNode} from "react";

interface ContactsFieldProps {
    title: string;
    value: string;
    Icon?: SvgIconComponent | any;
    link?: boolean;
    linkTo?: string;
    newTab?: boolean;
}

export const ContactsField = ({
                                  title,
                                  value,
                                  Icon,
                                  link,
                                  linkTo,
                                  newTab
                              }: ContactsFieldProps) => {

    if (link) {
        if (!linkTo) {
            throw new Error("linkTo prop is required when link is true")
        }
    }

    if (newTab) {
        if (!link) {
            throw new Error("link prop is required when newTab is true")
        }
    }

    return (
        <div className={styles.field}>

            <div className={styles.field__head}>

                {
                    Icon && <Icon className={styles.field__head__icon}/>
                }
                <span className={styles.field__head__title}>{title}</span>

            </div>

            <div className={styles.field__info}>
                {
                    link && linkTo ?
                        <Link href={linkTo} rel={"noreferrer"}
                              target={newTab ? "_blank" : "_self"}>
                            <a href={linkTo} rel={"noreferrer"}
                               target={newTab ? "_blank" : "_self"}>
                                    <span
                                        className={clsx(styles.field__info__value, styles.field__info__link)}>{value}</span>
                            </a>
                        </Link>
                        : <span
                            className={styles.field__info__value}>{value}</span>
                }
            </div>


            {/*<div className={styles.icon}>*/}
            {/*    <Icon/>*/}
            {/*</div>*/}
            {/*<div className={styles.info}>*/}
            {/*    <div className={styles.title}>{title}</div>*/}
            {/*    <div className={styles.value}>{value}</div>*/}
            {/*</div>*/}
        </div>
    )
}