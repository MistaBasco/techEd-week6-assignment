import Header from "./Header";
import "./LeftBody.css";
import LeftContent from "./LeftContent";

export default function LeftBody({
  currentCookieCount,
  setCurrentCookieCount,
  setTotalCookieCount,
  totalCookieCount,
  upgradesPurchased,
  cookiesSpentOnUpgrades,
  cookiesPS,
}) {
  return (
    <div className="LeftBody">
      <Header />
      <LeftContent
        currentCookieCount={currentCookieCount}
        setCurrentCookieCount={setCurrentCookieCount}
        setTotalCookieCount={setTotalCookieCount}
        totalCookieCount={totalCookieCount}
        upgradesPurchased={upgradesPurchased}
        cookiesSpentOnUpgrades={cookiesSpentOnUpgrades}
        cookiesPS={cookiesPS}
      />
    </div>
  );
}
