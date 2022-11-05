import {IconButton} from "@mui/material";
import Link from "next/link";
import styles from "./Header.module.scss";
import logo from "@/public/assets/logo.png";
import Image from "next/image";
import MenuIcon from '@mui/icons-material/Menu';
import AsideStore from "@/src/stores/aside"
import Tooltip from "@/components/ui/Tooltip/Tooltip";
import {DiscordSvg} from "@/components/ui/DiscordSvg";


export function Header() {
    const inviteLink = "https://discord.gg/EnycHFGhaY";


    return (
        <header className={styles.header}>
            <div className={styles.header__aside}>

                <div>
                    <Tooltip title={"Open menu"}>
                        <IconButton onClick={AsideStore.openAside}>
                            <MenuIcon fontSize={"large"}
                                      style={{color: "var(--discord-btn-color"}}/>
                        </IconButton>
                    </Tooltip>
                </div>

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