import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
    BalloonDataPoint,
    PlaneDataPoint,
} from "../interface/balloon_interface";
import { useEffect } from "react";

interface MapComponentProps {
    balloonData: BalloonDataPoint[];
    planeData: PlaneDataPoint[];
    center: [number, number];
    zoom: number;
}

interface ChangeMapViewProps {
    center: [number, number];
    zoom: number;
}

const planeIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: green; width: 12px; height: 12px; border-radius: 50%;"></div>`,
    iconSize: [10, 10],
});

const balloonIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: steelblue; width: 11px; height: 11px; border-radius: 50%;"></div>`,
    iconSize: [10, 10],
});

function ChangeMapView({ center, zoom }: ChangeMapViewProps) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);

    return null;
}

function MapComponent({
    balloonData,
    planeData,
    center,
    zoom,
}: MapComponentProps) {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ width: "100%", height: "100%" }}
        >
            <ChangeMapView center={center} zoom={zoom} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            {balloonData.map((balloon, index) => (
                <Marker
                    key={index}
                    position={[balloon.x, balloon.y]}
                    icon={balloonIcon}
                >
                    <Popup>
                        <div>
                            <h3>Balloon Data</h3>
                            <p>Latitude: {balloon.x}</p>
                            <p>Longitude: {balloon.y}</p>
                            <p>Altitude: {balloon.z.toFixed(2)} km</p>
                            <p>Hour: {balloon.hour.toFixed(2)}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
            {planeData.map((plane, index) => (
                <Marker
                    key={`plane-${index}`}
                    position={[plane.x, plane.y]}
                    icon={planeIcon}
                >
                    <Popup>
                        <div>
                            <h3>Plane Data</h3>
                            <p>Latitude: {plane.x}</p>
                            <p>Longitude: {plane.y}</p>
                            <p>Altitude: {plane.z.toFixed(2)} km</p>
                            <p>Hour: {plane.hour.toFixed(2)}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MapComponent;
