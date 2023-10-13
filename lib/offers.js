import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import {db} from '../config/firebase'

/**
 * Add an offer object to the 'offers' array in the specified enquiry document,
 * checking for duplicate offers based on sellerId.
 *
 * @param {string} enquiryId - The ID of the enquiry document to be updated.
 * @param {object} offer - The offer object to be added to the 'offers' array.
 * @returns {Promise<string>} - A Promise that resolves with a string indicating
 * either 'DUPLICATE_OFFER' if a duplicate offer is found or 'OFFER_CREATED' if
 * the offer is successfully added.
 * @throws {Error} - Throws an error if the Firestore update fails.
 */
export async function addOfferToEnquiry(enquiryId, offer) {
    const enquiryRef = doc(db, 'enquiries', enquiryId);

    try {
        const enquirySnapshot = await getDoc(enquiryRef);
        const enquiryData = enquirySnapshot.data() || {};

        const offers = enquiryData.offers || [];

        // Check if the offer with the same sellerId already exists.
        const existingOffer = offers.find(existingOffer => existingOffer.sellerId === offer.sellerId);

        if (existingOffer) {
            // If offer with the same sellerId exists, return 'DUPLICATE_OFFER'.
            return 'DUPLICATE_OFFER';
        }

        // Add the new offer to the offers array.
        const updatedOffers = arrayUnion(...offers, offer);

        // Update the 'offers' field in the Firestore document.
        await updateDoc(enquiryRef, { offers: updatedOffers });

        // If offer is added successfully, return 'OFFER_CREATED'.
        return 'OFFER_CREATED';

    } catch (error) {
        // Handle errors and throw an error if the update fails.
        throw new Error(error);
    }
}


/**
 * Updates the status of an offer to 'accepted' and sets acceptedDate in an enquiry document.
 *
 * @param {string} enquiryId - The ID of the enquiry document to be updated.
 * @param {string} offerId - The ID of the offer to be accepted.
 * @returns {Promise<void>} - A Promise that resolves when the offer is updated.
 * @throws {Error} - Throws an error if the Firestore update fails.
 */
export async function updateOfferInEnquiry(enquiryId, offerId) {
    try {
        // Get a reference to the enquiry document in the Firestore database.
        const enquiryRef = doc(db, 'enquiries', enquiryId);

        // Retrieve the enquiry document from Firestore.
        const enquirySnapshot = await getDoc(enquiryRef);
        const enquiryData = enquirySnapshot.data() || {};

        // Retrieve the offers array from the enquiry data.
        const offers = enquiryData.offers || [];

        // Find the offer with the provided offerId.
        const updatedOffers = offers.map(offer => {
            if (offer.offerId === offerId) {
                // Update the status to 'accepted'.
                offer.status = 'accepted';

                // Set acceptedDate to the current timestamp (milliseconds since epoch).
                offer.acceptedDate = Date.now();
            }
            return offer;
        });

        // Update the 'offers' field in the Firestore document.
        await updateDoc(enquiryRef, { offers: updatedOffers });

        // Return a success message indicating that the offer has been accepted.
        Promise.resolve();

    } catch (error) {
        // Handle errors and throw an error if the update fails.
        throw new Error(error);
    }
}




/**
 * Update offer status to completed and set completionDate to current date and time.
 *
 * @param {string} enquiryId - The ID of the enquiry document to update.
 * @param {string} offerId - The ID of the offer to update.
 * @throws {Error} Throws an error if enquiry or offer is not found.
 * @return {Promise<void>} A Promise that resolves to void.
 */
export async function updateOfferStatus(enquiryId, offerId) {
    try {
        const enquiryRef = doc(db, 'enquiries', enquiryId);
        const enquiryDoc = await getDoc(enquiryRef);

        // If the enquiry document does not exist, throw an error.
        if (!enquiryDoc.exists()) {
            throw new Error('Enquiry not found.');
        }

        const offers = enquiryDoc.data().offers;
        const updatedOffers = offers.map((offer) => {
            if (offer.offerId === offerId) {
                return {
                    ...offer,
                    status: 'completed',
                    completionDate: Date.now()
                };
            }
            return offer;
        });

        // Update offer status to completed and set completionDate to current date and time.
        await updateDoc(enquiryRef, { offers: updatedOffers });

        Promise.resolve();
    } catch (error) {
        console.error(error.message);
    }
}





