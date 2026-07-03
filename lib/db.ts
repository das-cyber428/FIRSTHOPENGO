/**
 * Local file-based database.
 *
 * Zero-dependency persistence so the app's forms actually save data during
 * development without needing a cloud account. Each "table" is a JSON file
 * under /data. If Supabase is configured (see lib/supabase.ts), the API
 * routes use that instead — this is the local fallback that just works.
 *
 * NOTE: for production, use Supabase (run supabase/schema.sql). A flat-file
 * store is fine for local dev / demos but not for concurrent production load.
 */
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type TableName =
  | "volunteers"
  | "contact_messages"
  | "event_registrations"
  | "newsletter_subscribers";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function fileFor(table: TableName) {
  return path.join(DATA_DIR, `${table}.json`);
}

async function readTable<T = Record<string, unknown>>(table: TableName): Promise<T[]> {
  try {
    const raw = await fs.readFile(fileFor(table), "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function writeTable(table: TableName, rows: unknown[]) {
  await ensureDir();
  await fs.writeFile(fileFor(table), JSON.stringify(rows, null, 2), "utf8");
}

/** Insert a record and return it with a generated id + timestamp. */
export async function insert<T extends Record<string, unknown>>(
  table: TableName,
  record: T,
) {
  const rows = await readTable(table);
  const row = { id: randomUUID(), created_at: new Date().toISOString(), ...record };
  rows.push(row);
  await writeTable(table, rows);
  return row;
}

/** List all records in a table (newest first). */
export async function list<T = Record<string, unknown>>(table: TableName): Promise<T[]> {
  const rows = await readTable<T>(table);
  return rows.reverse();
}

/** Count records in a table. */
export async function count(table: TableName): Promise<number> {
  return (await readTable(table)).length;
}
