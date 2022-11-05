import styles from "./Footer.module.scss";
import CopyrightIcon from '@mui/icons-material/Copyright';
import {useRouter} from "next/router";
import {
    ContactsModal
} from "@/components/layout/footer/contacts/ContactsModal/ContactsModal";
import {useState} from "react";

export function Footer() {
    let currentYear = new Date().getFullYear();

    const router = useRouter();

    const [opened, setOpened] = useState(false);
    const handleOpen = () => setOpened(true);
    const handleClose = () => setOpened(false);


    return (
        <>
            <footer className={styles.footer}>

                <div className={styles.footer__box}>
                    <div className={styles.footer__copyright}>
                    <span className={styles.footer__copyright__hw}>
                                HentaiWorld
                    </span>

                        <CopyrightIcon fontSize={"small"}/> 2022-{currentYear}

                    </div>
                    <div className={styles.footer__contact}>
                        <span onClick={handleOpen}>
                            Contact Me
                        </span>
                    </div>
                </div>

            </footer>

            <ContactsModal opened={opened} handleClose={handleClose}/>

        </>
    )
}