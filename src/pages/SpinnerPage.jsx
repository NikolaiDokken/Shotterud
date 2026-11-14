import { PersonAddIcon, SettingsIcon } from "../components/icons";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { themes } from "../utils/themes";
import { getRoundDuration, getSpinDurations } from "../utils/spinTiming";
import LiveIndicator from "../components/LiveIndicator/LiveIndicator";
import styles from "./SpinnerPage.module.css";

const playerList = new Intl.ListFormat("en", { type: "conjunction" });

const getCurrentTime = () => {
    const now = new Date();
    return "[" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "]";
};

export default function SpinnerPage({ names, settings, setPrevNames }) {
    const navigate = useNavigate();
    const [round, setRound] = useState(null);
    const hasEnoughPlayers = names.length > 1;
    const { amtSpinners, minMaxMinutes, theme, sound } = settings;

    useEffect(() => {
        if (!hasEnoughPlayers) {
            return;
        }
        // The wait starts when the previous round has left the screen
        const minSeconds = minMaxMinutes[0] * 60;
        const maxSeconds = minMaxMinutes[1] * 60;
        let waitTimer;
        let hideTimer;

        const scheduleRound = () => {
            console.log(getCurrentTime() + " Picking Random Time...");
            const delay = (Math.random() * (maxSeconds - minSeconds) + minSeconds) * 1000;
            waitTimer = setTimeout(() => {
                console.log(getCurrentTime() + " Generating Spinners...");
                const percentage = Math.random() * 101;
                let amt = 1;
                if (percentage > 90 && amtSpinners >= 3) amt = 3;
                else if (percentage > 80 && amtSpinners >= 2) amt = 2;
                const spinDurations = getSpinDurations(amt);
                setRound({ id: Date.now(), spinDurations });

                if (sound && themes[theme].audio) {
                    // Browsers block autoplay until the user has interacted with the page
                    new Audio(themes[theme].audio)
                        .play()
                        .catch((error) => console.warn("Could not play round sound:", error.message));
                }
                hideTimer = setTimeout(() => {
                    setRound(null);
                    scheduleRound();
                }, getRoundDuration(spinDurations));
            }, delay);
        };

        console.log(getCurrentTime() + " Starting Game...");
        scheduleRound();
        return () => {
            clearTimeout(waitTimer);
            clearTimeout(hideTimer);
            console.log("Stopping Game...");
        };
    }, [hasEnoughPlayers, amtSpinners, minMaxMinutes, theme, sound]);

    return (
        <main className={styles.page}>
            {themes[theme].decorImage && <img className={styles.decor} src={themes[theme].decorImage} alt="" />}
            <div className={styles.stage}>
                <h1
                    className={round ? `${styles.title} ${styles.titleSmall}` : styles.title}
                    style={{ "--chars": themes[theme].title.length }}
                >
                    {themes[theme].title}
                </h1>
                {round ? (
                    <div key={round.id} className={styles.reels} data-count={round.spinDurations.length}>
                        {round.spinDurations.map((spinSeconds, index) => (
                            <Spinner
                                key={index}
                                names={names}
                                spinSeconds={spinSeconds}
                                roundId={round.id}
                                sound={sound}
                                setPrevNames={setPrevNames}
                            />
                        ))}
                    </div>
                ) : hasEnoughPlayers ? (
                    <p className={styles.players}>{playerList.format(names)} are playing</p>
                ) : (
                    <div className={styles.empty}>
                        <p className={styles.players}>Add at least two players to start the game.</p>
                        <button type="button" className="button button-primary" onClick={() => navigate("/settings")}>
                            <PersonAddIcon />
                            Add players
                        </button>
                    </div>
                )}
            </div>
            <footer className={styles.footer}>
                {hasEnoughPlayers ? <LiveIndicator settings={settings} /> : <span />}
                <button type="button" className="button button-quiet" onClick={() => navigate("/settings")}>
                    <SettingsIcon />
                    Settings
                </button>
            </footer>
        </main>
    );
}
