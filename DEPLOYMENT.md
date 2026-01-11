
# Toolly.online Deployment Guide

## 1. Prerequisites
- A Cloudflare Account.
- A Google Gemini API Key (get it at [ai.google.dev](https://aistudio.google.com/app/apikey)).

## 2. Cloudflare Pages Setup
1. Create a new project on **Cloudflare Pages**.
2. Connect your repository.
3. In **Settings > Environment Variables**, add:
   - `API_KEY`: Your Gemini Key.
   - `ENVIRONMENT`: `production`

## 3. Database (D1) Initialization
Go to **Cloudflare D1** and run this SQL to support analytics:

```sql
CREATE TABLE usage_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_id TEXT NOT NULL,
  action TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_hash TEXT
);

CREATE TABLE tool_configs (
  id TEXT PRIMARY KEY,
  status TEXT DEFAULT 'active',
  seo_title TEXT,
  seo_desc TEXT
);
```

## 4. PWA Installation
Toolly is PWA-ready. When users visit your site on Chrome or Safari mobile, they will see an "Add to Home Screen" option automatically.
