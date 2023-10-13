import React from 'react'
import { useRouter } from 'next/router';
import RejectedSeller from '../components/RejectedSeller'
import PendingSeller from '../components/PendingSeller';

const status_seller = () => {
    const router = useRouter();
    const { status} = router.query;

    const statusEnum = {
        rejected:<RejectedSeller/>,
        pending:<PendingSeller/>,
    }

  return statusEnum[status];
}

export default status_seller