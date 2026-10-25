import { Box, Fab, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { themes } from "../utils/themes";
import LiveIndicator from "../components/LiveIndicator/LiveIndicator";

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
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}
        >
            <img src={themes[theme].decorImage} alt="" style={{ width: "100%", maxHeight: "230px" }}></img>
            <Box
                id="bigBox"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "center",
                }}
            >
                {hasEnoughPlayers ? (
                    <div style={themes[theme].decorImage ? { marginTop: "-230px" } : {}} id="spinners">
                        {round && (
                            <Box key={round.id}>
                                <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
                                    {themes[theme].title}
                                </Typography>
                                {Array.from({ length: round.amtSpinners }, (_, index) => (
                                    <Spinner key={index} names={names} setPrevNames={setPrevNames} />
                                ))}
                            </Box>
                        )}
                    </div>
                ) : (
                    <Typography
                        variant="h3"
                        sx={{ textAlign: "center", ...(themes[theme].decorImage ? { marginTop: "-230px" } : {}) }}
                    >
                        Add more players to begin
                    </Typography>
                )}
                {hasEnoughPlayers && (
                    <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
                        <LiveIndicator settings={settings} />
                    </Box>
                )}
                <Fab
                    color="primary"
                    variant="extended"
                    sx={{ position: "absolute", bottom: 16, right: 16 }}
                    onClick={() => navigate("/settings")}
                >
                    <SettingsIcon sx={{ mr: 1 }} />
                    Settings
                </Fab>
            </Box>
        </Box>
    );
}
