import { NextPage } from "next";
import { useEffect, useState } from "react";



const IndexPage: NextPage = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    // マウント時(レンダリング時)に画像を読み込む
    useEffect(()=> {
        fetchImage().then((newImage) => {
            setImageUrl(newImage.url);
            setLoading(false)
        })
    },[]);

    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();

        setImageUrl(newImage.url);
        setLoading(false);
    }

    return (
        <div>
            <button onClick={handleClick}>他のにゃんこも見る</button>
            <div>{loading || <img src={imageUrl} />}</div>
        </div>
    );
};
export default IndexPage;

type Image = {
    url: string;
}

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    console.log("res  ",res);
    
    const images = await res.json();
    console.log("images  ",images[0]);
    return images[0];
};

