import Upgrade from "./Upgrade";
import "./UpgradeList.css";
import { useEffect, useState, useRef } from "react";

export default function UpgradeList({ handleUpgrade }) {
  const [upgrades, setUpgrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const listRef = useRef(null); // Reference to the scrollable UpgradeList
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  useEffect(() => {
    async function GetUpgrades() {
      try {
        const response = await fetch("src/assets/upgrades.json");
        const data = await response.json();
        setUpgrades(data);
      } catch (error) {
        console.error("Failed to fetch upgrades:", error);
      } finally {
        setLoading(false);
      }
    }
    GetUpgrades();
  }, []);

  // Check if we can scroll up or down
  function checkScroll() {
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    setCanScrollUp(scrollTop > 0);
    setCanScrollDown(Math.ceil(scrollTop + clientHeight) < scrollHeight); //needed to round up because scrollTop + clientHeight was .xxx off scrollHeight.
  }

  // Scroll up
  function scrollUp() {
    listRef.current.scrollBy({
      top: -50, // Scroll 50px up
      behavior: "smooth",
    });
  }

  // Scroll down
  function scrollDown() {
    listRef.current.scrollBy({
      top: 50, // Scroll 50px down
      behavior: "smooth",
    });
  }
  //Use Effect which adds/removes scroll up and down buttons respectively based on scroll position in the UpgradeList
  //Scroll down button disappears when fully scrolled down
  //Scroll up button disappears when fully srolled down
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (listRef.current) {
        checkScroll(); // Initial check on mount
        listRef.current.addEventListener("scroll", checkScroll);
      }
    }, 500); //added delay to ensure listref.current is not null ('ensure' if-statement passes).
    const referee = listRef.current; // vs code was complaining about using listRef.current in the return statement and advised that it assign it to a variable before using...
    return () => {
      clearTimeout(timeoutId);
      if (referee) {
        referee.removeEventListener("scroll", checkScroll); // Cleanup
      }
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="UpgradeListContainer">
      {canScrollUp && (
        <button className="scrollButton up" onClick={scrollUp}>
          ↑
        </button>
      )}

      <div className="UpgradeList" ref={listRef}>
        {upgrades.map((upgrade) => (
          <Upgrade
            key={upgrade.id}
            upgrade={upgrade}
            onClick={() => handleUpgrade(upgrade.cost, upgrade.increase)}
          />
        ))}
      </div>

      {canScrollDown && (
        <button className="scrollButton down" onClick={scrollDown}>
          ↓
        </button>
      )}
    </div>
  );
}
