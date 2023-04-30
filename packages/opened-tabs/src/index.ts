import { init } from "./function";
import { OpenedTab } from "./types";

class _OpenedTabs extends EventTarget {
  readonly tabs: OpenedTab[] = [];

  get list() {
    return this.tabs;
  }
}

const OpenedTabs = new _OpenedTabs();

const openedAt = new Date();
const id = window.crypto?.randomUUID() || openedAt.toString();
const broadcastChannel = new BroadcastChannel("OPENED_TABS");

init(broadcastChannel, OpenedTabs.tabs, id, openedAt, OpenedTabs);

export { OpenedTabs };
