import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

interface PostFilterProps {
  filter: {
    sort: string,
    query: string
  },
  setFilter: (filter: {
    sort: string,
    query: string
  }) => void
}

const PostFilter = ({filter, setFilter}: PostFilterProps) => {
  return (
    <div>
      <MyInput
        value={filter.query}
        placeholder="Search"
        onChange={(e: { target: { value: string; }; }) => setFilter({...filter, query: e.target.value})}
      />
      <MySelect
        value={filter.sort}
        defaultValue="Sort"
        options={[
          { value: "title", name: "By title" },
          { value: "body", name: "By body" },
        ]}
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
      />
    </div>
  );
};

export default PostFilter;
