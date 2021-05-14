import React, { useCallback } from "react";
import { Image, Group, Text } from "react-konva";
import useImage from "use-image";

export const GameTileTwo = ({
    sideLength,
    selfX, 
    selfY, 
    isActive, 
    tileType, 
    iconPath,
    debugColor,
    isEnemy,
    enemyHealth,
    enemyDamage,
    touchHandler,
    touchEndHandler,
    touchStartHandler,
    id
}) => {
    const [icon] = useImage(iconPath);

    const props = {
        isActive, 
        tileType, 
        selfX, 
        selfY, 
        isEnemy, 
        enemyDamage, 
        enemyHealth, 
        sideLength, 
        id
    };

    const handleTouchMove = useCallback((e) => {
        touchHandler({ ...props, ...e});
    }, [touchHandler]);

    const handleTouchStart = useCallback((e) => {
        touchStartHandler({ ...props, ...e});
    }, [touchStartHandler]);

    const handleTouchEnd = useCallback((e) => {
        touchEndHandler({ ...props, ...e});
    }, [touchEndHandler]);

    return (
        <Group 
            x={selfX * sideLength} 
            y={selfY * sideLength}
            width={sideLength} 
            height={sideLength}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <Image image={icon} />

        </Group>
        
    );
}

export default GameTileTwo;