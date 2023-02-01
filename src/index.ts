type Message =
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

  constructor(
    id = window.crypto.randomUUID(),
    openedAt = new Date(),
    broadcastChannel = new BroadcastChannel("OPENED_TABS")
  ) {
    if (!OpenedTabs.id) {
      broadcastChannel.onmessage = this.handleMessage;
      broadcastChannel.postMessage({
        eventName: "ping",
        id,
        openedAt,
      });
      OpenedTabs.id = id;
      OpenedTabs.openedAt = openedAt;
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
      }
      case "pong": {
        const { idFrom, idTo, openedAt } = event.data;
        if (idTo === OpenedTabs.id) {
          OpenedTabs.tabs.push({
            id: idFrom,
            openedAt,
          });
        }
      }
    }
  }
}
