import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  arrayUnion
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/firebase";



/**
 * Adds multiple enquiries to Firestore.
 *
 * @param {Array} data - An array of enquiry objects to be added to Firestore.
 * @returns {Promise<boolean>} A Promise that resolves to true if the operation is successful.
 * @throws {Error} Throws an error if there is an issue while adding the data to Firestore.
 */
export async function addEnquiryToFirestore(data) {
  try {
    // Get a reference to the "enquiries" collection
    const enquiries = collection(db, 'enquiries');

    // Add new data to the "enquiries" collection
    for (let i = 0; i < data.length; i++) {
      await addDoc(enquiries, data[i]);
    }

    return true; // Operation successful
  } catch (error) {
    throw new Error(error); // Throw an error if there's an issue
  }
}


/**
 * Retrieve a list of enquiries from Firebase Firestore.
 *
 * @returns {Promise<Array>} A Promise that resolves to an array of enquiry objects.
 * @throws {Error} Throws an error if there is an issue while fetching the data from Firestore.
 */
export async function getEnquiries() {
  try {
    // Get a reference to the "enquiries" collection in Firestore
    const ref = collection(db, 'enquiries');

    // Fetch the documents from the "enquiries" collection
    const querySnapshot = await getDocs(ref);

    // Initialize an empty array to store the enquiry objects
    const enquiries = [];

    // Iterate through the documents and convert them to objects
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        // Get the data from the document
        const enquiryData = doc.data();

        // Add the document ID to the data object
        enquiryData.id = doc.id;

        // Add the enquiry data to the array
        enquiries.push(enquiryData);
      }
    });

    // Return the array of enquiry objects
    return enquiries;
  } catch (error) {
    throw new Error(error); // Throw an error if there's an issue
  }
}

/**
 * Retrieve an enquiry by its ID from Firebase Firestore.
 *
 * @param {string} enquiryId - The ID of the enquiry to retrieve.
 * @returns {Promise<Object|null>} A Promise that resolves to the enquiry object or null if not found.
 * @throws {Error} Throws an error if there is an issue while fetching the data from Firestore.
 */
export async function getEnquiryById(enquiryId) {
  try {
    // Get a reference to the "enquiries" collection in Firestore
    const ref = collection(db, 'enquiries');

    // Create a query to filter by the provided enquiryId
    const q = query(ref, where('enquiryId', '==', enquiryId));

    // Fetch the documents using the query
    const querySnapshot = await getDocs(q);

    // Initialize an empty array to store the enquiry objects
    const enquiries = [];

    // Iterate through the documents and convert them to objects
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        // Get the data from the document
        const enquiryData = doc.data();

        // Add the document ID to the data object
        enquiryData.id = doc.id;

        // Add the enquiry data to the array
        enquiries.push(enquiryData);
      }
    });
     
    if(enquiries.length > 0 && enquiries[0][0]){
      return {equipments:enquiries[0][0],information:enquiries[0]}
    }
    return undefined
  } catch (error) {
  
    throw new Error(error); // Throw an error if there's an issue
  }
}





/**
 * Adds a comment to an enquiry document in Firestore.
 *
 * @param {string} documentId - The ID of the enquiry document.
 * @param {object} comment - The comment object to be added.
 * @param {string} comment.id - The ID of the comment.
 * @param {string} comment.userId - The ID of the user who posted the comment.
 * @param {string} comment.userName - The username of the user who posted the comment.
 * @param {string} comment.text - The text content of the comment.
 * @param {Date} comment.timestamp - The timestamp when the comment was posted.
 * @param {string} comment.profile - The URL of the user's profile picture.
 * @throws {Error} Throws an error if there is an issue adding the comment to Firestore.
 * @returns {Promise<void>} A Promise that resolves when the comment is added to Firestore.
 */
export async function addCommentToEnquiry(documentId, comment) {
 
  try {
    const enquiryRef = doc(db, 'enquiries', documentId);

    // Update the Firestore document with the new comment using `arrayUnion`.
    await updateDoc(enquiryRef, {
      comments: arrayUnion(comment),
    });

  
  } catch (error) {
    // Throw an error to indicate that there was a problem adding the comment to Firestore.
    throw new Error(error)
  }
}



