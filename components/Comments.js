import { useState } from 'react';
import Image from "next/image";
import { AiOutlineFlag } from 'react-icons/ai';
import { useRouter } from "next/router";
import { Modal, Button, Checkbox } from 'antd';
import { IoIosInformationCircle } from 'react-icons/io'; 
import {  Work_Sans } from "next/font/google";

const font6 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const ReplyButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="text-black focus:outline-none ml-5">
      <div className="flex items-center text-sm">
        <div className="relative mr-1 w-3 h-3 px-2 py-2">
          <Image src="/assets/replyIcon.png" alt="Reply Icon" fill objectFit="contain" />
        </div>
        <p>Reply</p>
      </div>
    </button>
  );
};

const ReplyItem = ({ reply, wrapperStyles, handleReportClick }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [newReply, setNewReply] = useState([]);
  const { user, comments, day } = reply;


const handleReplyClick = () => {
  setShowReplyInput(true);
};

const handleReplySubmit = () => {
  // Logic to submit the reply
  // For now, we just log the reply to the console
  console.log(newReply);
  setShowReplyInput(false);
  setNewReply('');
};

//  const handleReportClick = () => {
//     router.push({
//       pathname: '/Report',
//       query: {
//         commentId: reply.id, 
//         commentUser: reply.user, 
//       },
//     });
//   };
  

  return (
    <div className="flex items-start mt-2 pb-2 ">
    <div className="relative aspect-square rounded-md w-full min-w-[30px] max-w-[50px] overflow-hidden mr-3">
        <Image
          src={reply.profile}
          alt="Profile"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={wrapperStyles ? `rounded-md border border-grey-600 px-0 smd:px-4 py-5 overflow-hidden` : ``}>
        <div className="flex justify-between items-center w-full mb-1 text-sm font-bold flex-wrap">
          <div className='flex'><p>{reply.user}</p> <p className="text-xs text-gray-500 ml-4 smd:ml-[1.6rem]">
            {reply.day}
          </p>
          
          </div>
          <div className="ssmd:flex items-start m-0 p-0 hidden">
          <div className="relative text-[#777777] font-[500]">
            <button onClick={() => handleReportClick(reply)} className="focus:outline-none flex h-0">
              <div className="flex text-sm ">
                <div className="relative w-4 h-8">
                <Image src='/assets/flag.svg' alt="report" width={10} height={10} />
                </div>
                <p>Report</p>
              </div>
            </button>
          </div>
          {!showReplyInput && <ReplyButton onClick={handleReplyClick} />}
          </div>
          </div>
        <div>
          <p>{comments}</p>
          <div className="flex">

          </div>
          
          <div className="items-start mt-4 p-0 flex ssmd:hidden">
          <div className="relative text-[#777777] font-[500]">
            <button onClick={() => handleReportClick(props.eachComment)} className="focus:outline-none flex h-0">
              <div className="flex text-sm ">
              <div className="relative w-4 h-8">
                <Image src='/assets/flag.svg' alt="report" width={10} height={10} />
                </div>
                <p>Report</p>
              </div>
            </button>
          </div>
          {!showReplyInput && <ReplyButton onClick={handleReplyClick} />}
          </div>
          
        </div>
        <div className="flex w-full justify-end sm:items-center sm:justify-start sm:ml-[1.6rem] mt-[0.3rem]">
       
        {showReplyInput && (
          <div className="flex items-center w-full mr-4">
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Write your reply here..."
              className="w-full py-2 px-2 text-sm h-[70px] border rounded focus:outline-none resize-none mr-2"
            />
            <button
              onClick={handleReplySubmit}
              className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded focus:outline-none"
            >
              Submit
            </button>
          </div>
        )}
      </div>
      </div>
      
    </div>
  );
};

