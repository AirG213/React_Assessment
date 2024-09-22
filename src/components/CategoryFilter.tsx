import React, { useEffect, useState } from 'react'; // Import React and useEffect, useState
import { useLocation, useNavigate } from 'react-router-dom'; // Import hooks for navigation and location
import { Post } from '../mock/types'; // Import Post type
import '../styles/CategoryFilter.scss'; // Import the SCSS file

// Define types for the component props
interface CategoryFilterProps {
    posts: Post[]; // Array of posts
    selectedCategories: string[]; // Array of selected categories
    onCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle category changes
    onResetVisiblePosts: () => void; // Function to reset visible posts
}

// Component to filter posts by selected categories
const CategoryFilter: React.FC<CategoryFilterProps> = ({
    posts,
    selectedCategories,
    onCategoryChange,
    onResetVisiblePosts, // Include the reset function
}) => {
    const navigate = useNavigate(); // Hook to programmatically navigate
    const location = useLocation(); // Hook to get the current location
    const [isOpen, setIsOpen] = useState(false); // State to manage filter visibility

    // Effect to update query string when selected categories change
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search); // Get current query params
        queryParams.delete('categories'); // Remove existing categories

        if (selectedCategories.length > 0) {
            selectedCategories.forEach((category) => {
                queryParams.append('categories', category); // Add selected categories to query params
            });
        }

        const newQueryString = queryParams.toString(); // Generate new query string
        const currentQueryString = location.search.substring(1); // Remove the "?" from location.search

        // Avoid updating the URL if the current URL is already correct
        if (newQueryString !== currentQueryString) {
            navigate(`${location.pathname}?${newQueryString}`, { replace: true }); // Update the URL without reloading the page
            onResetVisiblePosts(); // Reset visible posts when filters change
        }
    }, [selectedCategories, navigate, location, onResetVisiblePosts]); // Dependencies

    return (
        <div className="category-filter" onClick={() => setIsOpen(!isOpen)}> {/* Clickable to toggle */}
            <div className="filter-title">Filter by Category</div> {/* Title for the filter */}
            {isOpen && ( // Conditionally render categories based on isOpen state
                <div className="category-container">
                    {/* Conditionally render category checkboxes if posts are available */}
                    {posts.length > 0 && (
                        <>
                            {Array.from(
                                new Set(
                                    posts.reduce((categories, post) => {
                                        post.categories?.forEach((category) => {
                                            categories.add(category.name); // Add category names to the set
                                        });
                                        return categories;
                                    }, new Set<string>())
                                )
                            ).map((categoryName) => (
                                <div 
                                    key={categoryName} 
                                    className={`category-checkbox ${selectedCategories.includes(categoryName) ? 'selected' : ''}`} 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent click event from bubbling up
                                        const newEvent = {
                                            target: {
                                                value: categoryName,
                                                checked: !selectedCategories.includes(categoryName), // Toggle selection
                                            },
                                        } as React.ChangeEvent<HTMLInputElement>; // Cast to ChangeEvent
                                        onCategoryChange(newEvent); // Call onCategoryChange with the new event
                                    }}>
                                    <input
                                        type="checkbox"
                                        value={categoryName}
                                        checked={selectedCategories.includes(categoryName)} // Determine if category is selected
                                        onChange={onCategoryChange} // Handle checkbox change
                                        style={{ display: 'none' }} // Hide the checkbox
                                    />
                                    <span>{categoryName}</span> {/* Display the category name */}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryFilter; // Export the component