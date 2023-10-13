import React from 'react'
import Wrapper from '../shared/Wrapper'
import Image from 'next/image'
import image1 from '../../public/assets/best-seller.svg'
import image2 from '../../public/assets/deal.svg'
import image3 from '../../public/assets/payment.svg'
import image4 from '../../public/assets/search-file.svg'

const Results = () => {
  return (
    <section className='py-8'>
        <Wrapper>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mx-6 md:mx-0'>
                <div className='flex items-center justify-center md:space-x-4 space-x-2'>
                    <Image src={image1} alt='best seller' width={70} height={70} className='ml-[-1.5rem] md:ml-0 w-14 h-14 md:w-[70px] md:h-[70px]' />
                    <div className='text-lg font-bold'>
                        <p>Sellers</p>
                        <p>87,908+</p>
                    </div>
                </div>
                <div className='flex items-center justify-center space-x-2 md:space-x-4 '>
                    <Image src={image2} alt='best seller' width={70} height={70} className='w-14 h-14 md:w-[70px] md:h-[70px]'/>
                    <div className='text-lg font-bold'>
                        <p>Buyer</p>
                        <p>87,908+</p>
                    </div>
                </div><div className='flex items-center justify-center md:space-x-4 space-x-2'>
                    <Image src={image3} alt='best seller' width={70} height={70} className='w-14 h-14 md:w-[70px] md:h-[70px]'/>
                    <div className='text-lg font-bold' >
                        <p>Quotation</p>
                        <p>87,908+</p>
                    </div>
                </div><div className='flex items-center justify-center md:space-x-4 space-x-2'>
                    <Image src={image4} alt='best seller' width={70} height={70} className='w-14 h-14 md:w-[70px] md:h-[70px]'/>
                    <div className='text-lg font-bold'>
                        <p>Inquiry</p>
                        <p>87,908+</p>
                    </div>
                </div>

            </div>

        </Wrapper>
    </section>
  )
}

export default Results