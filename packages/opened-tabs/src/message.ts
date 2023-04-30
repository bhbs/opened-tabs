export function postPing(
  broadcastChannel: BroadcastChannel,
  idFrom: string,
  openedAt: Date
) {
  broadcastChannel.postMessage({
    eventName: "ping",
    idFrom,
    openedAt,
  });
}
export function postPong(
  broadcastChannel: BroadcastChannel,
  idFrom: string,
  idTo: string,
  openedAt: Date
) {
  broadcastChannel.postMessage({
    eventName: "pong",
    idFrom,
    idTo,
    openedAt,
  });
}

export function postClose(broadcastChannel: BroadcastChannel, idFrom: string) {
  broadcastChannel.postMessage({
    eventName: "close",
    idFrom,
  });
}
