export async function mountComponent(page, story, props = {}) {
  await page.goto('/playwright/gallery/index.html');
  await page.evaluate(({ componentStory, componentProps }) => {
    window.mountVanillaComponent(componentStory, componentProps);
  }, { componentStory: story, componentProps: props });
  return page.locator('#root');
}
