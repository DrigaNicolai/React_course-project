import React from 'react';
import PostItem from "./PostItem";
import {IPost} from "../models";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

interface PostsProps {
  posts: IPost[],
  title: string,
  remove: (post: IPost) => void
}

const PostList = ({posts, title, remove}: PostsProps) => {
  if (!posts.length) {
    return (
      <h1 style={ { textAlign: "center" } }>
        No posts available!
      </h1>
    )
  }

  return (
    <div>
      <h1 style={ { textAlign: "center"} }>{ title }</h1>
      <TransitionGroup>
        { posts.map((post, index) =>
            <CSSTransition
              key={post.id}
              timeout={500}
              classNames="post"
            >
              <PostItem
                post={post}
                number={index + 1}
                remove={remove}
              />
            </CSSTransition>
          )
        }
      </TransitionGroup>
    </div>
  );
};

export default PostList;
