import { Box, Fab, ThemeProvider, Typography, useTheme } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ReactDOM from "react-dom";
import { useCallback, useEffect, useRef } from "react";
import { themes } from "../utils/themes";
import LiveIndicator from "../components/LiveIndicator/LiveIndicator";

export default function SpinnerPage({ names, settings, prevNames, setPrevNames }) {
    const navigate = useNavigate();
    const isMounted = useRef(false);
    const theme = useTheme();

    const getCurrentTime = () => {
        const now = new Date();
        return "[" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "]";
    };

    const spinnerGenerator = useCallback(() => {
        if (isMounted.current) {
            console.log(getCurrentTime() + " Generating Spinners...");
            let percentage = Math.random() * 101;
            let doubleSpin = percentage > 80 && settings.amtSpinners >= 2;
            let trippleSpin = percentage > 90 && settings.amtSpinners >= 3;
            let amt = 1;
            if (trippleSpin) amt = 3;
            else if (doubleSpin) amt = 2;
            return (
                <ThemeProvider theme={theme}>
                    <Box>
                        <Typography variant="h4" textAlign={"center"} sx={{ mb: 2 }}>
                            {themes[settings.theme].title}
                        </Typography>
                        {Array(amt)
                            .fill()
                            .map((spinner, index) => (
                                <Spinner key={index} names={names} spinnerNr={index} setPrevNames={setPrevNames} />
                            ))}
                    </Box>
                </ThemeProvider>
            );
        }
        // eslint-disable-next-line
    }, [names, settings.amtSpinners, setPrevNames]);

    const randomTime = useCallback(() => {
        console.log(getCurrentTime() + " Picking Random Time...");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, (Math.random() * (settings.minMaxMinutes[1] * 60 - (settings.minMaxMinutes[0] + 0.42) * 60) + (settings.minMaxMinutes[0] + 0.42) * 60) * 1000);
        });
    }, [settings.minMaxMinutes]);

    const start = useCallback(async () => {
        console.log(getCurrentTime() + " Starting Game...");
        while (isMounted.current) {
            await randomTime().then(() => {
                if (isMounted.current) {
                    if (names.length > 1) {
                        ReactDOM.render(spinnerGenerator(), document.getElementById("spinners"));
                        let audio = themes[settings.theme].audio ? new Audio(themes[settings.theme].audio) : null;
                        if (audio) {
                            audio.play();
                        }
                        setTimeout(() => {
                            ReactDOM.render("", document.getElementById("spinners"));
                        }, 25000);
                    }
                }
            });
        }
    }, [names.length, randomTime, spinnerGenerator, settings.theme]);

    useEffect(() => {
        isMounted.current = true;
        if (names.length > 1) {
            start();
        }
        return () => {
            isMounted.current = false;
            console.log("Stopping Game...");
        };
        // eslint-disable-next-line
    }, [start]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}
        >
            <img src={themes[settings.theme].decorImage} alt="" style={{ width: "100%", maxHeight: "230px" }}></img>
            <Box
                id="bigBox"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "center",
                }}
            >
                {names.length > 1 ? (
                    <div style={themes[settings.theme].decorImage ? { marginTop: "-230px" } : {}} id="spinners"></div>
                ) : (
                    <Typography
                        variant="h3"
                        textAlign={"center"}
                        sx={themes[settings.theme].decorImage ? { marginTop: "-230px" } : {}}
                    >
                        Add more players to begin
                    </Typography>
                )}
                {names.length > 1 && (
                    <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
                        <LiveIndicator settings={settings} sx={{ position: "absolute", bottom: 16, left: 16 }} />
                    </Box>
                )}
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
        </Box>
    );
}
