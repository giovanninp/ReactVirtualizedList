import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";

function List({
  itemsCount,
  itemSize,
  height,
  width,
  renderItem: RenderItem = () => null
}) {
  const listRef = useRef();
  const [fromTop, setFromTop] = useState(0);
  const items = useMemo(() => Array(itemsCount).fill(), [itemsCount]);

  const handleScroll = () => {
    if (listRef.current) {
      setFromTop(listRef.current?.scrollTop ?? 0);
    }
  };

  const shouldRender = useCallback(
    (index) => {
      const max = fromTop + height;
      const posix = (index + 1) * itemSize;

      return posix > fromTop && posix < max;
    },
    [height, itemSize, fromTop]
  );

  return (
    <div
      ref={listRef}
      style={{ maxHeight: `${height}px`, width: `${width}px` }}
      className={styles.container}
      onScroll={handleScroll}
    >
      {items.map((_, index) => (
        <div
          style={{ height: `${itemSize}px`, width: `${width}px` }}
          className={styles.item}
        >
          {shouldRender(index) && <RenderItem index={index} />}
        </div>
      ))}
    </div>
  );
}

export default List;
