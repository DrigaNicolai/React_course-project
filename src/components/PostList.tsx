import React from 'react';
import PostItem from "./PostItem";
import {IPost} from "../models";

interface PostsProps {
  posts: IPost[],
  title: string,
  remove: (post: IPost) => void
}

const PostList = ({posts, title, remove}: PostsProps) => {
  return (
    <div>
      <h1 style={ { textAlign: "center"} }>{ title }</h1>
      { posts.map((post, index) =>
          <PostItem
            post={post}
            key={post.id}
            number={index + 1}
            remove={remove}
          />
        )
      }
    </div>
  );
};

export default PostList;
