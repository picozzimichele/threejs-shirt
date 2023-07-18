import React from "react";
import CustomButton from "./CustomButton";

export default function AIPicker({ prompt, setPrompt, generatingImg, handleSubmit }) {
    return (
        <div className="aipicker-container">
            <textarea value={prompt} rows={5} placeholder="Ask AI for an image..." className="aipicker-textarea" onChange={(e) => setPrompt(e.target.value)} />
            <div className="flex flex-wrap gap-3">
                {generatingImg ? (
                    <CustomButton customStyle="text-xs flex-1" type="outline" title="Asking AI..." handleClick={undefined} />
                ) : (
                    <>
                        <CustomButton customStyle="text-xs flex-1 justify-center" type="outline" title="AI Logo" handleClick={() => handleSubmit("logo")} />
                        <CustomButton customStyle="text-xs flex-1 justify-center" type="filled" title="AI Texture" handleClick={() => handleSubmit("full")} />
                    </>
                )}
            </div>
        </div>
    );
}
