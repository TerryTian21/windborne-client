import { BalloonDataPoint } from "../interface/balloon_interface";

export default function compute_center(allData: BalloonDataPoint[]) {
    let x_sum = 0;
    let y_sum = 0;

    allData.forEach((balloon) => {
        x_sum += balloon.x;
        y_sum += balloon.y;
    });

    return [x_sum / allData.length, y_sum / allData.length] as [number, number];
}
