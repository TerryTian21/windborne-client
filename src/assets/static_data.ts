export const locationOptions = [
    { value: "any", label: "Any Location" },
    { value: "starting", label: "Starting Location" },
    { value: "ending", label: "Ending Location" },
];

export const continentOptions = [
    { value: "any", label: "Any Continent" },
    { value: "north_america", label: "North America" },
    { value: "south_america", label: "South America" },
    { value: "europe", label: "Europe" },
    { value: "asia", label: "Asia" },
    { value: "africa", label: "Africa" },
    { value: "oceania", label: "Oceania" },
    { value: "antarctica", label: "Antarctica" },
];

export const continentBounds = {
    north_america: {
        north: 90,
        south: 15,
        west: -170,
        east: -50,
    },
    south_america: {
        north: 15,
        south: -60,
        west: -90,
        east: -30,
    },
    europe: {
        north: 71,
        south: 35,
        west: -25,
        east: 45,
    },
    asia: {
        north: 80,
        south: 0,
        west: 45,
        east: 180,
    },
    africa: {
        north: 37,
        south: -35,
        west: -20,
        east: 50,
    },
    oceania: {
        north: 20,
        south: -50,
        west: 110,
        east: 180,
    },
    antarctica: {
        north: -60,
        south: -90,
        west: -180,
        east: 180,
    },
};
