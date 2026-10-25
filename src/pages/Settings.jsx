import { useState } from "react";
import { useNavigate } from "react-router";
import { CancelIcon, DeleteIcon, LocalBarIcon, PersonAddIcon } from "../components/icons";
import RangeSlider from "../components/RangeSlider";
import styles from "./Settings.module.css";

const WAIT_PRESETS = [
    [5, 10],
    [5, 15],
    [10, 20],
];

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
            <h1 className={`h3 ${styles.heading}`}>Settings</h1>

            <p className={styles.label}>
                Minimum and Maximum Waiting Time (Minutes): {minMinutes}–{maxMinutes}
            </p>
            <RangeSlider
                value={settings.minMaxMinutes}
                onChange={(minMaxMinutes) => setSettings({ ...settings, minMaxMinutes })}
                labels={["Minimum waiting time", "Maximum waiting time"]}
            />
            <div className={styles.presets}>
                {WAIT_PRESETS.map((preset) => (
                    <button
                        key={preset.join("-")}
                        type="button"
                        className="button button-outlined"
                        onClick={() => setSettings({ ...settings, minMaxMinutes: preset })}
                    >
                        {preset.join("-")}
                    </button>
                ))}
            </div>

            <label className={styles.row}>
                <span className={styles.rowLabel}>Maximum number of spinners:</span>
                <span className={`select select-standard ${styles.onBackground}`}>
                    <select
                        value={settings.amtSpinners}
                        onChange={(e) => setSettings({ ...settings, amtSpinners: Number(e.target.value) })}
                    >
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                    </select>
                </span>
            </label>

            <form className={styles.row} onSubmit={handleAddName}>
                <label htmlFor="player-name" className={styles.rowLabel}>
                    Add players:
                </label>
                <span className={`${styles.textField} ${styles.onBackground}`}>
                    <input
                        id="player-name"
                        value={name}
                        placeholder="Name"
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit" className="icon-button" aria-label="Add player">
                        <PersonAddIcon />
                    </button>
                </span>
            </form>

            <div className={names.length > 0 ? styles.players : `${styles.players} ${styles.playersEmpty}`}>
                {names.length > 0 ? (
                    names.map((name) => (
                        <span key={name} className={styles.chip}>
                            {name}
                            <button
                                type="button"
                                className={styles.chipDelete}
                                aria-label={`Remove ${name}`}
                                onClick={() => handleDeleteName(name)}
                            >
                                <CancelIcon size={22} />
                            </button>
                        </span>
                    ))
                ) : (
                    <p className="h4">No Players :(</p>
                )}
            </div>
            <button type="button" className="button button-contained" onClick={() => setNames([])}>
                <DeleteIcon />
                Delete All
            </button>

            <button type="button" className="fab" onClick={() => navigate("/")}>
                <LocalBarIcon />
                Save and go back to game
            </button>
        </main>
    );
}
