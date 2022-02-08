import { Box, Fab, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ReactDOM from "react-dom";
import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

export default function SpinnerPage({
    names,
    settings,
    prevNames,
    setPrevNames,
}) {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMounted = useRef(false);

    const getCurrentTime = () => {
        const now = new Date();
        return (
            "[" +
            now.getHours() +
            ":" +
            now.getMinutes() +
            ":" +
            now.getSeconds() +
            "]"
        );
    };

    const spinnerGenerator = useCallback(() => {
        if (isMounted.current) {
            console.log(getCurrentTime() + " Generating Spinners...");
            let percentage = Math.random() * 101;
            let doubleSpin = percentage > 80 && settings.amtSpinners >= 2;
            let trippleSpin = percentage > 90 && settings.amtSpinners >= 3;
            let quadroupleSpin = percentage > 95 && settings.amtSpinners >= 4;
            let amt = 1;
            if (quadroupleSpin) amt = 4;
            else if (trippleSpin) amt = 3;
            else if (doubleSpin) amt = 2;
            return (
                <Box>
                    {Array(amt)
                        .fill()
                        .map((spinner, index) => (
                            <Spinner
                                key={index}
                                names={names}
                                spinnerNr={index}
                                prevNames={prevNames}
                                setPrevNames={setPrevNames}
                            />
                        ))}
                </Box>
            );
        }
        // eslint-disable-next-line
    }, [names, settings.amtSpinners, setPrevNames]);

    const randomTime = useCallback(() => {
        console.log(getCurrentTime() + " Picking Random Time...");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, (Math.random() * (settings.minMaxMinutes[1] * 60 - settings.minMaxMinutes[0] * 60) + settings.minMaxMinutes[0] * 60) * 1000);
        });
    }, [settings.minMaxMinutes]);

    const start = useCallback(async () => {
        console.log(getCurrentTime() + " Starting Game...");
        while (isMounted.current) {
            await randomTime().then(() => {
                if (isMounted.current) {
                    if (names.length > 1) {
                        ReactDOM.render(
                            spinnerGenerator(),
                            document.getElementById("spinners")
                        );
                        setTimeout(() => {
                            ReactDOM.render(
                                "",
                                document.getElementById("spinners")
                            );
                        }, 25000);
                    }
                }
            });
        }
    }, [names.length, randomTime, spinnerGenerator]);

    useEffect(() => {
        isMounted.current = true;
        if (names.length > 1) {
            // start();
        }
        return () => {
            isMounted.current = false;
            console.log("Stopping Game...");
        };
        // eslint-disable-next-line
    }, [start]);

    return (
        <Box sx={{ p: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: theme.palette.getContrastText(
                        theme.palette.background.default
                    ),
                    textAlign: "center",
                }}
            >
                {names.length > 1 ? (
                    <Typography variant="h4">
                        {settings.theme === "christmas"
                            ? "SHO-HO-HOTTERUD"
                            : "SHOTTERUD"}
                    </Typography>
                ) : (
                    <Box>
                        <Typography variant="h4">SHOTTERUD</Typography>
                        <Typography variant="h3" sx={{ mt: 10 }}>
                            Add more players to begin
                        </Typography>
                    </Box>
                )}
            </Box>
            <div id="spinners">
                <Spinner
                    index={1}
                    names={names}
                    prevNames={prevNames}
                    setPrevNames={setPrevNames}
                />
            </div>
            <Fab
                color="primary"
                variant="extended"
                aria-label="add"
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                onClick={() => navigate("/settings")}
            >
                <SettingsIcon sx={{ mr: 1 }} />
                Settings
            </Fab>
        </Box>
    );
}
