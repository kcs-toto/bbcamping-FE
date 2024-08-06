import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
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

function formatDate(month, day) {
    // 년도를 2024로 설정하고, 월과 일을 입력받아 Date 객체를 생성합니다.
    // JavaScript의 월은 0부터 시작하므로, 입력받은 월에서 1을 빼줍니다.
    const date = new Date(2024, month - 1, day);
  
    // 년도의 마지막 두 자리를 가져옵니다.
    const yy = String(date.getFullYear());
  
    // 월과 일을 가져옵니다. 한 자리수일 경우 앞에 0을 붙여 두 자리로 만듭니다.
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
  
    // 결과를 'yyMMdd' 형식으로 반환합니다.
    return yy + mm + dd;
  }

function Star() {
    const location = useLocation();
    const { date } = location.state || { date: { month: null, day: null } };
    const yymmdd = formatDate(date.month, date.day);
    const [sun, setSun] = useState([]);
    

    const currentSeason = getSeason(date.month, date.day);
    console.log(currentSeason);
    const constellationsForCurrentSeason = starData.filter(
        (star) => star.seasons1 === currentSeason || star.seasons2 === currentSeason
    );

    useEffect(() => {
        console.log(yymmdd);  
        const fetchData = async () => {
            try {

                const response = await axios.get(`https://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getAreaRiseSetInfo?serviceKey=Pb8yWT9ezXVryvkJkviZd2RJlvPxXjnPU9s4j6Fq%2Fcwm85HtGKxNM7tHm3VVj%2B40QnMaqy%2FMe5oKf%2FX%2F4F7PCg%3D%3D&locdate=${yymmdd}&location=제주`);
                setSun(response.data.data);
                console.log("hi");
                console.log(response);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    })


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
            <CardList constellations={constellationsForCurrentSeason} />
        </div>
    )
}

export default Star
