/** @format */

import React, { FunctionComponent } from 'react';

import { AmenityCard } from '../amenity-card/AmenityCard';
import { CategoryCardProps } from './types';
import { useAmenitySelection } from '../../contexts/amenity-context/AmenitySelectionContext';

export const CategoryCard: FunctionComponent<CategoryCardProps> = ({
    id,
    name,
    icon,
    description,
    amenities,
}) => {
    const { handleViewOnMap } = useAmenitySelection();
    return (
        <div
            key={id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent"
        >
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{icon}</span>
                    <h3 className="text-xl font-semibold text-gray-800">
                        {name}
                    </h3>
                </div>

                <p className="text-gray-600 mb-4">{description}</p>

                <div className="space-y-3">
                    <h4 className="font-medium text-gray-700 text-sm">
                        Select what you're looking for:
                    </h4>
                    <div className="space-y-2">
                        {amenities.map((amenity) => (
                            <AmenityCard
                                key={amenity.id}
                                id={amenity.id}
                                categoryId={id}
                                icon={amenity.icon}
                                name={amenity.name}
                                description={amenity.description}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        className="w-full py-3 px-4 rounded-lg font-medium transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                        onClick={() => handleViewOnMap(id)}
                    >
                        View on map
                    </button>
                </div>
            </div>
        </div>
    );
};
