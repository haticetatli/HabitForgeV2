import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Email'i de alıyoruz
    const { name, username, email, password } = body;

    // 1. Validasyon
    if (!name || !username || !email || !password) {
      return NextResponse.json({ error: 'Lütfen tüm alanları doldurun.' }, { status: 400 });
    }

    const db = readDb();

    // 2. Kullanıcı adı kontrolü
    const existingUser = db.users.find((u: any) => u.username === username);
    if (existingUser) {
      return NextResponse.json({ error: 'Bu kullanıcı adı zaten alınmış.' }, { status: 409 });
    }

    // 3. Email kontrolü (Opsiyonel ama iyi olur)
    const existingEmail = db.users.find((u: any) => u.email === email);
    if (existingEmail) {
      return NextResponse.json({ error: 'Bu email adresi zaten kayıtlı.' }, { status: 409 });
    }

    // 4. Yeni kullanıcıyı oluştur (Email ekleyerek)
    const newUser = {
      id: Date.now(),
      username,
      email, // Yeni alan
      password,
      name,
      level: 1,
      xp: 0,
      xpToNext: 1000,
      streak: 0,
      habits: []
    };

    db.users.push(newUser);
    writeDb(db);

    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword);

  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası oluştu.' }, { status: 500 });
  }
}