import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    const messageStyle = {
        fontWeight: "bold",
        fontSize: "28px",
        lineHeight: "37px",
        color: "$main-color",
        textAlign: "center",
        marginTop: "30px",
    };

    return (
        <div>
            <Helmet>
                <meta name="description" content="Error page" />
                <title>Error page</title>
            </Helmet>
            <ErrorMessage />
            <p style={messageStyle}> This page doesn't exist </p>
            <Link to="/" className="button button__main button__long">
                <div className="inner">Back to main page</div>
            </Link>
        </div>
    );
};

export default Page404;
