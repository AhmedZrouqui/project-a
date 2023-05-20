'use client';

import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const inter = Inter({ subsets: ['latin'] });

interface IProps extends React.PropsWithChildren {
  session: any;
}

function RootLayout({ children, ...props }: any) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={props.session}>
          <Provider store={store}>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
