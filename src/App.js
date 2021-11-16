import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TopBar from "./components/TopBar";
import "./App.css";
import SpinnerPage from "./pages/SpinnerPage";
import Settings from "./pages/Settings";
import { BrowserRouter, Routes, Route } from "react-router-dom";

let theme = createTheme({
    palette: {
        primary: {
            main: "#0052cc",
        },
        secondary: {
            main: "#edf2ff",
        },
    },
    typography: {
        fontFamily: ["Roboto"],
    },
});

function App() {
    const [names, setNames] = useState(["Nikolai", "Ian", "Kasper"]);
    const [prevNames, setPrevNames] = useState(["Nikolai", "Ian", "Kasper"]);
    const [settings, setSettings] = useState({
        amtSpinners: 4,
        minimumMinutes: 0.5,
        maximumMinutes: 1,
    });
    return (
        <ThemeProvider theme={theme}>
            <TopBar
                prevNames={prevNames.reverse()}
                setPrevNames={setPrevNames}
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
                        element={<Settings settings={settings} />}
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