/**
 * Adds a reply to a comment in an enquiry document in Firestore.
 *
 * @param {string} documentId - The ID of the enquiry document.
 * @param {string} commentId - The ID of the parent comment to which the reply belongs.
 * @param {object} reply - The reply object to be added.
 * @param {string} reply.id - The ID of the reply.
 * @param {string} reply.userId - The ID of the user who posted the reply.
 * @param {string} reply.userName - The username of the user who posted the reply.
 * @param {string} reply.text - The text content of the reply.
 * @param {Date} reply.timestamp - The timestamp when the reply was posted.
 * @param {string} reply.profile - The URL of the user's profile picture.
 * @throws {Error} Throws an error if there is an issue adding the reply to Firestore.
 * @returns {Promise<void>} A Promise that resolves when the reply is added to Firestore.
 */
export async function addReplyToCommentInEnquiry(documentId, commentId, reply) {
  try {
    const enquiryRef = doc(db, 'enquiries', documentId);

    // Get the current document data from Firestore.
    const enquirySnapshot = await getDoc(enquiryRef);
    const enquiryData = enquirySnapshot.data() || {}; // Ensure you have an empty object as a fallback.

    // Get the current comments array or initialize it if it doesn't exist.
    const comments = enquiryData.comments || [];

    // Find the parent comment by its ID.
    const parentComment = comments.find(comment => comment.id === commentId);

    if (parentComment) {
      parentComment.replies = parentComment.replies || [];
      parentComment.replies.push(reply);

      // Update the comments array in the document data.
      enquiryData.comments = comments;

      // Update the Firestore document with the modified document data.
      await setDoc(enquiryRef, enquiryData); // Set the entire document data.
    } else {
      throw new Error('Parent comment not found.');
    }

  } catch (error) {
    // Throw an error to indicate that there was a problem adding the reply to Firestore.
    throw new Error(error);
  }
}




/**
 * Retrieves enquiries for a logged-in user based on their userId.
 *
 * @param {string} userId - The user's unique identifier.
 * @return {Promise<Array>} - An promise that resolves to an array of enquiries associated with the user.
 * @throws {Error} - Throws an error if there's an issue while fetching the enquiries.
 */
export async function getLoggedInUserEnquries(userId) {
  try {
    // Reference to the 'enquiries' collection in your database
    const ref = collection(db, 'enquiries');

    // Create a query to fetch enquiries where 'userId' matches the provided userId
    const q = query(ref, where('userId', '==', userId));

    // Retrieve the query snapshot
    const querySnapshot = await getDocs(q);

    let enquires = [];

    // Loop through each document in the query snapshot
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        // Get the data from the document
        const enquiryData = doc.data();
        enquiryData.id = doc.id;

        enquires.push(enquiryData);
      }
    });

   

    // Return the array of enquiries associated with the user
    return enquires;
  } catch (error) {
    // Throw an error if there's an issue while fetching the enquiries
    throw new Error(error);
  }
}



/**
 * Retrieves enquiries that match the user's structured categories.
 *
 * @param {string} userId - The user's unique identifier.
 * @return {Promise<Array>} - An array of promises that resolve to enquiries that match the user's categories.
 * @throws {Error} - Throws an error if there's an issue while fetching the data.
 */
export async function getUserCategoriesSpecificEnquiries(userId) {
  try {
    // Fetch the user's data from the 'customers' collection
    const customerRef = collection(db, 'customers');
    const customerQuery = query(customerRef, where('userId', '==', userId));
    const customerSnapshot = await getDocs(customerQuery);

    // Check if a user with the provided userId exists
    if (customerSnapshot.empty) {
      throw new Error('User not found in the customers collection.');
    }

    // Extract the user's structured categories from the first matching document
    const userData = customerSnapshot.docs[0].data();
    const userCategories = userData.categories;

    // Fetch all enquiries from the 'enquiries' collection
    const enquiriesRef = collection(db, 'enquiries');
    const enquiriesSnapshot = await getDocs(enquiriesRef);

    // Filter and extract enquiries that match the user's structured categories
    const matchingEnquiries = [];
    enquiriesSnapshot.forEach((doc) => {
      const enquiryData = doc.data();
      enquiryData.id = doc.id;
      
      // Check if the parent category (marineSystem) matches
      const parentCategory = userCategories?.find(category => category.name === enquiryData.marineSystem);

      if (parentCategory) {
        // Check if the machinery and system categories match within the parent category
        const userMachinery = parentCategory?.subcategories?.find(subCategory => subCategory.name === enquiryData.machinery);
        const userSystem = parentCategory?.subcategories?.find(subCategory => subCategory.name === enquiryData.system);
        
        if (userMachinery && userSystem) {
          matchingEnquiries.push(enquiryData);
        }
      }
    });

    return matchingEnquiries;
  } catch (error) {
    // throw an error if there's an issue
    throw new Error(error);
  }
}







