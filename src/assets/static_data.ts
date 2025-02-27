export const locationOptions = [
    { value: "any", label: "Any" },
    { value: "starting", label: "Starting Location" },
    { value: "ending", label: "Ending Location" },
];

export const continentOptions = [
    { value: "any", label: "Any" },
    { value: "North America", label: "North America" },
    { value: "South America", label: "South America" },
    { value: "Europe", label: "Europe" },
    { value: "Asia", label: "Asia" },
    { value: "Africa", label: "Africa" },
    { value: "Australia", label: "Australia" },
    { value: "Antarctica", label: "Antarctica" },
];

export const continentBounds = {
    "North America": {
        west: -168.75,
        south: 15.28,
        east: -52.24,
        north: 83.17,
    },
    "South America": {
        west: -81.31,
        south: -55.92,
        east: -34.79,
        north: 12.45,
    },
    Europe: {
        west: -24.61,
        south: 35.17,
        east: 45.59,
        north: 71.26,
    },
    Asia: {
        west: 26.37,
        south: -8.07,
        east: 180,
        north: 81.85,
    },
    Africa: {
        west: -17.31,
        south: -34.82,
        east: 51.42,
        north: 37.35,
    },
    Australia: {
        west: 112.92,
        south: -43.65,
        east: 153.64,
        north: -10.05,
    },
    Antarctica: {
        west: -180,
        south: -90,
        east: 180,
        north: -60,
    },
};
