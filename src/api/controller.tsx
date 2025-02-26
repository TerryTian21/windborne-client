import axios from "axios";
import { BalloonDataPoint } from "../interface/balloon_interface";

const api_url = import.meta.env.VITE_BACKEND_API_URL;

export async function fetch_balloons() {
    try {
        const response = await axios.get(`${api_url}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching balloon data:", error);
        return [];
    }
}

export async function fetch_spline(balloons: BalloonDataPoint[]) {
    try {
        const response = await axios.post(`${api_url}/paths`, balloons);
        return response.data;
    } catch (error) {
        console.error("Error fetching collision data:", error);
        return [];
    }
}

export async function fetch_planes(
    balloons: BalloonDataPoint[],
    start_time: number
) {
    try {
        const response = await axios.post(`${api_url}/collision`, {
            balloons,
            start_time,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching plane data:", error);
        return [];
    }
}
