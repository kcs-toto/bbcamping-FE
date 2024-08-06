import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/pages/Home.css';
import Star from '../assets/icons/star.png';
import Camping from '../assets/icons/camping.png';
import Search from '../assets/icons/search.png';
import Map from '../components/Map.jsx';

function Home() {
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const campingId = 1;

    const handleMapClick = () => {
        setIsInfoModalOpen(true);
    };

const handleCloseInfoModal = () => {
    const modal = document.querySelector('.data-modal');
        if (modal) {
        modal.classList.add('closing');
        setTimeout(() => {
            setIsInfoModalOpen(false);
            modal.classList.remove('closing');
        }, 300); // 애니메이션 시간과 일치시켜야 함
    }
};

const location = useLocation();
const { region, date } = location.state || { region: '', date: { month: null, day: null } };

return (
    <div className="home">
    <div className="header">
        <Link to="/option" className="back-button">&lt; 별별캠핑</Link>
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
        </Link>
    </div>
    <div className="map-placeholder" onClick={handleMapClick}>
        <Map/>
        </div>
        <div className="star-container">
            <img src={Star} alt="Star icon" className="star-image" />
            <div>오늘 별자리</div>
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
            <Link to={`/${campingId}`} className="details-button">자세히 보기</Link>
        </div>
        </div>
    )}
    </div>
);
}

export default Home;
