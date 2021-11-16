import React, { useCallback, useEffect } from "react";
import $ from "jquery";
import "../styles/Spinner.css";

export default function Spinner({ names, spinnerNr, prevNames, setPrevNames }) {
    const spin = useCallback(() => {
        console.log("Spinner");
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
                            let newPrevnames = prevNames.concat(text);
                            setPrevNames(newPrevnames);
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

    return (
        <div className="container">
            <div className="row topbox">
                <div className="col-md-6 col-md-offset-3 rollbox">
                    <div className="line"></div>
                    <table>
                        <tbody>
                            <tr
                                className="loadout"
                                id={"loadout" + spinnerNr}
                            ></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="col-md-12" style={{ textAlign: "center" }}>
                <div className="log" id={"log" + spinnerNr}></div>
            </div>
        </div>
    );
}
