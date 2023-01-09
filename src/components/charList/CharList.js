import { Component } from "react";
import PropType from "prop-types";

import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./charList.scss";

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        extraLoading: false,
        error: false,
        selectedChar: null,
        offset: 0,
        listOver: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.getCharList();
    }

    onCharListLoading = () => {
        this.setState({ extraLoading: true });
    };

    onCharListLoaded = (extraCharList) => {
        const listOver = extraCharList.length < 9 ? true : false;
        this.setState(({ chars, offset }) => {
            return {
                chars: [...chars, ...extraCharList],
                loading: false,
                extraLoading: false,
                error: false,
                offset: offset + 9,
                listOver: listOver,
            };
        });
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    getCharList = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    };

    showCharList = (chars) => {
        const charList = chars.map(({ id, name, thumbnail }) => (
            <li
                key={id}
                onClick={() => this.props.setSelectedChar(id)}
                className={
                    "char__item" +
                    (this.props.selectedChar === id
                        ? " char__item_selected"
                        : "")
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

    render() {
        const { chars, loading, extraLoading, error, offset, listOver } =
            this.state;
        const charList = !(loading || error) ? this.showCharList(chars) : null;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;

        return (
            <div className="char__list">
                {charList}
                {spinner}
                {errorMessage}
                <button
                    onClick={() => this.getCharList(offset)}
                    disabled={extraLoading}
                    className="button button__main button__long"
                    style={listOver ? { display: "none" } : null}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

CharList.PropType = {
    setSelectedChar: PropType.func.isRequired,
};

export default CharList;
