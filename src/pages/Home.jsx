import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Home.css';
import Star from '../assets/icons/star.png';
import Camping from '../assets/icons/camping.png';
import Search from '../assets/icons/search.png';
import Map from '../components/Map.jsx';

function Home() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const handleMapClick = () => {
    setIsInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  return (
    <div className="home">
      <div className="header">
        <Link to="/Date" className="back-button">&lt; 별별캠핑</Link>
        <Link to="/Star" className="star-button">
          <div className="star-container">
            <img src={Star} alt="Star icon" className="star-image" />
            <div>오늘 별자리</div>
          </div>
        </Link>
      </div>
      <div className="map-placeholder" onClick={handleMapClick}>
        <Map/>
        <img src="/path/to/placeholder-image.png" alt="Map placeholder" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search ..." />
        <button className="search-button"><img src={Search} className="search-image" alt="search icon" /></button>
      </div>
      <div className="info-modal">
        <img src={Camping} alt="Camping icon" className="camping-image" />
        <p className="info-message">마커를 클릭해 제주도의 캠핑장과<br />별 스팟을 확인해보세요!</p>
      </div>
      {isInfoModalOpen && (
        <div className="data-modal">
          <div className="modal-header">
            <h2>제주 구름 캠핑장</h2>
            <button className="modal-close" onClick={handleCloseInfoModal}>×</button>
          </div>
          <div className="modal-body">
            <p>제주특별자치도 제주시 특별자치도 이도이동 1921</p>
            <div className="tags">
              <span className="tag">#수영장</span>
              <span className="tag">#무료 와이파이</span>
              <span className="tag">#바베큐</span>
            </div>
          </div>
          <div className="modal-footer">
            <button className="details-button">자세히 보기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
