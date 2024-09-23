/* eslint-disable react/prop-types */
import "./Upgrade.css";

export default function Upgrade({ upgrade, onClick, currentCookieCount }) {
  return (
    <div
      className={`Upgrade box ${
        currentCookieCount < upgrade.cost ? "disabled" : ""
      }`}
      onClick={onClick}
    >
      <div className="row-wrapper">
        <h2 className="UpgradeLabel">Upgrade: </h2>
        <h3 className="UpgradeValue">{upgrade.name}</h3>
      </div>
      <div className="row-wrapper">
        <h2 className="UpgradeLabel">Cost: </h2>
        <h3 className="UpgradeValue">{upgrade.cost} Cookies</h3>
      </div>
      <div className="row-wrapper">
        <h2 className="UpgradeLabel">Increase: </h2>
        <h3 className="UpgradeValue">{upgrade.increase} Cookies/s</h3>{" "}
      </div>
    </div>
  );
}
