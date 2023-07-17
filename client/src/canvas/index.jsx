import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig.jsx";
import Shirt from "./Shirt";

export default function CanvasModel() {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <Environment preset="city" />
            <CameraRig>
                {/* <Backdrop /> */}
                <Center>
                    <Shirt />
                </Center>
            </CameraRig>
        </Canvas>
    );
}
