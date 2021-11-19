import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TopBar from "./components/TopBar";
import SpinnerPage from "./pages/SpinnerPage";
import Settings from "./pages/Settings";
import { HashRouter, Routes, Route } from "react-router-dom";
import { writeToSessionStorage, readFromSessionStorage } from "./utils/utils";
import themes from "./utils/themes.json";
import CssBaseline from "@mui/material/CssBaseline";
import christmasDecor from "./static/christmas_decor.png";

function App() {
    const [names, setNames] = useState([]);
    const [prevNames, setPrevNames] = useState([]);
    const [settings, setSettings] = useState({
        amtSpinners: 1,
        minMaxMinutes: [15, 30],
        theme: "default",
    });
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    // const [theme, setTheme] = useState(themes.christmas);

    useEffect(() => {
        // Reads names and settings from sessionStorage
        const readNames = JSON.parse(readFromSessionStorage("names"));
        const readSettings = JSON.parse(readFromSessionStorage("settings"));
        if (readNames) {
            setNames(readNames);
        }

        if (
            JSON.stringify(readSettings) !== JSON.stringify(settings) &&
            readSettings !== null
        ) {
            setSettings(readSettings);
        }
        setDataIsLoaded(true);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Stores names in sessionStorage for each change
        if (names) {
            writeToSessionStorage("names", JSON.stringify(names));
        }
    }, [names]);

    useEffect(() => {
        // Stores settings in sessionStorage for each change
        writeToSessionStorage("settings", JSON.stringify(settings));
    }, [settings]);

    if (dataIsLoaded) {
        return (
            <ThemeProvider theme={createTheme(themes[settings.theme])}>
                <CssBaseline />
                <TopBar
                    prevNames={prevNames}
                    setPrevNames={setPrevNames}
                    settings={settings}
                    setSettings={setSettings}
                />
                {settings.theme === "christmas" ? (
                    <img
                        src={christmasDecor}
                        alt="Christmas Decor"
                        style={{ width: "100%" }}
                    ></img>
                ) : null}
                <HashRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <SpinnerPage
                                    names={names}
                                    settings={settings}
                                    prevNames={prevNames}
                                    setPrevNames={setPrevNames}
                                />
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <Settings
                                    settings={settings}
                                    setSettings={setSettings}
                                    names={names}
                                    setNames={setNames}
                                />
                            }
                        />
                    </Routes>
                </HashRouter>
            </ThemeProvider>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default App;
