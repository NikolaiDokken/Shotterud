import { themes } from "../../utils/themes";
import "./LiveIndicator.css";

export default function LiveIndicator({ settings }) {
    const indicatorImage = themes[settings.theme].indicatorImage;
    return (
        <div className="liveIndicator">
            {indicatorImage ? (
                <img className="liveIndicator-image" src={indicatorImage} alt="" />
            ) : (
                <span className="liveIndicator-dot" aria-hidden="true" />
            )}
            <span>Game is live</span>
        </div>
    );
}
