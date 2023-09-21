import {useState} from "react";


const DiaryEditor = () => {
    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1
    })

    const handleChangeState = (e)=>{
        console.log(e.target.name)
        console.log(e.target.value)
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = ()=>{
        console.log(state)
        alert("저장 성공")
    }

    return (
        <div className="DiaryEditor">
            <h2>test</h2>
            <div>
                <input
                    value={state.author}
                    name="author"
                    onChange={(e)=>{
                        handleChangeState(e)
                    }}/>
            </div>
            <div>
                <textarea
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

export default DiaryEditor