/**
 * Retrieves all enquiries for a specific user ID and filters out the accepted offers for buyers only.
 *
 * @param {string} userId - The ID of the user to retrieve enquiries for.
 * @returns {Promise<Array<Object>>} - A Promise that resolves with an array of enquiries
 * where each enquiry contains only the accepted offers with additional seller data.
 * @throws {Error} - Throws an error if there is an issue fetching the enquiries or filtering the offers.
 */
export async function getEnquiriesWithAcceptedOffersBuyer(userId) {
  try {
      // Reference to the 'enquiries' collection in Firestore.
      const enquiriesRef = collection(db, 'enquiries');

      // Fetch enquiries for the specified user ID.
      const querySnapshot = await getDocs(enquiriesRef, where('userId', '==', userId));

      // Extract enquiries data from the query snapshot and filter accepted offers.
      const enquiriesWithAcceptedOffers = [];
      for (const document of querySnapshot.docs) {
          const enquiry = document.data();
          enquiry.id = document.id;
          const acceptedOffers = await Promise.all(
              enquiry.offers
                  .filter(offer => offer.status === 'accepted' || offer.status === 'completed')
                  .map(async offer => {
                      const sellerDoc = await getDoc(doc(db, 'customers', offer.sellerId));
                      const sellerData = sellerDoc.data();
                      return {
                          id:enquiry.id,
                          ...offer,
                          seller: {
                              firstname: sellerData.firstname,
                              lastname: sellerData.lastname
                          }
                      };
                  })
          );
          if (acceptedOffers.length > 0) {
              enquiriesWithAcceptedOffers.push(acceptedOffers[0]);
          }
      }

      // Return enquiries with accepted offers and additional seller data.
      return enquiriesWithAcceptedOffers;
  } catch (error) {
      // Handle errors and throw an error if there is an issue fetching the data or filtering the offers.
      throw new Error(error);
  }







}
/**
 * Retrieves all enquiries for a specific user ID and filters out the accepted offers for sellers only.
 *
 * @param {string} userId - The ID of the user to retrieve enquiries for.
 * @returns {Promise<Array<Object>>} - A Promise that resolves with an array of enquiries
 * where each enquiry contains only the accepted offers with additional seller data.
 * @throws {Error} - Throws an error if there is an issue fetching the enquiries or filtering the offers.
 */
export async function getEnquiriesWithAcceptedOffersSeller(userId) {
  try {
      // Reference to the 'enquiries' collection in Firestore.
      const enquiriesRef = collection(db, 'enquiries');

      // Fetch enquiries for the specified user ID.
      const querySnapshot = await getDocs(enquiriesRef);

      // Extract enquiries data from the query snapshot and filter accepted offers.
      const enquiriesWithAcceptedOffers = [];
      for (const document of querySnapshot.docs) {
          const enquiry = document.data();
          enquiry.id = document.id;
          const acceptedOffers = await Promise.all(
              enquiry.offers
                  .filter(offer => (offer.status === 'accepted' && offer.sellerId===userId) || offer.status === 'completed')
                  .map(async offer => {
                      const sellerDoc = await getDoc(doc(db, 'customers', offer.sellerId));
                      const sellerData = sellerDoc.data();
                      return {
                          id:enquiry.id,
                          ...offer,
                          seller: {
                              firstname: sellerData.firstname,
                              lastname: sellerData.lastname
                          }
                      };
                  })
          );
          if (acceptedOffers.length > 0) {
              enquiriesWithAcceptedOffers.push(acceptedOffers[0]);
          }
      }

      // Return enquiries with accepted offers and additional seller data.
      return enquiriesWithAcceptedOffers;
  } catch (error) {
      // Handle errors and throw an error if there is an issue fetching the data or filtering the offers.
      throw new Error(error);
  }
}