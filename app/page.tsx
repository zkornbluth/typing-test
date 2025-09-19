/** 
 * @fileoverview This file creates the HomePage with the header and typing speed test
 * @author Zachary Kornbluth <github.com/zkornbluth>
 */

'use client';

import TypingTest from './timer';
 
export default function HomePage() {

    return (
        <div>
            <h1>Typing Test</h1>
            <TypingTest />
        </div>
    )
}