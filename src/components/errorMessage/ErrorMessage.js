import img from "./img/error.gif";

const ErrorMessage = () => {
    // return <img src={process.env.PUBLIC_URL + "/error.gif"} alt="error" />; Способ доступа к папке public
    return (
        <img
            src={img}
            alt="error"
            style={{
                display: "block",
                width: "250px",
                height: "250px",
                objectFit: "contain",
                margin: "0 auto",
            }}
        />
    );
};

export default ErrorMessage;
