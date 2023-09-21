const DiaryItem = ({diaryItem, onDelete}) => {
    // console.log('d', diaryItem)

    const clickDelBtn = () => {
        if (window.confirm(`${diaryItem.id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onDelete(diaryItem.id)
        }
    }

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
            <div className="content">{diaryItem.content}</div>
            <button onClick={clickDelBtn}>삭제하기</button>
        </div>
    )
}

export default DiaryItem
