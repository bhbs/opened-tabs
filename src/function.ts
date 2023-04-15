import { postClose, postPing, postPong } from "./message";
import { registerTab, unregisterTab } from "./tab";
import { Message, OpenedTab } from "./types";

export function init(
  broadcastChannel: BroadcastChannel,
  tabs: OpenedTab[],
  id: string,
  openedAt: Date,
  eventTarget: EventTarget
) {
  broadcastChannel.addEventListener("message", (message) => {
    handleMessage(message, broadcastChannel, id, tabs, eventTarget);
  });
  registerTab(tabs, id, openedAt);
  postPing(broadcastChannel, id, openedAt);
  window.addEventListener("unload", () => postClose(broadcastChannel, id));
}

function handleMessage(
  event: MessageEvent<Message>,
  broadcastChannel: BroadcastChannel,
  id: string,
  tabs: OpenedTab[],
  eventTarget: EventTarget
) {
  const { eventName } = event.data;
  switch (eventName) {
    case "ping": {
      const { idFrom, openedAt } = event.data;
      registerTab(tabs, idFrom, openedAt);
      postPong(broadcastChannel, id, idFrom, openedAt);
      break;
    }
    case "pong": {
      const { idFrom, idTo, openedAt } = event.data;
      if (idTo === id) registerTab(tabs, idFrom, openedAt);
      break;
    }
    case "close": {
      const { idFrom } = event.data;
      unregisterTab(tabs, idFrom);
      break;
    }
  }
  eventTarget.dispatchEvent(new Event("change"));
}
