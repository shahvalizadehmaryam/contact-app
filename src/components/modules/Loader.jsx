import { ThreeCircles } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <ThreeCircles
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        wrapperClass={styles.customStyle}
      />
    </>
  );
};

export default Loader;
