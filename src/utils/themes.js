import christmasDecor from "../static/christmas_decor.png";
import halloweenDecor from "../static/halloweendecor.png";
import halloweenIndicator from "../static/halloween.svg";
import bingBong from "../static/Bingbang.mp3";
import hoho from "../static/Hoho.mp3";
import sanDiegoDecor from "../static/SanDiegoDecor.png";
import sanDiegoIndicator from "../static/SanDiegoIndicator.svg";

/**
 * colors.mode decides the text color (white on dark, black on light); it defaults to light.
 * colors.appBar is optional and otherwise follows the mode (dark grey, or the primary color).
 */
export const themes = {
    default: {
        name: "Default",
        title: "SHOTTERUD",
        colors: {
            mode: "dark",
            primary: "#65d46e",
            secondary: "#1db954",
            background: "#191414",
        },
    },
    christmas: {
        name: "Christmas",
        title: "SHO-HO-HOTTERUD",
        decorImage: christmasDecor,
        audio: hoho,
        colors: {
            primary: "#1E792C",
            secondary: "#791E6B",
            background: "#CF3F45",
        },
    },
    reshjem: {
        name: "Reshjemfestivalen",
        title: "SHOTTERUD",
        colors: {
            primary: "#78E3FD",
            secondary: "#D1F5FF",
            background: "#7D53DE",
        },
    },
    halloween: {
        name: "Halloween",
        title: "SHOOooooOOOOoooTTERUD",
        decorImage: halloweenDecor,
        indicatorImage: halloweenIndicator,
        colors: {
            mode: "dark",
            primary: "#eb6123",
            secondary: "#902EBB",
            background: "#121212",
            appBar: "#eb6123",
        },
    },
    san_diego: {
        name: "San Diego",
        title: "SHOTTERUD",
        decorImage: sanDiegoDecor,
        indicatorImage: sanDiegoIndicator,
        audio: bingBong,
        colors: {
            primary: "#BBDBF7",
            secondary: "#92C4EE",
            background: "#F6E3D4",
        },
    },
};
