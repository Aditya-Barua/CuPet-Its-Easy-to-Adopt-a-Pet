import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const Vet = () => {
	const [userLocation, setUserLocation] = useState(null);
	const [markerLocation, setMarkerLocation] = useState(null);
	const [vetsNearby, setVetsNearby] = useState([]);
	const [formData, setFormData] = useState({ name: "", phone: "" });
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [radius, setRadius] = useState(10);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: "AIzaSyCN1-mMfrTbZ7o_dhJzMNaB-R1vBcOnQ3o",
	});

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setUserLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				() => console.error("Failed to get user location")
			);
		} else {
			console.error("Geolocati on is notsupported by this browser");
		}
	}, []);

	const fetchNearbyVets = async () => {
		if (!userLocation) return;
		setLoading(true);
		try {
			const response = await axios.get(
				`http://localhost:4000/vets/nearby?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}`
			);
			const vets = response.data;

			const updatedVets = await Promise.all(
				vets.map(async (vet) => {
					const placeName = await fetchPlaceName(
						vet.location.coordinates[1],
						vet.location.coordinates[0]
					);
					return { ...vet, placeName };
				})
			);

			setVetsNearby(updatedVets);
		} catch (err) {
			console.error("Failed to fetch nearby vets:", err);
		} finally {
			setLoading(false);
		}
	};

	const fetchPlaceName = async (lat, lng) => {
		try {
			const response = await axios.get(
				`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
			);
			if (response.data && response.data.display_name) {
				return response.data.display_name; // The formatted address
			}
			return "Unknown Location";
		} catch (err) {
			console.error("Failed to fetch place name:", err);
			return "Unknown Location";
		}
	};

	useEffect(() => {
		if (userLocation) fetchNearbyVets();
	}, [userLocation, radius]); // Fetch nearby vets whenever radius changes

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (!markerLocation) {
			alert("Please select a location on the map.");
			return;
		}
		setLoading(true);
		try {
			await axios.post("http://localhost:4000/vets/add", {
				name: formData.name,
				phone: formData.phone,
				location: {
					type: "Point",
					coordinates: [markerLocation.lng, markerLocation.lat],
				},
			});
			setMessage("Vet added successfully!");
			setFormData({ name: "", phone: "" });
			setMarkerLocation(null);
			fetchNearbyVets();
		} catch (err) {
			console.error("Failed to add vet:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleMapClick = (e) => {
		setMarkerLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
	};

	if (!isLoaded) return <p>Loading Google Maps...</p>;

	return (
		<div className="vet-page-container">
			<div className="vet-header-container">
				<h1 className="vet-title-heading">Add a New Vet</h1>
				<p className="vet-subtitle-text">
					Use the form and map below to add a new vet and find nearby
					vets in your area.
				</p>
			</div>

			<div className="vet-content-container">
				<form
					onSubmit={handleFormSubmit}
					className="vet-form-container"
				>
					<div className="vet-form-group">
						<label className="vet-form-label">Vet Name</label>
						<input
							type="text"
							value={formData.name}
							onChange={(e) =>
								setFormData({
									...formData,
									name: e.target.value,
								})
							}
							className="vet-form-input"
							required
						/>
					</div>
					<div className="vet-form-group">
						<label className="vet-form-label">Vet Phone</label>
						<input
							type="text"
							value={formData.phone}
							onChange={(e) =>
								setFormData({
									...formData,
									phone: e.target.value,
								})
							}
							className="vet-form-input"
							required
						/>
					</div>
					<p className="vet-map-instructions">
						Click on the map to select the vet's location.
					</p>
					<div className="vet-map-container">
						<GoogleMap
							center={userLocation || { lat: 0, lng: 0 }}
							zoom={userLocation ? 12 : 2}
							mapContainerStyle={{
								height: "100%",
								width: "100%",
							}}
							onClick={handleMapClick}
						>
							{markerLocation && (
								<Marker position={markerLocation} />
							)}
							{userLocation && (
								<Marker position={userLocation} label="You" />
							)}
						</GoogleMap>
					</div>
					<button
						type="submit"
						className="vet-submit-button"
						disabled={loading}
					>
						{loading ? "Adding..." : "Add Vet"}
					</button>
				</form>

				{message && <p className="vet-success-message">{message}</p>}

				<div className="vet-nearby-header">
					<h2 className="vet-nearby-title">Nearby Vets</h2>
					<div className="vet-radius-container">
						<label className="vet-radius-label" htmlFor="radius">
							Radius (km):
						</label>
						<input
							type="number"
							id="radius"
							className="vet-radius-input"
							value={radius}
							onChange={(e) => setRadius(Number(e.target.value))}
							min={1}
							step={10}
						/>
					</div>
				</div>

				<div className="vet-nearby-container">
					{loading ? (
						<p>Loading nearby vets...</p>
					) : vetsNearby.length === 0 ? (
						<p>No vets found nearby.</p>
					) : (
						vetsNearby.map((vet) => (
							<div key={vet._id} className="vet-card-container">
								<h3 className="vet-card-title">{vet.name}</h3>
								<p className="vet-card-phone">
									Phone: {vet.phone}
								</p>
								<p className="vet-card-location">
									Location: {vet.placeName}
								</p>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Vet;
