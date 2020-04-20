import { useState, useEffect } from "react";
type CB = () => void;
const useInfiniteScroll: (
  callback: CB
) => [boolean, React.Dispatch<React.SetStateAction<boolean>>] = (callback) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching, callback]);

  function isScrolling() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }
  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
