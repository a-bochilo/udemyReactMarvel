import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = ({ selectedChar }) => {
    const [char, setChar] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => updateChar(), [selectedChar]);

    const updateChar = () => {
        if (!selectedChar) {
            return;
        }

        setChar(null);
        setLoading(true);
        setError(false);

        marvelService
            .getCharacter(selectedChar)
            .then(onCharLoaded)
            .catch(onError);
    };

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
        setError(false);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <div className="char__info">
            {!(char || loading || error) && <Skeleton />}
            {error && <ErrorMessage />}
            {loading && <Spinner />}
            {!(loading || error) && char && <View char={char} />}
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    return (
        <>
            <div className="char__basics">
                <img
                    src={thumbnail}
                    alt="Character img"
                    style={
                        thumbnail.endsWith("image_not_available.jpg")
                            ? { objectFit: "contain" }
                            : null
                    }
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length <= 0 &&
                    "Sorry, there is no comics with the character"}
                {comics.map((comics, i) => {
                    if (i > 9) {
                        // eslint-disable-next-line
                        return;
                    }
                    return (
                        <li key={i} className="char__comics-item">
                            {comics.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    selectedChar: PropTypes.number,
};

export default CharInfo;
