/* eslint-disable react/no-unknown-property */
/* eslint-disable no-extra-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-key */
import React, { createContext, useState } from "react";
import { Clothing } from "../interfaces/Clothing";
import { elements } from "../clothingList";
import ClothingObject from "./ClothingObject";
import { Button, Form } from "react-bootstrap";
import "./Trashbin.css";

import "./ClothingList.css";
import Container from "./Container";
import Trashbin from "./Trashbin";
import { XYCoord } from "react-dnd";

export const CardContext = createContext({
    putInWorkSpace: (id: number, monitor: any) => {},
    removefromScreen: (id: number) => {}
});

function ElementList() {
    const [inWorkSpace, addtoWorkSpace] = useState<Clothing[]>([]);
    const [clothingList, setProplist] = useState<Clothing[]>(elements);
    const [numRep, setFunction] = useState<string>();
    const [search, changeSearch] = useState<string>("");

    function Alphabetical() {
        console.log("hi");
        const x = clothingList.map((element: Clothing): Clothing => element);
        setProplist(x.sort((a, b) => a.name.localeCompare(b.name)));
    }

    function Reset() {
        setProplist(elements);
    }

    function generateList(prop: Clothing[]) {
        return prop.map((prop) => (
            <div>
                <div key={prop.name} className="propcontainer">
                    <ClothingObject element={prop} />
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
        const draggedElement = clothingList.filter((e) => e.id === id)[0];
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
                    <div className="column-sidebar">
                        <p>
                            <strong> Element List</strong>
                        </p>
                        <p>
                            <Form.Group controlId="Sorting/Filtering">
                                <Form.Select value={numRep}>
                                    <option>Sort/Filter</option>
                                    <option value="1">Alphabetical(A-Z)</option>
                                    <option value="4">Alphabetical(Z-A)</option>
                                    <option value="2">By Atomic Number</option>
                                    <option value="3">Reset</option>
                                </Form.Select>
                                <Form.Group controlId="formQuizId">
                                    <Form.Control
                                        placeholder="Search"
                                        value={search}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => changeSearch(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                            </Form.Group>
                        </p>
                    </div>
                    <div className="column-center">
                        <img
                            className="logo"
                            src={require("../images/logo.png")}
                        />
                        <div>
                            <Container>
                                {inWorkSpace.map((e) => (
                                    <ClothingObject element={e} />
                                ))}
                            </Container>
                        </div>
                    </div>
                    <div className="column-right">
                        <Trashbin>{}</Trashbin>
                    </div>
                </div>
            </div>
        </CardContext.Provider>
    );
}

export default ElementList;
