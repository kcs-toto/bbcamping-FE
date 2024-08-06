import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/pages/Star.css";
import CardList from "../components/CardList";
import { starData } from "../data/starData";


function getSeason(month, day) {
    // 3월 21일 ~ 6월 20일은 봄
    if ((month === 3 && day >= 21) || month === 4 || month === 5 || (month === 6 && day <= 20)) {
      return "봄"; // Spring
    }
    // 6월 21일 ~ 9월 22일은 여름
    else if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day <= 22)) {
      return "여름"; // Summer
    }
    // 9월 23일 ~ 12월 21일은 가을
    else if ((month === 9 && day >= 23) || month === 10 || month === 11 || (month === 12 && day <= 21)) {
      return "가을"; // Autumn
    }
    // 12월 22일 ~ 3월 20일은 겨울
    else {
      return "겨울"; // Winter
    }
  }

function Star() {

    const location = useLocation();
    const { date } = location.state || { date: { month: null, day: null } };


    const currentSeason = getSeason(date.month, date.day);

    console.log(currentSeason);
    // Filter the constellations based on the current season
    const constellationsForCurrentSeason = starData.filter(
        (star) => star.seasons1 === currentSeason || star.seasons2 === currentSeason
      );
    console.log("Filtered Constellations: ", constellationsForCurrentSeason);

    return (
        <div className="Star">
            <div className="weather-section">
                <h2 style={{textAlign: "center", color: "white"}}>오1늘{date.day}은 별보기 좋은 날입니다.</h2>
                <div className="meta-data">
                    <div className="weather">
                        <div className="emogi">🌞</div>
                        <div className="contents">25도</div>
                    </div>
                    <div className="season">
                        <div className="emogi">🌸</div>
                        <div className="contents">봄</div>
                    </div>
                </div>
            </div>
            <CardList constellations={constellationsForCurrentSeason} />
        </div>
    )
}

export default Star
