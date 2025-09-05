/** @format */

import { ReactNode } from 'react';
import { Amenity } from '../amenity-card/types';

export type CategoryCardProps = {
    id: string;
    name: string;
    icon: ReactNode;
    description: string;
    amenities: Amenity[];
};
