import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

// 1. TÜM KULLANICILARI VE İSTATİSTİKLERİ GETİR
export async function GET() {
  const db = readDb();
  
  // İstatistikleri Hesapla
  const totalUsers = db.users.length;
  const totalHabits = db.users.reduce((acc: number, user: any) => acc + user.habits.length, 0);
  const totalXP = db.users.reduce((acc: number, user: any) => acc + (user.xp || 0), 0);
  
  // Şifreleri gizleyerek kullanıcı listesini hazırla
  const usersSafe = db.users.map((user: any) => ({
    id: user.id,
    username: user.username,
    name: user.name,
    habitCount: user.habits.length,
    isAdmin: user.isAdmin || false
    // Şifreyi güvenlik için burada göndermiyoruz, sadece düzenlerken değiştireceğiz
  }));

  return NextResponse.json({
    stats: { totalUsers, totalHabits, totalXP },
    users: usersSafe
  });
}

// 2. KULLANICI GÜNCELLE (ŞİFRE DEĞİŞTİRME)
export async function PUT(request: Request) {
  const body = await request.json();
  const { targetUserId, newPassword } = body;

  const db = readDb();
  const userIndex = db.users.findIndex((u: any) => u.id === Number(targetUserId));

  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Şifreyi güncelle
  db.users[userIndex].password = newPassword;
  writeDb(db);

  return NextResponse.json({ success: true, message: "Password updated" });
}

// 3. KULLANICI SİL
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const db = readDb();
  // Admini silmeyi engelle (Opsiyonel)
  const userToDelete = db.users.find((u: any) => u.id === Number(id));
  if (userToDelete?.isAdmin) {
    return NextResponse.json({ error: 'Cannot delete admin' }, { status: 403 });
  }

  db.users = db.users.filter((u: any) => u.id !== Number(id));
  writeDb(db);

  return NextResponse.json({ success: true });
}