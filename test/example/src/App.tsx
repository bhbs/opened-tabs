import { OpenedTabs } from "opened-tabs";
import { useEffect, useState } from "react";

const App = () => {
  const [tabs, setTabs] = useState(OpenedTabs.list);

  useEffect(() => {
    OpenedTabs.addEventListener("change", () => {
      setTabs(OpenedTabs.list);
    });
    return () => {
      OpenedTabs.removeEventListener("change", () => {
        setTabs(OpenedTabs.list);
      });
    };
  }, [setTabs]);

  return (
    <ul>
      {tabs.map((tab) => (
        <li key={tab.id}>
          {tab.id}: {tab.openedAt.toISOString()}
        </li>
      ))}
    </ul>
  );
};

export default App;
