import DiaryItem from "./DiaryItem";
import {useContext} from "react";
import {DiaryStateContext} from "./App";

const DiaryList = () => {
    // console.log(diaryList)

    const diaryList = useContext(DiaryStateContext)

    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            {/*{diaryList.map((it, idx)=>(*/}
            {/*        <div key={idx}>*/}
            {/*            <div>작성자2 : {it.author}</div>*/}
            {/*            <div>일기: {it.content}</div>*/}
            {/*            <div>작성시간(ms): {it.created_date}</div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            <div>
                {diaryList.map((it)=>(
                    // <DiaryItem key={it.id} {...it}></DiaryItem>
                    <DiaryItem key={it.id} diaryItem={it}></DiaryItem>
                ))}
            </div>
        </div>
    )
}

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList
