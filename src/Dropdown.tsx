/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function Dropdown({ options }: { options: string[] }): JSX.Element {
    type ChangeEvent = React.ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >;
    const [selection, setSelection] = useState<string>(options[0]);
    function updateSelection(event: ChangeEvent) {
        setSelection(event.target.value);
    }

    return (
        <span style={{ display: "inline-flex", margin: "auto" }}>
            <Form.Check inline>
                <Form.Group controlId="formSelectionOptions">
                    <Form.Label>Choose a Category</Form.Label>
                    <Form.Select value={selection} onChange={updateSelection}>
                        {options.map((currentOption: string) => (
                            <option key={currentOption} value={currentOption}>
                                {currentOption}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form.Check>
        </span>
    );
}
