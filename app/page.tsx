'use client';

import { useState } from 'react';

function Header(props) {
        return <h1>{props.title ? props.title : "Default title"}</h1>
      }
 
export default function HomePage() {
    const [likes, setLikes] = useState(0)
 
    function handleClick() {
      setLikes(likes + 1)
    }
 
    return (
        <div>
            <Header title="Typing Test" />
            <button onClick={handleClick}>Like ({likes})</button>
        </div>
    )
}