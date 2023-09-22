import {useEffect, useState} from "react";

const UnMountTest = () => {
    useEffect(() => {
        console.log("Sub Component Mount!");
        return () => {
            console.log("Sub Component Unmount!");
        };
    }, []);
    return <div>UN MOUNT TEST</div>;
};


const LifeCycle = () => {

    const [count, setCount] = useState(0)
    const [text, setText] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    const toggle = () => setIsVisible(!isVisible)

    useEffect(()=>{
        console.log("Mount!")
    },[])

    useEffect(()=>{
        console.log("Update!")
    })

    useEffect(()=>{
        console.log(`Update count! ${count}`)
        if(count > 5) {
            console.log(`count가 5가 넘음!!!!`)
            setCount(1)
        }

    }, [count])

    useEffect(()=>{
        console.log(`Update text! ${text}`)
    }, [text])



    return (
        <div style={{padding: 20}}>
            <div>
                {count}
                <button onClick={()=>setCount(count + 1)}> + </button>
            </div>
            <div>
                <input value={text} onChange={(e) => setText(e.target.value)}/>
            </div>

            <button onClick={toggle}>ON/OFF</button>
            {isVisible && <UnMountTest></UnMountTest> }
        </div>
    )
}

export default LifeCycle
