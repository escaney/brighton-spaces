/** @format */

import L from 'leaflet';

// Fix for default markers in react-leaflet
export const setupLeafletIcons = () => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
    }
};
