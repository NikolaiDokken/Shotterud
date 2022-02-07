import React, { useCallback, useEffect } from "react";
import { Box, Grid } from "@mui/material";
// import $ from "jquery";
// import "../styles/Spinner.css";

export default function Spinner({ names, spinnerNr, prevNames, setPrevNames }) {
    const NAME_BOX_WIDTH = 200;
    const NAME_BOX_HEIGHT = 100;
    /*
    const spin = useCallback(() => {
        let users = names;
        let shuffled = [];
        let loadout = $("#loadout" + spinnerNr);
        let insert_times = 30;
        let duration_time = 10000;

        $("#roll" + spinnerNr).attr("disabled", true);
        var scrollsize = 0,
            diff = 0;
        $(loadout).html("");
        $("#log" + spinnerNr).html("");
        loadout.css("left", "100%");
        if (users.length < 10) {
            insert_times = 20;
            duration_time = 5000;
        } else {
            insert_times = 10;
            duration_time = 10000;
        }
        for (var times = 0; times < insert_times; times++) {
            shuffled = users;
            shuffle(shuffled);
            for (var i = 0; i < users.length; i++) {
                loadout.append(
                    '<td><div class="roller"><div>' +
                        shuffled[i] +
                        "</div></div></td>"
                );
                scrollsize = scrollsize + 192;
            }
        }

        diff = Math.round(scrollsize / 2);
        diff = randomEx(diff - 300, diff + 300);
        $("#loadout" + spinnerNr).animate(
            {
                left: "-=" + diff,
            },
            duration_time,
            function () {
                $("#roll" + spinnerNr).attr("disabled", false);
                $("#loadout" + spinnerNr)
                    .children("td")
                    .each(function () {
                        var center = window.innerWidth / 2;
                        if (
                            $(this).offset().left < center &&
                            $(this).offset().left + 185 > center
                        ) {
                            var text = $(this).children().text();
                            $("#log" + spinnerNr).append(
                                'Skål <span class="badge">' + text + "!</span>"
                            );
                            setPrevNames((previousState) =>
                                [text].concat(previousState)
                            );
                        }
                    });
            }
        );
        // eslint-disable-next-line
    }, [names, setPrevNames, spinnerNr]);
    
    function randomEx(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    function shuffle(arr) {
        var counter = arr.length,
        temp,
        index;
        while (counter > 0) {
            index = (Math.random() * counter--) | 0;
            temp = arr[counter];
            arr[counter] = arr[index];
            arr[index] = temp;
        }
    }
    useEffect(() => spin(), [spin]);
    */

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: 1,
                overflowX: "hidden",
            }}
        >
            {names.map((name, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: NAME_BOX_HEIGHT,
                        minWidth: NAME_BOX_WIDTH,
                        maxWidth: NAME_BOX_WIDTH,
                        backgroundColor: "red",
                        mr: index === names.length - 1 ? 0 : 1,
                        wordBreak: "break-word",
                        textAlign: "center",
                    }}
                >
                    {name}
                </Box>
            ))}
            <Box
                sx={{
                    width: 4,
                    height: NAME_BOX_HEIGHT + 20,
                    backgroundColor: "blue",
                    position: "absolute",
                    left: "50%",
                }}
            />
        </Box>
    );
}
