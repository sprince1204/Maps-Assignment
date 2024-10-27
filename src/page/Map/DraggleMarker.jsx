import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Marker, Popup, useMapEvent } from 'react-leaflet';
import MarkerPopup from '../../components/MarkerPopup';
import useFetchAddress from '../../hook/useFetchAddress';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


const defaultIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});



const DraggleMarker = ({ onAddRemark, selectedPosition }) => {
    const [position, setPosition] = useState({ lat: 22.252, lng: 84.912 });
    const [markerData, setMarkerData] = useState({ address: "", remark: "", date: "" });
    const markerRef = useRef(null);
    const { address, loading, error } = useFetchAddress(position);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker) {
                    const newPosition = marker.getLatLng();
                    setPosition(newPosition);
                    marker.openPopup();
                }
            },
        }),
        [],
    );

    useMapEvent({
        click(e){
            const markers = markerRef.current;
            setPosition(e.latlng);
            markers.openPopup()
        },
    });

    useEffect(() => {
        if (selectedPosition) {
            setPosition(selectedPosition);
            const marker = markerRef.current;
            if (marker) {
                marker.setLatLng(selectedPosition);
            }
        }
    }, [selectedPosition]);

    const handleRemark = (remark) => {
        const currentDate = new Date().toLocaleString();
        const newMarkerData = { remark, date: currentDate, address, position };
        onAddRemark(newMarkerData);

        setMarkerData(newMarkerData);
        markerRef.current.closePopup();
    };

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={defaultIcon}
        >
            <Popup 
                minWidth={90} 
                autoClose={false} 
                closeOnClick={false}
            >
                <MarkerPopup 
                    markerData={{ ...markerData, address }}
                    handleRemark={handleRemark} 
                />
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
            </Popup>
        </Marker>
    );
};

export default DraggleMarker;
