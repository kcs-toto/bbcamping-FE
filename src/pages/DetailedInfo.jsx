import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/pages/DetailedInfo.css';
import campingImage from "../assets/images/camping-test.png";

function DetailedInfo() {
  console.log("Rendered DetailedInfo");

  const { id } = useParams();
  console.log("id:", id);

  if (id !== "1") {
    return <div>잘못된 접근입니다.</div>;
  }

  const data = {
    "1": {
      name: "(주)아웃오브파크",
      address: "강원도 춘천시 남면 가옹개길 52-9",
      image: campingImage,
      description: "아웃오브파크는 강원도 춘천시 남면에 자리했다. 서울양양고속도로 강촌IC에서 엘리시안강촌 방면으로 30분가량 달리면 도착한다.",
      tags: ["수영장", "노래방", "찜질방", "카페", "중앙무대", "분수"]
    }
  };

  const campingData = data[id];

  if (!campingData) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className="detailed-info">
      <Link to="/Home" className="close-button">×</Link> {/* X 버튼 */}
      <h1>{campingData.name}</h1>
      <p>{campingData.address}</p>
      <img src={campingData.image} alt={campingData.name} />
      <p>{campingData.description}</p>
      <div>
        {campingData.tags.map((tag, index) => (
          <span key={index}>#{tag} </span>
        ))}
      </div>
    </div>
  );
}

export default DetailedInfo;
