/**
 * @fileoverview This file creates the HomePage with the header and typing speed test
 * @author Zachary Kornbluth <github.com/zkornbluth>
 */

'use client';

import DarkModeToggle from './DarkModeToggle';
import TypingTest from './timer';

export default function HomePage() {
  return (
    <>
      <DarkModeToggle />
      <main className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col items-center py-10">
        <div className="w-full max-w-[100ch] px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-center">Typing Test</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 text-center">
              Practice your typing speed and accuracy.
            </p>
          </header>

          <section className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70 overflow-hidden">
            <TypingTest />
          </section>
        </div>
      </main>
    </>
  );
}