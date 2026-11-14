import { useEffect } from "react";

/**
 * Keeps the screen from dimming or sleeping while `active` is true, where the browser supports it.
 * The browser drops the lock whenever the tab is hidden, so it is taken again when the tab comes back.
 */
export function useWakeLock(active) {
    useEffect(() => {
        if (!active || !("wakeLock" in navigator)) return;
        let lock = null;
        let cancelled = false;

        const request = async () => {
            if (document.visibilityState !== "visible" || (lock && !lock.released)) return;
            try {
                const newLock = await navigator.wakeLock.request("screen");
                // The game may have stopped while the request was pending
                if (cancelled) newLock.release().catch(() => {});
                else lock = newLock;
            } catch (error) {
                // E.g. battery saver is on, or the page isn't allowed to keep the screen on
                console.warn("Could not keep the screen awake:", error.message);
            }
        };

        request();
        document.addEventListener("visibilitychange", request);
        return () => {
            cancelled = true;
            document.removeEventListener("visibilitychange", request);
            lock?.release().catch(() => {});
        };
    }, [active]);
}
