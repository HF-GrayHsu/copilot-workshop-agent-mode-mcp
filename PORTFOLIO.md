![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)
# 待辦清單 Web App

這是在 GitHub Copilot 實戰工作坊完成的待辦清單 Web App。專案以純前端技術實作，提供待辦事項管理、篩選與深色模式，並透過瀏覽器儲存資料與使用者偏好。

## 線上展示

`https://hf-grayhsu.github.io/copilot-workshop-agent-mode-mcp/`

## 功能

- 新增待辦事項，並阻止空白內容送出。
- 標記待辦事項為完成或未完成。
- 刪除單筆待辦事項。
- 批次清除已完成事項；操作前顯示確認對話框，沒有已完成事項時按鈕停用。
- 依「全部」、「未完成」或「已完成」篩選待辦事項，並在篩選結果為空時顯示提示。
- 顯示整份清單的未完成數量，不受目前篩選條件影響。
- 切換深色與淺色模式，並記住手動選擇；尚未選擇時跟隨作業系統偏好。
- 將待辦事項及主題偏好儲存在 `localStorage`，重新整理後仍可保留。
- 使用響應式版面，支援手機螢幕瀏覽。

## 技術

- 使用 HTML、CSS 與原生 JavaScript 建置。
- 不使用前端框架或外部套件；不依賴外部 CDN。
- 透過瀏覽器 `localStorage` 保存待辦事項與主題偏好。
- 使用 CSS 變數管理配色，並以 `prefers-color-scheme` 支援系統深淺色偏好。

## 開發方式

- 使用 GitHub Copilot Agent Mode，依需求建立並修改待辦清單的 HTML、CSS 與 JavaScript。
- 透過 MCP 工具查詢 Microsoft Learn 文件及 GitHub issue，將文件與需求帶入開發流程。
- 使用 `.github/copilot-instructions.md` 記錄專案技術限制、程式風格與協作規則。
- 使用 `.github/prompts/fix-issue.prompt.md` 將處理 issue 的步驟整理成可重複使用的工作流程，包含讀取 issue、提出計畫、建立分支、修改、驗證與建立 PR。

## 我學到什麼

- 將需求寫清楚，有助於 Agent Mode 聚焦在目標與必要變更。
- 先閱讀官方文件與 issue，再確認實際問題，可讓修改更有依據。
- Git 分支、提交與 PR 能將變更隔離並保留可審查的紀錄。
- 把專案規則與常用工作流程寫成檔案，能讓協作方式更一致且可重複。
- 在瀏覽器實際操作驗證功能，有助於發現單看程式碼不易察覺的問題。
