import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import itemTypes from "../interfaces/itemTypes";

import "./Hanger.css";
import "../App.css";
import { CardContext } from "./ClothingList";

export interface ContainerProps {
    children: React.ReactNode;
}

interface ITEM {
    type: string;
    ID: number;
}
function Hanger(props: ContainerProps) {
    const { children } = props;
    const { removeElementFromScreen } = useContext(CardContext);
    const [, drop] = useDrop({
        accept: itemTypes.CLOTHING,
        drop: (item: ITEM) => removeElementFromScreen(item.ID),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    });
    return (
        <div className="container-right" ref={drop}>
            {children}
        </div>
    );
}

export default Hanger;
