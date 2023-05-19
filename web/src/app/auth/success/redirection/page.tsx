'use client';

import { useAppDispatch } from '@/redux/hooks';
import { UserSignIn } from '@/redux/user';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AuthSuccess() {
  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user && status === 'authenticated') {
      dispatch(UserSignIn(session.user));
      console.log('auth');
    }
  }, [dispatch, session, status]);

  return (
    <>You have successfully signed in, you will be redirected to home page</>
  );
}
