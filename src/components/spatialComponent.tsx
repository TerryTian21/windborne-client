import Plot from "react-plotly.js";
import {
    BalloonDataPoint,
    PlaneDataPoint,
} from "../interface/balloon_interface.tsx";
import { Layout, Data } from "plotly.js";
import { useEffect, useState } from "react";
import { fetch_spline } from "../api/controller.tsx";

interface SpatialComponentProps {
    balloonData: BalloonDataPoint[];
    planeData: PlaneDataPoint[];
}

function SpatialComponent({ balloonData, planeData }: SpatialComponentProps) {
    const [splineData, setSplineData] = useState<{
        x_new: number[];
        y_new: number[];
        z_new: number[];
    }>({ x_new: [], y_new: [], z_new: [] });

    useEffect(() => {
        if (balloonData.length === 0) return;

        fetch_spline(balloonData).then((data) => {
            setSplineData(data);
        });
    }, [balloonData]);

    // Create balloon trace
    const balloonTrace: Data = {
        type: "scatter3d",
        mode: "markers",
        name: "Balloons",
        x: balloonData.map((b) => b.x),
        y: balloonData.map((b) => b.y),
        z: balloonData.map((b) => b.z),
        marker: {
            size: 6,
            color: "steelblue",
            opacity: 0.8,
        },
        hovertemplate:
            "<b>Balloon</b><br>" +
            "Latitude: %{x:.2f}<br>" +
            "Longitude: %{y:.2f}<br>" +
            "Altitude: %{z:.2f} km<br>" +
            "<extra></extra>",
    };

    // Create Balloon Spline
    const balloonSplineTrace: Data = {
        type: "scatter3d",
        mode: "lines",
        name: "Balloon Spline",
        x: splineData.x_new,
        y: splineData.y_new,
        z: splineData.z_new,
        line: {
            color: "red",
            width: 2,
        },
    };

    // Create plane trace
    const planeTrace: Data = {
        type: "scatter3d",
        mode: "markers",
        name: "Planes",
        x: planeData.map((p) => p.x),
        y: planeData.map((p) => p.y),
        z: planeData.map((p) => p.z),
        marker: {
            size: 7,
            color: "green",
            opacity: 0.8,
        },
        hovertemplate:
            "<b>Plane</b><br>" +
            "Latitude: %{x:.2f}<br>" +
            "Longitude: %{y:.2f}<br>" +
            "Altitude: %{z:.2f} km<br>" +
            "<extra></extra>",
    };

    const layout: Partial<Layout> = {
        scene: {
            xaxis: { title: "Latitude" },
            yaxis: { title: "Longitude" },
            zaxis: { title: "Altitude (km)" },
            camera: {
                eye: { x: 1.5, y: 1.5, z: 1.5 },
            },
        },
        margin: { l: 0, r: 0, t: 0, b: 0 },
        showlegend: true,
        legend: {
            x: 0.9,
            y: 0.9,
            bgcolor: "rgba(255, 255, 255, 0.5)",
        },
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Plot
                data={[balloonTrace, planeTrace, balloonSplineTrace] as Data[]}
                layout={layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                config={{
                    displayModeBar: true,
                    scrollZoom: true,
                    responsive: true,
                }}
            />
        </div>
    );
}

export default SpatialComponent;
