
import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useRef, useState} from "react";

// const dummyList = [
//     {
//         id: 1,
//         author: "기우현",
//         content: "하이1",
//         emotion: 5,
//         created_date: new Date().getTime()
//     },
//     {
//         id: 2,
//         author: "홍길동",
//         content: "하이2",
//         emotion: 2,
//         created_date: new Date().getTime()
//     },
//     {
//         id: 3,
//         author: "아무개",
//         content: "하이3",
//         emotion: 3,
//         created_date: new Date().getTime()
//     }
// ]

// const [data, setDate] = useState()

function App() {

    // data값이 바뀌면 해당 prop이 알아서 바뀜
    const [data, setData] = useState([])

    const dataId = useRef(0)

    const onCreate = ({author, content, emotion}) => {
        const created_date = new Date().getTime()
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id: dataId.current
        }
        dataId.current += 1
        setData([newItem, ...data])

        console.log('aaa', data)
    }

    const onRemove = (targetId) => {
        const newDiaryList = data.filter(
            (it) => it.id !== targetId
        );
        setData(newDiaryList);
    };

    const onEdit = (targetId, newContent) => {
        const newDiaryList = data.map(
            (it) => it.id === targetId ? {...it, content: newContent} : it
        );
        setData(newDiaryList);
    };

    return (
        <div className="App">
            <DiaryEditor onCreate={onCreate}></DiaryEditor>
            <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}></DiaryList>
        </div>
    );
}

export default App;
