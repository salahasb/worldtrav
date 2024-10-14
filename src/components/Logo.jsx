import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
	return (
		<>
			<Link to="/" className={styles.logo2}>
				<img src="/icon.png" alt="WorldWise logo" />
			</Link>

			<Link to="/" className={styles.logo1}>
				<img src="/logo.png" alt="WorldWise logo" />
			</Link>
		</>
	);
}

export default Logo;
