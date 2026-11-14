import { useCallback, useEffect, useState } from "react";

/** True when the key press is going into a text field, so shortcuts should stay out of the way */
function isTyping(target) {
    return target instanceof HTMLElement && (target.isContentEditable || target.matches("input, textarea, select"));
}

/**
 * Tracks whether the page is fullscreen and toggles it when F is pressed.
 * Returns { isFullscreen, toggleFullscreen, isSupported }.
 */
export function useFullscreen() {
    const isSupported = typeof document !== "undefined" && document.fullscreenEnabled;
    const [isFullscreen, setIsFullscreen] = useState(() => Boolean(document.fullscreenElement));

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenEnabled) return;
        const request = document.fullscreenElement
            ? document.exitFullscreen()
            : document.documentElement.requestFullscreen();
        // The browser can refuse, e.g. when the request doesn't come from a user gesture
        request.catch(() => {});
    }, []);

    useEffect(() => {
        // Covers leaving fullscreen with Esc as well as our own toggling
        const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
        const onKeyDown = (event) => {
            if (event.key.toLowerCase() !== "f" || event.repeat) return;
            if (event.ctrlKey || event.metaKey || event.altKey || isTyping(event.target)) return;
            event.preventDefault();
            toggleFullscreen();
        };
        document.addEventListener("fullscreenchange", onChange);
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("fullscreenchange", onChange);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [toggleFullscreen]);

    return { isFullscreen, toggleFullscreen, isSupported };
}
