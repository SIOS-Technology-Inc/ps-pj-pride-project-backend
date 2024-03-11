# ミタプロバックエンド

DevContainer内で起動するNest.jsのサンプル

## 起動オプション

```bash:起動コマンド
docker compose up -d --build
```

[http://localhost:3000](http://localhost:3000)にAPIがホストされる。

http://localhost:3000/apiにopenAPI仕様書がある

## ディレクトリ構造

```txt
.
├── Dockerfile              :
├── docker-compose.yml      :
├── backend/                : Nest.jsプログラム
└── README.md               : 
```

### gitingore 参考
https://github.com/nestjs/nest/blob/master/.gitignore