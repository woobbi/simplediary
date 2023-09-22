
import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useEffect, useMemo, useRef, useState} from "react";
import LifeCycle from "./LifeCycle";
import OptimizeTest from "./OptimizeTest";

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

    // const getDiaryAnalysis = () => {
    //     // if (data.length === 0) {
    //     //     return { goodcount: 0, badCount: 0, goodRatio: 0 };
    //     // }
    //
    //     const goodCount = data.filter((it) => it.emotion >= 3).length;
    //     const badCount = data.length - goodCount;
    //     const goodRatio = (goodCount / data.length) * 100.0;
    //     return { goodCount, badCount, goodRatio };
    // }

    const getDiaryAnalysis = useMemo(() => {
        if (data.length === 0) {
            return { goodCount: 0, badCount: 0, goodRatio: 0 };
        }

        const goodCount = data.filter((it) => it.emotion >= 3).length;
        const badCount = data.length - goodCount;
        const goodRatio = (goodCount / data.length) * 100.0;
        return { goodCount, badCount, goodRatio };
    }, [data.length]);

    const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

    return (
        <div className="App">
            <OptimizeTest></OptimizeTest>
            {/*<LifeCycle></LifeCycle>*/}
            <DiaryEditor onCreate={onCreate}></DiaryEditor>
            <div>전체 일기 : {data.length}</div>
            <div>기분 좋은 일기 개수 : {goodCount}</div>
            <div>기분 나쁜 일기 개수 : {badCount}</div>
            <div>기분 좋은 일기 비율 : {goodRatio}</div>
            <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}></DiaryList>
        </div>
    );
}

export default App;
