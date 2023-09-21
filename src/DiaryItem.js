const DiaryItem = ({diaryItem}) => {
    console.log('d', diaryItem)

    return (
        <div className="DiaryItem">
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
        </div>
    )
}

export default DiaryItem
