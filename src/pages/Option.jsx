// src/pages/Option.js

import React, { useState, useEffect } from 'react';
import { RegionBtn, SubmitBtn } from "../components/Button";
import "../styles/pages/Option.css";
import DateSelector from '../components/DateSelector';
import { useNavigate } from 'react-router-dom';

function Option() {
    // State to store selected region and date
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDate, setSelectedDate] = useState({ month: null, day: null });
    const [fadeIn, setFadeIn] = useState(false); // State for fade-in effect
    const nav = useNavigate();

    useEffect(() => {
        // Trigger fade-in effect when component mounts
        setFadeIn(true);
    }, []);

    // Region button click handler
    const handleRegionClick = (region) => {
        setSelectedRegion(region); // Update state with clicked region
    };

    // Date selection handler
    const handleDateSelect = (month, day) => {
        setSelectedDate({ month, day });
    };

    // Submit button click handler
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

    // Enable the submit button only if all conditions are met
    const isSubmitEnabled = selectedRegion !== '' && selectedDate.month !== null && selectedDate.day !== null;

    return (
        <div className={`Option ${fadeIn ? 'fade-in' : ''}`}>
            <div className="title">별을 찾아서 캠핑을 떠나요.</div>
            <div className="region-section">
                <div className="section-title">지역</div>
                <div className="btn-wrapper">
                    <RegionBtn name="제주시" onClick={() => handleRegionClick('1')} active={selectedRegion === '1'} />
                    <RegionBtn name="서귀포시" onClick={() => handleRegionClick('2')} active={selectedRegion === '2'} />
                    <RegionBtn name="모두" onClick={() => handleRegionClick('all')} active={selectedRegion === 'all'} />
                </div>
            </div>
            <div className="datee-section">
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
