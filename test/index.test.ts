import { describe, test, expect } from "vitest";
import { OpenedTabs } from "../src/index";

const date = new Date(2050, 1, 1);
new OpenedTabs("ID", date);

describe("OpenedTabs", () => {
  test("successfully constructed", () => {
    expect(OpenedTabs.id).toMatchInlineSnapshot('"ID"');
    expect(OpenedTabs.openedAt).toBe(date);
  });
  test("constructed once", () => {
    new OpenedTabs("ANOTHER_ID");
    expect(OpenedTabs.id).toMatchInlineSnapshot('"ID"');
  });
});
