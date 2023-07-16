import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from "../config/motion";
import state from "../store";
import CustomButton from "../components/CustomButton";

export default function Home() {
    const snapshot = useSnapshot(state);
    return (
        <AnimatePresence>
            {snapshot.intro && (
                <motion.section className="home" {...slideAnimation("left")}>
                    <motion.header {...slideAnimation("down")}>
                        <img className="h-8 w-8 object-contain" src="./threejs.png" alt="logo" />
                    </motion.header>
                    <motion.div className="home-content" {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className="head-text">
                                LET&apos;S
                                <br className="hidden lg:block" />
                                DO IT.
                            </h1>
                        </motion.div>
                        <motion.div {...headContentAnimation} className="flex flex-col gap-5">
                            <p className="max-w-md font-normal text-gray-600 text-base">
                                Create your unique and exclusive t-shirt with our brand new 3D customization tool. <b>Unleash your imagination</b> and define
                                your own stile.
                            </p>
                        </motion.div>
                        <CustomButton
                            type="filled"
                            title="Customize It"
                            handleClick={() => (state.intro = false)}
                            customStyle="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
