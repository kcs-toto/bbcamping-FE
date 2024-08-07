import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/pages/Home.css";
import Star from "../assets/icons/star.png";
import Camping from "../assets/icons/camping.png";
import Map from "../components/Map.jsx";

function Home() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedCampingId, setSelectedCampingId] = useState(null);
  const [campingData, setCampingData] = useState(null);
  const [error, setError] = useState(null);
  const [amenities, setAmenities] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { region, date } =
    location.state || { region: "", date: { month: null, day: null } };

  const handleMapClick = () => {
    setIsInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    const modal = document.querySelector(".data-modal");
    if (modal) {
      modal.classList.add("closing");
      setTimeout(() => {
        setIsInfoModalOpen(false);
        modal.classList.remove("closing");
      }, 300);
    }
  };

  // star-container 클릭 시 호출될 함수
  const handleStarContainerClick = () => {
    navigate("/star", {
      state: {
        date: {
          month: date.month,
          day: date.day,
        },
      },
    });
  };

  // 콜백 함수: campId 수신 시 로그 출력
  const handleCampingSelect = (campId) => {
    console.log("Selected campId in Home:", campId);
    setSelectedCampingId(campId);
    setIsInfoModalOpen(true); // 캠핑 선택 시 모달 열기
  };

  useEffect(() => {
    if (selectedCampingId) {
      const fetchCampingData = async () => {
        setError(null); // 기존 에러 초기화
        try {
          const response = await axios.get(
            `http://ec2-52-79-177-10.ap-northeast-2.compute.amazonaws.com/api/camping/info/${selectedCampingId}`
          );
          setCampingData(response.data.data);
        } catch (err) {
          setError("캠핑 정보를 불러오는 데 실패했습니다.");
        }
      };

      fetchCampingData();
    }
  }, [selectedCampingId]);

  // campingData가 업데이트될 때마다 콘솔에 출력
  useEffect(() => {
    if (campingData) {
      console.log("Fetched camping data:", campingData);
      if (campingData.amenities) {
        const splitItems = campingData.amenities.split(",");
        const sliceItems = splitItems.slice(0, 3);

        setAmenities(sliceItems);
      }
      console.log("== split success ==");
      console.log(amenities);
    }
  }, [campingData]);

  return (
    <div className="home">
      <div className="header">
        <Link to="/option" className="back-button">
          &lt; 별별캠핑
        </Link>
        <Link
          to="/star"
          state={{
            date: {
              month: date.month,
              day: date.day,
            },
          }}
          className="star-button"
        >
          {/* Star button */}
        </Link>
      </div>
      <div className="map-placeholder" onClick={handleMapClick}>
        <Map onCampingSelect={handleCampingSelect} />
      </div>
      <div className="star-container" onClick={handleStarContainerClick}>
        <img src={Star} alt="Star icon" className="star-image" />
        <div>오늘 별자리</div>
      </div>
      <div className="info-modal">
        <img src={Camping} alt="Camping icon" className="camping-image" />
        <p className="info-message">
          마커를 클릭해 제주도의 캠핑장과
          <br />
          별 스팟을 확인해보세요!
        </p>
      </div>
      {isInfoModalOpen && (
        <div className="data-modal">
          <div className="modal-header">
            <h2>{campingData ? campingData.campingName : "데이터 없음"}</h2>
            <button className="modal-close" onClick={handleCloseInfoModal}>
              ×
            </button>
          </div>
          <div className="modal-body">
            {error && <p className="error-message">{error}</p>}
            {campingData && (
              <>
                <p>{campingData.addr1}</p>
                <div
                  className="amenities"
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      style={{
                        borderRadius: "10px",
                        padding: "5px",
                        fontSize: "14px",
                        backgroundColor: "#C4EAFF",
                        color: "#3B95FF",
                      }}
                    >
                      #{amenity}
                    </div>
                  ))}
                </div>
                <div className="tags">
                  {campingData.tags?.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            {campingData && (
              <Link to={`/${selectedCampingId}`} className="details-button">
                자세히 보기
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
