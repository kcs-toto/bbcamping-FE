import "../styles/pages/Star.css"
import CardList from "../components/CardList"

function Star() {
    return (
        <div className="Star">
            <div className="weather-section">
                <h2 style={{textAlign: "center", color: "black"}}>오늘은 별보기 좋은 날입니다.</h2>
                <div className="meta-data">
                    <div className="weather">
                        <div className="emoji">🌞</div>
                        <div className="contents">25도</div>
                    </div>
                    <div className="season">
                        <div className="emoji">🌸</div>
                        <div className="contents">봄</div>
                    </div>
                </div>
            </div>
            <CardList />
        </div>
    )
}

export default Star
