type Message =
  | {
      eventName: "close";
      idFrom: string;
      idTo: never;
      openedAt: never;
    }
  | {
      eventName: "ping";
      idFrom: string;
      idTo: never;
      openedAt: Date;
    }
  | {
      eventName: "pong";
      idFrom: string;
      idTo: string;
      openedAt: Date;
    };

export class OpenedTabs {
  private static _broadcastChannel: BroadcastChannel;

  static id: string;
  static openedAt: Date;
  static tabs: { id: string; openedAt: Date }[] = [];
  static readonly eventTarget = new EventTarget();

  constructor(
    id = window.crypto.randomUUID(),
    openedAt = new Date(),
    broadcastChannel = new BroadcastChannel("OPENED_TABS")
  ) {
    if (!OpenedTabs.id) {
      window.addEventListener("unload", () => {
        broadcastChannel.postMessage({
          eventName: "close",
          idFrom: id,
        });
      });
      broadcastChannel.onmessage = this.handleMessage;
      broadcastChannel.postMessage({
        eventName: "ping",
        idFrom: id,
        openedAt,
      });
      OpenedTabs.id = id;
      OpenedTabs.openedAt = openedAt;
      OpenedTabs.tabs.push({
        id,
        openedAt,
      });
      OpenedTabs._broadcastChannel = broadcastChannel;
    }
  }

  handleMessage(event: MessageEvent<Message>) {
    const { eventName } = event.data;
    switch (eventName) {
      case "ping": {
        const { idFrom, openedAt } = event.data;
        OpenedTabs.tabs.push({
          id: idFrom,
          openedAt,
        });
        OpenedTabs._broadcastChannel.postMessage({
          eventName: "pong",
          idFrom: OpenedTabs.id,
          idTo: idFrom,
          openedAt: OpenedTabs.openedAt,
        });
        break;
      }
      case "pong": {
        const { idFrom, idTo, openedAt } = event.data;
        if (idTo === OpenedTabs.id) {
          OpenedTabs.tabs.push({
            id: idFrom,
            openedAt,
          });
        }
        break;
      }
      case "close": {
        const { idFrom } = event.data;
        OpenedTabs.tabs = OpenedTabs.tabs.filter((tab) => tab.id !== idFrom);
        break;
      }
    }
    OpenedTabs.eventTarget.dispatchEvent(new Event("change"));
  }
}
