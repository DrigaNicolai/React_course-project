import React from 'react';
import {IPost} from "../models";
import MyButton from "./UI/button/MyButton";

interface PostProps {
  post: IPost,
  number: number,
  remove: (post: IPost) => void
}

const PostItem = ({post, number, remove}: PostProps) => {
  return (
    <div className="post">
      <div className="post__content">
        <strong>{ number }. { post.title }</strong>
        <div>
          { post.body }
        </div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => remove(post)}>
          Delete
        </MyButton>
      </div>
    </div>
  );
};

export default PostItem;
