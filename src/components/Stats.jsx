/* eslint-disable react/prop-types */
import "./Stats.css";

export default function Stats({
  currentCookieCount,
  totalCookieCount,
  upgradesPurchased,
  cookiesSpentOnUpgrades,
  cookiesPS,
}) {
  return (
    <>
      <div className="Stats box">
        <h2>Player Statistics</h2>
        <div className="stat-pad">
          <div className="stat-wrapper">
            <h3>Current Cookies: </h3>
            <h4>{currentCookieCount}</h4>
          </div>
          <div className="stat-wrapper">
            <h3>Cookies per second: </h3>
            <h4>{cookiesPS} C/s</h4>
          </div>
          <div className="stat-wrapper">
            <h3>Total Cookies Baked: </h3>
            <h4>{totalCookieCount}</h4>
          </div>
          <div className="stat-wrapper">
            <h3>Upgrades Purchased: </h3>
            <h4>{upgradesPurchased}</h4>
          </div>
          <div className="stat-wrapper">
            <h3>Cookies spent on Upgrades: </h3>
            <h4>{cookiesSpentOnUpgrades}</h4>
          </div>
        </div>
      </div>
    </>
  );
}
