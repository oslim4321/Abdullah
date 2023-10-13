import React from "react";

const CommentListStatic = () => {
  return (
    <div>
      <div className="w-full bg-[#EFF8FF] py-[20px]">
        <h2 className="text-[#1E7FCB] text-center text-2xl font-medium leading-6">
          Comments
        </h2>
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
    </div>
  );
};

export default CommentListStatic;
