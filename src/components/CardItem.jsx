import "../styles/components/CardItem.css"
import { getStarImg } from "../util/getStarImg"

function CardItem({id, name, eng, emoji, dateFrom, dateTo, direction, seasons1, seasons2, imageUrl}) {
    return (
        <div className="card">
            <div className="front">
                <div className="img-section">
                    <img src={getStarImg(id)}></img>
                </div>
                <div className="name-section">
                    <h3>{name}</h3>
                </div>
            </div>
            <div className="back">
                <div className="star-title">{eng} {emoji}</div>
                <div className="date-section">{dateFrom} ~ {dateTo}</div>
                <div className="content-section">
                    <p>{direction}쪽 하늘에서 주로 보이며</p>
                    <p>특히 <strong>{seasons1}</strong>과 <strong>{seasons2}</strong>에 잘 보입니다.</p>
                    <p>고개를 들어 <strong>{name}</strong>를 찾아보세요!</p>
                </div>
            </div>
        </div>
    )
}

export default CardItem
