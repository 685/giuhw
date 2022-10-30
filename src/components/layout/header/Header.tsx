import {IconButton} from "@mui/material";
import Link from "next/link";
import styles from "./Header.module.scss";
import logo from "@/public/assets/logo.png";
import Image from "next/image";
import MenuIcon from '@mui/icons-material/Menu';
import AsideStore from "@/src/stores/aside"
import {BsDiscord} from "react-icons/all";


export function Header() {
    const inviteLink = "https://discord.gg/EnycHFGhaY";

    return (
        <div className={styles.header}>
            <div className={styles.header__aside}>

                <IconButton onClick={AsideStore.openAside}>
                    <MenuIcon fontSize={"large"}
                              style={{color: "var(--discord-btn-color"}}/>
                </IconButton>

            </div>

            <div className={styles.header__logo}>
                <Link href={"/"}>
                    <a href={"/"}>
                        <Image src={logo} alt={"logo"}/>
                    </a>
                </Link>
            </div>

            <div className={styles.buttonWrapper}>
                <Link href={inviteLink} rel={"noreferrer"}>
                    <a href={inviteLink} rel={"noreferrer"}
                       target={"_blank"}>
                        <IconButton className={styles.button}>

                            <BsDiscord/>
                        </IconButton>
                    </a>
                </Link>

            </div>

        </div>
    )
}