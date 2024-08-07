import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages/DetailedInfo.css';
import defaultImage from "../assets/images/camping.png";

function DetailedInfo() {
  const { id } = useParams();
  const [campingData, setCampingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampingData = async () => {
      try {
        const response = await axios.get(`http://ec2-52-79-177-10.ap-northeast-2.compute.amazonaws.com/api/camping/info/${id}`);
        setCampingData(response.data.data);
        // console.log(response.data);
        // alert(response.data.data.info);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampingData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }

  if (!campingData) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className="detailed-info">
      <Link to="/Home" className="close-button">×</Link> {/* X 버튼 */}
      <h1>{campingData.campingName}</h1>
      <p>{campingData.addr1}</p>
      <img src={campingData.image || defaultImage} alt={campingData.campingName} />
      <p>{campingData.info}</p>
      {/* <div>
        {campingData.amenities.split(',').map((tag, index) => (
          <span key={index}>#{tag.trim()} </span>
        ))}
      </div>
      <div>{campingData.addr1}</div> */}
    </div>
  );
}

export default DetailedInfo;

