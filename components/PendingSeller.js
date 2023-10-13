import { Button, Result } from 'antd';
import Link from 'next/link';
const PendingSeller = () => (
  <Result
    status="403"
    title="403"
    subTitle="Your Seller account is being under review once it is approved you will be able to login you will get email notification"
    extra={<Link href={"/"}><Button type="primary" className='bg-[#f6be00]'>Back Home</Button></Link>}
  />
);
export default PendingSeller;