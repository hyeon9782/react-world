import { http } from '@/utils/http';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || '';
    const body = await request.json();

    console.log('Create Article');

    console.log(token);
    console.log(body);

    const res = await http.post('/articles', body, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

    console.log(res);

    return NextResponse.json({ message: 'Create Article Success', success: true, data: res });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}