/** @format */

import { ReactNode } from 'react';

export type AmenitySelectionContextType = {
    selectedAmenities: Record<string, string[]>;
    toggleAmenity: (categoryId: string, amenityId: string) => void;
    isAmenitySelected: (categoryId: string, amenityId: string) => boolean;
    handleViewOnMap: (categoryId: string) => void;
};

export type AmenitySelectionProviderProps = {
    children: ReactNode;
};
