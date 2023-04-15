// @vitest-environment happy-dom

import { describe, test, expect } from "vitest";
import { registerTab, unregisterTab } from "../src/tab";
import { OpenedTab } from "../src/types";

const id = "test-id";
const openedAt = new Date();

describe("registerTab", () => {
  test("exec", () => {
    const tabs: OpenedTab[] = [];
    registerTab(tabs, id, openedAt);
    expect(tabs.length).toBe(1);
  });
});

describe("unregisterTab", () => {
  test("exec", () => {
    const tabs: OpenedTab[] = [{ id, openedAt }];
    unregisterTab(tabs, id);
    expect(tabs.length).toBe(0);
  });
});
