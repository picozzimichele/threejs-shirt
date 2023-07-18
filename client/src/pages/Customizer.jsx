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
    const [file, setFile] = useState("");
    const [prompt, setPrompt] = useState("");
    const [generateImg, setGenerateImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({ logoShirt: true, stylishShirt: false });

    const handleSubmit = async (type) => {
        if (!prompt) return alert("Please enter a prompt");

        try {
            //call our backend to generate AI image
            setGenerateImg(true);
            const response = await fetch("http://localhost:8080/api/v1/dalle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            handleDecals(type, `data:image/png;base64,${data.photo}`);
        } catch (error) {
            alert(error);
        } finally {
            setGenerateImg(false);
            setActiveEditorTab("");
        }
    };

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isFullTexture = true;
                state.isLogoTexture = false;
                break;
        }

        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName],
            };
        });
    };

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];

        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab);
        }
    };

    const readFile = (type) => {
        reader(file).then((result) => {
            handleDecals(type, result);
            setActiveEditorTab("");
        });
    };

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />;
            case "filepicker":
                return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
            case "aipicker":
                return <AIPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generateImg} handleSubmit={handleSubmit} />;
            default:
                return null;
        }
    };
    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container">
                                {EditorTabs.map((tab, index) => (
                                    <Tab
                                        tab={tab}
                                        key={index}
                                        handleClick={() => {
                                            setActiveEditorTab(tab.name);
                                        }}
                                    />
                                ))}
                                {generateTabContent()}
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
                        {FilterTabs.map((tab) => (
                            <Tab
                                tab={tab}
                                key={tab.name}
                                handleClick={() => handleActiveFilterTab(tab.name)}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
