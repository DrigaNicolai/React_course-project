import React from 'react';
import PostItem from "./PostItem";
import {IPost} from "../models";

interface PostsProps {
  posts: IPost[],
  title: string
}

const PostList = ({posts, title}: PostsProps) => {
  return (
    <div>
      <h1 style={ { textAlign: "center"} }>{ title }</h1>
      { posts.map(post =>
          <PostItem
            post={post}
            key={post.id}
          />
        )
      }
    </div>
  );
};

export default PostList;