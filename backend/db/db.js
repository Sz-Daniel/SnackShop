//db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';

sqlite3.verbose();

export async function initDb() {
  try {
    //DB declare
    const db = await open({
      filename: './app.db',
      driver: sqlite3.Database,
    });
    const sql = dataTableCreateIni();
    await db.exec(sql);

    const adminExists = await db.get(`SELECT * FROM users WHERE name = ?`, [
      'admin',
    ]);
    if (!adminExists) {
      const passwordHash = await bcrypt.hash('SnackBoss2025', 10);
      await db.run(
        `INSERT INTO users (name, passwordHash, isAdmin) VALUES (?, ?, ?)`,
        ['admin', passwordHash, 1]
      );
    }

    return db;
  } catch (error) {
    console.error('Adatbázis inicializálási hiba:', error);
    throw error; // vagy kezelhető hiba visszadobása
  }
}

export function dataTableCreateIni() {
  return `
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
      PRIMARY KEY (orderId, productId),
      FOREIGN KEY(orderId) REFERENCES orders(id),
      FOREIGN KEY(productId) REFERENCES products(id)
    );
    
    CREATE TABLE IF NOT EXISTS error_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      method TEXT NOT NULL,
      message TEXT,
      stack TEXT,
      time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      requestId TEXT
    );
    
    CREATE TABLE IF NOT EXISTS response_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      status INTEGER NOT NULL,
      method TEXT NOT NULL,
      success BOOLEAN NOT NULL,
      time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      requestId TEXT
    );
  `;
}
