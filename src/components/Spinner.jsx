import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

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

function intersectRect(r1x1, r1x2, r2x1, r2x2) {
    return !(r2x1 > r1x2 || r2x2 < r1x1);
}

export default function Spinner({
    names,
    spinnerNr,
    prevNames,
    setPrevNames,
    index,
}) {
    const NAME_BOX_WIDTH = 200;
    const NAME_BOX_HEIGHT = 100;
    const SPIN_TIME = getRandomInt(5, 16);
    const SCREEN_WIDTH = window.innerWidth;
    const ROW_LENGTH =
        names.length * Math.ceil(1000 / names.length) * (NAME_BOX_WIDTH + 8);

    const [spinnerRowMarginLeft, setSpinnerRowMarginLeft] = useState(
        SCREEN_WIDTH + "px"
    );

    const generateNameList = () => {
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
    };

    const getSelectedName = () => {
        const needle = document.getElementById("needle" + index);
        const needleX1 = needle.getBoundingClientRect().left;
        const needleX2 = needle.getBoundingClientRect().right;

        const nameRowNames = Array.from(
            document.getElementById("nameRow" + index).children
        );
        const selectedName = nameRowNames.filter((nameElement) =>
            intersectRect(
                needleX1,
                needleX2,
                nameElement.getBoundingClientRect().left,
                nameElement.getBoundingClientRect().right
            )
        );
        console.log(selectedName);
    };

    useEffect(() => {
        console.log(SPIN_TIME);
        const timer = setTimeout(() => {
            setSpinnerRowMarginLeft(
                "-" +
                    (ROW_LENGTH -
                        SCREEN_WIDTH -
                        getRandomInt(0, NAME_BOX_WIDTH * names.length)) +
                    "px"
            );
            setTimeout(() => {
                getSelectedName();
            }, SPIN_TIME * 1000 + 3000);
        }, 1000);
        return () => clearTimeout(timer);
    }, [ROW_LENGTH, SCREEN_WIDTH]);
    return (
        <Box
            sx={{
                width: 1,
                overflowX: "hidden",
                my: 6,
            }}
        >
            <Box
                id={"nameRow" + index}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    transition:
                        "margin " + SPIN_TIME + "s cubic-bezier(0,1,0,1)",
                    margin: "0 0 0 " + spinnerRowMarginLeft,
                }}
            >
                {generateNameList().map((name, index) => (
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
                    id={"needle" + index}
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
    );
}
