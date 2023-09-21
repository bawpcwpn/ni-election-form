import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Norfolk Island Governance Committee Election | 11 October 2023',
    description: 'Fill out your registration form online.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <footer className="text-center py-10 text-sm text-gray-500">
                    &copy; 2023 Chelsea Evans. All Rights Reserved. <br /> This website&apos;s source code is licensed
                    under the MIT License. View our code{' '}
                    <Link
                        href="https://github.com/bawpcwpn/ni-election-form"
                        className="underline hover:no-underline"
                        rel="noopener nofollow"
                    >
                        here
                    </Link>
                    .
                </footer>
            </body>
            <Analytics />
        </html>
    );
}
