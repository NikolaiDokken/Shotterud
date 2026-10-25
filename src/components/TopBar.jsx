import { ArrowForwardIosIcon, ClearIcon, LocalBarIcon } from "./icons";
import { themes } from "../utils/themes";
import styles from "./TopBar.module.css";

export default function TopBar({ prevNames, setPrevNames, settings, setSettings }) {
    return (
        <header className={styles.topBar}>
            <LocalBarIcon />
            <ArrowForwardIosIcon />
            <ol className={styles.prevNames} aria-label="Previous names">
                {prevNames.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ol>
            {prevNames.length > 0 && (
                <button type="button" className="button button-text" onClick={() => setPrevNames([])}>
                    <ClearIcon />
                    Clear
                </button>
            )}
            <span className="select">
                <select
                    name="theme"
                    aria-label="Theme"
                    value={settings.theme}
                    onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                >
                    {Object.keys(themes).map((themeKey) => (
                        <option key={themeKey} value={themeKey}>
                            {themes[themeKey].name}
                        </option>
                    ))}
                </select>
            </span>
        </header>
    );
}
