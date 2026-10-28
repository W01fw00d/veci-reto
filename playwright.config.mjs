import { defineConfig, devices } from '@playwright/test';

const galleryUrl = 'http://127.0.0.1:5173/playwright/gallery/index.html';

export default defineConfig({
  projects: [
    {
      name: 'react-e2e',
      testDir: './tests/e2e',
      testMatch: 'App.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://127.0.0.1:5173/',
        serviceWorkers: 'block',
      },
    },
    {
      name: 'vanilla-e2e',
      testDir: './tests/e2e',
      testMatch: 'App.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://127.0.0.1:5174/',
        serviceWorkers: 'block',
      },
    },
    {
      name: 'react-components',
      testDir: './apps/react/src/components',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: galleryUrl,
        serviceWorkers: 'block',
      },
    },
  ],
  webServer: [
    {
      command: 'npm run dev --workspace @veci-reto/react -- --host 127.0.0.1 --port 5173',
      url: galleryUrl,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev --workspace @veci-reto/vanilla -- --host 127.0.0.1 --port 5174',
      url: 'http://127.0.0.1:5174/',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
