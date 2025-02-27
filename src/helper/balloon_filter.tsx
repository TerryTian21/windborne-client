import { BalloonDataPoint } from "../interface/balloon_interface";
import { continentBounds } from "../assets/static_data";

export default function filter_balloons(
    data: BalloonDataPoint[],
    location: string,
    continent: string
): BalloonDataPoint[] {
    let filtered = [...data];

    // Filter by continent first
    if (continent !== "any") {
        const bounds =
            continentBounds[continent as keyof typeof continentBounds];

        filtered = filtered.filter((balloon) => {
            const inBounds =
                balloon.y >= bounds.west &&
                balloon.y <= bounds.east &&
                balloon.x >= bounds.south &&
                balloon.x <= bounds.north;

            return inBounds;
        });
    }

    if (location === "starting") {
        let first_balloons = data.reduce((acc, balloon) => {
            if (
                !acc[balloon.balloon_num] ||
                balloon.hour < acc[balloon.balloon_num].hour
            ) {
                acc[balloon.balloon_num] = balloon;
                return acc;
            }

            return acc;
        }, {} as { [key: number]: BalloonDataPoint });

        filtered = filtered.filter((balloon) => {
            if (first_balloons[balloon.balloon_num].hour == balloon.hour) {
                return balloon;
            }
        });
    } else if (location === "ending") {
        let last_balloons = data.reduce((acc, balloon) => {
            if (
                !acc[balloon.balloon_num] ||
                balloon.hour > acc[balloon.balloon_num].hour
            ) {
                acc[balloon.balloon_num] = balloon;
                return acc;
            }

            return acc;
        }, {} as { [key: number]: BalloonDataPoint });

        filtered = filtered.filter((balloon) => {
            if (last_balloons[balloon.balloon_num].hour == balloon.hour) {
                return balloon;
            }
        });
    }

    return filtered;
}
