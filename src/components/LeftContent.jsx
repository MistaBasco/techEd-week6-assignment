import AlienCookie from "./AlienCookie";
import HowToPlay from "./HowToPlay";
import "./LeftContent.css";
import Stats from "./Stats";

export default function LeftContent({
  currentCookieCount,
  setCurrentCookieCount,
  setTotalCookieCount,
  totalCookieCount,
  upgradesPurchased,
  cookiesSpentOnUpgrades,
  cookiesPS,
}) {
  return (
    <>
      <div className="LeftContent">
        <div className="LeftPage">
          <HowToPlay />
          <AlienCookie
            currentCookieCount={currentCookieCount}
            setCurrentCookieCount={setCurrentCookieCount}
            setTotalCookieCount={setTotalCookieCount}
          />
        </div>
        <Stats
          currentCookieCount={currentCookieCount}
          totalCookieCount={totalCookieCount}
          upgradesPurchased={upgradesPurchased}
          cookiesSpentOnUpgrades={cookiesSpentOnUpgrades}
          cookiesPS={cookiesPS}
        />
      </div>
    </>
  );
}
