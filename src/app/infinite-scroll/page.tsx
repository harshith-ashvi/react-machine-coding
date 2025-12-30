"use client";

import { useEffect, useRef, useState } from "react";

type ResultInterface = {
  data: { id: number; text: string }[];
  hasMore: boolean;
};

const TOTAL_ITEMS = 100;

function fetchApi(page: number, limit = 20) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startLimit = page * limit;
      const endLimit = startLimit + limit;

      const data = Array.from(
        { length: Math.min(limit, TOTAL_ITEMS - startLimit) },
        (_, i) => ({
          id: startLimit + i,
          text: `Item ${startLimit + i + 1}`,
        })
      );

      resolve({ data, hasMore: endLimit < TOTAL_ITEMS });
    }, 1000);
  });
}

const InfiniteScroll = () => {
  const [items, setItems] = useState<{ id: number; text: string }[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<ResizeObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const result = await fetchApi(page);
      setItems((prevState) => [
        ...prevState,
        ...(result as ResultInterface).data,
      ]);
      setHasMore((result as ResultInterface).hasMore);
      setIsLoading(false);
      setPage((prevState) => prevState + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => observerRef?.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, isLoading]);

  return (
    <div className="max-w-4xl mx-auto py-20">
      <h1>Intersection Observer Infinite Scroll</h1>

      {items.map((item) => (
        <div key={item.id}>
          <p>{item.text}</p>
        </div>
      ))}

      {isLoading && <div>Loading More...</div>}
      {!hasMore && <div>No More Items</div>}

      <div ref={sentinelRef} className="h-1" />
    </div>
  );
};

export default InfiniteScroll;
