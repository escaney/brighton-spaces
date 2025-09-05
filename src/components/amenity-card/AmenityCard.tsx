/** @format */

import { FunctionComponent } from 'react';
import { Amenity } from './types';
import { useAmenitySelection } from '../../contexts/amenity-context/AmenitySelectionContext';

type AmenityCardProps = Amenity & {
    categoryId: string;
};

export const AmenityCard: FunctionComponent<AmenityCardProps> = ({
    id: amenityId,
    icon,
    name,
    description,
    categoryId,
}) => {
    const { isAmenitySelected, toggleAmenity } = useAmenitySelection();
    return (
        <label
            key={amenityId}
            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
        >
            <input
                type="checkbox"
                checked={isAmenitySelected(categoryId, amenityId)}
                onChange={() => toggleAmenity(categoryId, amenityId)}
                className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="mr-2 text-lg">{icon}</span>
            <div className="flex-1">
                <span className="text-gray-800 font-medium text-sm">
                    {name}
                </span>
                <p className="text-gray-600 text-xs">{description}</p>
            </div>
        </label>
    );
};
