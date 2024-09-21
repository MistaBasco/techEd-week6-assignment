import { useState, useEffect } from "react";
import "./App.css";
import LeftBody from "./components/LeftBody";
import UpgradeList from "./components/UpgradeList";
import NotifyUser from "./components/NotifyUser";

export default function App() {
  const [currentCookieCount, setCurrentCookieCount] = useState(() => {
    return parseInt(localStorage.getItem("currentCookieCount")) || 100;
  });
  const [totalCookieCount, setTotalCookieCount] = useState(() => {
    return parseInt(localStorage.getItem("totalCookieCount")) || 0;
  });
  const [cookiesPS, setCookiesPS] = useState(() => {
    return parseInt(localStorage.getItem("cookiesPS")) || 0;
  });
  const [upgradesPurchased, setUpgradesPurchased] = useState(() => {
    return parseInt(localStorage.getItem("upgradesPurchased")) || 0;
  });
  const [cookiesSpentOnUpgrades, setCookiesSpentOnUpgrades] = useState(() => {
    return parseInt(localStorage.getItem("cookiesSpentOnUpgrades")) || 0;
  });

  // Update localStorage whenever each state changes
  useEffect(() => {
    localStorage.setItem("currentCookieCount", currentCookieCount);
  }, [currentCookieCount]);

  useEffect(() => {
    localStorage.setItem("totalCookieCount", totalCookieCount);
  }, [totalCookieCount]);
  useEffect(() => {
    localStorage.setItem("cookiesPS", cookiesPS);
  }, [cookiesPS]);
  useEffect(() => {
    localStorage.setItem("upgradesPurchased", upgradesPurchased);
  }, [upgradesPurchased]);
  useEffect(() => {
    localStorage.setItem("cookiesSpentOnUpgrades", cookiesSpentOnUpgrades);
  }, [cookiesSpentOnUpgrades]);

  // Increment cookies based on cookiesPerSecond
  useEffect(() => {
    let interval;
    if (cookiesPS > 0) {
      interval = setInterval(() => {
        setCurrentCookieCount((prevCount) => prevCount + cookiesPS);
        setTotalCookieCount((prevTotal) => prevTotal + cookiesPS);
      }, 1000); // 1 second interval
    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [cookiesPS]);

  // Function to handle upgrading
  function handleUpgrade(upgradeCost, increaseRate) {
    if (currentCookieCount >= upgradeCost) {
      setCurrentCookieCount((prevCount) => prevCount - upgradeCost);
      setCookiesPS((prevRate) => prevRate + increaseRate);
      setUpgradesPurchased((prevCount) => prevCount + 1);
      setCookiesSpentOnUpgrades((prevTotal) => prevTotal + upgradeCost);
    } else {
      console.log("Not enough cookies!");
      NotifyUser("Not enought cookies!", 3000);
    }
  }

  return (
    <>
      <LeftBody
        currentCookieCount={currentCookieCount}
        setCurrentCookieCount={setCurrentCookieCount}
        setTotalCookieCount={setTotalCookieCount}
        totalCookieCount={totalCookieCount}
        upgradesPurchased={upgradesPurchased}
        cookiesSpentOnUpgrades={cookiesSpentOnUpgrades}
        cookiesPS={cookiesPS}
      />
      <UpgradeList handleUpgrade={handleUpgrade} />
    </>
  );
}
