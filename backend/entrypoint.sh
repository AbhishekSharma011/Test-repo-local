#!/usr/bin/env bash
set -euo pipefail

# Wait for Postgres
until node -e "const { Client } = require('pg');
  const c = new Client({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, port: process.env.DB_PORT||5432 });
  c.connect().then(()=>c.end()).catch(()=>process.exit(1));"; do
  echo "Waiting for Postgres at ${DB_HOST:-postgres}..."
  sleep 2
done

# Idempotent schema updates
[ -f scripts/check-and-create-tables.js ] && node scripts/check-and-create-tables.js || true
[ -f scripts/add-reply-id-column.js ]    && node scripts/add-reply-id-column.js    || true

exec npm start
