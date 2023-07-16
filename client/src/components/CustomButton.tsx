import React from "react";
import state from "../store";
import { useSnapshot } from "valtio";

export default function CustomButton({ type, title, customStyle, handleClick }) {
    const snap = useSnapshot(state);
    const generateStlye = (type) => {
        if (type === "filled") {
            return {
                backgroundColor: snap.color,
                color: "white",
            };
        }
    };

    return (
        <button onClick={handleClick} style={generateStlye(type)} className={`px-2 py-1.5 flex-1 rounded-md ${customStyle}`}>
            {title}
        </button>
    );
}
