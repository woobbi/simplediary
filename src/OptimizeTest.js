import React, {useEffect, useState} from "react";

// const Textview = ({text}) => {
//     useEffect(() => {
//         console.log(`update text : ${text}`)
//     }, [text])
//     return <div>{text}</div>
// }
//
// const Countview = ({count}) => {
//     useEffect(() => {
//         console.log(`update count : ${count}`)
//     }, [count])
//     return <div>{count}</div>
// }

// const Textview = React.memo(({text}) => {
//     useEffect(() => {
//         console.log(`update text : ${text}`)
//     })
//     return <div>{text}</div>
// })
//
// const Countview = React.memo(({count}) => {
//     useEffect(() => {
//         console.log(`update count : ${count}`)
//     })
//     return <div>{count}</div>
// })

const CounterA = React.memo(({ count }) => {
    useEffect(() => {
        console.log(`CountA Update - count : ${count}`);
    });
    return <div>{count}</div>;
});

//
const CounterB = ({ obj }) => {
    useEffect(() => {
        console.log(`CountB Update - count : ${obj.count}`);
    });
    return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
    // if (prevProps.obj.count === nextProps.obj.count) {
    //     return true;
    // }
    // return false;
    return prevProps.obj.count === nextProps.obj.count
};
//
const MemoizedCounterB = React.memo(CounterB, areEqual);



const OptimizeTest = () => {
    // const [count, setCount] = useState(1);
    // const [text, setText] = useState("");

    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1
    });


    return (
        <div style={{padding: 50}}>
            {/*<div>*/}
            {/*    <h2>count</h2>*/}
            {/*    /!*<CounterA count={count} />*!/*/}
            {/*    <Countview count={count}></Countview>*/}
            {/*    <button onClick={() => setCount(count + 1)}>+</button>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <h2>text</h2>*/}
            {/*    /!*<MemoizedCounterB obj={obj} />*!/*/}
            {/*    <Textview text={text}></Textview>*/}
            {/*    <input value ={text} onChange={(e) => setText(e.target.value)}></input>*/}
            {/*</div>*/}
            <div>
                <h2>Counter A</h2>
                <CounterA count={count} />
                <button onClick={() => setCount(count)}>A Button</button>
            </div>
            <div>
                <h2>Counter B</h2>
                <MemoizedCounterB obj={obj} />
                <button onClick={() => setObj({ count: 1 })}>B Button</button>
            </div>
        </div>
    )
}

export default OptimizeTest
