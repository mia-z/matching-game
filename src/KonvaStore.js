import React, { createContext, useState, useEffect, useCallback } from "react";

const KonvaStore = createContext();

export const KonvaProvider = ({ children }) => {
    const [konva, setKonva] = useState(null);

    const InitKonva = () => {
        console.log("Konva initialized");
        let stage = new Konva.Stage({
            container: "overlay",
            width: 726,
            height: 726
        });
        setKonva(stage);
    }

    const UpdateKonva = useCallback((k) => {
        console.log(k.getChildren());
        setKonva(k);
    }, [konva]);

    return (
        <KonvaStore.Provider value={{ konva: konva, UpdateKonva: UpdateKonva, InitKonva: InitKonva }}>
            {children}
        </KonvaStore.Provider>
    );
}

export const KonvaConsumer = KonvaStore.Consumer;

export default KonvaStore;