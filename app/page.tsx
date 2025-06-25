'use client';

import CountdownTimer from './timer';

function Header(props: any) {
  return <h1>{props.title ? props.title : "Default title"}</h1>
}
 
export default function HomePage() {

    return (
        <div>
            <Header title="Typing Test" />
            <CountdownTimer />
        </div>
    )
}