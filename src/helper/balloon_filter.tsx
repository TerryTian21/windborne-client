import { BalloonDataPoint } from "../interface/balloon_interface";
import { continentBounds } from "../assets/static_data";

export default function filter_balloons(
    data: BalloonDataPoint[],
    locationType: string,
    continent: string
) {
    let filtered_results = data;

    if (continent !== "any") {
        const bounds =
            continentBounds[continent as keyof typeof continentBounds];

        filtered_results = filtered_results.filter((balloon) => {
            return (
                balloon.x <= bounds.north &&
                balloon.x >= bounds.south &&
                balloon.y >= bounds.west &&
                balloon.y <= bounds.east
            );
        });
    }

    if (locationType === "starting") {
        let earliest_balloons = data.reduce(
            (min, balloon): { [key: number]: BalloonDataPoint } => {
                if (
                    !min[balloon.balloon_num] ||
                    balloon.hour < min[balloon.balloon_num].hour
                ) {
                    min[balloon.balloon_num] = balloon;
                }
                return min;
            },
            {} as { [key: number]: BalloonDataPoint }
        );

        filtered_results = filtered_results.filter((balloon) => {
            if (earliest_balloons[balloon.balloon_num].hour == balloon.hour) {
                return balloon;
            }
        });
    } else if (locationType === "ending") {
        let latest_balloons = data.reduce(
            (max, balloon): { [key: number]: BalloonDataPoint } => {
                if (
                    !max[balloon.balloon_num] ||
                    balloon.hour > max[balloon.balloon_num].hour
                ) {
                    max[balloon.balloon_num] = balloon;
                }
                return max;
            },
            {} as { [key: number]: BalloonDataPoint }
        );

        filtered_results = filtered_results.filter((balloon) => {
            if (latest_balloons[balloon.balloon_num].hour == balloon.hour) {
                return balloon;
            }
        });
    }

    console.log("Filtered Balloons:", filtered_results.length);
    return filtered_results;
}
