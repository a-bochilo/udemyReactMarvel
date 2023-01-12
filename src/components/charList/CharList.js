import { useState, useEffect } from "react";
import PropType from "prop-types";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./charList.scss";

const CharList = ({ setSelectedChar, selectedChar }) => {
    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [extraLoading, setExtraLoading] = useState(false);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(0);
    const [listOver, setListOver] = useState(false);

    const marvelService = new useMarvelService();

    useEffect(() => {
        getCharList();
    }, []);

    const onCharListLoaded = (extraCharList) => {
        setChars((chars) => [...chars, ...extraCharList]);
        setLoading(false);
        setExtraLoading(false);
        setOffset((offset) => offset + 9);
        setListOver(extraCharList.length < 9 ? true : false);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const getCharList = (offset) => {
        setExtraLoading(true);
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    };

    const showCharList = (chars) => {
        const charList = chars.map(({ id, name, thumbnail }) => (
            <li
                key={id}
                tabIndex={0}
                onClick={() => setSelectedChar(id)}
                onKeyPress={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                        setSelectedChar(id);
                    }
                }}
                className={
                    "char__item" +
                    (selectedChar === id ? " char__item_selected" : "")
                }
            >
                <img
                    src={thumbnail}
                    alt="Character img"
                    style={
                        thumbnail.endsWith("image_not_available.jpg")
                            ? { objectFit: "contain" }
                            : null
                    }
                />
                <div className="char__name">{name}</div>
            </li>
        ));
        return <ul className="char__grid">{charList}</ul>;
    };

    return (
        <div className="char__list">
            {!(loading || error) && showCharList(chars)}
            {loading && <Spinner />}
            {error && <ErrorMessage />}
            <button
                onClick={() => getCharList(offset)}
                disabled={extraLoading}
                className="button button__main button__long"
                style={listOver ? { display: "none" } : null}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.PropType = {
    setSelectedChar: PropType.func.isRequired,
};

export default CharList;