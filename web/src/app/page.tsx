'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { UserSignIn, selectUser } from '@/redux/user';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useRef } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const { user } = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const dbRef = useRef<string>('');
  useEffect(() => {
    if (session?.user && status === 'authenticated') {
      dispatch(UserSignIn(session.user));
    }
  }, [dispatch, session, status]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const createDatabase = async (e: any) => {
    e.preventDefault();

    await fetch('http://localhost:3001/create/database', {
      method: 'POST',
      body: JSON.stringify({ db: dbRef.current }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  if (status === 'loading') return <>Loading</>;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello back
      <button onClick={() => signOut()}>sign out</button>
      <input
        type="text"
        placeholder="database name"
        className="text-black"
        onChange={(e) => (dbRef.current = e.target.value)}
      />
      <button onClick={createDatabase}>create database</button>
    </main>
  );
}
