import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

// YARDIMCI: Bugünün tarihini YYYY-MM-DD formatında al
const getTodayDate = () => new Date().toISOString().split('T')[0];

// KULLANICI BİLGİLERİNİ GETİR
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const db = readDb();
  const user = db.users.find((u: any) => u.id === Number(id));

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const { password: _, ...userSafe } = user;
  return NextResponse.json(userSafe);
}

// HABIT EKLEME (POST)
export async function POST(request: Request) {
  const body = await request.json();
  const { userId, name, icon } = body;

  const db = readDb();
  const userIndex = db.users.findIndex((u: any) => u.id === Number(userId));

  if (userIndex === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const newHabit = {
    id: Date.now(),
    name,
    icon,
    completed: false,
    streak: 0,
    completedDates: [] // YENİ: Tarihçeyi tutacak boş dizi
  };

  db.users[userIndex].habits.push(newHabit);
  writeDb(db);

  return NextResponse.json(newHabit);
}

// GÜNCELLEME (PUT)
export async function PUT(request: Request) {
  const body = await request.json();
  const { 
    userId, 
    habitId, 
    completed, streak, xp, globalStreak, 
    level, xpToNext, 
    name, email, password, avatar 
  } = body;

  const db = readDb();
  const userIndex = db.users.findIndex((u: any) => u.id === Number(userId));

  if (userIndex === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // A. HABIT GÜNCELLEME
  if (habitId) {
    const habitIndex = db.users[userIndex].habits.findIndex((h: any) => h.id === Number(habitId));
    if (habitIndex !== -1) {
      const habit = db.users[userIndex].habits[habitIndex];

      // Durum güncellemeleri
      if(completed !== undefined) habit.completed = completed;
      if(streak !== undefined) habit.streak = streak;

      // YENİ: Eğer tamamlandı olarak işaretlendiyse, bugünün tarihini kaydet
      if (completed === true) {
        const today = getTodayDate();
        // Eğer dizi yoksa oluştur
        if (!habit.completedDates) habit.completedDates = [];
        
        // Eğer bugün zaten ekli değilse ekle
        if (!habit.completedDates.includes(today)) {
          habit.completedDates.push(today);
        }
      }
    }
  }

  // B. USER STATS GÜNCELLEME
  if (xp !== undefined) db.users[userIndex].xp = xp;
  if (globalStreak !== undefined) db.users[userIndex].streak = globalStreak;
  if (level !== undefined) db.users[userIndex].level = level;
  if (xpToNext !== undefined) db.users[userIndex].xpToNext = xpToNext;

  // C. PROFIL GÜNCELLEME
  if (name) db.users[userIndex].name = name;
  if (email) db.users[userIndex].email = email;
  if (password) db.users[userIndex].password = password;
  if (avatar) db.users[userIndex].avatar = avatar;

  writeDb(db);

  return NextResponse.json({ success: true });
}

// SİLME (DELETE)
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const habitId = searchParams.get('habitId');

  const db = readDb();
  
  if (habitId) {
    const userIndex = db.users.findIndex((u: any) => u.id === Number(userId));
    if (userIndex !== -1) {
      db.users[userIndex].habits = db.users[userIndex].habits.filter((h: any) => h.id !== Number(habitId));
      writeDb(db);
    }
  } else {
    db.users = db.users.filter((u: any) => u.id !== Number(userId));
    writeDb(db);
  }

  return NextResponse.json({ success: true });
}