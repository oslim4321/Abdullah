import React, { useState } from "react";
import { Spin, message } from "antd";
import {
  addCommentToEnquiry,
  addReplyToCommentInEnquiry,
} from "../lib/enquiry";
import { useAuth } from "../context/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import timeAgo from "../lib/TimeAgo";
import Image from "next/image";
import Replies from "./Replies";

const CommentList = ({ comments, documentId, setComments, fetchEnquires }) => {
  const [commentText, setNewComment] = useState("");
  const [expandedComments, setExpandedComments] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const [replyText, setReplyText] = useState("");
  const [sort, setSort] = useState("recent");

  const handleCommentSubmit = async () => {
    if (!commentText) {
      return message.error("Please enter comment");
    }
    setIsSpinning(true);
    try {
      const newComment = {
        id: uuidv4(),
        text: commentText,
        timestamp: Date.now(),
        id: user?.userId,
        userName: user?.userName,
        profile:
          user?.profile ||
          "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
        replies: [],
      };

      await addCommentToEnquiry(documentId, newComment);

      if (fetchEnquires) {
        fetchEnquires();
      } else {
        const updatedComments = [...comments];
        updatedComments.push(newComment);

        setComments(updatedComments);
      }
      message.success("Comment added successfully");

      setNewComment("");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsSpinning(false);
    }
  };

  const handleReplySubmit = async (commentId) => {
    setIsSpinning(true);
    try {
      const newReply = {
        id: uuidv4(),
        text: replyText,
        timestamp: Date.now(),
        id: user?.userId,
        userName: user?.userName,
        profile:
          user?.profile ||
          "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      };

      await addReplyToCommentInEnquiry(documentId, commentId, newReply);

      if (fetchEnquires) {
        fetchEnquires();
      } else {
        const updateComments = comments.map((comment) => {
          if (comment.id === commentId) {
            comment.replies.unshift(newReply);
          }
          return comment;
        });

        setComments(updateComments);
      }
      message.success("Reply added successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsSpinning(false);
    }
  };

  const toggleReplies = (commentId) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter((id) => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };

  const sortedComments =
    sort === "recent"
      ? comments?.sort((a, b) => b.timestamp - a.timestamp)
      : comments?.sort((a, b) => a.timestamp - b.timestamp);

  console.log({ sortedComments });
  return (
    <Spin spinning={isSpinning}>
      <div className="mt-20 min-h-[600px] border overflow-y-auto ">
        {/* Comments Header Section */}
        <div
          className="xs:py-2 flex xs:flex-row flex-col space-y-3 xs:space-y-0 xs:justify-between items-center h-[100px] xs:h-[120px] px-4 border border-[#D6D6D6]"
          style={{ background: "rgba(222, 241, 255, 0.40)" }}
        >
          <h1 className="text-2xl text-[#1E7FCB] font-semibold">
            Comments ({comments?.length})
          </h1>
          <div className="flex items-center space-x-2 ">
            <label className="font-semibold" htmlFor="sort">
              Sort by
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 cursor-pointer"
              name="sort"
              id="sort"
            >
              <option value="recent">Newest</option>
              <option value="old">Oldest</option>
            </select>
          </div>
        </div>

        {/* Comments List Section */}
        {sortedComments.map((comment, index) => (
          <div key={index}>
            <div className="p-10 flex gap-x-4">
              <Image
                src={comment.profile}
                width={100}
                height={100}
                alt="profile"
                className="w-[92px] h-[92px]"
              />
              <div>
                <div className="border-b pb-3">
                  <div className="flex gap-x-4">
                    <h3 className="text-Black text-base font-bold leading-6">
                      {comment.userName}
                    </h3>
                    <p className="text-[#777] font-roboto text-base font-normal leading-6">
                      {timeAgo.format(comment?.timestamp)} - Public
                    </p>
                  </div>
                  <p className="text-Black font-roboto text-base font-normal leading-6">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-x-3 my-4">
                    <div className="mr-5 flex items-center gap-x-4">
                      <p className="border p-2 text-Black font-roboto text-sm font-normal leading-6">
                        52
                      </p>
                      <p className="text-[#777]  text-base font-normal leading-6">
                        Reply
                      </p>
                    </div>
                    <p className="text-[#777]  text-base font-normal leading-6">
                      Report
                    </p>
                  </div>
                </div>

                {/* replies */}
                {comment.replies.length > 0 && (
                  <div>
                    <div className="flex">
                      <h2 className="text-black  text-base font-medium leading-6">
                        {comment.replies.length == 1
                          ? `View Comment `
                          : ` View All ${comment.replies.length} Replies`}
                      </h2>
                      <p className="text-[#777] font-roboto text-base font-normal leading-6">
                        5 days ago
                      </p>
                    </div>

                    <Replies replies={comment.replies} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* {sortedComments?.map((comment) => {
          return (
            <div className="md:mt-32 mt-20">
              <div className="mt-10 grid px-2 py-4 grid-cols-8">
                <div className="p-2 sm:col-span-1 col-span-8 flex justify-center items-start">
                  <img
                    className="rounded-full bg-[#D6D6D6] border"
                    height={"80px"}
                    width={"80px"}
                    src={comment.profile}
                    alt="user profile image"
                  />
                </div>

                <div className="sm:col-span-7 col-span-8">
                  <div className="md:w-[30%] w-full flex justify-between items-center ">
                    <p className="text-lg font-semibold">{comment?.userName}</p>
                    <p className="text-sm font-extralight">
                      {timeAgo.format(comment?.timestamp)}
                    </p>
                  </div>
                  <p className="mt-2">{comment?.text}</p>
                  <div className="border mt-14"></div>
                  <p
                    onClick={() => toggleReplies(comment.id)}
                    className="mt-2 cursor-pointer"
                  >
                    View all {comment?.replies?.length} replies
                  </p> */}

        {/* Replies Section */}

        {/* {expandedComments.includes(comment.id) &&
                    comment?.replies?.map((reply, index) => {
                      return (
                        <div className="md:mt-20 mt-10" key={index}>
                          <div className="mt-10 grid px-2 py-4 grid-cols-8">
                            <div className="p-2 sm:col-span-1 col-span-8 flex justify-center items-start">
                              <img
                                className="rounded-full bg-[#D6D6D6] border"
                                height={"80px"}
                                width={"80px"}
                                src={
                                  user?.profile ||
                                  "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                                }
                                alt=""
                              />
                            </div>

                            <div className="sm:col-span-7 col-span-8">
                              <div className="md:w-[30%] w-full flex justify-between items-center ">
                                <p className="text-lg font-semibold">
                                  {reply?.userName}
                                </p>
                                <p className="text-sm font-extralight">
                                  {timeAgo.format(reply?.timestamp)}
                                </p>
                              </div>
                              <p className="mt-2">{reply?.text}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })} */}
        {/* reply comment
                  <div className="mt-10 grid place-items-center px-2 py-4 grid-cols-8">
                    <div className="p-2 sm:col-span-1 col-span-8 flex justify-center items-center">
                      <img
                        className="rounded-full bg-[#D6D6D6] border"
                        height={"80px"}
                        width={"80px"}
                        src={
                          user?.profile ||
                          "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                        }
                        alt=""
                      />
                    </div>
                    <div className="sm:col-span-7 col-span-8">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply"
                        name="reply"
                        id=""
                        cols="1000"
                        className="border w-full px-2 py-1 border-[#D6D6D6] rounded focus:outline-none"
                        rows="4"
                      ></textarea>
                      <button
                        disabled={!isLoggedIn}
                        onClick={() => handleReplySubmit(comment?.id)}
                        className="mt-2 px-6 py-2 bg-[#f6be00] rounded-2xl hover:opacity-50 transition"
                      >
                        {isLoggedIn ? "Reply" : "Login to Reply comment"}
                      </button>
                    </div>
                  </div> */}
        {/* </div>
              </div>
            </div>
          );
        })} */}

        {/* Add comment Section */}

        <div className="mt-10 grid place-items-center px-2 py-4 grid-cols-5">
          <div className="p-2 sm:col-span-1 col-span-5 flex justify-center items-center">
            <img
              className="rounded-full bg-[#D6D6D6] border"
              height={"80px"}
              width={"80px"}
              src={
                user?.profile ||
                "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
              }
              alt=""
            />
          </div>
          <div className="sm:col-span-4 col-span-5 mt-10">
            <div className="border flex items-center p-4">
              <textarea
                resize-none
                value={commentText}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment"
                name="comment"
                id=""
                cols="1000"
                className="outline-none border-none w-full border-[#D6D6D6] rounded focus:outline-none resize-none p-2"
                rows="4"
              ></textarea>

              <button
                disabled={!isLoggedIn}
                className={`${
                  isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                onClick={handleCommentSubmit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="30"
                  viewBox="0 0 33 30"
                  fill="none"
                >
                  <path
                    d="M30.25 2.5L15.125 16.25"
                    stroke="#1E7FCB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M30.25 2.5L20.625 27.5L15.125 16.25L2.75 11.25L30.25 2.5Z"
                    stroke="#1E7FCB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default CommentList;
