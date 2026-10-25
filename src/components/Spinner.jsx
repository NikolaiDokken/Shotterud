import { useEffect, useRef, useState } from "react";
import { shuffle } from "../utils/utils";
import { SPIN_DELAY_MS } from "../utils/spinTiming";
import styles from "./Spinner.module.css";

// Keep these in sync with Spinner.module.css
const NAME_BOX_WIDTH = 220;
const NAME_BOX_GAP = 10;
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

export default function Spinner({ names, spinSeconds, setPrevNames }) {
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
            }, spinSeconds * 1000);
        }, SPIN_DELAY_MS);
        return () => {
            clearTimeout(spinTimer);
            clearTimeout(revealTimer);
        };
    }, [spin, winner, spinSeconds, setPrevNames]);

    return (
        <div className={styles.spinner}>
            <div className={styles.window}>
                <div ref={containerRef} className={styles.viewport}>
                    <div
                        className={styles.row}
                        style={{
                            transform: position === null ? "translateX(100vw)" : `translateX(${position}px)`,
                            transitionDuration: `${spinSeconds}s`,
                        }}
                    >
                        {spin.nameList.map((name, index) => (
                            <div key={index} className={styles.name}>
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.needle} />
            </div>
            <p className={styles.result} aria-live="polite">
                {isDone && <span className={styles.resultText}>Bottoms up, {winner}!</span>}
            </p>
        </div>
    );
}
