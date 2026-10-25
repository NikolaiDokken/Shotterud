import christmasDecor from "../static/christmas_decor.png";
import halloweenDecor from "../static/halloweendecor.png";
import halloweenIndicator from "../static/halloween.svg";
import bingBong from "../static/Bingbang.mp3";
import hoho from "../static/Hoho.mp3";
import sanDiegoDecor from "../static/SanDiegoDecor.png";
import sanDiegoIndicator from "../static/SanDiegoIndicator.svg";

/**
 * colors.background / colors.ink: the page and its text
 * colors.tile: the name boxes on the spinner (their text color is picked for contrast)
 * colors.accent: needle, buttons and the result line; must stand out against both background and tiles
 */
export const themes = {
    default: {
        name: "Shotterud",
        title: "SHOTTERUD",
        colors: {
            background: "#1C1330",
            ink: "#F6EFE6",
            tile: "#F2A93B",
            accent: "#FF5C8A",
        },
    },
    christmas: {
        name: "Christmas",
        title: "SHO-HO-HOTTERUD",
        decorImage: christmasDecor,
        audio: hoho,
        colors: {
            background: "#123B2C",
            ink: "#F7EEDC",
            tile: "#B5202E",
            accent: "#E9B949",
        },
    },
    reshjem: {
        name: "Reshjemfestivalen",
        title: "SHOTTERUD",
        colors: {
            background: "#4B2BB0",
            ink: "#FFFFFF",
            tile: "#D1F5FF",
            accent: "#78E3FD",
        },
    },
    halloween: {
        name: "Halloween",
        title: "SHOOooooOOOOoooTTERUD",
        decorImage: halloweenDecor,
        indicatorImage: halloweenIndicator,
        colors: {
            background: "#160D1C",
            ink: "#F3E9DC",
            tile: "#EB6123",
            accent: "#A6E35A",
        },
    },
    san_diego: {
        name: "San Diego",
        title: "SHOTTERUD",
        decorImage: sanDiegoDecor,
        indicatorImage: sanDiegoIndicator,
        audio: bingBong,
        colors: {
            background: "#F4E5D0",
            ink: "#13324A",
            tile: "#2E8BB5",
            accent: "#13324A",
        },
    },
};
