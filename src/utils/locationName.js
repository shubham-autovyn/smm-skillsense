const LocationName = (location) => {
    switch (location) {
        case 'Gurgaon Powertrain':
            return 'PT-G';
        case 'Gurgaon Vehicle Plant':
            return 'VEH-G';
        case 'Manesar Powertrain':
            return 'PT-M';
        case 'Manesar Vehicle Plant':
            return 'VEH-M';
    }
};

export default LocationName;
