// @vitest-environment happy-dom

import { describe, test, expect, vi } from "vitest";
import { postClose, postPing, postPong } from "../src/message";

const idFrom = "test-id-from";
const idTo = "test-id-to";
const openedAt = new Date();

describe("postPing", () => {
  test("exec", () => {
    const mockPostMessage = vi.fn();
    const broadcastChannel = {
      postMessage: mockPostMessage,
    } as unknown as BroadcastChannel;

    postPing(broadcastChannel, idFrom, openedAt);

    expect(mockPostMessage).toBeCalledWith({
      eventName: "ping",
      idFrom,
      openedAt,
    });
  });
});

describe("postPong", () => {
  test("exec", () => {
    const mockPostMessage = vi.fn();
    const broadcastChannel = {
      postMessage: mockPostMessage,
    } as unknown as BroadcastChannel;

    postPong(broadcastChannel, idFrom, idTo, openedAt);

    expect(mockPostMessage).toBeCalledWith({
      eventName: "pong",
      idFrom,
      idTo,
      openedAt,
    });
  });
});

describe("postClose", () => {
  test("exec", () => {
    const mockPostMessage = vi.fn();
    const broadcastChannel = {
      postMessage: mockPostMessage,
    } as unknown as BroadcastChannel;

    postClose(broadcastChannel, idFrom);

    expect(mockPostMessage).toBeCalledWith({
      eventName: "close",
      idFrom,
    });
  });
});
