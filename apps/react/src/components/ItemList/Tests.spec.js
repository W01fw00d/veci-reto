import { expect, test } from "@playwright/test";

test("supports adding and removing multiple selected items", async ({
  mount,
}) => {
  const component = await mount("components/ItemList/Default");
  const listbox = component.getByRole("listbox", { name: "Items" });
  const firstItem = component.getByRole("option", {
    name: "Select Item 1",
  });
  const secondItem = component.getByRole("option", {
    name: "Select Item 2",
  });

  await expect(listbox).toHaveAttribute("aria-multiselectable", "true");
  await expect(firstItem).toHaveAttribute("aria-selected", "true");
  await expect(secondItem).toHaveAttribute("aria-selected", "false");

  await secondItem.click();

  await expect(firstItem).toHaveAttribute("aria-selected", "true");
  await expect(secondItem).toHaveAttribute("aria-selected", "true");

  await firstItem.click();

  await expect(firstItem).toHaveAttribute("aria-selected", "false");
  await expect(secondItem).toHaveAttribute("aria-selected", "true");

  await secondItem.click();

  await expect(firstItem).toHaveAttribute("aria-selected", "false");
  await expect(secondItem).toHaveAttribute("aria-selected", "false");
});

test("deletes an item on double click and removes it from the selection", async ({
  mount,
}) => {
  const component = await mount("components/ItemList/Default");
  const firstItem = component.getByRole("option", {
    name: "Select Item 1",
  });
  const secondItem = component.getByRole("option", {
    name: "Select Item 2",
  });

  await secondItem.dblclick();

  await expect(component.getByRole("option")).toHaveCount(3);
  await expect(firstItem).toBeVisible();
  await expect(firstItem).toHaveAttribute("aria-selected", "true");
});

test("shows an empty state after deleting the last item", async ({ mount }) => {
  const component = await mount("components/ItemList/Default");

  for (const item of ["Item 1", "Item 2", "Item 3", "Item 4"]) {
    await component.getByRole("option", { name: `Select ${item}` }).dblclick();
  }

  await expect(component.getByRole("status")).toHaveText(
    "No saved items found",
  );
  await expect(component.getByRole("listbox")).toHaveCount(0);
});
