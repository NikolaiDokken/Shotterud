import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TopBar from "./components/TopBar";
import SpinnerPage from "./pages/SpinnerPage";
import Settings from "./pages/Settings";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { writeToSessionStorage, readFromSessionStorage } from "./utils/utils";
import { themes } from "./utils/themes";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

function App() {
    const [names, setNames] = useState([]);
    const [prevNames, setPrevNames] = useState([]);
    const [settings, setSettings] = useState({
        amtSpinners: 1,
        minMaxMinutes: [15, 30],
        theme: "default",
    });
    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    useEffect(() => {
        // Reads names and settings from sessionStorage
        const readNames = JSON.parse(readFromSessionStorage("names"));
        const readSettings = JSON.parse(readFromSessionStorage("settings"));
        if (readNames) {
            setNames(readNames);
        }

        if (JSON.stringify(readSettings) !== JSON.stringify(settings) && readSettings !== null) {
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
            <Box id="app" sx={{ display: "flex", flexDirection: "column", flex: 1, height: "100vh" }}>
                <ThemeProvider theme={createTheme(themes[settings.theme])}>
                    <CssBaseline />
                    <TopBar
                        prevNames={prevNames}
                        setPrevNames={setPrevNames}
                        settings={settings}
                        setSettings={setSettings}
                    />
                    <BrowserRouter>
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
                    </BrowserRouter>
                </ThemeProvider>
            </Box>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default App;
