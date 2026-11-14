// Plays the spinner tick through the Web Audio API.
// An <audio> element is too slow to start and can't overlap itself, which a fast-spinning reel needs.
import tickUrl from "../static/tick.mp3";

// Frequencies above this are cut to take the harsh, high edge off the click. Lower is duller and softer.
const TICK_LOWPASS_HZ = 2500;
// Below 1 plays the click slightly slower and deeper, which makes it sound less sharp
const TICK_PLAYBACK_RATE = 0.85;

let audioContext = null;
let tickBuffer = null;
let loading = null;

function getAudioContext() {
    if (!audioContext) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;
        audioContext = new AudioContextClass();
    }
    // Browsers start the context suspended until the user has interacted with the page
    if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
    return audioContext;
}

/** Fetches and decodes the tick once; later calls reuse the same request */
function loadTick(ctx) {
    loading ??= fetch(tickUrl)
        .then((response) => response.arrayBuffer())
        .then((data) => ctx.decodeAudioData(data))
        .then((buffer) => {
            tickBuffer = buffer;
        })
        .catch((error) => {
            console.warn("Could not load tick sound:", error.message);
            loading = null;
        });
    return loading;
}

/** Starts loading the tick ahead of time, so the first ticks of a spin aren't lost */
export function preloadTick() {
    const ctx = getAudioContext();
    if (ctx && !tickBuffer) loadTick(ctx);
}

/**
 * Plays one tick. The first call starts loading the sound, so it stays silent until it's ready.
 * @param {number} volume 0..1
 */
export function playTick(volume = 0.5) {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (!tickBuffer) {
        loadTick(ctx);
        return;
    }
    if (ctx.state !== "running") return;

    const source = ctx.createBufferSource();
    source.buffer = tickBuffer;
    source.playbackRate.value = TICK_PLAYBACK_RATE;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = TICK_LOWPASS_HZ;
    const gain = ctx.createGain();
    gain.gain.value = volume;
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
}
