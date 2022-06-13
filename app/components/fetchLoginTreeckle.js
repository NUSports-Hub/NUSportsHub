var accessToken = null;
const FetchLoginTreeckle = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        email: "e0726600@u.nus.edu",
        name: "adenteo",
        password: "Iltptt2021a!",
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("https://treeckle.com/api/gateway/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            accessToken = result.tokens.access;
        })
        .catch((error) => console.log("error", error));
};

export { FetchLoginTreeckle, accessToken };
