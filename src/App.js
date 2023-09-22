
import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useEffect, useRef, useState} from "react";
import LifeCycle from "./LifeCycle";

// https://jsonplaceholder.typicode.com/comments

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

    const getData = async () => {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/comments"
        ).then((res) => res.json())
            // .then(console.log)

        const initData = res.slice(0, 20).map((it) => {
            return {
                author: it.email,
                content: it.body,
                emotion: Math.floor(Math.random() * 5) + 1,
                created_date: new Date().getTime() + 1,
                id: dataId.current++
            };
        });
        //
        setData(initData);
        // console.log(res)
    };

    useEffect(()=>{
        getData()
    },[])

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
            {/*<LifeCycle></LifeCycle>*/}
            <DiaryEditor onCreate={onCreate}></DiaryEditor>
            <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}></DiaryList>
        </div>
    );
}

export default App;
