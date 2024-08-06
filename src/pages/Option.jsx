// src/pages/Option.js

import React, { useState } from 'react';
import { RegionBtn, SubmitBtn } from "../components/Button";
import "../styles/pages/Option.css";
import DateSelector from '../components/DateSelector';
import { useNavigate } from 'react-router-dom';

function Option() {
    // state로 선택된 지역과 날짜를 저장
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDate, setSelectedDate] = useState({ month: null, day: null });
    const nav = useNavigate()

    // 지역 버튼 클릭 핸들러
    const handleRegionClick = (region) => {
        setSelectedRegion(region); // 클릭된 지역으로 상태 업데이트
    };

    // 날짜 선택 핸들러
    const handleDateSelect = (month, day) => {
        setSelectedDate({ month, day });
    };

    // submit 버튼 클릭 핸들러
    const handleSubmit = () => {
        if (selectedRegion && selectedDate.month && selectedDate.day) {
            nav('/home', {
                state: {
                    region: selectedRegion,
                    date: selectedDate,
                }
            });
        }
    };

    // 모든 조건을 충족할 때만 버튼 활성화
    const isSubmitEnabled = selectedRegion !== '' && selectedDate.month !== null && selectedDate.day !== null;

    return (
        <div className="Option">
            <div className="title">별을 찾아서 캠핑을 떠나요.</div>
            <div className="region-section">
                <div className="section-title">지역</div>
                <div className="btn-wrapper">
                    <RegionBtn name="제주시" onClick={() => handleRegionClick('1')} active={selectedRegion === '1'} />
                    <RegionBtn name="서귀포시" onClick={() => handleRegionClick('2')} active={selectedRegion === '2'} />
                    <RegionBtn name="모두" onClick={() => handleRegionClick('all')} active={selectedRegion === 'all'} />
                </div>
            </div>
            <div className="date-section">
                <div className="section-title">날짜</div>
                <div className='selector-wrapper'>
                    <DateSelector onDateSelect={handleDateSelect} />
                </div>
            </div>
            <div className='btn-section'>
                <SubmitBtn onClick={handleSubmit} active={isSubmitEnabled} />
            </div>
        </div>
    );
}

export default Option;
