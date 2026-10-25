import { shuffle } from "./utils";

// Spinners appear this long before they start moving
export const SPIN_DELAY_MS = 1000;
const BASE_SPIN_SECONDS = 15;
// With several spinners, each one stops this much after the one before it
const SPIN_STAGGER_SECONDS = 3;
// How long the last result stays on screen before the round ends
const RESULT_VISIBLE_MS = 9000;

/**
 * Spin duration for each spinner in a round, in seconds.
 * The durations are spread out and shuffled, so results come in one at a time from an unpredictable spinner.
 * @param {number} amount number of spinners in the round
 */
export function getSpinDurations(amount) {
    return shuffle(Array.from({ length: amount }, (_, i) => BASE_SPIN_SECONDS + i * SPIN_STAGGER_SECONDS));
}

/** How long a round stays on screen: until the slowest spinner has stopped and its result has been read */
export function getRoundDuration(spinDurations) {
    return SPIN_DELAY_MS + Math.max(...spinDurations) * 1000 + RESULT_VISIBLE_MS;
}
