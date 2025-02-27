import { BalloonDataPoint } from "../interface/balloon_interface";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetch_balloons() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching balloons:", error);
        throw error;
    }
}

export async function fetch_planes(
    balloon: BalloonDataPoint[],
    start_time: number
) {
    try {
        const response = await axios.post(`${API_URL}/collision`, {
            balloons: balloon,
            start_time: start_time,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching planes:", error);
        throw error;
    }
}

export async function fetch_spline(balloon: BalloonDataPoint[]) {
    try {
        const response = await axios.post(`${API_URL}/paths`, balloon);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error fetching spline:", {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });
        } else {
            console.error("Error fetching spline:", error);
        }
        throw error;
    }
}
