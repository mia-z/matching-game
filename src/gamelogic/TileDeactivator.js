export const TileDeactivator = (grid) => {
    return grid.map(outer => {
        return outer.map(inner => {
            return {
                ...inner,
                isActive: false,
            }
        })
    });
}

export default TileDeactivator;