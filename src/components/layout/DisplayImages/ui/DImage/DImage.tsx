import styles from './DImage.module.scss'
import {IImageItem} from "@/src/interfaces";
import {useState} from "react";
import {Backdrop, Fade, Modal} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Image from "next/image";


interface IDImageProps {
    item: IImageItem;
    w: string;
    h: string;
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


const DImage = ({item, w, h}: IDImageProps) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (<>
            <div className={styles.DImage.concat(" ", styles.notModal)} onClick={handleOpen}>
                <Image height={h} width={w} src={item.url} alt={item.author}/>
                <div className={styles.DImage__action}>

                    <div className={styles.DImage__action__category}>

                        {item.category}

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
                    <div className={styles.DImage}>
                        <Image height={h} width={w} src={item.url} alt={item.author}/>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default DImage;