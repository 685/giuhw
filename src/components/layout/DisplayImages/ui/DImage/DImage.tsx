import styles from './DImage.module.scss'
import {IImageItem} from "@/src/interfaces";
import {useState} from "react";
import {Fade, Modal} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Image from "next/image";
import {PlayCircle} from "@mui/icons-material";


interface IDImageProps {
    item: IImageItem;
    w: string | number;
    h: string | number;
    className?: string;
}

const useStyles = makeStyles((theme: any) => ({
    gridList: {
        flexWrap: "nowrap",
        transform: "translateZ(0)"
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundcolor: "red"
        }
    },
    img: {
        outline: "none"
    }
}));

const Item = ({item, w, h, className}: IDImageProps) => {

    if (item.isVideo) {
        return <video>
            <source src={item.url} type="video/mp4"/>
        </video>
    }
    return <Image src={item.url} alt={item.author} className={className}
                  layout={"fill"}/>

}

const DImage = ({item, w, h}: IDImageProps) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const handleOpen = () => !item.isVideo ? setOpen(true) : "";
    const handleClose = () => setOpen(false);

    return (<>
            <div className={styles.imageContainer} onClick={handleOpen} data-notmodal={true}>
                <Item h={h} w={w} item={item} className={styles.DImage__image}/>

                {item.isVideo && (
                    <div className={styles.isVideo}>
                    <div className={styles.isVideo__text}>
                        Video
                    </div>
                </div>
                )}
                <div className={styles.imageContainer__info}>

                    <div className={styles.imageContainer__info__category}>

                        {item.category}
                        {item.channel}

                    </div>

                </div>


            </div>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open} timeout={500}>
                    <div className={styles.imageContainer}>
                        <Item h={h} w={w} item={item}/>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default DImage;