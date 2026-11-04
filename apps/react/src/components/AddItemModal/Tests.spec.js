import { expect, test } from "@playwright/test";

test("focuses the input and rejects an empty item", async ({ mount }) => {
  const component = await mount("components/AddItemModal/Default");
  const input = component.getByRole("textbox", { name: "Add item to list" });

  await expect(input).toBeFocused();
  await component.getByRole("button", { name: "Add item to list" }).click();

  await expect(component.getByRole("alert")).toHaveText(
    "Item must be at least 1 character long",
  );
  await expect(component.getByRole("option")).toHaveCount(4);
  await expect(input).toBeFocused();
});

test("rejects items longer than 1000 characters", async ({ mount }) => {
  const component = await mount("components/AddItemModal/Default");
  const input = component.getByRole("textbox", { name: "Add item to list" });

  await input.fill("a".repeat(1001));
  await component.getByRole("button", { name: "Add item to list" }).click();

  await expect(component.getByRole("alert")).toHaveText(
    "Item must be no more than 1000 characters long",
  );
  await expect(component.getByRole("option")).toHaveCount(4);
  await expect(input).toBeFocused();

  await input.fill("a".repeat(1000));
  await expect(component.getByRole("alert")).toHaveCount(0);
  await component.getByRole("button", { name: "Add item to list" }).click();

  await expect(component.getByRole("option")).toHaveCount(5);
  await expect(component.getByRole("option").last()).toHaveText("a".repeat(1000));
  await expect(component.getByRole("dialog")).toHaveCount(0);
});

test("trims and adds a valid item before closing", async ({ mount }) => {
  const component = await mount("components/AddItemModal/Default");

  await component
    .getByRole("textbox", { name: "Add item to list" })
    .fill("  New item  ");
  await component.getByRole("button", { name: "Add item to list" }).click();

  await expect(
    component.getByRole("option", { name: "Select New item" }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(component.getByRole("dialog")).toHaveCount(0);
});

test("closes without adding when cancelled", async ({ mount }) => {
  const component = await mount("components/AddItemModal/Default");

  await component.getByRole("button", { name: "Cancel adding item" }).click();

  await expect(component.getByRole("dialog")).toHaveCount(0);
  await expect(component.getByRole("option")).toHaveCount(4);
});

test("closes when Escape is pressed", async ({ mount, page }) => {
  const component = await mount("components/AddItemModal/Default");

  await page.keyboard.press("Escape");

  await expect(component.getByRole("dialog")).toHaveCount(0);
  await expect(component.getByRole("option")).toHaveCount(4);
});
