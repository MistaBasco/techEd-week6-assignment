import { useState, useEffect } from "react";
import "./App.css";
import LeftBody from "./components/LeftBody";
import UpgradeList from "./components/UpgradeList";
import NotifyUser from "./components/NotifyUser";
import ResetStats from "./components/ResetStats";

export default function App() {
  const defaultValues = {
    initialCookieCount: 100,
    initialCookiesPS: 0,
    initialUpgradesPurchased: 0,
    initialCookiesSpent: 0,
    initialTotalCookieCount: 0,
  };

  const [currentCookieCount, setCurrentCookieCount] = useState(() => {
    return (
      parseInt(localStorage.getItem("currentCookieCount")) ||
      defaultValues.initialCookieCount
    );
  });
  const [totalCookieCount, setTotalCookieCount] = useState(() => {
    return (
      parseInt(localStorage.getItem("totalCookieCount")) ||
      defaultValues.initialTotalCookieCount
    );
  });
  const [cookiesPS, setCookiesPS] = useState(() => {
    return (
      parseInt(localStorage.getItem("cookiesPS")) ||
      defaultValues.initialCookiesPS
    );
  });
  const [upgradesPurchased, setUpgradesPurchased] = useState(() => {
    return (
      parseInt(localStorage.getItem("upgradesPurchased")) ||
      defaultValues.initialUpgradesPurchased
    );
  });
  const [cookiesSpentOnUpgrades, setCookiesSpentOnUpgrades] = useState(() => {
    return (
      parseInt(localStorage.getItem("cookiesSpentOnUpgrades")) ||
      defaultValues.initialCookiesSpent
    );
  });
  const [notifyMessage, setNotifyMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notifyTrigger, setNotifyTrigger] = useState(0);
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
      DisplayNotification("Not enough Cookies!");
      // setTimeout(() => {
      //   setShowNotification(false);
      // }, 3000);

      // I don't understand why, but removing the commented out code breaks my notification??
    }
  }

  // Function to reset all stats
  function resetStats() {
    setCurrentCookieCount(defaultValues.initialCookieCount);
    setCookiesPS(defaultValues.initialCookiesPS);
    setUpgradesPurchased(defaultValues.initialUpgradesPurchased);
    setCookiesSpentOnUpgrades(defaultValues.initialCookiesSpent);
    setTotalCookieCount(defaultValues.initialTotalCookieCount);
    // Show reset notification
    DisplayNotification("Stats have been reset!");
  }

  function DisplayNotification(message) {
    setNotifyMessage(message);
    setShowNotification(true);
    setNotifyTrigger(Date.now());
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
      <UpgradeList
        handleUpgrade={handleUpgrade}
        currentCookieCount={currentCookieCount}
      />
      {showNotification && (
        <NotifyUser
          message={notifyMessage}
          duration={2000}
          triggerKey={notifyTrigger}
        />
      )}
      <ResetStats resetStats={resetStats} />
    </>
  );
}
