import React, {useContext, useEffect, useRef, useState} from "react";
import {DiaryDispatchContext} from "./App";


const DiaryEditor = () => {

    const {onCreate} = useContext(DiaryDispatchContext)
    
    useEffect(()=>{
        console.log("DiaryEditor 렌더")
    })
    
    const authorInput = useRef()
    const contentInput = useRef()

    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1
    })

    const handleChangeState = (e)=>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = ()=>{
        if(state.author.length < 1){
            authorInput.current.focus();
            return
        }
        if(state.content.length < 5){
            contentInput.current.focus();
            return
        }
        onCreate(state)
        alert("저장 성공")
        setState({
            author: "",
            content: "",
            emotion: 1
        })
    }

    return (
        <div className="DiaryEditor">
            <h2>test</h2>
            <div>
                <input
                    ref={authorInput}
                    value={state.author}
                    name="author"
                    onChange={(e)=>{
                        handleChangeState(e)
                    }}/>
            </div>
            <div>
                <textarea
                    ref={contentInput}
                    value={state.content}
                    name="content"
                    onChange={handleChangeState}>
                </textarea>
            </div>
            <div>
                <span>오늘의 감정점수 : </span>
                <select
                    name="emotion"
                    value={state.emotion}
                    onChange={handleChangeState}
                >
                    <option value={1}>one</option>
                    <option value={2}>two</option>
                    <option value={3}>three</option>
                    <option value={4}>four</option>
                    <option value={5}>five</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>저장</button>
            </div>
        </div>
    )
}

export default React.memo(DiaryEditor)
