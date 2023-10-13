import { db } from "../config/firebase";
import {collection,getDocs,limit,orderBy,query} from "firebase/firestore";


/**
 * Retrieves a list of tags from the 'tags' collection in Firebase.
 *
 * @throws {Error} Throws an error if there is an issue with the database operation.
 * @returns {Promise<Array<Object>>} Returns a Promise that resolves to an array of tag objects.
 * Each tag object contains properties such as 'name' and 'noOfNews'.
 */
export async function getTopTags() {
    try {
        // Get a reference to the 'tags' collection in Firebase
        const tagsRef = collection(db, 'tags');

        // Query the tags collection, order by 'noOfNews' in descending order and limit to 6
        const q = query(tagsRef, orderBy('noOfNews', 'desc'), limit(6));
        
        // Fetch the tags from the collection based on the query
        const snapshot = await getDocs(q);

        // Map the documents in the snapshot to an array of tag data objects
        return snapshot.docs.map(doc => {return {...doc.data(), id: doc.id}});

    } catch (error) {
        // Throw an error if there's an issue with the database operation
        throw new Error(error);
    }
}


