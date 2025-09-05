/** @format */

import React, { FunctionComponent } from 'react';
import { CATEGORIES } from '../data';
import { CategoryCard } from '../components/category-card/CategoryCard';
import { AmenitySelectionProvider } from '../contexts/AmenitySelectionContext';

const CategoriesPage: FunctionComponent = () => {
    return (
        <AmenitySelectionProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
                <header className="bg-white shadow-md">
                    <div className="max-w-6xl mx-auto px-4 py-6">
                        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
                            Brighton Spaces
                        </h1>
                        <p className="text-gray-600 text-center">
                            Discover what Brighton & Hove has to offer
                        </p>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto p-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            What are you looking for?
                        </h2>
                        <p className="text-gray-600">
                            Select a category to find places and facilities
                            around Brighton & Hove
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {CATEGORIES.map((category) => {
                            return (
                                <CategoryCard
                                    id={category.id}
                                    name={category.name}
                                    icon={category.icon}
                                    description={category.description}
                                    amenities={category.amenities}
                                />
                            );
                        })}
                    </div>
                </main>
            </div>
        </AmenitySelectionProvider>
    );
};

export default CategoriesPage;
