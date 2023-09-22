import React, {useEffect, useRef, useState} from "react";

const DiaryItem = ({diaryItem, onRemove, onEdit}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [localContent, setLocalContent] = useState(diaryItem.content)
    const localContentInput = useRef();

    useEffect(()=>{
        console.log(`${diaryItem.id}번째 아이템 렌더`)
    })
    
    /**
     * 삭제하기
     */
    const handleClickRemove = () => {
        if (window.confirm(`${diaryItem.id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(diaryItem.id)
        }
    }

    /**
     * 수정하기
     */
    const toggleIsEdit = () => setIsEdit(!isEdit)

    /**
     * 수정 취소
     */
    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(diaryItem.content);
    };
    /**
     * 수정 완료
     */
    const handleEdit = () => {
        if (localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }

        if (window.confirm(`${diaryItem.id}번 째 일기를 수정하시겠습니까?`)) {
            onEdit(diaryItem.id, localContent);
            toggleIsEdit();
        }
    };

    return (
        <div className="DiaryItem">
            <div>{diaryItem.id}번째 일기</div>
            <div className="info">
                <span className="author_info">
                 | 작성자 : {diaryItem.author} | 감정점수 : {diaryItem.emotion} |
                </span>
                <br />
                <span className="date">{new Date(diaryItem.created_date).toLocaleString()}</span>
                {/*<div>작성자 : {diaryItem.author}</div>*/}
                {/*<div>일기: {diaryItem.content}</div>*/}
                {/*<div>작성시간(ms): {diaryItem.created_date}</div>*/}
            </div>
            <div className="content">
                {/*{diaryItem.content}*/}
                {isEdit ?
                    <>
                        <textarea ref={localContentInput} value={localContent} onChange={(e)=>{setLocalContent(e.target.value)}}></textarea>
                    </> :
                    <>
                        {diaryItem.content}
                    </>}
            </div>
            {isEdit ? (
                <>
                    <button onClick={handleQuitEdit}>수정 취소</button>
                    <button onClick={handleEdit}>수정 완료</button>
                </>
            ) : (
                <>
                    <button onClick={handleClickRemove}>삭제하기</button>
                    <button onClick={toggleIsEdit}>수정하기</button>
                </>
            )}
            {/*<button onClick={handelRemove}>삭제하기</button>*/}
            {/*<button onClick={handleUpdate}>수정하기</button>*/}
        </div>
    )
}

export default React.memo(DiaryItem)
