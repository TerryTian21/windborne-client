import { useState, useEffect } from "react";
import Select from "react-select";
import MapComponent from "./components/mapComponent";
import SpatialComponent from "./components/spatialComponent";
import { fetch_balloons, fetch_planes } from "./api/controller";
import balloonData from "./assets/balloon_data.json";
import { BalloonDataPoint } from "./interface/balloon_interface";
import filter_balloons from "./helper/balloon_filter";
import compute_center from "./helper/map_helper";
import { HashLoader } from "react-spinners";
import { locationOptions, continentOptions } from "./assets/static_data";
import "./styles/App.css";

function App() {
    const start_time = Math.round(Date.now() / 1000);

    // Data States
    const [data, setData] = useState<BalloonDataPoint[]>([]);
    const [currData, setCurrData] = useState<BalloonDataPoint[]>([]);
    const [balloonNum, setBalloonNum] = useState<number>(1);
    const [currBalloon, setCurrBalloon] = useState<BalloonDataPoint[]>([]);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [spinner, setSpinner] = useState<boolean>(false);

    // API Response States
    const [planeData, setPlaneData] = useState<any[]>([]);

    // Map States
    const [locationType, setLocationType] = useState("any");
    const [continent, setContinent] = useState("any");
    const [center, setCenter] = useState<[number, number]>([0, 0]);
    const [zoom, setZoom] = useState(2);

    // Use Effect
    useEffect(() => {
        fetch_balloons().then((data) => {
            setData(data.balloons);
        });
        // setData(balloonData);
    }, []);

    //  OnChange Functions
    const handleLocationChange = (selectedOption: any) => {
        setLocationType(selectedOption.value);
    };
    const handleContinentChange = (selectedOption: any) => {
        setContinent(selectedOption.value);
    };
    const handleBalloonChange = (selectedOption: any) => {
        setBalloonNum(selectedOption.value);
    };

    // Button Functions

    const handleBalloonFilter = () => {
        console.log("Setting filtered balloons to", locationType, continent);
        const filteredBalloons = filter_balloons(data, locationType, continent);
        setCurrData(filteredBalloons);
    };

    const handeBalloonVisualize = () => {
        const newBalloonData = data.filter(
            (balloon) => balloon.balloon_num === balloonNum
        );
        setZoom(4);
        setCurrBalloon(newBalloonData);
        setCenter(compute_center(newBalloonData));
    };

    const handleCollision = async () => {
        if (currBalloon.length === 0) {
            alert("Please select a balloon");
            return;
        }

        setSpinner(true);
        fetch_planes(currBalloon, start_time).then((data) => {
            setPlaneData(data.planes);
            setSpinner(false);
        });

        setButtonDisabled(true);
        setTimeout(() => {
            setButtonDisabled(false);
        }, 60000);
    };

    return (
        <div className="App">
            <div className="Header">
                <h1 className="Title">Windborne</h1>
                <h3> A Collision Detection Application </h3>
            </div>
            <div className="Main">
                <div className="Introduction">
                    <p>
                        {" "}
                        Hello and welcome to the collision detection application
                        with the Windborne project. Here you can explore the
                        potential risk of weather balloon and commerical flight
                        collissions through an interactive path visualisation.
                        Start by filtering for locations of balloons.
                    </p>
                </div>
                <div className="Filters">
                    <Select
                        options={locationOptions}
                        onChange={handleLocationChange}
                        className="select"
                    />
                    <Select
                        options={continentOptions}
                        onChange={handleContinentChange}
                        className="select"
                    />
                    <input
                        type="button"
                        value="Find Balloons"
                        onClick={handleBalloonFilter}
                        className="button"
                    />
                </div>
                <div className="paragraph-container">
                    Please select a balloon after choosing a location and
                    contient:
                </div>
                <div className="balloon-selection">
                    <Select
                        options={currData.map((balloon) => {
                            return {
                                value: balloon.balloon_num,
                                label: `Balloon ${balloon.balloon_num}`,
                            };
                        })}
                        onChange={handleBalloonChange}
                        className="select"
                    />
                    <input
                        type="button"
                        value="Visualize"
                        onClick={handeBalloonVisualize}
                        className="button"
                    />
                </div>
                <div className="Maps">
                    <div className="map-container">
                        <h2 className="map-title"> Geographical Maps</h2>
                        <MapComponent
                            balloonData={currBalloon}
                            planeData={planeData}
                            center={center}
                            zoom={zoom}
                        />
                    </div>
                    <div className="spatial-container">
                        <h2 className="map-title"> 3D Flight Path</h2>
                        <SpatialComponent
                            balloonData={currBalloon}
                            planeData={planeData}
                        />
                    </div>
                </div>
                <div className="Collision">
                    <p className="paragraph-container">
                        {" "}
                        A collision region is defined by a 0.2, 0.2, 1,
                        (longitude, latitude, altitude) cube surrounding the
                        balloon. Coverted to metric units, this is equivalent to
                        a 20km by 20km by 1 km cube. Click the button below to
                        search for flights in the collision region.
                    </p>

                    {spinner ? (
                        <HashLoader size={40} color="#FFC8DD" />
                    ) : (
                        <input
                            type="button"
                            value="Get Collisions"
                            className={"button"}
                            onClick={handleCollision}
                            disabled={buttonDisabled}
                        />
                    )}
                </div>
            </div>
            <div className="Footer">
                <a href="https://www.linkedin.com/in/terry-tian/"> LinkedIn</a>
                <a href="mailto:terry.tian@mail.utoronto.ca"> Email</a>
                <a href="https://colab.research.google.com/drive/1n9ld49M-flP-yjfskqk8WbYcPPnWfofi?usp=sharing">
                    {" "}
                    Collab Notebook{" "}
                </a>
                <p> Copyright @ 2025</p>
            </div>
        </div>
    );
}

export default App;
