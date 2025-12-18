import fs from 'fs';
import path from 'path';

// Veritabanı dosyasının yolu
const dbPath = path.join(process.cwd(), 'data', 'db.json');

// Veriyi Oku
export function readDb() {
  if (!fs.existsSync(dbPath)) {
    return { users: [] };
  }
  const fileData = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(fileData);
}

// Veriyi Yaz
export function writeDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}