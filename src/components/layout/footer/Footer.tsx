import styles from "./Footer.module.scss";
import CopyrightIcon from '@mui/icons-material/Copyright';

export function Footer() {
    let currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            
            <div className={styles.footer__copyright}>
                <span className={styles.footer__copyright__hw}>HentaiWorld</span><CopyrightIcon fontSize={"small"}/> 2022-{currentYear}
            </div>

        </footer>
    )
}