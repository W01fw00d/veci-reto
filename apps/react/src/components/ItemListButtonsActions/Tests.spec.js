import { expect, test } from "@playwright/test";

test("deletes selected items and restores them with undo", async ({ mount }) => {
  const component = await mount("components/ItemListButtonsActions/Default");

  const undo = component.getByRole("button", { name: "Undo last change" });
  const deleteButton = component.getByRole("button", {
    name: "Delete selected items",
  });

  await expect(undo).toBeDisabled();
  await expect(deleteButton).toBeEnabled();

  await deleteButton.click();
  await expect(deleteButton).toBeDisabled();
  await expect(undo).toBeEnabled();

  await undo.click();
  await expect(deleteButton).toBeEnabled();
  await expect(undo).toBeDisabled();
});

test("keeps undo disabled when unavailable and does not render add", async ({
  mount,
}) => {
  const component = await mount("components/ItemListButtonsActions/Default");

  await expect(
    component.getByRole("button", { name: "Undo last change" }),
  ).toBeDisabled();
  await expect(
    component.getByRole("button", { name: "Delete selected items" }),
  ).toBeEnabled();
  await expect(
    component.getByRole("button", { name: "Open add item form" }),
  ).toHaveCount(0);
});
