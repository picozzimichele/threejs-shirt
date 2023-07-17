import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { easing } from "maath";
import state from "../store";

export default function CameraRig({ children }) {
    const snap = useSnapshot(state);
    const group = useRef();

    useFrame((state, delta) => {
        const isBreakpoint = window.innerWidth <= 1026;
        const isMobile = window.innerWidth <= 600;

        //set the initial position of the model
        let targetPosition = [-0.4, 0, 2];
        if (snap.intro) {
            if (isBreakpoint) targetPosition = [0, 0, 2];
            if (isMobile) targetPosition = [0, 0.2, 2.5];
        } else {
            if (isMobile) targetPosition = [0, 0, 2.5];
            else targetPosition = [0, 0, 2];
        }

        easing.damp3(state.camera.position, targetPosition, 0.25, delta);

        //set initial position of the camera

        easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta);
    });

    return <group ref={group}>{children}</group>;
}
