export type Message =
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

export type OpendTab = { id: string; openedAt: Date };
