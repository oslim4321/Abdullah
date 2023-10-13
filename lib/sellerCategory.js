import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'

/**
 * Retrieves a list of categories from the Firestore database.
 * 
 * @returns {Promise<Array>} An array of category data.
 * @throws {Error} If there is an error while fetching categories.
 */
export async function getCategories() {
    try {
        // Create a reference to the 'Categories' collection.
        const categories = collection(db, 'Categories');

        // Retrieve documents from the 'Categories' collection.
        const querySnapshot = await getDocs(categories);
        const categoriesData = [];

        // Iterate through the documents and extract category data.
        querySnapshot.forEach((doc) => {
            categoriesData.push(doc.data());
        });

        return categoriesData;
    } catch (error) {
        // Throw an error if there's a problem with fetching categories.
        throw new Error(error);
    }
}




/**
 * Retrieves manufacturers based on provided parameters.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.machinery - The name of the machinery.
 * @param {string} params.system - The name of the system.
 * @param {string} params.marineSystem - The name of the marine system.
 * @returns {Array} - An array of manufacturers.
 * @throws {Error} - If there's an error during the retrieval process.
 */
export async function getManufacturers({ machinery, system, marineSystem }) {
    try {
        const categories = collection(db, "Categories");

        const q = query(categories, where("name", "==", marineSystem));
        const querySnapShot = await getDocs(q);

        let marineSystems = [];

        querySnapShot.forEach((doc) => {
            if (doc.exists()) {
                const categoryData = doc.data();
                categoryData.id = doc.id;

                marineSystems.push(categoryData);
            }
        });

        // If there are no marine systems found, return an empty array
        if (!marineSystems) {
            return [];
        }

        // Find the specified machinery within the marine system
        let machineries = marineSystems[0]?.subcategories.filter(cat => cat.name == machinery);

        // Find the specified system within the machinery
        let systems = machineries[0]?.subcategories?.find(cat => cat.name == system);

        // Return the manufacturers for the specified system
        return systems.manufacturers;

    } catch (error) {
        // If there's an error during the retrieval process, throw an error
        throw new Error(error);
    }
}
