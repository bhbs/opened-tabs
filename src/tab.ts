import { OpendTab } from "./types";

export function registerTab(tabs: OpendTab[], id: string, openedAt: Date) {
  tabs.push({
    id,
    openedAt,
  });
}

export function unregisterTab(tabs: OpendTab[], id: string) {
  const target = tabs.findIndex((tab) => tab.id === id);
  if (target !== undefined) tabs.splice(target, 1);
}
