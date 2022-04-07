import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [numbers, setNumbers] = useState([1, 2]);
  const [color, setColor] = useState(false);

  const randomAnimation = [
    "animate__fadeInDownBig",
    "animate__bounceIn",
    "animate__bounceInDown",
    "animate__bounceInLeft",
    "animate__bounceInRight",
    "animate__bounceInUp",
    "animate__fadeIn",
    "animate__fadeInBottomLeft",
    "animate__fadeInTopLeft",
    "animate__lightSpeedInRight",
    "animate__rotateIn",
    "animate__zoomIn",
    "animate__zoomInLeft"
  ];

  const [animation, setAnimation] = useState("animate__bounceIn");

  const ref = useRef({
    interval: 500,
    constrain: 30,
    lastValue: numbers.at(-1)
  });

  const { interval, constrain, lastValue } = ref.current;

  useEffect(() => {
    setTimeout(() => {
      consecutiveNumbers();
    }, interval);
    //eslint-disable-next-line
  }, []);

  const consecutiveNumbers = () => {
    if (numbers.at(-1) !== constrain) {
      let _num = [];
      Array(constrain - lastValue)
        .fill(null)
        .map((_, i) => {
          return _num.push(i + lastValue + 1);
        });

      setNumbers([...numbers, ..._num]);
    }
  };

  const colorHandler = (value) => {
    if (value % 6 === 0) {
      return "orange";
    } else if (value % 3 === 0) {
      return "green";
    } else if (value % 2 === 0) {
      return "blue";
    }
  };

  const setRadomAnimation = () => {
    const _anim =
      randomAnimation[Math.floor(Math.random() * randomAnimation.length)];
    setAnimation(_anim);
  };

  return (
    <>
      <div className="container">
        <div className="random_container">
          <button className="random" onClick={setRadomAnimation}>
            Random Animation
          </button>
        </div>
        <ul className="list__group">
          {numbers?.map((it, i) => {
            return (
              <li
                className={`animate__animated list__item ${animation}`}
                style={{ animationDelay: i * 200 + "ms" }}
                {...(i + 1 === constrain && {
                  onAnimationEnd: () => setColor(true)
                })}
                key={it}
              >
                <span {...(color && { className: colorHandler(it) })}>
                  {it}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default App;
