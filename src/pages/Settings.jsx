import { useState } from "react";
import { useNavigate } from "react-router";
import { CancelIcon, PersonAddIcon } from "../components/icons";
import RangeSlider from "../components/RangeSlider";
import { themes } from "../utils/themes";
import { getThemeStyle } from "../utils/themeStyle";
import styles from "./Settings.module.css";

const WAIT_PRESETS = [
    [5, 10],
    [5, 15],
    [10, 20],
];
const SPINNER_COUNTS = [1, 2, 3];

export default function Settings({ settings, setSettings, names, setNames }) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [minMinutes, maxMinutes] = settings.minMaxMinutes;

    const handleAddName = (e) => {
        e.preventDefault();
        const trimmedName = name.trim();
        // Names double as identifiers when deleting, so empty and duplicate names are skipped
        if (trimmedName && !names.includes(trimmedName)) {
            setNames((prevState) => prevState.concat(trimmedName));
        }
        setName("");
    };

    const handleDeleteName = (nameToDelete) => {
        setNames(names.filter((name) => name !== nameToDelete));
    };

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.heading}>Settings</h1>
                <button type="button" className="button button-primary" onClick={() => navigate("/")}>
                    Back to game
                </button>
            </header>

            <section className={styles.section} aria-labelledby="players-heading">
                <h2 id="players-heading" className={styles.sectionHeading}>
                    Players <span className={styles.count}>{names.length}</span>
                </h2>
                <form className={styles.addPlayer} onSubmit={handleAddName}>
                    <input
                        className={styles.input}
                        value={name}
                        placeholder="Name"
                        aria-label="Player name"
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit" className="button button-primary">
                        <PersonAddIcon />
                        Add
                    </button>
                </form>
                {names.length > 0 ? (
                    <>
                        <ul className={styles.players}>
                            {names.map((name) => (
                                <li key={name} className={styles.chip}>
                                    {name}
                                    <button
                                        type="button"
                                        className={styles.chipRemove}
                                        aria-label={`Remove ${name}`}
                                        onClick={() => handleDeleteName(name)}
                                    >
                                        <CancelIcon size={20} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button type="button" className="button button-quiet" onClick={() => setNames([])}>
                            Remove all players
                        </button>
                    </>
                ) : (
                    <p className={styles.hint}>Add at least two players to start the game.</p>
                )}
            </section>

            <section className={styles.section} aria-labelledby="time-heading">
                <h2 id="time-heading" className={styles.sectionHeading}>
                    Time between rounds{" "}
                    <span className={styles.value}>
                        {minMinutes}–{maxMinutes} min
                    </span>
                </h2>
                <p className={styles.hint}>Each round starts at a random time inside this range.</p>
                <RangeSlider
                    value={settings.minMaxMinutes}
                    onChange={(minMaxMinutes) => setSettings({ ...settings, minMaxMinutes })}
                    labels={["Shortest time between rounds", "Longest time between rounds"]}
                />
                <div className={styles.options}>
                    {WAIT_PRESETS.map((preset) => (
                        <button
                            key={preset.join("-")}
                            type="button"
                            className="button button-ghost"
                            aria-pressed={preset[0] === minMinutes && preset[1] === maxMinutes}
                            onClick={() => setSettings({ ...settings, minMaxMinutes: preset })}
                        >
                            {preset.join("–")} min
                        </button>
                    ))}
                </div>
            </section>

            <section className={styles.section} aria-labelledby="spinners-heading">
                <h2 id="spinners-heading" className={styles.sectionHeading}>
                    Spinners per round
                </h2>
                <p className={styles.hint}>Most rounds use one. Now and then a round picks extra people, up to this many.</p>
                <div className={styles.options}>
                    {SPINNER_COUNTS.map((count) => (
                        <button
                            key={count}
                            type="button"
                            className="button button-ghost"
                            aria-pressed={settings.amtSpinners === count}
                            onClick={() => setSettings({ ...settings, amtSpinners: count })}
                        >
                            Up to {count}
                        </button>
                    ))}
                </div>
            </section>

            <section className={styles.section} aria-labelledby="sound-heading">
                <h2 id="sound-heading" className={styles.sectionHeading}>
                    Sound
                </h2>
                <p className={styles.hint}>The theme's sound when a round starts, and the ticking while the spinners turn.</p>
                <div className={styles.options}>
                    {[
                        [true, "On"],
                        [false, "Off"],
                    ].map(([sound, label]) => (
                        <button
                            key={label}
                            type="button"
                            className="button button-ghost"
                            aria-pressed={settings.sound === sound}
                            onClick={() => setSettings({ ...settings, sound })}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </section>

            <section className={styles.section} aria-labelledby="theme-heading">
                <h2 id="theme-heading" className={styles.sectionHeading}>
                    Theme
                </h2>
                <div className={styles.themes}>
                    {Object.entries(themes).map(([themeKey, theme]) => (
                        <button
                            key={themeKey}
                            type="button"
                            className={styles.theme}
                            aria-pressed={settings.theme === themeKey}
                            onClick={() => setSettings({ ...settings, theme: themeKey })}
                        >
                            <span className={styles.themePreview}>
                                <span className={styles.themeSwatch} style={getThemeStyle(theme)}>
                                    <span className={styles.themeTile}>Aa</span>
                                    <span className={styles.themeAccent} />
                                </span>
                            </span>
                            {theme.name}
                        </button>
                    ))}
                </div>
            </section>
        </main>
    );
}
