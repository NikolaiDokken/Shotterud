import { Box, Fab, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ReactDOM from "react-dom";
import { useCallback, useEffect } from "react";

export default function SpinnerPage({
    names,
    settings,
    prevNames,
    setPrevNames,
}) {
    const navigate = useNavigate();

    const spinnerGenerator = useCallback(() => {
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
        // eslint-disable-next-line
    }, [names, settings.amtSpinners, setPrevNames]);

    const randomTime = useCallback(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, (Math.random() * (settings.maximumMinutes * 60 - settings.minimumMinutes * 60) + settings.minimumMinutes * 60) * 1000);
        });
    }, [settings.maximumMinutes, settings.minimumMinutes]);

    const start = useCallback(async () => {
        console.log("starter");
        while (true) {
            await randomTime().then(() => {
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
            });
        }
    }, [names.length, randomTime, spinnerGenerator]);

    useEffect(() => start(), [start]);

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                {names.length > 2 ? (
                    <Typography variant="h4">SHOHOHOTTERUD</Typography>
                ) : (
                    <Typography variant="h4">
                        Velkommen til <br /> SHOTTERUD
                    </Typography>
                )}
            </Box>
            <div id="spinners"></div>
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

/*
            <div
                id="spinners"
                style={{ height: "100%", width: "100%", position: "absolute" }}
            ></div>
            {names.length < 2 ? (
                <Grid
                    container
                    direction="row"
                    justify="center"
                    style={{ marginTop: "100px" }}
                >
                    <Typography
                        className="infoText"
                        variant="h5"
                        style={{ textTransform: "uppercase" }}
                    >
                        Add more than 1 player
                    </Typography>
                </Grid>
            ) : null}
            <Grid
                container
                justify="center"
                style={{
                    position: "absolute",
                    bottom: "6px",
                    width: "100%",
                }}
            >
                <Button
                    onClick={() => setSettingsOpen(true)}
                    style={{ color: "#ff3d42", fontSize: "24px" }}
                >
                    Settings
                </Button>
            </Grid>
            */
