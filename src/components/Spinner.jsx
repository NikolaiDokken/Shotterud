import React, { useCallback, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";

/**
 * Function that return random integer
 * @param {number} min inclusive minimum value of random int
 * @param {number} max exclusive maximum value of random int
 * @returns random integer min <= randInt < max
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Function that shuffles array using Fisher-Yates Shuffle
 * @param {array} array
 * @returns shuffled array
 */
function shuffle(array) {
    var m = array.length,
        t,
        i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

/**
 * Function that checks if two rectangles intersect horizontally
 * @param {number} r1x1 rectangle 1's x-coordinate of left side
 * @param {number} r1x2 rectangle 1's x-coordinate of right side
 * @param {number} r2x1 rectangle 2's x-coordinate of left side
 * @param {number} r2x2 rectangle 2's x-coordinate of right side
 * @returns true if rectangles intersect, false otherwise
 */
function intersectRect(r1x1, r1x2, r2x1, r2x2) {
    return !(r2x1 > r1x2 || r2x2 < r1x1);
}

const SPIN_TIME = getRandomInt(5, 16);

function Spinner({ names, spinnerNr, setPrevNames }) {
    const NAME_BOX_WIDTH = 200;
    const NAME_BOX_HEIGHT = 100;
    const SCREEN_WIDTH = window.innerWidth;
    const ROW_LENGTH =
        names.length * Math.ceil(1000 / names.length) * (NAME_BOX_WIDTH + 8);

    function generateNameList() {
        // Strategy 1: List has lenght of approx 1000 no matter what (1000+ people will rarely play game)
        if (names.length > 0) {
            const multiplier = Math.ceil(1000 / names.length);
            let newList = [];
            for (let i = 0; i < multiplier; i++) {
                newList = newList.concat(names);
            }
            return shuffle(newList);
        }
        return [];
    }
    const nameList = generateNameList();

    const getSelectedName = useCallback(() => {
        const needle = document.getElementById("needle" + spinnerNr);
        const needleX1 = needle.getBoundingClientRect().left;
        const needleX2 = needle.getBoundingClientRect().right;

        const nameRowNames = Array.from(
            document.getElementById("nameRow" + spinnerNr).children
        );
        const selectedName = nameRowNames.filter((nameElement) =>
            intersectRect(
                needleX1,
                needleX2,
                nameElement.getBoundingClientRect().left,
                nameElement.getBoundingClientRect().right
            )
        );
        const nameElement = document.getElementById("selectedName" + spinnerNr);
        if (selectedName[0].innerHTML) {
            nameElement.innerHTML =
                "SKÅL " + selectedName[0].innerHTML.toUpperCase() + "!";

            setPrevNames((prevValues) =>
                [selectedName[0].innerHTML].concat(prevValues)
            );
        }
    }, [spinnerNr, setPrevNames]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const nameRowElement = document.getElementById(
                "nameRow" + spinnerNr
            );
            nameRowElement.style.margin =
                "0 0 0 -" +
                (ROW_LENGTH -
                    SCREEN_WIDTH -
                    getRandomInt(0, NAME_BOX_WIDTH * names.length)) +
                "px";

            setTimeout(() => {
                getSelectedName();
            }, SPIN_TIME * 1000);
        }, 1000);
        return () => clearTimeout(timer);
    }, [ROW_LENGTH, SCREEN_WIDTH, spinnerNr, names.length, getSelectedName]);

    return (
        <Box sx={{ my: 6 }}>
            <Box
                sx={{
                    width: 1,
                    overflowX: "hidden",
                }}
            >
                <Box
                    id={"nameRow" + spinnerNr}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        transition:
                            "margin " + SPIN_TIME + "s cubic-bezier(0,1,0,1)",
                        margin: "0 0 0 " + SCREEN_WIDTH + "px",
                        py: 1,
                    }}
                >
                    {nameList.map((name, index) => (
                        <Paper
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: NAME_BOX_HEIGHT,
                                minWidth: NAME_BOX_WIDTH,
                                maxWidth: NAME_BOX_WIDTH,
                                mr: index === names.length - 1 ? 0 : 1,
                                wordBreak: "break-word",
                                textAlign: "center",
                            }}
                        >
                            {name}
                        </Paper>
                    ))}
                    <Box
                        id={"needle" + spinnerNr}
                        sx={{
                            width: 4,
                            height: NAME_BOX_HEIGHT + 20,
                            backgroundColor: "blue",
                            position: "absolute",
                            left: "50%",
                        }}
                    />
                </Box>
            </Box>
            <Typography
                id={"selectedName" + spinnerNr}
                sx={{
                    mt: 2,
                    height: "16px",
                    textAlign: "center",
                    color: "inherit",
                }}
                variant="h6"
            ></Typography>
        </Box>
    );
}

export default React.memo(Spinner);
