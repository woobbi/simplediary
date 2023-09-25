
import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {createContext, useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
// import LifeCycle from "./LifeCycle";
// import OptimizeTest from "./OptimizeTest";

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

const reducer = (state, action) => {
    switch (action.type){
        case 'INIT': {
            return action.data
        }
        case 'CREATE': {
            const created_date = new Date().getTime()
            const newItem = {
                ...action.data,
                created_date
            }
            return [newItem, ...state]
        }
        case 'REMOVE':
            return state.filter((it) => it.id !== action.targetId)
        case "EDIT": {
            return state.map((it) =>
                it.id === action.targetId
                    ? {
                        ...it,
                        content: action.newContent
                    }
                    : it
            );
        }
        default:
        return state
    }
}

export const DiaryStateContext = createContext(null)

export const DiaryDispatchContext = createContext(null);

function App() {

    // data값이 바뀌면 해당 prop이 알아서 바뀜
    // const [data, setData] = useState([])
    const [data,dispatch] = useReducer(reducer, [])

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

        dispatch({type:"INIT", data: initData})
        // setData(initData);
        // console.log(res)
    };

    // mount개념
    useEffect(()=>{
        getData()
    },[])

    const onCreate = useCallback(({author, content, emotion}) => {

        dispatch({type:"CREATE",  data: { author, content, emotion, id: dataId.current }})

        dataId.current += 1


        // setData((data)=>[newItem, ...data]) // 함수형 업데이트
    // },[data])
    },[])

    const onRemove = useCallback((targetId) => {
        dispatch({type:"REMOVE", targetId})

        // setData(data => data.filter(
        //     (it) => it.id !== targetId
        // ));
    },[]);

    const onEdit = useCallback((targetId, newContent) => {
        dispatch({
            type: "EDIT",
            targetId,
            newContent
        });
    }, []);

    const memoizedDispatch = useMemo(() => {
        return { onCreate, onRemove, onEdit };
    }, []);

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
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={memoizedDispatch}>
            <div className="App">
                {/*<OptimizeTest></OptimizeTest>*/}
                {/*<LifeCycle></LifeCycle>*/}
                <DiaryEditor></DiaryEditor>
                <div>전체 일기 : {data.length}</div>
                <div>기분 좋은 일기 개수 : {goodCount}</div>
                <div>기분 나쁜 일기 개수 : {badCount}</div>
                <div>기분 좋은 일기 비율 : {goodRatio}</div>
                <DiaryList></DiaryList>
            </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
