import { OpenedTab } from "./types";

export function registerTab(tabs: OpenedTab[], id: string, openedAt: Date) {
  tabs.push({
    id,
    openedAt,
  });
}

export function unregisterTab(tabs: OpenedTab[], id: string) {
  const target = tabs.findIndex((tab) => tab.id === id);
  if (target !== undefined) tabs.splice(target, 1);
}
