import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";

export default function Tab({ tab, isFilterTab, isActiveTab, handleClick }) {
    const snap = useSnapshot(state);
    const activeStyles =
        isFilterTab && isActiveTab
            ? {
                  backgroundColor: snap.color,
                  opacity: 0.5,
              }
            : { backgroundColor: "transparent", opacity: 1 };

    return (
        <div style={activeStyles} onClick={handleClick} className={`tab-btn ${isFilterTab ? "rounded-full glassmorhism" : "rounded-4"}`} key={tab.name}>
            <img className={`${isFilterTab ? "w-2/3 h-2/3" : "h-11/12 w-11/12 object-contain"}`} src={tab.icon} alt={tab.name} />
        </div>
    );
}
