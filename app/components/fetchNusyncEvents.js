var eventList = [];
const FetchNusyncEvent = async () => {
    eventList = [];
    const date = new Date();
    const fetchUrl =
        "https://nus.campuslabs.com/engage/api/discovery/event/search?endsAfter=" +
        date.toISOString().split("T")[0] +
        "T12%3A13%3A33%2B08%3A00&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&branchIds%5B0%5D=261136&query=";
    console.log(fetchUrl);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Accept-Language", "en-GB,en-US;q=0.9,en;q=0.8");
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
        "Referer",
        "https://nus.campuslabs.com/engage/events?branches=261136"
    );
    myHeaders.append("Sec-Fetch-Dest", "empty");
    myHeaders.append("Sec-Fetch-Mode", "cors");
    myHeaders.append("Sec-Fetch-Site", "same-origin");
    myHeaders.append(
        "User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
    );
    myHeaders.append("X-Javascript-Version", "undefined");
    myHeaders.append("X-Requested-With", "XMLHttpRequest");
    myHeaders.append(
        "sec-ch-ua",
        '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"'
    );
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", '"Windows"');

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    await fetch(fetchUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const eventData = result.value;
            eventData.forEach((element) => {
                eventList.push(element);
            });
        })
        .catch((error) => console.log("error", error));
};

export { FetchNusyncEvent, eventList };
