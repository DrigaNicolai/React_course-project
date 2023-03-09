import React from 'react';
import {IPost} from "../models";
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom";

interface PostProps {
  post: IPost,
  number?: number,
  remove: (post: IPost) => void
}

const PostItem = ({post, number, remove}: PostProps) => {
  {/* react-router-dom v6: useNavigate v5: useHistory */}
  const router = useNavigate();

  return (
    <div className="post">
      <div className="post__content">
        <strong>{ post.id }. { post.title }</strong>
        <div>
          { post.body }
        </div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => router(`/posts/${post.id}`)}>
          Open
        </MyButton>
        <MyButton onClick={() => remove(post)}>
          Delete
        </MyButton>
      </div>
    </div>
  );
};

export default PostItem;
