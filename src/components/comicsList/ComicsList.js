import { useState, useEffect, useRef } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

import "./comicsList.scss";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [extraLoading, setExtraLoading] = useState(true);
    const [islistOver, setListOver] = useState(false);
    const isFirstRender = useRef(true);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            getComicsList(true);
        }
    }, []); // eslint-disable-line

    const getComicsList = (isInitial) => {
        isInitial ? setExtraLoading(false) : setExtraLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
    };

    const onComicsListLoaded = (extraList) => {
        setComicsList((comicsList) => [...comicsList, ...extraList]);
        setExtraLoading(false);
        setOffset((offset) => offset + 8);
        setListOver(extraList.length < 8 ? true : false);
    };

    const showComicsList = (comicsList) => {
        const comics = comicsList.map((comicsItem) => {
            const { id, title, price, thumbnail, homepage } = comicsItem;
            return (
                <li key={id} className="comics__item">
                    <a href={homepage}>
                        <img
                            src={thumbnail}
                            alt="comics img"
                            className="comics__item-img"
                            style={
                                thumbnail.endsWith("image_not_available.jpg")
                                    ? { objectFit: "contain" }
                                    : null
                            }
                        />
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}$</div>
                    </a>
                </li>
            );
        });
        return <ul className="comics__grid">{comics}</ul>;
    };

    return (
        <div className="comics__list">
            {loading && !error && !extraLoading && <Spinner />}
            {showComicsList(comicsList)}
            <button
                onClick={() => getComicsList(false)}
                disabled={extraLoading}
                className="button button__main button__long"
                style={islistOver ? { display: "none" } : null}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
