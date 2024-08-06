import React, { useEffect, useState } from "react";
import axios from "axios";
import starMarker from "../assets/icons/starMarker.png";
import tentMarker from "../assets/icons/tentMarker.png";

const Map = () => {
    const [locations, setLocations] = useState([]);
    const [starLoca, setStarLoca] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/camping/info");
                setLocations(response.data.data); // Assuming the data is in response.data
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/landmark/info");
                setStarLoca(response.data.data); // Assuming the data is in response.data
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
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

                locations.forEach((place) => {
                    const position = new window.kakao.maps.LatLng(place.latitude, place.longitude);

                    const imageSize = new window.kakao.maps.Size(20, 20);
                    const imageOption = {offset: new window.kakao.maps.Point(10, 10)};

                    const markerImage = new window.kakao.maps.MarkerImage(tentMarker, imageSize, imageOption);
                    
                    const marker = new window.kakao.maps.Marker({
                        map: map,
                        position: position,
                        title: place.title,
                        image: markerImage
                    });

                    window.kakao.maps.event.addListener(marker, "click", () => {
                        infowindow.close();

                        infowindow.setContent(`
                            <div class="wrap"> 
                                <div class="infowindow-content">
                                <div class="title">
                                    ${place.title}
                                </div>
                                <div class="body">
                                    <div class="desc">
                                    <div class="ellipsis">${place.address}</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        `);

                        infowindow.open(map, marker);
                    });

                    bounds.extend(position);
                });

                starLoca.forEach((place) => {
                    const position = new window.kakao.maps.LatLng(place.latitude, place.longitude);

                    const imageSize = new window.kakao.maps.Size(30, 30);
                    const imageOption = {offset: new window.kakao.maps.Point(15, 30)};

                    const markerImage = new window.kakao.maps.MarkerImage(starMarker, imageSize, imageOption);
                    
                    const marker = new window.kakao.maps.Marker({
                        map: map,
                        position: position,
                        title: place.title,
                        image: markerImage
                    });

                    window.kakao.maps.event.addListener(marker, "click", () => {
                        infowindow.close();

                        infowindow.setContent(`
                            <div class="wrap"> 
                                <div class="infowindow-content">
                                <div class="title">
                                    ${place.title}
                                </div>
                                <div class="body">
                                    <div class="desc">
                                    <div class="ellipsis">${place.address}</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        `);

                        infowindow.open(map, marker);
                    });

                    bounds.extend(position);
                });

                window.kakao.maps.event.addListener(map, "click", () => {
                    infowindow.close();
                });

                if (locations.length > 0) {
                    map.setBounds(bounds);
                }
            });
        };

        return () => script.remove();
    }, [locations]);  // Add locations as a dependency

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
}

export default Map;