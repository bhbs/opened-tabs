import { describe, test, expect } from "vitest";
import { OpenedTabs } from "../src/index";

new OpenedTabs("ID", new Date(2050, 1, 1));

describe("OpenedTabs", () => {
  test("successfully constructed", () => {
    expect(OpenedTabs.id).toMatchInlineSnapshot('"ID"');
    expect(OpenedTabs.openedAt).toMatchInlineSnapshot(
      "2050-01-31T15:00:00.000Z"
    );
  });
  test("constructed once", () => {
    new OpenedTabs("ANOTHER_ID");
    expect(OpenedTabs.id).toMatchInlineSnapshot('"ID"');
  });
});
