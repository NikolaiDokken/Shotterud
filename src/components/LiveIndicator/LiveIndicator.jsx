import { themes } from "../../utils/themes";
import "./LiveIndicator.css";

export default function LiveIndicator({ settings }) {
    const indicatorImage = themes[settings.theme].indicatorImage;
    return (
        <div className="liveIndicator">
            {indicatorImage ? (
                <img className="liveIndicator-image" src={indicatorImage} alt="" />
            ) : (
                <svg className="liveIndicator-progress" viewBox="22 22 44 44" aria-hidden="true">
                    <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
                </svg>
            )}
            <span>Game is live</span>
        </div>
    );
}
