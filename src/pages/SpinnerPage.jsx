import { SettingsIcon } from "../components/icons";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { themes } from "../utils/themes";
import LiveIndicator from "../components/LiveIndicator/LiveIndicator";
import styles from "./SpinnerPage.module.css";

// How long the spinners stay on screen after a round starts
const ROUND_DURATION_MS = 25000;

const getCurrentTime = () => {
    const now = new Date();
    return "[" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "]";
};

export default function SpinnerPage({ names, settings, setPrevNames }) {
    const navigate = useNavigate();
    const [round, setRound] = useState(null);
    const hasEnoughPlayers = names.length > 1;
    const { amtSpinners, minMaxMinutes, theme } = settings;

    useEffect(() => {
        if (!hasEnoughPlayers) {
            return;
        }
        // The minimum is padded so a new round never starts while the previous one is still showing
        const minSeconds = (minMaxMinutes[0] + 0.42) * 60;
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
                setRound({ id: Date.now(), amtSpinners: amt });

                if (themes[theme].audio) {
                    // Browsers block autoplay until the user has interacted with the page
                    new Audio(themes[theme].audio)
                        .play()
                        .catch((error) => console.warn("Could not play round sound:", error.message));
                }
                hideTimer = setTimeout(() => setRound(null), ROUND_DURATION_MS);
                scheduleRound();
            }, delay);
        };

        console.log(getCurrentTime() + " Starting Game...");
        scheduleRound();
        return () => {
            clearTimeout(waitTimer);
            clearTimeout(hideTimer);
            console.log("Stopping Game...");
        };
    }, [hasEnoughPlayers, amtSpinners, minMaxMinutes, theme]);

    return (
        <div className={styles.page}>
            {themes[theme].decorImage && <img className={styles.decor} src={themes[theme].decorImage} alt="" />}
            <div className={styles.content}>
                {hasEnoughPlayers ? (
                    round && (
                        <div key={round.id}>
                            <h2 className={`h4 ${styles.title}`}>{themes[theme].title}</h2>
                            {Array.from({ length: round.amtSpinners }, (_, index) => (
                                <Spinner key={index} names={names} setPrevNames={setPrevNames} />
                            ))}
                        </div>
                    )
                ) : (
                    <h2 className={`h3 ${styles.title}`}>Add more players to begin</h2>
                )}
            </div>
            {hasEnoughPlayers && (
                <div className={styles.liveIndicator}>
                    <LiveIndicator settings={settings} />
                </div>
            )}
            <button type="button" className="fab" onClick={() => navigate("/settings")}>
                <SettingsIcon />
                Settings
            </button>
        </div>
    );
}
