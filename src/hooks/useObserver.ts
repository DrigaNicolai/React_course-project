import React, {useEffect, useRef} from "react";

interface UseObserverProps {
  ref: React.ReactNode | any,
  canLoad: boolean,
  isLoading: boolean,
  callback: () => void
}

export const useObserver = (ref: React.ReactNode | any, canLoad: boolean, isLoading: boolean, callback: () => void) => {
  const observer = useRef(null as any);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if(observer.current) {
      observer.current.disconnect();
    }

    const cb = (entries: any, observer: any) => {
      if (entries[0].isIntersecting && canLoad) {
        callback()
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(ref.current);
  }, [isLoading]);
}
