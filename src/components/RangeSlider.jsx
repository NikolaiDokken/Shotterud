import styles from "./RangeSlider.module.css";

/**
 * Two-thumb slider made from two overlapping native range inputs
 * @param {[number, number]} value
 * @param {(value: [number, number]) => void} onChange
 * @param {number} minDistance smallest allowed gap between the thumbs
 */
export default function RangeSlider({ value, onChange, min = 0, max = 100, minDistance = 1, labels }) {
    const [low, high] = value;
    const toPercent = (v) => ((v - min) / (max - min)) * 100;

    return (
        <div
            className={styles.slider}
            style={{ "--low": `${toPercent(low)}%`, "--high": `${toPercent(high)}%` }}
        >
            <div className={styles.track} />
            <input
                type="range"
                min={min}
                max={max}
                value={low}
                aria-label={labels[0]}
                onChange={(e) => onChange([Math.min(Number(e.target.value), high - minDistance), high])}
                // The high thumb sits on top, except near the top end where only the low thumb can still move
                style={{ zIndex: low > (min + max) / 2 ? 2 : 1 }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={high}
                aria-label={labels[1]}
                style={{ zIndex: 1 }}
                onChange={(e) => onChange([low, Math.max(Number(e.target.value), low + minDistance)])}
            />
        </div>
    );
}
