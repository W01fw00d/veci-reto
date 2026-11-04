import { expect, test } from "@playwright/test";

test("opens and closes the add item modal", async ({ mount }) => {
  const component = await mount("components/OpenModalButton/Default");
  const openButton = component.getByRole("button", {
    name: "Open add item form",
  });

  await expect(component.getByRole("dialog")).toHaveCount(0);
  await openButton.click();

  const dialog = component.getByRole("dialog", { name: "Add item to list" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("textbox", { name: "Add item to list" }),
  ).toBeFocused();

  await component
    .getByRole("button", { name: "Cancel adding item" })
    .click();

  await expect(dialog).toHaveCount(0);
  await expect(openButton).toBeFocused();
});

test("closes the add item modal with Escape", async ({ mount, page }) => {
  const component = await mount("components/OpenModalButton/Default");

  await component.getByRole("button", { name: "Open add item form" }).click();
  await expect(component.getByRole("dialog")).toBeVisible();

  await page.keyboard.press("Escape");

  await expect(component.getByRole("dialog")).toHaveCount(0);
});