const Comments = (props) => {
  const [visibleReplies, setVisibleReplies] = useState(2); // Number of replies initially visible
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [newReply, setNewReply] = useState([]);
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [commentUser, setCommentUser] = useState('');
  const [commentId, setCommentId] = useState('');

  const router = useRouter()
  // const handleReportClick = () => {
  //   router.push({
  //     pathname: '/Report',
  //     query: {
  //       commentId: props.eachComment.id, 
  //       commentUser: props.eachComment.user, 
  //     },
  //   });
  // };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCommentUser('')
    setCommentId('')
  };

  const handleReportClick = (comment) => {
    setCommentUser(comment.user)
    setCommentId(comment.id)
    handleOpenModal();
  };

  const handleReport = (e) => {
    e.preventDefault();
    if (reason === '') {
      setErrorMessage('Please select one reason.');
      return;
    }
    
    setIsLoading(true);

    console.log('Reported Comment ID:', commentId);
    console.log('Reported User:', commentUser);
    console.log('Reason:', reason);
    console.log('Other Reason:', otherReason);

    setTimeout(() => {
      setIsLoading(false);
      setErrorMessage('');
      setIsSubmitted(true);
      setCommentUser('')
      setCommentId('')


      setTimeout(() => {
        handleCloseModal()
      }, 3000);
    }, 2000);
  };



  
  
const handleReplyClick = () => {
  setShowReplyInput(true);
};

