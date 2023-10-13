import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import Link from 'next/link';
const { Paragraph, Text } = Typography;
const RejectedSeller = () => (
  <Result
    status="error"
    title="Login Failed"
    subTitle="Your seller account has been rejected. Please try again."
    extra={[
      <Button type="primary" className='bg-[#f6be00]' key="console">
        Go Console
      </Button>,
      <Link href={"/"}>
        <Button key="buy">Go to Home</Button>,
      </Link>
    ]}
  >
    <div className="desc">
      <Paragraph>
        <Text
          strong
          style={{
            fontSize: 16,
          }}
        >
          The content you submitted has the following error:
        </Text>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
        frozen. <a>Thaw immediately &gt;</a>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not yet
        eligible to RejectedSellerly. <a>Apply Unlock &gt;</a>
      </Paragraph>
    </div>
  </Result>
);
export default RejectedSeller;