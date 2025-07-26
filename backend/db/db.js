//db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';

// sqlite3 verbose segít hibák jobb láthatóságában, ha szükséges:
// sqlite3.verbose();

export async function initDb() {
  // Nyiss egy SQLite adatbázis kapcsolatot egy fájlhoz (app.db)
  const db = await open({
    filename: './app.db',
    driver: sqlite3.Database,
  });

  // Táblák létrehozása, ha még nem léteznek
  // Később schema.sql ?
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      passwordHash TEXT,
      isAdmin BOOLEAN DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      stock INTEGER,
      price REAL
    );
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      date TEXT,
      total REAL,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS order_items (
      orderId INTEGER,
      productId INTEGER,
      quantity INTEGER,
      FOREIGN KEY(orderId) REFERENCES orders(id),
      FOREIGN KEY(productId) REFERENCES products(id)
    );
  `);

  //Admin user seed
  const adminExists = await db.get(`SELECT * FROM users WHERE name = ?`, [
    'admin',
  ]);
  if (!adminExists) {
    const passwordHash = await bcrypt.hash('SnackBoss2025', 10);
    await db.run(
      `INSERT INTO users (name, passwordHash, isAdmin) VALUES (?, ?, ?)`,
      ['admin', passwordHash, 1]
    );
    console.log('Admin seed létrehozva');
  }

  return db;
}
