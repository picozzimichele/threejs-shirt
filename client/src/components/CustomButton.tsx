import React from "react";
import state from "../store";
import { useSnapshot } from "valtio";
import { getContrastingColor } from "../config/helpers";

export default function CustomButton({ type, title, customStyle, handleClick }) {
    const snap = useSnapshot(state);
    const generateStlye = (type) => {
        if (type === "filled") {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color),
            };
        } else if (type === "outline") {
            return {
                borderWidth: "1px",
                borderColor: snap.color,
                color: snap.color,
            };
        }
    };

    return (
        <button onClick={handleClick} style={generateStlye(type)} className={`px-2 py-1.5 flex rounded-md ${customStyle}`}>
            {title}
        </button>
    );
}
