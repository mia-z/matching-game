import React from "react";

const WithHandlers = (handleTouchStart, handleTouchEnd, handleTileTouchMove) => (Component) => {
    console.log(handleTouchStart, handleTouchEnd, handleTileTouchMove)
    return <Component touchStartHandler={handleTouchStart} touchEndHandler={handleTouchEnd} touchHandler={handleTileTouchMove} />;
}

export default WithHandlers;