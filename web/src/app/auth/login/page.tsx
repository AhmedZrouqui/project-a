'use client';

import { getServerSession } from 'next-auth/next';
import { signIn } from 'next-auth/react';
import type { GetServerSidePropsContext } from 'next';
import React, { useRef } from 'react';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());
    const res = await signIn('credentials', {
      email: formValues['username'],
      password: formValues['password'],
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-4">Login page</h1>
      <form ref={formRef} onSubmit={onSubmit}>
        <label className="block">
          <input
            type="email"
            name="username"
            className="mb-4 text-black"
            placeholder="enter email"
          />
        </label>
        <label className="block">
          <input
            type="password"
            name="password"
            placeholder="password"
            className="text-black"
          />
        </label>

        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } };
  }
}
