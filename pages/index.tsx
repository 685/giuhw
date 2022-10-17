import { DisplayImages } from '@/src/components/layout/DisplayImages/DisplayImages';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import {useState} from "react";



const Images: NextPage = () => {
    const [imagesCount, setImagesCount] = useState<number>(100);

    return (
        <div>
            <DisplayImages count={imagesCount}/>

        </div>
    )

}

export default Images;