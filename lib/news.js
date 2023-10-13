import { getDocs,doc, collection, query, where,getDoc,orderBy,limit } from 'firebase/firestore'
import { db } from '../config/firebase'



/**
 * Get all news from the "news" collection and fetch corresponding data from the "tags" collection.
 *
 * @throws {Error} Throws an error if there is an issue with the database operation.
 * @returns {Promise<Array>} Returns a Promise that resolves with an array of news documents
 *          with associated tags data.
 */
export async function getAllNewsWithTags() {
    try {
      // Step 1: Get all news documents from the "news" collection
      const newsQuerySnapshot = await getDocs(collection(db, 'news'));
      const newsData = [];
  
      // Step 2: Loop through each news document
      for (const newsDoc of newsQuerySnapshot.docs) {
        const news = newsDoc.data();
        const newsWithTags = { ...news, tagsData: [], id: newsDoc.id }; // Create a copy of news data
  
        // Step 3: Fetch corresponding data from the "tags" collection for each tag ID in the news
        for (const tagId of news.tags) {
          const tagDoc = await getDoc(doc(db, 'tags', tagId));
          if (tagDoc.exists()) {
            const tagData = tagDoc.data();
            newsWithTags.tagsData.push(tagData);
          }
        }
  
        newsData.push(newsWithTags);
      }
  
      // Step 4: Return the array of news documents with associated tags data
      return newsData;
    } catch (error) {
      // Throw an error if there's an issue with the database operation
      throw new Error(error);
    }
  }



/**
 * Retrieves a news item by its unique ID from the Firestore database.
 *
 * @param {string} id - The ID of the news item to retrieve.
 * @returns {Promise<Object | null>} A Promise that resolves to the retrieved news object or null if not found.
 * @throws {Error} If there's an error retrieving the news item from the database.
 */
export async function getNewsById(id) {
  try {
      // Reference to the 'news' collection in Firestore
      const newsRef = doc(db, 'news', id);

      // Retrieve the document by its reference
      const docSnapshot = await getDoc(newsRef);

      if (docSnapshot.exists()) {
          // Retrieve data from the document
          const newsData = docSnapshot.data();

          // Fetch data for each tag in the 'tags' array
          const tagsData = await Promise.all(
              newsData.tags.map(async (tagId) => {
                  const tagRef = doc(db, 'tags', tagId);
                  const tagDoc = await getDoc(tagRef);
                  if (tagDoc.exists()) {
                      return { ...tagDoc.data(), id: tagDoc.id };
                  } else {
                      // Handle the case where a tag document doesn't exist
                      return null;
                  }
              })
          );

          // Add the tagsData to the newsData object
          const newsWithTags = { ...newsData, tagsData };

          // Return the newsData with tagsData included
          return { ...newsWithTags, id: docSnapshot.id };
      } else {
          // If the document does not exist, return null
          return null;
      }
  } catch (error) {
      // If there's an error, throw an Error object with the error message
      throw new Error(error);
  }
}




/**
 * Get all news from the "news" collection with the most recent news first.
 *
 * @throws {Error} Throws an error if there is an issue with the database operation.
 * @returns {Promise<Array>} Returns a Promise that resolves with an array of news documents
 *          with associated tags data.
 */
export async function getAllNewsWithTagsRecentsFirst() {
    try {

      // Step 1: Create a query to get all news documents from the "news" collection
     
      const newsQuery = query(collection(db, 'news'), orderBy('date', 'desc'), limit(4)); // Sort by 'date' in descending order and limit to 4 documents
      const newsQuerySnapshot = await getDocs(newsQuery);
      const newsData = [];
  
      // Step 2: Loop through each news document
      for (const newsDoc of newsQuerySnapshot.docs) {
        const news = newsDoc.data();
        const newsWithTags = { ...news, tagsData: [], id: newsDoc.id }; // Create a copy of news data
  
        // Step 3: Fetch corresponding data from the "tags" collection for each tag ID in the news
        for (const tagId of news.tags) {
          const tagDoc = await getDoc(doc(db, 'tags', tagId));
          if (tagDoc.exists()) {
            const tagData = tagDoc.data();
            newsWithTags.tagsData.push(tagData);
          }
        }
  
        newsData.push(newsWithTags);
      }
  
      // Step 4: Return the array of news documents with associated tags data
      return newsData;
    } catch (error) {
      // Handle errors here
      throw new Error(error);
    }
  }
  