import { OpenedTabs } from "opened-tabs";
import { useCallback, useEffect, useState } from "react";

new OpenedTabs();

const App = () => {
  const [tabs, setTabs] = useState([...OpenedTabs.tabs]);
  const changeTabs = useCallback(() => {
    setTabs([...OpenedTabs.tabs]);
  }, [setTabs]);

  useEffect(() => {
    OpenedTabs.eventTarget.addEventListener("change", changeTabs);
    return () => {
      OpenedTabs.eventTarget.removeEventListener("change", changeTabs);
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
