import React from 'react';

const RippleContainer = () => {

  return (
      <div className="rippleContainer">
      <div className='lockImg'><img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6ca8adfa02099dfca96938cae1c05379065d8a380bb70750f820a315c3bedec?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
      /></div>
      <div className="growingCircles" style={{animationDelay: "-9s"}}></div>
      <div className="growingCircles" style={{animationDelay: "-8s"}}></div>
      <div className="growingCircles" style={{animationDelay: "-7s"}}></div>
      <div className="growingCircles" style={{animationDelay: "-6s"}}></div>
      <div className="growingCircles" style={{animationDelay: "-5s"}}></div>
      <div className="growingCircles" style={{animationDelay: "-4s"}}></div>
      <div className="growingCircles" style={{animationDelay: "-3s"}}></div>
      <div className="growingCircles" style={{animationDelay: "-2s"}}></div>
      <div className="growingCircles" style={{animationDelay: "-1s"}}></div>
      <div className="growingCircles" style={{animationDelay: "0s"}}></div>

      <div className="text-4xl font-semibold text-lime-300 pl-8">
        MVSSIVE Licensing Agreement
      </div>
      <div className="mt-4 text-2xl tracking-tight text-neutral-200 w-[691px] max-md:max-w-full pl-8">
        The use of this file is subject to MVSSIVE License Agreement. Read
        the full License Agreement here to learn what you can and can't do
        with this platform
      </div>
      </div>
  );

};

export default RippleContainer;