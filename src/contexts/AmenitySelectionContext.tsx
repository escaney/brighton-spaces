/** @format */

import React, {
    createContext,
    useContext,
    useState,
    FunctionComponent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AmenitySelectionContextType,
    AmenitySelectionProviderProps,
} from '../types/client/amenities';

const AmenitySelectionContext = createContext<
    AmenitySelectionContextType | undefined
>(undefined);

export const useAmenitySelection = () => {
    const context = useContext(AmenitySelectionContext);

    if (!context) {
        throw new Error(
            'useAmenitySelection must be used within an AmenitySelectionProvider',
        );
    }

    return context;
};

export const AmenitySelectionProvider: FunctionComponent<
    AmenitySelectionProviderProps
> = ({ children }) => {
    const navigate = useNavigate();
    const [selectedAmenities, setSelectedAmenities] = useState<
        Record<string, string[]>
    >({});

    const toggleAmenity = (categoryId: string, amenityId: string) => {
        setSelectedAmenities((prev) => {
            const categorySelections = prev[categoryId] || [];
            const isSelected = categorySelections.includes(amenityId);

            if (isSelected) {
                return {
                    ...prev,
                    [categoryId]: categorySelections.filter(
                        (id) => id !== amenityId,
                    ),
                };
            } else {
                return {
                    ...prev,
                    [categoryId]: [...categorySelections, amenityId],
                };
            }
        });
    };

    const isAmenitySelected = (categoryId: string, amenityId: string) => {
        return selectedAmenities[categoryId]?.includes(amenityId) || false;
    };

    const handleViewOnMap = (categoryId: string) => {
        const selectedForCategory = selectedAmenities[categoryId] || [];
        if (selectedForCategory.length > 0) {
            const amenitiesParam = selectedForCategory.join(',');
            navigate(`/map?amenities=${amenitiesParam}`);
        }
    };

    const value = {
        selectedAmenities,
        toggleAmenity,
        isAmenitySelected,
        handleViewOnMap,
    };

    return (
        <AmenitySelectionContext.Provider value={value}>
            {children}
        </AmenitySelectionContext.Provider>
    );
};
