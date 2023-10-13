import React, { useState } from 'react';
import Comments from './Comments';
import Button from './shared/Button.tsx';
import Avatar from '@mui/material/Avatar'; 
import ReplyForm from './ReplyForm';

const CommentsSection = (props) => {
  console.log("🚀 ~ file: CommentsSection.js:8 ~ CommentsSection ~ props:", props)
  const [comments, setComments] = useState(props.comments);
  const [newComment, setNewComment] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const wrapperStyles = props.wrapperStyles;
  const hide = props.hide;

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSubmitComment = () => {
    setNewComment('');
  };

  return (
   <div className='max-w-screen-xl mx-auto'>
     <div className={wrapperStyles ? wrapperStyles : `sm:mx-[4rem] mx-2 mb-5 border border-[#D6D6D6] overflow-hidden`}>
      <div className="flex justify-between items-center mb-4 bg-[#F2F9FF] py-5 px-5 border-b border-[#F2F9FF]">
        <div className="text-lg font-bold text-gray-500">
          {props?.comments?.length} Comments
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm font-bold text-gray-500">Sort:</span>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="p-2 text-sm rounded bg-gray-100 focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {wrapperStyles ? (
        <div style={{ display: "none" }}>
        </div>
      ) : (
        !hide && ( 
          <div className="mt-4 us:mb-[1.6rem] sm:mb-[2.5rem]">
            <div className="flex items-start sm:px-[3rem] px-2 w-full">
              {!hide && ( 
                <Avatar alt="User Avatar" src="/assets/user.jpg" className='mr-4' sx={{ width: 70, height: 70 }} />
              )}
              {!hide && ( 
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Don't miss out on the countless opportunities that await you. Start your inquiry today and unlock the full potential of the Marine Global Network. Together, we will navigate the seas of success."
                  className="w-full us:py-2 us:px-2 us:text-[13px] us:h-[80px] sm:h-auto mdd:text-[15px]  sm:py-5 sm:px-7 mb-2 border rounded focus:outline-none resize-none"
                />
              )}
            </div>
            {!hide && ( 
              <div className='us:my-2 sm:my-[1.4rem] smd:pl-[8.6rem] pl-[3rem]'>
                <Button text="Submit Now" onClick={handleSubmitComment} disabled={!newComment.trim()} />
              </div>
            )}
          </div>
        )
      )}

      <div>
        {props.comments.map((eachComment, index) => (
          <Comments placeOrder={props.placeorder} wrapperStyles={wrapperStyles} key={index} eachComment={eachComment} orderFunction={props.orderFunction} />
        ))}
      </div>
      {wrapperStyles && (
        <ReplyForm />
      )}
    </div>
   </div>
  );
};

export default CommentsSection;
