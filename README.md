# TypeSpec Hint Demo

這是一個示範如何使用 **OpenAPI TypeScript** 來為 API 請求提供完整型別提示（IntelliSense）的專案。

比如說你想要寫 URL call API，但是你不想包 sdk，這個專案可以讓你雖然是使用字串路徑，但還是可以有型別提示，並且在編譯時檢查錯誤。

## 專案結構

```
src/
├── generated/
│   └── openapi-types.ts      # 從 OpenAPI 規格自動生成的型別
├── lib/
│   ├── api-types.ts          # 型別工具函式
│   └── api.ts                # 型別安全的 API 客戶端
└── App.tsx                   # 使用範例
```

## 快速開始

### 安裝依賴

```bash
pnpm install
```

### 生成型別定義

從遠端 OpenAPI 規格生成 TypeScript 型別：

```bash
pnpm typegen
```

這會從指定的 OpenAPI YAML 檔案生成型別定義到 `src/generated/openapi-types.ts`。

### 開發模式

(這東西跑起來沒東西，重點是要看 `App.tsx` 裡面的程式碼)


```bash
pnpm dev
```

## 使用範例

### 1. 型別安全的 POST 請求

```typescript
import { api } from "./lib/api";

// ✅ 完整的 IntelliSense 支援
const res = await api.post("/api/orgs", {
    name: "NYCU SDC",
    description: "陽明交大軟體開發社",
    slug: "nycu-sdc",
    metadata: {},
});
// res 的型別會自動推導為該 API 的回應型別
```

### 2. 編譯時錯誤檢查

```typescript
// ❌ TypeScript 會立即報錯：缺少必要欄位或型別錯誤
await api.post("/api/orgs", {
    name: "NYCU SDC",
    // 缺少 description, slug 等必要欄位
});

// ❌ 嘗試對不支援 POST 的路徑發送 POST 請求
await api.post("/api/users", {});  // 型別錯誤！
```

## 核心技術

### `api-types.ts` - 型別工具

提供從 OpenAPI 規格中提取型別的工具函式：

- `Path`：所有可用的 API 路徑
- `PathsWithMethod<M>`：支援特定 HTTP 方法的路徑
- `JsonBody<P, M>`：特定路徑和方法的請求體型別
- `ResponseBody<P, M>`：特定路徑和方法的回應型別
- `QueryParams<P, M>`：查詢參數型別

### `api.ts` - API 客戶端

提供型別安全的 HTTP 方法包裝器，確保：

- 請求路徑存在於 API 規格中
- 請求體結構符合規格定義
- 回應型別自動推導
- 自動處理 JSON 序列化和錯誤

## 自訂設定

### 修改 OpenAPI 來源

在 `package.json` 中修改 `typegen` 腳本：

```json
{
  "scripts": {
    "typegen": "openapi-typescript YOUR_OPENAPI_URL --output src/generated/openapi-types.ts --useOptions"
  }
}
```

## 授權

[Do What the Fuck You Want to Public License](https://www.wtfpl.net/)