const handleReplySubmit = () => {
 
  console.log(newReply);
  setShowReplyInput(false);
  setNewReply('');
};
  const handleViewMoreReplies = () => {
    setVisibleReplies(props.eachComment.replies.length);
  };

  return (
    <div className="flex items-start my-3 mx-5">
      <div className="relative aspect-square rounded-full  min-w-[60px] max-w-[80px] mr-3 sm:my-2 sm:mr-auto">
        <Image
          src={props.eachComment.profile}
          alt="Profile"
          fill
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div>
      <div className={ props.wrapperStyles ? `sm:px-5 sm:py-4 px-auto border border-grey-600 rounded-lg mb-5` : `sm:px-5 sm:py-4 px-auto`}>
        <div className="w-full font-bold us:text-[14px] flex align-center justify-start sm:justify-between mb-3 flex-wrap">
          <div className='flex '>
          <p>{props.eachComment.userId}</p>{' '}
          <p className="text-sm text-gray-500 us:text-[14px] ml-3 sm:ml-[1.6rem]">
            {props.eachComment.day}
          </p>
          
          </div>
          <div className="items-start m-0 p-0 hidden ssmd:flex">
          <div className="relative text-[#777777] font-[500]">
            <button onClick={() => handleReportClick(props.eachComment)} className="focus:outline-none flex h-0">
              <div className="flex text-sm ">
              <div className="relative w-4 h-8">
                <Image src='/assets/flag.svg' alt="report" width={10} height={10} />
                </div>
                <p>Report</p>
              </div>
            </button>
          </div>
          {!showReplyInput && <ReplyButton onClick={handleReplyClick} />}
          </div>
          
        </div>
        <div className={ props.wrapperStyles ? `sm:px-2 pb-8 us:text-[15px]`: `sm:px-2 pb-8 us:text-[15px] rounded border-b border-[#E6D8D8]`}>
          <p>{props.eachComment.text}</p>
          <div className="flex items-center">
          <div className="items-start mt-4 p-0 flex ssmd:hidden">
          <div className="relative text-[#777777] font-[500]">
            <button onClick={() => handleReportClick(props.eachComment)} className="focus:outline-none flex h-0">
              <div className="flex text-sm ">
              <div className="relative w-4 h-8">
                <Image src='/assets/flag.svg' alt="report" width={10} height={10} />
                </div>
                <p>Report</p>
              </div>
            </button>
          </div>
          {!showReplyInput && <ReplyButton onClick={handleReplyClick} />}
          </div>
          {props.placeOrder && (
  <button className="bg-[#F6BE00] w-30 sm-auto text-xs sm:text-[12px] mt-4 ml-4 md:ml-0 rounded-full py-2 px-3 text-black transition-all duration-300 hover:bg-yellow-400 hover:scale-105 focus:outline-none"
  onClick={() => props.orderFunction(props.eachComment.id, props.eachComment.user)}>
Place an Order
</button>
          )}
        

          </div>

          
         
        </div>
        <div className="flex w-full justify-end sm:items-center sm:justify-start sm:ml-[1.6rem] mt-[0.3rem]">
       
       {showReplyInput && (
         <div className="flex items-center w-full mr-4">
           <textarea
             value={newReply}
             onChange={(e) => setNewReply(e.target.value)}
             placeholder="Write your reply here..."
             className="w-full py-2 px-2 text-sm h-[70px] border rounded focus:outline-none resize-none mr-2"
           />
           <button
             onClick={handleReplySubmit}
             className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded focus:outline-none"
           >
             Submit
           </button>
         </div>
       )}
     </div>
        </div>
        {props.eachComment.replies.length > visibleReplies && (
          <button
            onClick={handleViewMoreReplies}
            className="mt-2 text-sm text-blue-500 focus:outline-none"
          >
            View More Replies
          </button>
        )}
        {props.eachComment.replies.slice(0, visibleReplies).map((reply, index) => (
          <ReplyItem wrapperStyles={props.wrapperStyles} key={index} reply={reply} handleReportClick={handleReportClick} />
        ))}

       
      </div>
      <Modal
        title={
          <h1 className={`font-[700] text-[24px] text-center ${font6.className}`}>
              Why do you wish to report this message?
            </h1>
        }
        visible={isModalOpen}
        onCancel={handleCloseModal}
        footer={null} // We'll use a custom footer for the modal
        style={{minWidth: "65%", height:"80vh", top: '50%', 
        transform: 'translateY(-50%)',}}
      >
        <div className="flex flex-col items-center justify-center w-full">            
            <div className="bg-[#1E7FCB2E] w-full text-[16px] px-3 py-3 flex items-center mt-2 rounded-md">
              <div className="flex items-center justify-center">
                <IoIosInformationCircle
                  size={24}
                  style={{ color: '#1E7FCB', marginRight: '5px' }}
                />
              </div>
              <p className="text-[#1E7FCB]">Your report will be kept anonymous</p>
            </div>
           {!isSubmitted && (
            <form className="py-4 flex flex-col w-full px-2" onSubmit={handleReport}>
              <label className={`my-3 ${font6.className} text-[#000000]`}>
                <input
                  type="radio"
                  value="Payment or Communication Outside Maglo"
                  checked={reason === 'Payment or Communication Outside Maglo'}
                  onChange={(e) => setReason(e.target.value)}
                  className="mr-2 h-4 w-4 "
                  
                />
                The user asked for payment or wanted to communicate Outside Maglo
              </label>

              <label className={`my-3 ${font6.className} text-[#000000]`}>
                <input
                  type="radio"
                  value="Behaved Inappropriately"
                  checked={reason === 'Behaved Inappropriately'}
                  onChange={(e) => setReason(e.target.value)}
                  className="mr-2 h-4 w-4 "
                />
                The user behaved Inappropriately
              </label>

              <label className={`my-3 ${font6.className} text-[#000000]`}>
                <input
                  type="radio"
                  value="Sent Spam"
                  checked={reason === 'Sent Spam'}
                  onChange={(e) => setReason(e.target.value)}
                  className="mr-2 h-4 w-4 "
                />
                The user Sent Spam
              </label>

              <label className={`my-2 ${font6.className} text-[#000000]`}>
                <input
                  type="radio"
                  value="Other"
                  checked={reason === 'Other'}
                  onChange={(e) => setReason(e.target.value)}
                  className="mr-2 h-4 w-4 "
                />
                Other
              </label>

              {reason === 'Other' && (
                <textarea
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="Tell us what went wrong"
                  className={`my-1 rounded-sm border border-[#1E7FCB5E] focus:outline-none px-3 py-2 h-[200px] ${font6.className} text-[#000000] `}
                  style={{ resize: 'none' }}
                />
              )}

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            
                
            

              <div className="w-full flex justify-end mt-4">
                <button
                  className="bg-[#F6BE00] rounded-md py-2 px-5 text-black font-[400] text-[16px] hover:bg-[DF9F3E] ease-in duration-300 transition-all"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
           ) } 
           {isSubmitted && (<p className="text-green-500 my-5 text-[500] text-[18px]">Your report has been submitted.</p>)}
        
        </div>
      </Modal>
    </div>
  );
};

export default Comments;
