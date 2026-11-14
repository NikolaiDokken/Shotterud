import { FullscreenExitIcon, FullscreenIcon, LocalBarIcon } from "./icons";
import { useFullscreen } from "../utils/useFullscreen";
import styles from "./TopBar.module.css";

/** Who has been picked so far this session, newest first */
export default function TopBar({ prevNames, setPrevNames }) {
    const latestRoundId = prevNames[0]?.roundId;
    const { isFullscreen, toggleFullscreen, isSupported } = useFullscreen();
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
            {isSupported && (
                <button
                    type="button"
                    className="button button-quiet"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
                    title={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
                >
                    {isFullscreen ? <FullscreenExitIcon size={22} /> : <FullscreenIcon size={22} />}
                </button>
            )}
        </header>
    );
}
