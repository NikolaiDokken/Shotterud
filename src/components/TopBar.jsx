import { LocalBarIcon } from "./icons";
import styles from "./TopBar.module.css";

/** Who has been picked so far this session, newest first */
export default function TopBar({ prevNames, setPrevNames }) {
    const latestRoundId = prevNames[0]?.roundId;
    return (
        <header className={styles.topBar}>
            <LocalBarIcon size={22} />
            {prevNames.length > 0 ? (
                <ol className={styles.prevNames} aria-label="Picked so far, newest first">
                    {prevNames.map(({ name, roundId }, index) => (
                        <li key={index} className={roundId === latestRoundId ? styles.latest : undefined}>
                            {name}
                        </li>
                    ))}
                </ol>
            ) : (
                <p className={styles.empty}>Nobody has been picked yet</p>
            )}
            {prevNames.length > 0 && (
                <button type="button" className="button button-quiet" onClick={() => setPrevNames([])}>
                    Clear
                </button>
            )}
        </header>
    );
}
