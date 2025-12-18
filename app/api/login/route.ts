import { NextResponse } from 'next/server';
import { readDb } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  const db = readDb();
  
  // Kullanıcıyı bul
  const user = db.users.find((u: any) => u.username === username && u.password === password);

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Şifreyi gönderme :)
  const { password: _, ...userWithoutPassword } = user;
  
  return NextResponse.json(userWithoutPassword);
}