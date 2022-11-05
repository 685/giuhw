import {Fade, IconButton} from "@mui/material";
import Link from "next/link";
import styles from "./Header.module.scss";
import logo from "@/public/assets/logo.png";
import Image from "next/image";
import MenuIcon from '@mui/icons-material/Menu';
import AsideStore from "@/src/stores/aside"
import Tooltip from "@/components/ui/Tooltip/Tooltip";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {DiscordSvg} from "@/components/ui/DiscordSvg";


export function Header() {
    const inviteLink = "https://discord.gg/EnycHFGhaY";
    const router = useRouter();

    const isMainPage = () => {

        return router.pathname === "/"

    }

    useEffect(() => {

        setOnMainPage(isMainPage())

    }, [router.pathname, isMainPage]);

    const [onMainPage, setOnMainPage] = useState(isMainPage);

    return (
        <header className={styles.header}>
            <div className={styles.header__aside}>
                <Fade in={onMainPage}>
                    <div>
                        <Tooltip title={"Open menu"}>
                            <IconButton onClick={AsideStore.openAside}>
                                <MenuIcon fontSize={"large"}
                                          style={{color: "var(--discord-btn-color"}}/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Fade>
            </div>

            <div className={styles.header__logo}>
                <Link href={"/"} passHref>
                    <a href={"/"}>
                        <Image src={logo} alt={"logo"} priority={true}/>
                    </a>
                </Link>
            </div>

            <div className={styles.buttonWrapper}>

                <Link href={inviteLink} rel={"noreferrer"}>
                    <a href={inviteLink} rel={"noreferrer"}
                       target={"_blank"}>
                        <Tooltip
                            title={"Join our discord server"}>
                            <IconButton className={styles.button}>
                                <DiscordSvg/>
                            </IconButton>
                        </Tooltip>

                    </a>
                </Link>
            </div>

        </header>
    )
}