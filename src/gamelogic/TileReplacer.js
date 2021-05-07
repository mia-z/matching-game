import TileGenerator from "./TileGenerator";

export const TileReplacer = (grid, selectedTiles, baseDamage) => {
    return grid.map(inner => {
        return inner.map(tile => {
            if (!selectedTiles.some(x => x === tile)) 
                return tile; //Do nothing since this tile isnt part of the active set
            
            if (tile.isEnemy) {
                let swords = selectedTiles.filter(x => x.tileType === "sword").length;
                let totalDamage =  baseDamage + swords; 
                console.log(totalDamage);
                let newHp = tile.enemyHealth - totalDamage;
                if (newHp <= 0)
                    return TileGenerator(tile.width, tile.height, tile.selfX, tile.selfY);
                else {
                    return {
                        ...tile,
                        enemyHealth: newHp
                    }
                }
            }
            return TileGenerator(tile.width, tile.height, tile.selfX, tile.selfY);
        });
    });
}

export default TileReplacer;