import reactLogo from "../../assets/react.svg";
import viteLogo from "../../../public/vite.svg";
import styles from "./main.module.css";

function React_vite_logo() {
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img
                        src={viteLogo}
                        className={styles.logo}
                        alt="Vite logo"
                    />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className={[styles.logo, styles.react].join(" ")}
                        alt="React logo"
                    />
                </a>
            </div>
        </>
    );
}

export default React_vite_logo;
