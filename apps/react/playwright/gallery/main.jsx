import React, { StrictMode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import '../../src/style.css';

const stories = import.meta.glob('../../src/**/*.story.{js,jsx}');
const storyPath = (file) => {
  const parts = file
    .replace(/^(\.\.\/)+src\//, '')
    .replace(/\.story\.\w+$/, '')
    .split('/');

  if (parts.length > 1 && parts.at(-1) === parts.at(-2)) {
    parts.pop();
  }

  return parts.join('/');
};

async function resolveStory(storyId) {
  const directMatch = Object.keys(stories).find((candidate) =>
    storyPath(candidate) === storyId || storyPath(candidate).endsWith(`/${storyId}`),
  );

  if (directMatch) {
    const storyModule = await stories[directMatch]();
    return storyModule.default;
  }

  const separator = storyId.lastIndexOf('/');
  const path = storyId.slice(0, separator);
  const exportName = storyId.slice(separator + 1);
  const file = Object.keys(stories).find((candidate) =>
    storyPath(candidate) === path || storyPath(candidate).endsWith(`/${path}`),
  );

  if (!file) return undefined;

  const storyModule = await stories[file]();
  return storyModule[exportName] ?? storyModule.default;
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Gallery root element was not found');
}

let root;

window.mount = async ({ story, props = {} }) => {
  const Story = await resolveStory(story);

  if (!Story) {
    throw new Error(`Unknown story: ${story}`);
  }

  root ??= createRoot(rootElement);
  flushSync(() => {
    root.render(
      <StrictMode>
        <Story {...props} />
      </StrictMode>,
    );
  });
};

window.unmount = async () => {
  root?.unmount();
  root = undefined;
};
