import { useState, useEffect } from "react";
import PropType from "prop-types";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./charList.scss";

const CharList = ({ setSelectedChar, selectedChar }) => {
    const [chars, setChars] = useState([]);
    const [extraLoading, setExtraLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [islistOver, setListOver] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        getCharList(offset, true);
    }, []); // eslint-disable-line

    const onCharListLoaded = (extraCharList) => {
        setChars((chars) => [...chars, ...extraCharList]);
        setExtraLoading(false);
        setOffset((offset) => offset + 9);
        setListOver(extraCharList.length < 9 ? true : false);
    };

    const getCharList = (offset, initial) => {
        initial ? setExtraLoading(false) : setExtraLoading(true);
        getAllCharacters(offset).then(onCharListLoaded);
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
            {loading && !extraLoading && <Spinner />}
            {error && <ErrorMessage />}
            {showCharList(chars)}
            <button
                onClick={() => getCharList(offset, false)}
                disabled={extraLoading}
                className="button button__main button__long"
                style={islistOver ? { display: "none" } : null}
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
