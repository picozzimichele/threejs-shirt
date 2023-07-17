import React from "react";
import CustomButton from "./CustomButton";

export default function FilePicker({ file, setFile, readFile }) {
    return (
        <div className="filepicker-container">
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <input id="file-upload" type="file" accept="image/*" onChange={(e) => setFile(e.target.files && e.target.files[0])} />
                    <label htmlFor="file-upload" className="filepicker-label">
                        Upload File
                    </label>
                    <p className="mt-2 text-gray-700 text-xs truncate">{file === "" ? "No file selected" : file.name}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                    <CustomButton type="outline" title="Logo" handleClick={() => readFile("logo")} customStyle="text-xs flex-1 justify-center" />
                    <CustomButton type="filled" title="Full" handleClick={() => readFile("full")} customStyle="text-xs flex-1 justify-center" />
                </div>
            </div>
        </div>
    );
}
