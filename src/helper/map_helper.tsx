import { BalloonDataPoint } from "../interface/balloon_interface";

export default function compute_center(
    data: BalloonDataPoint[]
): [number, number] {
    if (data.length === 0) {
        return [0, 0];
    }

    const x_sum = data.reduce((sum, point) => sum + point.x, 0);
    const y_sum = data.reduce((sum, point) => sum + point.y, 0);

    return [x_sum / data.length, y_sum / data.length];
}
