// @vitest-environment happy-dom

import { describe, test, expect } from "vitest";
import { OpenedTabs } from "../src/index";

describe("OpenedTabs", () => {
  test("successfully loaded", () => {
    expect(OpenedTabs.list.length).toBe(1);
  });
});
