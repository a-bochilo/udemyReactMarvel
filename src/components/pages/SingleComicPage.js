import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./singleComicPage.scss";

const SingleComicPage = () => {
    const [comics, setComics] = useState();
    const { comicId } = useParams();

    const { loading, error, getComics, clearError } = useMarvelService();

    useEffect(() => updateComics(), [comicId]); // eslint-disable-line

    const updateComics = () => {
        if (!comicId) {
            return;
        }
        clearError();
        getComics(comicId).then(setComics);
    };

    const showComicsInfo = () => {
        const { title, price, thumbnail, description, pageCount, language } =
            comics;
        return (
            <>
                <img
                    src={thumbnail}
                    alt="comics img"
                    className="single-comic__img"
                />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount} pages</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}$</div>
                </div>
            </>
        );
    };

    return (
        <div className="single-comic">
            {loading && <Spinner />}
            {error && <ErrorMessage />}
            {!(loading || error) && comics && showComicsInfo()}
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
