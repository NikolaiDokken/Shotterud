import christmasDecor from "../static/christmas_decor.png";
import halloweenDecor from "../static/halloweendecor.png";
import halloweenIndicator from "../static/halloween.svg";
import bingBong from "../static/Bingbang.mp3";
import hoho from "../static/Hoho.mp3";
import sanDiegoDecor from "../static/SanDiegoDecor.png";
import sanDiegoIndicator from "../static/SanDiegoIndicator.svg";

export const themes = {
    default: {
        name: "Default",
        title: "SHOTTERUD",
        palette: {
            mode: "dark",
            primary: {
                main: "#65d46e",
            },
            secondary: {
                main: "#1db954",
            },
            background: {
                default: "#191414",
            },
        },
        typography: {
            fontFamily: ["Roboto"],
        },
    },
    christmas: {
        name: "Christmas",
        title: "SHO-HO-HOTTERUD",
        decorImage: christmasDecor,
        palette: {
            primary: {
                main: "#1E792C",
            },
            secondary: {
                main: "#791E6B",
            },
            background: {
                default: "#CF3F45",
            },
        },
        typography: {
            fontFamily: ["Roboto"],
        },
        audio: hoho,
    },
    reshjem: {
        name: "Reshjemfestivalen",
        title: "SHOTTERUD",
        palette: {
            primary: {
                main: "#78E3FD",
            },
            secondary: {
                main: "#D1F5FF",
            },
            background: {
                default: "#7D53DE",
            },
        },
        typography: {
            fontFamily: ["Roboto"],
        },
    },
    halloween: {
        name: "Halloween",
        title: "SHOOooooOOOOoooTTERUD",
        decorImage: halloweenDecor,
        indicatorImage: halloweenIndicator,
        palette: {
            mode: "dark",
            primary: {
                main: "#eb6123",
            },
            secondary: {
                main: "#902EBB",
            },
            background: {
                default: "#121212",
            },
        },
        typography: {
            fontFamily: ["Roboto"],
        },
        components: {
            MuiAppBar: {
                defaultProps: {
                    sx: {
                        backgroundColor: "#eb6123",
                    },
                },
            },
        },
    },
    san_diego: {
        name: "San Diego",
        title: "SHOTTERUD",
        decorImage: sanDiegoDecor,
        indicatorImage: sanDiegoIndicator,
        audio: bingBong,
        palette: {
            primary: {
                main: "#BBDBF7",
            },
            secondary: {
                main: "#92C4EE",
            },
            background: {
                default: "#F6E3D4",
            },
        },
    },
};
