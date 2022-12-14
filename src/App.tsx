import React from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//import Clothing from "./Clothing";

function App(): JSX.Element {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <h2 style={{ textAlign: "center", fontSize: "40px" }}>
                    Dress Up!
                </h2>
                <h4 style={{ textAlign: "center", fontSize: "15px" }}>
                    Creators: Dina Dawood & Madeline Pierce
                </h4>
                {/* <Clothing></Clothing> */}
            </div>
        </DndProvider>
    );
}

export default App;
