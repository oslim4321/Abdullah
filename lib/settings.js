import { collection, getDocs, query, where, doc, setDoc, addDoc, updateDoc, arrayUnion, getDoc,arrayRemove } from "firebase/firestore";
import {db} from '../config/firebase'

/**
 * Get incoterms array from the settings collection.
 *
 * @returns {Promise<string[]>} Returns a promise that resolves to an array of incoterms or an empty array if not found.
 * @throws {Error} Throws an error if there is a problem fetching the incoterms.
 */
export async function getIncoterms() {
    try {
        // Reference to the "settings" collection
        const settingsCollection = collection(db, "settings");

        // Query all documents to get the incoterms array
        const querySnapshot = await getDocs(settingsCollection);

        if (querySnapshot.docs.length > 0) {
            // If there are documents in the collection
            const incotermsDoc = querySnapshot.docs[0].data().incoterms;
            // Check if the incoterms array exists in the document
            if (incotermsDoc && Array.isArray(incotermsDoc)) {
                return incotermsDoc
            }
        }

        // If no incoterms array is found or it's not an array, return an empty array
        return [];
    } catch (error) {
        // Handle errors, for example, log the error or throw a custom error
        throw new Error(error.message);
    }
}


/**
 * Get commission value from the settings collection.
 *
 * @returns {Promise<number>} Returns a promise that resolves to the commission value.
 * @throws {Error} Throws an error if there is a problem fetching the commission value.
 */
export async function getCommission() {
    try {
        // Reference to the "settings" collection
        const settingsCollection = collection(db, "settings");

        // Query all documents where the "commission" field exists
        const q = query(settingsCollection, where("commission", "!=", null));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
            // If a document with "commission" field exists, return its value
            const commissionValue = querySnapshot.docs[0].data().commission;
            return commissionValue;
        } else {
            // If no document with "commission" field exists, returning default commission value 10%
            return 10;
        }
    } catch (error) {
        // Handle errors, for example, log the error or throw a custom error
        throw new Error(error);
    }
}
