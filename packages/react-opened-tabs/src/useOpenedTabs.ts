import { useSyncExternalStore } from "use-sync-external-store/shim";
import { OpenedTabs } from "opened-tabs";

let cache: typeof OpenedTabs.list;
function getSnapshot() {
  const stringifiedCache = JSON.stringify(cache);
  const stringifiedList = JSON.stringify(OpenedTabs.list);
  if (stringifiedCache !== stringifiedList) {
    cache = structuredClone(OpenedTabs.list);
  }
  return cache;
}

function subscribe(callback: () => void) {
  OpenedTabs.addEventListener("change", callback);
  return () => {
    OpenedTabs.removeEventListener("change", callback);
  };
}

function useOpenedTabs(): {
  tabs: typeof OpenedTabs.list;
} {
  const tabs = useSyncExternalStore(subscribe, getSnapshot);

  return { tabs };
}

export { useOpenedTabs };
