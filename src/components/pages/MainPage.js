import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearchForm from "../charSearchForm/CharSearchForm";

import decoration from "../../resources/img/vision.png";

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState();

    return (
        <>
            <Helmet>
                <meta name="description" content="Marvel information portal" />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList
                        setSelectedChar={setSelectedChar}
                        selectedChar={selectedChar}
                    />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo selectedChar={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;
