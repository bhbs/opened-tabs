// @vitest-environment happy-dom

import { describe, test, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useOpenedTabs } from "../src/index";

describe("OpenedTabs", () => {
  test("successfully defined", () => {
    expect(useOpenedTabs).toBeDefined();
  });
  test("successfully subscribed", () => {
    const { result } = renderHook(useOpenedTabs);
    expect(result.current.tabs.length).toBe(1);
  });
});
