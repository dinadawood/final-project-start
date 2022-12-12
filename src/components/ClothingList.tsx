/* eslint-disable react/no-unknown-property */
/* eslint-disable no-extra-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-key */
import React, { createContext, useState } from "react";
import { Clothing } from "../interfaces/Clothing";
import { clothing } from "../clothingList";
import ClothingObject from "./ClothingObject";

import "./ClothingList.css";
import Container from "./Container";
import { Form } from "react-bootstrap";
import { XYCoord } from "react-dnd";

export const CardContext = createContext({
    putInWorkSpace: (id: number, monitor: any) => {},
    removefromScreen: (id: number) => {}
});

function ElementList() {
    const [inWorkSpace, addtoWorkSpace] = useState<Clothing[]>([]);
    const [clothinglist, setProplist] = useState<Clothing[]>(clothing);

    function Alphabetical() {
        console.log("hi");
        const x = clothinglist.map((element: Clothing): Clothing => element);
        setProplist(x.sort((a, b) => a.name.localeCompare(b.name)));
    }

    function Reset() {
        setProplist(clothing);
    }

    function generateList(prop: Clothing[]) {
        return prop.map((prop) => (
            <div>
                <div key={prop.name} className="propcontainer">
                    <ClothingObject clothing={prop} />
                </div>
            </div>
        ));
    }
    function moveElement(id: number, left: number, top: number) {
        const draggedElement = inWorkSpace.filter((e) => e.id === id)[0];
        draggedElement.left = left;
        draggedElement.top = top;
    }

    function putInWorkSpace(id: number, monitor: any) {
        const draggedElement = clothing.filter((e) => e.id === id)[0];
        const p = { ...draggedElement };
        if (draggedElement == undefined) {
            const draggedElement = inWorkSpace.filter((e, i) => e.id === id)[0];
            const p = { ...draggedElement };
            const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
            const left = Math.round(p.left + delta.x);
            const top = Math.round(p.top + delta.y);
            moveElement(p.id, left, top);
        } else if (draggedElement.shown == false) {
            p.shown = true;
            p.id = Math.random();
            addtoWorkSpace(inWorkSpace.concat(p));
        }
    }
    function removefromScreen(id: number, id2?: number) {
        let draggedElement = inWorkSpace.filter((e, i) => e.id != id);
        if (id2) {
            draggedElement = draggedElement.filter((e, i) => e.id != id2);
        }
        addtoWorkSpace(draggedElement);
    }
    return (
        <CardContext.Provider value={{ putInWorkSpace, removefromScreen }}>
            <div>
                <div className="row-adj">
                    <div className="column-sidebar" background-color="primary">
                        <p>
                            <strong> Clothing Selection</strong>
                        </p>
                        <p>
                            <button onClick={() => Alphabetical()}>
                                Accessories First List
                            </button>
                            <button onClick={() => Reset()}>
                                {" "}
                                Reset List{" "}
                            </button>
                        </p>
                        <ul className="scroll-bar">
                            {generateList(clothinglist)}
                        </ul>
                    </div>
                    <div className="column-center">
                        <img
                            className="logo"
                            src={require("../images/logo.png")}
                        />
                        <Container>
                            {inWorkSpace.map((task, i) => (
                                <ClothingObject clothing={task} />
                            ))}
                        </Container>
                    </div>
                </div>
            </div>
        </CardContext.Provider>
    );
}

export default ElementList;
