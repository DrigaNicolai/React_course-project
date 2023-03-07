import {useMemo} from "react";
import {IPost} from "../models";

export const useSortedPosts = (posts: IPost[], sort: string) => {
  const sortedPosts = useMemo(() => {
    console.log("Sorted posts function works")
    if (sort) {
      return [...posts].sort((a: any, b: any) => a[sort].localeCompare(b[sort]));
    }

    return posts;
  }, [sort, posts]);

  return sortedPosts;
}

export const usePosts = (posts: IPost[], sort: string, query: string) => {
  const sortedPosts = useSortedPosts(posts, sort);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
}