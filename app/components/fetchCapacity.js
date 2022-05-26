import * as cheerio from "cheerio";
import { Text, StyleSheet, View } from "react-native";
import { FlatList } from "react-native";

var gymCapacityList = [];
const FetchCapacityCall = async () => {
    gymCapacityList = [];
    await fetch(
        "https://reboks.nus.edu.sg/nus_public_web/public/index.php/facilities/capacity",
        {
            headers: {
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                "sec-ch-ua":
                    '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
            },
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
        }
    )
        .then((response) => {
            return response.text();
        })
        .then((responseData) => {
            const $ = cheerio.load(responseData);
            var poolData = $("div[class=swimbox]");
            var gymData = $("div[class=gymbox]");
            gymData.each(function (index, element) {
                const facilityName = $(element).children("span").text();
                const facilityCapacity = $(element).children("b").text();
                const gymCapacity = {
                    name: facilityName,
                    capacity: facilityCapacity,
                };
                gymCapacityList.push(gymCapacity);
            });
            // console.log(gymCapacityList);
        });
};

export { FetchCapacityCall, gymCapacityList };
