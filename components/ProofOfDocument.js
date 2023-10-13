import React, { useState, useEffect } from 'react';
import { Upload, message, Button, Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';

const { Dragger } = Upload;

const ProofOfDocument = ({ businessProof, setBusinessProof }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false); // Track uploading state

  useEffect(() => {
    // Load initial images from businessProof into the fileList
    setFileList(
      businessProof.map((item) => ({
        uid: item.id,
        name: item.url,
        status: 'done',
        url: item.url,
        thumbUrl: item.url, // Thumbnail URL is the same as the full URL
      }))
    );
  }, [businessProof]);

  const handleRemove = async (file) => {
    try {
      const imageRef = ref(storage, `${file.url}`);
      await deleteObject(imageRef);
      const updated = businessProof.filter((item) => item.url !== file.url);
      setBusinessProof(updated);
      setFileList(fileList.filter((item) => item.url !== file.url));
      message.success('File deleted successfully');
    } catch (error) {
      console.log(error);
      message.error('File deletion failed');
    }
  };

  const customRequest = async (options) => {
    const { file, onSuccess, onError, onProgress } = options;
    const uniqueId = uuidv4();
    const imageRef = ref(storage, `competition_images/${uniqueId}_${file.name}`);

    try {
      setUploading(true); // Start uploading, set the loading state

      const snapshot = await uploadBytes(imageRef, file, { // Track progress
        onUploadProgress: (progress) => {
          onProgress({ percent: (progress.bytesTransferred / progress.totalBytes) * 100 });
        },
      });

      const url = await getDownloadURL(snapshot.ref);

      setBusinessProof([
        ...businessProof,
        {
          id: uniqueId,
          url,
        },
      ]);

      setFileList([
        ...fileList,
        {
          uid: uniqueId,
          name: file.name,
          status: 'done',
          url,
          thumbUrl: url, // Thumbnail URL is the same as the full URL
        },
      ]);

      setUploading(false); // Finished uploading, reset the loading state
      onSuccess();
    } catch (error) {
      console.error(error);
      setUploading(false); // Uploading failed, reset the loading state
      onError('File upload failed');
    }
  };

  return (
    <div className='p-10 w-full h-[340px]'>
      <Dragger
        className='w-full h-full'
        maxCount={5}
        fileList={fileList}
        customRequest={customRequest}
        onRemove={handleRemove}
        listType="picture-card" // Display thumbnail cards
      >
        <Spin spinning={uploading} tip="Uploading..."> {/* Show loader while uploading */}
          <p className="ant-upload-drag-icon flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="138" height="104" viewBox="0 0 138 104" fill="none">
                        <path d="M73.9339 104V74.2857H93.6496L69.0049 44.5714L44.3603 74.2857H64.076V104H39.4314V103.752C38.6033 103.802 37.8147 104 36.9669 104C27.1627 104 17.76 100.087 10.8274 93.1211C3.89472 86.1555 0 76.708 0 66.8571C0 47.8004 14.3432 32.2697 32.7478 30.1402C34.3614 21.6646 38.864 14.0189 45.4812 8.51809C52.0984 3.01728 60.4166 0.00522985 69.0049 0C77.5945 0.00483019 85.914 3.01652 92.5328 8.5172C99.1517 14.0179 103.656 21.6638 105.272 30.1402C123.677 32.2697 138 47.8004 138 66.8571C138 76.708 134.105 86.1555 127.173 93.1211C120.24 100.087 110.837 104 101.033 104C100.205 104 99.4065 103.802 98.5686 103.752V104H73.9339Z" fill="#1E7FCB" fill-opacity="0.18" />
                    </svg>
          </p>
        </Spin>
      </Dragger>
    </div>
  );
};

export default ProofOfDocument;
