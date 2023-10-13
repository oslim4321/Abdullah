import {initializeApp,cert,getApps} from 'firebase-admin/app'
import {getFirestore} from 'firebase-admin/firestore'
import serviceAccount from './maglo-62c90-firebase-adminsdk-hf8wi-603a3ecd9e.json';


if(!getApps().length){
    initializeApp({
        credential: cert(serviceAccount)
    })
}

export const db = getFirestore()


