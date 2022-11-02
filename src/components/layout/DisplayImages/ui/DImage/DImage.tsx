import {IImageItem} from "@/src/interfaces";
import {useCallback, useState} from "react";
import Image from "next/image";
import styles from "./DImage.module.scss";
import {Controlled as ControlledZoom} from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import clsx from "clsx";
import useLocalStorage from "@/hooks/useLocalStorage";

interface IDImageProps {
    item: IImageItem;
userAdult: boolean
}


const DImage = ({item, userAdult}: IDImageProps) => {

    const [isZoomed, setIsZoomed] = useState(false)


    const handleZoomChange = useCallback((shouldZoom: boolean | ((prevState: boolean) => boolean)) => {
        setIsZoomed(userAdult ? shouldZoom : false)
    }, [userAdult])


    return (<>
            <div className={clsx(styles.imageContainer, !userAdult && styles.imageContainer__notAnAdult)} data-zoomed={isZoomed}>
                <ControlledZoom isZoomed={isZoomed}
                                onZoomChange={handleZoomChange}
                                classDialog={styles.dialog}
                                IconUnzoom={HighlightOffIcon}>
                    {
                        !item.isVideo
                        &&
                        <Image src={item.url} layout={"responsive"}
                               height={"500px"} width={500}
                               alt={`Image ${item}`}
                               priority={true}

                        />

                    }
                </ControlledZoom>

                {
                    item.isVideo && (
                        <>
                            <video src={item.url} controls={userAdult}></video>
                        </>
                    )
                }

                <div className={clsx(styles.imageContainer__info, item.isVideo && styles.imageContainer__info__video)}>

                    <div>
                        {item.channel}
                    </div>
                    <div className={styles.imageContainer__info__category}>

                        {item.category}

                    </div>

                </div>
            </div>
        </>
    )
}

export default DImage;