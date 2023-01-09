import { Component } from "react";
import PropTypes from "prop-types";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedChar !== prevProps.selectedChar) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const { selectedChar } = this.props;
        if (!selectedChar) {
            return;
        }

        this.setState({
            char: null,
            loading: true,
            error: false,
        });

        this.marvelService
            .getCharacter(selectedChar)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    onCharLoaded = (char) => {
        this.setState({ char, loading: false, error: false });
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    render() {
        const { char, loading, error } = this.state;
        const skeleton = !(char || loading || error) ? <Skeleton /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content =
            !(loading || error) && char ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

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
                {comics.length > 0
                    ? null
                    : "Sorry, there is no comics with the character"}
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
