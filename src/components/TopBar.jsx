import { LocalBarIcon } from "./icons";
import styles from "./TopBar.module.css";

/** Who has been picked so far this session, newest first */
export default function TopBar({ prevNames, setPrevNames }) {
    return (
        <header className={styles.topBar}>
            <LocalBarIcon size={22} />
            {prevNames.length > 0 ? (
                <ol className={styles.prevNames} aria-label="Picked so far, newest first">
                    {prevNames.map((name, index) => (
                        <li key={index}>{name}</li>
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
