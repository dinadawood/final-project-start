import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import itemTypes from "../interfaces/itemTypes";

import "./Container.css";
import "../App.css";
import { CardContext } from "./ClothingList";

export interface ContainerProps {
    children: React.ReactNode;
}

interface ITEM {
    type: string;
    ID: number;
}
function Container(props: ContainerProps) {
    const { children } = props;
    const { putInWorkSpace } = useContext(CardContext);
    const [, drop] = useDrop({
        accept: itemTypes.CLOTHING,
        drop: (item: ITEM, monitor) => putInWorkSpace(item.ID, monitor),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    });
    return (
        <div className="container-middle" ref={drop}>
            {children}
        </div>
    );
}

export default Container;