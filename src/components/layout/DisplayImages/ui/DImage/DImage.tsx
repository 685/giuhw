import {IImageItem} from "@/src/interfaces";
import {useCallback, useState} from "react";
import Image from "next/image";
import styles from "./DImage.module.scss";
import {Controlled as ControlledZoom} from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface IDImageProps {
    item: IImageItem;
    w: string | number;
    h: string | number;
    className?: string;
}

// const useStyles = makeStyles((theme: any) => ({
//     gridList: {
//         flexWrap: "nowrap",
//         transform: "translateZ(0)"
//     },
//     modal: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         "&:hover": {
//             backgroundcolor: "red"
//         }
//     },
//     img: {
//         outline: "none"
//     }
// }));
//
// const Item = ({item, w, h, className}: IDImageProps) => {
//
//     if (item.isVideo) {
//         return <video>
//             <source src={item.url} type="video/mp4"/>
//         </video>
//     }
//     return <Image src={item.url} alt={item.author} className={className}
//                   layout={"fill"}/>
//
// }

const DImage = ({item, w, h}: IDImageProps) => {
    // const classes = useStyles()
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => !item.isVideo ? setOpen(true) : "";
    // const handleClose = () => setOpen(false);

    const [isZoomed, setIsZoomed] = useState(false)

    const handleZoomChange = useCallback((shouldZoom: boolean | ((prevState: boolean) => boolean)) => {
        setIsZoomed(shouldZoom)
    }, [])


    return (<>
            <div className={styles.imageContainer} data-zoomed={isZoomed}>
                <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
                    {
                        !item.isVideo
                            ?
                            <Image src={item.url} layout={"responsive"}
                                   height={"500px"} width={500}
                                   alt={`Image ${w} ${h}`}/>
                            :
                            <video src={item.url} controls={true}></video>
                    }
                </ControlledZoom>

                <div className={styles.imageContainer__info}>

                    <div>
                        {item.channel}
                    </div>
                    <div className={styles.imageContainer__info__category}>

                        {item.category}

                    </div>

                </div>
            </div>
            {/*<div className={styles.imageContainer} onClick={handleOpen}*/}
            {/*     data-notmodal={true}>*/}
            {/*    <Item h={h} w={w} item={item} className={styles.DImage__image}/>*/}

            {/*    {item.isVideo && (*/}
            {/*        <div className={styles.isVideo}>*/}
            {/*            <div className={styles.isVideo__text}>*/}
            {/*                Video*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*    <div className={styles.imageContainer__info}>*/}

            {/*        <div className={styles.imageContainer__info__category}>*/}

            {/*            {item.category}*/}
            {/*            {item.channel}*/}

            {/*        </div>*/}

            {/*    </div>*/}


            {/*</div>*/}
            {/*<Modal*/}
            {/*    className={classes.modal}*/}
            {/*    open={open}*/}
            {/*    onClose={handleClose}*/}
            {/*    closeAfterTransition*/}
            {/*>*/}
            {/*    <Fade in={open} timeout={500}>*/}
            {/*        <Image*/}
            {/*            alt={item.channel}*/}
            {/*            src={item.url}*/}
            {/*            width={"90vw"}*/}
            {/*            height={"90vh"}*/}
            {/*        />*/}
            {/*    </Fade>*/}
            {/*</Modal>*/}
        </>
    )
}

export default DImage;