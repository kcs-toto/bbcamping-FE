import React, { useEffect, useState } from "react";
import axios from "axios";
import starMarker from "../assets/icons/starMarker.png";
import tentMarker from "../assets/icons/tentMarker.png";

const Map = ({ onCampingSelect }) => {
  const [locations, setLocations] = useState([]);
  const [starLoca, setStarLoca] = useState([]);

  useEffect(() => {
    const fetchCampingData = async () => {
      try {
        const response = await axios.get("http://ec2-52-79-177-10.ap-northeast-2.compute.amazonaws.com/api/camping/info");
        setLocations(response.data.data);
      } catch (error) {
        console.error("Error fetching camping data: ", error);
      }
    };

    const fetchLandmarkData = async () => {
      try {
        const response = await axios.get("http://ec2-52-79-177-10.ap-northeast-2.compute.amazonaws.com/api/landmark/info");
        setStarLoca(response.data.data);
      } catch (error) {
        console.error("Error fetching landmark data: ", error);
      }
    };

    fetchCampingData();
    fetchLandmarkData();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=9b41edfdded85807d7fe7cde9b5e4128&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.35225, 126.533667),
          level: 12,
        };
        const map = new window.kakao.maps.Map(container, options);

        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        const bounds = new window.kakao.maps.LatLngBounds();

        // Camping markers
        locations.forEach((place) => {
          const position = new window.kakao.maps.LatLng(place.latitude, place.longitude);

          const imageSize = new window.kakao.maps.Size(20, 20);
          const imageOption = { offset: new window.kakao.maps.Point(10, 10) };

          const markerImage = new window.kakao.maps.MarkerImage(tentMarker, imageSize, imageOption);

          const marker = new window.kakao.maps.Marker({
            map: map,
            position: position,
            title: place.title,
            image: markerImage
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            console.log("Clicked campId in Map:", place.campId);
            onCampingSelect(place.campId); // Call the parent function with the campId
          });

          bounds.extend(position);
        });

        // Landmark markers
        starLoca.forEach((place) => {
          const position = new window.kakao.maps.LatLng(place.latitude, place.longitude);

          const imageSize = new window.kakao.maps.Size(30, 30);
          const imageOption = { offset: new window.kakao.maps.Point(15, 30) };

          const markerImage = new window.kakao.maps.MarkerImage(starMarker, imageSize, imageOption);

          const marker = new window.kakao.maps.Marker({
            map: map,
            position: position,
            title: place.title,
            image: markerImage
          });

        //   window.kakao.maps.event.addListener(marker, "click", () => {
        //     console.log("Landmark location ID:", place.id);
        //     infowindow.close();
        //     infowindow.setContent(`
        //       <div class="wrap" style="width: 10px; height: 8px; font-size: 13px; color: gray; white-space: nowrap">
        //         <div class="infowindow-content">
        //           <div class="titless">
        //             ${place.title}
        //           </div>
        //         </div>
        //       </div>
        //     `);
        //     infowindow.open(map, marker);
        //   });

          bounds.extend(position);
        });

        window.kakao.maps.event.addListener(map, "click", () => {
          infowindow.close();
        });

        if (locations.length > 0 || starLoca.length > 0) {
          map.setBounds(bounds);
        }
      });
    };

    return () => script.remove();
  }, [locations, starLoca, onCampingSelect]);

  return <div id="map" style={{ width: '100%', height: '300px', position: 'absolute', borderRadius: '10px' }} />;
};

export default Map;