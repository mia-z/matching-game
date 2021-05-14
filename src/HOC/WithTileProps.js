import React, { useState } from "react";

const WithTileProps = Component => ({tileProps, ...rest}) => {
    const [tileProps, setTileProps] = useState(tileProps);
    
    return <Component {...rest} />;
}

export default WithTileProps;