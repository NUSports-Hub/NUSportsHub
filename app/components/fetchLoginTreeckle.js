var accessToken = null;
const FetchLoginTreeckle = async () => {
    console.log("Logging in to Treeckle");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        email: "",
        name: "",
        password: "",
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    await fetch("https://treeckle.com/api/gateway/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            accessToken = result.tokens.access;
        })
        .catch((error) => console.log("error", error));
};

export { FetchLoginTreeckle, accessToken };
