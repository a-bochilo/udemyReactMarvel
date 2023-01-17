import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState();
    const { loading, error, getComics, getCharacter, clearError } =
        useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]); // eslint-disable-line

    const updateData = () => {
        clearError();

        switch (dataType) {
            case "comics":
                getComics(id).then(setData);
                break;
            case "character":
                getCharacter(id).then(setData);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <AppBanner />
            {error && <ErrorMessage />}
            {loading && <Spinner />}
            {!(loading || error || !data) && <Component data={data} />}
        </>
    );
};

export default SinglePage;
