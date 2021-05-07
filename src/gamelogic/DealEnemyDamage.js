export const DealEnemyDamage = (grid) => {
    let enemyTotal = grid.map(outer => {
        return outer.
            filter(x => x.tileType === "enemy")
    }).flat();
        
    return enemyTotal
        .filter(x => x.tileType === "enemy")
        .reduce((prev, current) => current.enemyDamage + prev, 0);
}

export default DealEnemyDamage;