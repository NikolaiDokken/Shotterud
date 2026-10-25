import { useEffect, useRef, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";

const SPIN_DELAY_MS = 1000;
const SPIN_TIME = 15;
const NAME_BOX_WIDTH = 200;
const NAME_BOX_HEIGHT = 100;
const NAME_BOX_GAP = 8;
const NAME_BOX_STRIDE = NAME_BOX_WIDTH + NAME_BOX_GAP;
// The row is about this many boxes long whatever the player count, so it always spins at the same speed
const ROW_LENGTH = 1000;

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
 * Function that shuffles array in place using Fisher-Yates Shuffle
 * @param {array} array
 * @returns shuffled array
 */
function shuffle(array) {
    for (let m = array.length - 1; m > 0; m--) {
        const i = Math.floor(Math.random() * (m + 1));
        [array[m], array[i]] = [array[i], array[m]];
    }
    return array;
}

/**
 * Builds the row of names and decides up front where it stops.
 * The winner sits near the end of the row, with enough boxes after it to fill the screen right of the needle.
 */
function createSpin(names) {
    const repeats = Math.ceil(ROW_LENGTH / names.length);
    const nameList = shuffle(Array.from({ length: repeats }, () => names).flat());
    const boxesRightOfNeedle = Math.ceil(window.innerWidth / 2 / NAME_BOX_STRIDE);
    const winnerIndex = nameList.length - 1 - boxesRightOfNeedle - getRandomInt(0, names.length);
    return {
        nameList,
        winnerIndex,
        // Stop away from the box edges so it never looks like the needle is between two names
        needleOffset: getRandomInt(NAME_BOX_WIDTH * 0.1, NAME_BOX_WIDTH * 0.9),
    };
}

export default function Spinner({ names, setPrevNames }) {
    const [spin] = useState(() => createSpin(names));
    // Row offset in px; null until the spin starts, while the row waits off-screen to the right
    const [position, setPosition] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const containerRef = useRef(null);
    const winner = spin.nameList[spin.winnerIndex];

    useEffect(() => {
        let revealTimer;
        const spinTimer = setTimeout(() => {
            const needleX = containerRef.current.clientWidth / 2;
            setPosition(needleX - (spin.winnerIndex * NAME_BOX_STRIDE + spin.needleOffset));

            revealTimer = setTimeout(() => {
                setIsDone(true);
                setPrevNames((prevNames) => [winner, ...prevNames]);
            }, SPIN_TIME * 1000);
        }, SPIN_DELAY_MS);
        return () => {
            clearTimeout(spinTimer);
            clearTimeout(revealTimer);
        };
    }, [spin, winner, setPrevNames]);

    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ position: "relative" }}>
                <Box ref={containerRef} sx={{ overflowX: "hidden", py: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: `${NAME_BOX_GAP}px`,
                            width: "max-content",
                            transform: position === null ? "translateX(100vw)" : `translateX(${position}px)`,
                            transition: `transform ${SPIN_TIME}s cubic-bezier(0,1,0,1)`,
                        }}
                    >
                        {spin.nameList.map((name, index) => (
                            <Paper
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    height: NAME_BOX_HEIGHT,
                                    width: NAME_BOX_WIDTH,
                                    wordBreak: "break-word",
                                    textAlign: "center",
                                    bgcolor: "secondary.main",
                                }}
                            >
                                <Typography sx={{ color: "secondary.contrastText" }}>{name}</Typography>
                            </Paper>
                        ))}
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 4,
                        height: NAME_BOX_HEIGHT + 20,
                        bgcolor: "primary.main",
                        border: 1,
                        borderColor: "background.default",
                    }}
                />
            </Box>
            <Typography variant="h6" sx={{ textAlign: "center", height: 2 }}>
                {isDone && `Bottoms up ${winner}!`}
            </Typography>
        </Box>
    );
}