/**
 * Update the ratingByBuyer or ratingBySeller of an offer in the enquiries collection.
 *
 * @param {string} enquiryId - The ID of the enquiry to search for.
 * @param {string} offerId - The ID of the offer to update.
 * @param {number} newRating - The new rating to be set (ratingByBuyer or ratingBySeller).
 * @param {boolean} isBuyer - A flag indicating whether to update ratingByBuyer (true) or ratingBySeller (false).
 * @param {string} review - The review message
 * @throws {Error} Throws an error if the enquiry or offer is not found.
 * @returns {Promise<void>} A Promise that resolves once the update is complete.
 */
export async function updateRating(enquiryId, offerId, newRating, isBuyer, review) {

    try {
        // Reference to the 'enquiries' collection in your database.
        const enquiryRef = doc(db, 'enquiries', enquiryId);

        // Retrieve the enquiry document from Firestore.
        const enquirySnapshot = await getDoc(enquiryRef);

        // If the enquiry document does not exist, throw an error.
        if (!enquirySnapshot.exists()) {
            throw new Error('Enquiry not found.');
        }

        // Get the offers field from the enquiry document and update ratingByBuyer or ratingBySeller.
        const updatedOffers = enquirySnapshot.data().offers.map(offer => {
            if (offer.offerId === offerId) {
                return { ...offer, [isBuyer ? 'ratingByBuyer' : 'ratingBySeller']: {rating: newRating, review}};
            }
            return offer;
        });

        // Update the offers field in the enquiry document.
        await updateDoc(enquiryRef, { offers: updatedOffers });

        // Promise resolves once the update is complete.
         Promise.resolve();
    } catch (error) {
        // Handle and rethrow the error.
        console.log(error);
        throw new Error(error.message);
    }
}


/**
 * Retrieves offers with additional seller data by enquiry ID from the Firestore 'enquiries' collection.
 *
 * @param {string} enquiryId - The ID of the enquiry document in Firestore.
 *
 * @throws {Error} Throws an error if there is an issue retrieving the enquiry or seller data.
 *
 * @returns {Promise<Array|null>} A Promise that resolves with the modified offers array if found,
 * or null if no matching enquiry is found.
 */
export async function getOffersWithSellerDataByEnquiryId (enquiryId) {
    try {
        // Create a reference to the enquiry document using the provided enquiryId.
        const enquiryRef = doc(db, 'enquiries', enquiryId);
        
        // Retrieve the enquiry document from Firestore.
        const enquirySnapshot = await getDoc(enquiryRef);

        // Check if the enquiry document exists.
        if (enquirySnapshot.exists()) {
            // Extract the "offers" field from the enquiry data.
            const { offers } = enquirySnapshot.data();

            // Check if "offers" field is present in the enquiry data.
            if (offers && Array.isArray(offers)) {
                // Iterate through the offers array and fetch additional seller data.
                const offersWithSellerData = await Promise.all(offers.map(async (offer) => {
                    const sellerDocRef = doc(db, 'customers', offer.sellerId);
                    const sellerDocSnapshot = await getDoc(sellerDocRef);

                    if (sellerDocSnapshot.exists()) {
                        const { firstname, lastname } = sellerDocSnapshot.data();
                        // Return modified offer object with additional sellerData.
                        return { ...offer, sellerInfo: { firstname, lastname } };
                    } else {
                        // Handle the case where seller data is not found.
                        return offer;
                    }
                }));

                // Return the modified offers array.
                return offersWithSellerData;
            } else {
                // If "offers" field is not present, return null.
                return null;
            }
        } else {
            // No matching enquiry found, return null.
            return null;
        }
    } catch (error) {
        // Throw an error if there is an issue retrieving the enquiry or seller data.
        throw new Error(`Error getting offers with seller data by enquiry ID: ${error.message}`);
    }
};