import {Button, IconButton} from "@mui/material";
import Link from "next/link";
import styles from "./Header.module.scss";
import logo from "@/public/assets/logo.png";
import Image from "next/image";
import MenuIcon from '@mui/icons-material/Menu';
import AsideStore from "@/src/stores/aside"

export function Header() {
    const inviteLink = "https://discord.gg/EnycHFGhaY";

    return (
        <div className={styles.header}>
            <div className={styles.header__aside}>

                <IconButton onClick={AsideStore.openAside}>
                    <MenuIcon fontSize={"large"} style={{color: "var(--discord-btn-color"}}/>
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
                <Button className={styles.button}>
                    <Link href={inviteLink} rel={"noreferrer"}>
                        <a href={inviteLink} rel={"noreferrer"}
                           target={"_blank"}>
                            Join our Discord
                        </a>
                    </Link>
                </Button>
            </div>

        </div>
    )
}