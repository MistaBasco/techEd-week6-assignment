import AlienCookie from "./AlienCookie";
import HowToPlay from "./HowToPlay";
import "./LeftContent.css";
import Stats from "./Stats";

export default function LeftContent() {
  return (
    <>
      <div className="LeftContent">
        <div className="LeftPage">
          <HowToPlay />
          <AlienCookie />
        </div>
        <Stats />
      </div>
    </>
  );
}
