const { defineConfig } = require("@playwright/test");

// ローカルは Edge (PW_CHANNEL 未指定時の既定)、 CI は PW_CHANNEL=chromium で
// バンドル chromium を使う (Edge 依存を排除)。
const channel = process.env.PW_CHANNEL ?? "msedge";

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 30000,
  reporter: "line",
  use: {
    // channel='chromium' のときは channel を指定せずバンドル chromium を使う。
    ...(channel && channel !== "chromium" ? { channel } : {}),
  },
  // テスト実行時にローカル HTTP サーバを自動起動 (手動起動不要)。既存サーバがあれば再利用。
  webServer: {
    command: "python -m http.server 8787 -b 127.0.0.1",
    url: "http://127.0.0.1:8787",
    reuseExistingServer: true,
    timeout: 30000,
  },
});
