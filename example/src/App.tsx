import { useOpenedTabs } from "react-opened-tabs";

const App = () => {
  const { tabs } = useOpenedTabs();

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
