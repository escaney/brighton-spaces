/** @format */

import { Category } from '../types/categories';

export function getCategoryById(
    categories: Category[],
    id: string,
): Category | undefined {
    return categories.find((category) => category.id === id);
}

export function getAmenityById(
    categories: Category[],
    categoryId: string,
    amenityId: string,
) {
    const category = getCategoryById(categories, categoryId);
    return category?.amenities.find((amenity) => amenity.id === amenityId);
}
