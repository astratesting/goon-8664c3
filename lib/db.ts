import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  tier: string;
  preferences: string;
  createdAt: string;
  onboardingComplete?: boolean;
}

export interface WatchlistItem {
  id: string;
  userId: string;
  ticker: string;
  addedAt: string;
}

interface DB {
  users: StoredUser[];
  watchlistItems: WatchlistItem[];
}

const DATA_DIR = join(process.cwd(), ".data");
const DB_FILE = join(DATA_DIR, "db.json");

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readDB(): DB {
  ensureDataDir();
  if (!existsSync(DB_FILE)) {
    const empty: DB = { users: [], watchlistItems: [] };
    writeFileSync(DB_FILE, JSON.stringify(empty, null, 2), "utf-8");
    return empty;
  }
  try {
    const raw = readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw) as DB;
  } catch {
    return { users: [], watchlistItems: [] };
  }
}

function writeDB(db: DB) {
  ensureDataDir();
  writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
}

// --- User operations ---

export function findUserByEmail(email: string): StoredUser | undefined {
  return readDB().users.find((u) => u.email === email);
}

export function findUserById(id: string): StoredUser | undefined {
  return readDB().users.find((u) => u.id === id);
}

export async function createUser(email: string, password: string): Promise<StoredUser> {
  const db = readDB();
  if (db.users.find((u) => u.email === email)) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const newUser: StoredUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    email,
    name: email.split("@")[0],
    passwordHash,
    tier: "free",
    preferences: "",
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  writeDB(db);
  return newUser;
}

export function updateUser(id: string, data: Partial<Pick<StoredUser, "name" | "preferences" | "onboardingComplete">>) {
  const db = readDB();
  const user = db.users.find((u) => u.id === id);
  if (!user) return;
  if (data.name !== undefined) user.name = data.name;
  if (data.preferences !== undefined) user.preferences = data.preferences;
  if (data.onboardingComplete !== undefined) user.onboardingComplete = data.onboardingComplete;
  writeDB(db);
}

// --- Watchlist operations ---

export function getWatchlistItems(userId: string): WatchlistItem[] {
  return readDB()
    .watchlistItems.filter((w) => w.userId === userId)
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
}

export function getWatchlistCount(userId: string): number {
  return readDB().watchlistItems.filter((w) => w.userId === userId).length;
}

export function findWatchlistItem(userId: string, ticker: string): WatchlistItem | undefined {
  return readDB().watchlistItems.find(
    (w) => w.userId === userId && w.ticker.toUpperCase() === ticker.toUpperCase()
  );
}

export function addWatchlistItem(userId: string, ticker: string): WatchlistItem {
  const db = readDB();
  const item: WatchlistItem = {
    id: `wl_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    userId,
    ticker: ticker.toUpperCase(),
    addedAt: new Date().toISOString(),
  };
  db.watchlistItems.push(item);
  writeDB(db);
  return item;
}

export function removeWatchlistItem(id: string, userId: string): boolean {
  const db = readDB();
  const idx = db.watchlistItems.findIndex((w) => w.id === id && w.userId === userId);
  if (idx === -1) return false;
  db.watchlistItems.splice(idx, 1);
  writeDB(db);
  return true;
}
