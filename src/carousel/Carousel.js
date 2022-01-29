import { useEffect, useState, useRef, cloneElement } from "react";

import "./Carousel.css";

const Carousel = ({ children, itemsShown = 1 }) => {
  const [activeIndex, setActiveIndex] = useState(itemsShown);
  const [transform, setTransform] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [touchPosition, setTouchPosition] = useState(false);

  console.log(activeIndex);

  const prevItems = (itemsShown, children) => {
    let result = [];
    for (let i = 1; i <= itemsShown; i++) {
      result = [children[children.length - i], ...result];
    }
    return result;
  };
  const nextItems = (itemsShown, children) => {
    let result = [];

    for (let i = itemsShown; i > 0; i--) {
      result = [...result, children[i - 1]];
    }
    return result.reverse();
  };

  const items = useRef([
    ...prevItems(itemsShown, children),
    ...children,
    ...nextItems(itemsShown, children),
  ]);

  const updateIndex = (newIndex) => {
    setTransform(true);
    setTrigger(true);
    setActiveIndex(newIndex);
    setButtonsDisabled(true);
  };

  useEffect(() => {
    if (!transform && activeIndex === items.current.length - itemsShown) {
      setActiveIndex(itemsShown);
      setButtonsDisabled(false);
      return;
    }
    if (!transform && trigger && activeIndex === 0) {
      setActiveIndex(items.current.length - itemsShown * 2);
    }
  }, [transform, activeIndex, itemsShown, trigger, items]);

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
    console.log("down");
  };

  const handleTouchMove = (e) => {
    console.log("move");
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    console.log(diff);

    if (diff > 5) {
      console.log("right");
      updateIndex(activeIndex + 1);
    }

    if (diff < -5) {
      console.log("left");
      updateIndex(activeIndex - 1);
    }

    setTouchPosition(null);
  };

  return (
    <div className="carousel">
      <div
        className="carousel_inner"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTransitionEnd={() => {
          setButtonsDisabled(false);
          if (
            activeIndex === items.current.length - itemsShown ||
            activeIndex === 0
          ) {
            setTransform(false);
          }
          if (activeIndex === 0) {
            setTrigger(true);
          }
        }}
        style={
          transform
            ? {
                transform: `translateX(-${(activeIndex * 100) / itemsShown}%`,
                transition: "transform 0.3s",
              }
            : {
                transform: `translateX(-${(activeIndex * 100) / itemsShown}%`,
                transition: "none",
              }
        }
      >
        {items.current.map((child) => {
          return cloneElement(child, { itemsShown, key: Math.random() });
        })}
      </div>

      <div className="carousel__navigation">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
          disabled={!buttonsDisabled ? false : true}
        >
          prev
        </button>
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
          disabled={!buttonsDisabled ? false : true}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

export const CarouselItem = ({ children, itemsShown }) => {
  return (
    <div
      className="carousel__item"
      style={{
        width: `${100 / parseInt(itemsShown)}%`,
        backgroundColor: `${children}`,
      }}
    >
      {children}
    </div>
  );
};
