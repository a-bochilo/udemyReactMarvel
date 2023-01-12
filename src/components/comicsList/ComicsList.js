import "./comicsList.scss";
import uw from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";

const ComicsList = () => {
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                <li className="comics__item">
                    {/* eslint-disable-next-line */}
                    <a href="#">
                        <img
                            src={uw}
                            alt="comicsimg"
                            className="comics__item-img"
                        />
                        <div className="comics__item-name">
                            ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
                        </div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
