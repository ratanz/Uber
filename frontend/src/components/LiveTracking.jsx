import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
};

const defaultCenter = {
    lat: 18.5204,
    lng: 73.8567
};

const mapOptions = {
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: 2, // HORIZONTAL_BAR
        position: 3, // TOP_RIGHT
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
    },
    zoomControl: true,
    zoomControlOptions: {
        position: 9 // RIGHT_CENTER
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
        position: 9 // RIGHT_CENTER
    },
    fullscreenControl: true,
    clickableIcons: true,
    gestureHandling: 'cooperative',
    draggable: true,
    keyboardShortcuts: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    minZoom: 3,
    maxZoom: 20
};

const libraries = ["places"];

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);
    const [map, setMap] = useState(null);
    const [markerIcon, setMarkerIcon] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
                if (map) {
                    map.panTo({ lat: latitude, lng: longitude });
                }
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
            },
            (error) => {
                console.error("Error watching location:", error);
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [map]);

    const onLoad = React.useCallback(function callback(mapInstance) {
        setMap(mapInstance);
        if (window.google) {
            setMarkerIcon({
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new window.google.maps.Size(40, 40)
            });
        }
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
        setMarkerIcon(null);
    }, []);

    const handleMapClick = React.useCallback((e) => {
        console.log('Map clicked at:', e.latLng?.lat(), e.latLng?.lng());
    }, []);

    return (
        <div 
            style={{ 
                width: '100%', 
                height: '100%', 
                position: 'relative ',
                touchAction: 'pan-x pan-y',
                zIndex : 0
            }}
            onClick={e => e.stopPropagation()}
        >
            <LoadScript 
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                libraries={libraries}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentPosition}
                    zoom={15}
                    options={mapOptions}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onClick={handleMapClick}
                    clickableIcons={true}
                >
                    {markerIcon && (
                        <Marker
                            position={currentPosition}
                            icon={markerIcon}
                            animation={window.google?.maps?.Animation?.DROP}
                            clickable={true}
                            draggable={false}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default LiveTracking