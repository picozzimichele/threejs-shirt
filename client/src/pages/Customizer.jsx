import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import config from "../config/config";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import AIPicker from "../components/AIPicker";
import ColorPicker from "../components/ColorPicker";
import FilePicker from "../components/FilePicker";
import Tab from "../components/Tab";
import CustomButton from "../components/CustomButton";

export default function Customizer() {
    const snap = useSnapshot(state);
    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container">
                                {EditorTabs.map((tab, index) => (
                                    <Tab tab={tab} key={index} handleClick={() => {}} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="absolute top-5 right-5 z-10" {...fadeAnimation}>
                        <CustomButton
                            customStyle="w-fit px-4 py-2.5 font-bold text-sm"
                            type="filled"
                            title="Go Back"
                            handleClick={() => (state.intro = true)}
                        />
                    </motion.div>
                    <motion.div className="filtertabs-container" {...slideAnimation("up")}>
                        {FilterTabs.map((tab, index) => (
                            <Tab tab={tab} key={index} handleClick={() => {}} isFilterTab="" isActiveTab="" />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
