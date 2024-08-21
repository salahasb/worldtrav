import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useCities } from "../../contexts/CitiesContext";
import useGeoLocation from "../hooks/useGeoLocation";
import Button from "../Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useAuth } from "../../contexts/AuthContext";

function Map() {
	const {
		isLoading: isLoadingPosition,
		position: geoLocationPosition,
		getCoordinates,
	} = useGeoLocation();

	const [lat, lng] = useUrlPosition();

	const { cities } = useCities();

	// const [position, setPosition] = useState([51.505, -0.09]);
	const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

	useEffect(() => {
		if (lat && lng) {
			setMapPosition([lat, lng]);
		}
	}, [lat, lng]);

	return (
		<div
			className={styles.mapContainer}
			//  onClick={() => navigate(`form`)}
		>
			{!geoLocationPosition && (
				<Button
					type="position"
					onClick={() =>
						getCoordinates((lat, lng) => setMapPosition([lat, lng]))
					}
				>
					{isLoadingPosition ? "loading..." : "Use your position"}
				</Button>
			)}

			<MapContainer
				center={mapPosition}
				zoom={9}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>

				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span>{city.emoji}</span> <span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}

export default Map;
