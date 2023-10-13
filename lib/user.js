import { doc,updateDoc,arrayUnion,getDoc } from "firebase/firestore";
import { db,auth } from "../config/firebase";
import {updatePassword} from 'firebase/auth'



/**
 * Updates the user document in the "Customers" collection with the provided data.
 * If the userObj contains a 'password' field, it updates the current user's password first and then updates the other fields.
 * 
 * @param {Object} userObj - The object containing updated user data. If 'password' is present, it will be used to update the user's password.
 * @param {string} userId - The ID of the user document to be updated.
 * @returns {Promise<void>} - A Promise that resolves when the update is successful.
 * @throws {Error} - Throws an error if the update operation fails.
 */
export async function updateUser(userObj, userId) {
    try {
        // If 'password' field is present in userObj, update the current user's password first
        if (userObj?.password) {
            await updatePassword(auth.currentUser, userObj?.password);
            // Remove 'password' field from userObj to prevent it from being updated in Firestore
            delete userObj?.password;
        }

        // Create a reference to the user document in the "Customers" collection
        const userRef = doc(db, 'customers', userId);
        
        // Update the document with the provided user data
        await updateDoc(userRef, userObj);

        // Resolve the Promise
        Promise.resolve();
    } catch (error) {
        // Throw an error if the update operation fails
        throw new Error(error.message);
    }
}


/**
 * Updates the user's vessel and imo information in Firestore by pushing new values to the respective arrays
 * only if both the vessel and imo values are not already present.
 *
 * @param {string} vessel - The vessel string to add to the user's vessels array.
 * @param {string} imo - The IMO string to add to the user's imo array.
 * @param {boolean} showMessage - A boolean indicating whether to display a message
 * @param {string} userId - The ID of the user document in Firestore.
 *
 * @throws {Error} Throws an error if there is an issue updating the user document in Firestore.
 *
 * @returns {Promise<void>} A Promise that resolves after successfully updating the user document.
 */
export async function updateUserVesselAndImo(vessel, imo, userId, showMessage = false) {
    try {
        // Create a reference to the user document in the "Customers" collection
        const userRef = doc(db, 'customers', userId);
        
        // Get the user document from Firestore
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const userVessels = userData?.vessels || [];
            const userImo = userData?.imo || [];

            // Check if both vessel and imo are not present in the respective arrays
            if (!userVessels.includes(vessel) && !userImo?.includes(imo)) {
                // Push new vessel into the vessels array
                // Push new imo into the imo array
                await updateDoc(userRef, {
                    vessels: arrayUnion(vessel),
                    imo: arrayUnion(imo)
                });
            }

        } else {
            throw new Error('User document not found in Firestore.');
        }
    } catch (error) {
        // Handle errors here, e.g., log the error or throw a custom error
        throw new Error(error);
    }
}


/**
 * Retrieves the user's vessels and imo arrays from Firestore.
 *
 * @param {string} userId - The ID of the user document in Firestore.
 *
 * @throws {Error} Throws an error if there is an issue fetching the user document from Firestore.
 *
 * @returns {Promise<{vessels: Array<string>, imo: Array<string>}>} A Promise that resolves with an object containing the vessels and imo arrays of the user.
 */
export async function getUserVesselAndImo(userId) {
    try {
        // Create a reference to the user document in the "Customers" collection
        const userRef = doc(db, 'customers', userId);

        // Get the user document from Firestore
        const userDoc = await getDoc(userRef);

        // Check if the user document exists
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const vessels = userData.vessels || []; // If vessels array doesn't exist, default to an empty array
            const imo = userData.imo || []; // If imo array doesn't exist, default to an empty array
            return { vessels, imo };
        } else {
            throw new Error('User not found'); // Handle the case where the user document doesn't exist
        }
    } catch (error) {
        // Handle errors here, e.g., log the error or throw a custom error
        throw new Error(error);
    }
}




/**
 * Removes specific values from the 'vessel' and 'imo' arrays of a Firestore document.
 *
 * @param {string} userId - The ID of the user document in Firestore.
 * @param {Object} valuesToDelete - An object containing 'vessel' and 'imo' values to be deleted.
 * @throws {Error} Throws an error if there is an issue with Firestore operations.
 * @returns {Promise<void>} A promise that resolves when the specified values are removed.
 */
export async function removeVesselAndImo(userId, valuesToDelete) {
    try {
        const { vessel: vesselToDelete, imo: imoToDelete } = valuesToDelete;

        // Reference to the user document in Firestore
        const userRef = doc(db, 'customers', userId);

        // Get the user document from Firestore
        const userDoc = await getDoc(userRef);

        // Check if the document exists
        if (!userDoc.exists()) {
            throw new Error('User document not found in Firestore.');
        }

        // Get the 'vessel' and 'imo' arrays from the document data
        const {vessels, imo } = userDoc.data();
        
        // Remove specified values from the arrays
        const updatedVessel = vessels.filter(item => item !== vesselToDelete);
        const updatedImo = imo.filter(item => item !== imoToDelete);

        // Update the user document with modified arrays
        await updateDoc(userRef, {
            vessels: updatedVessel,
            imo: updatedImo
        });

        // Resolve the Promise
        Promise.resolve();
    } catch (error) {
        throw new Error(error);
    }
}