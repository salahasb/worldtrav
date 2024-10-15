import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo({ headerLogo }) {
	return headerLogo ? (
		<>
			<Link to="" className={styles.logo2}>
				<img src="/icon.png" alt="WorldTrav logo" />
			</Link>

			<Link to="" className={styles.logo1}>
				<img src="/logo.png" alt="WorldTrav logo" />
			</Link>
		</>
	) : (
		<Link to="/" className={styles.logo}>
			<img src="/logo.png" alt="WorldTrav logo" />
		</Link>
	);
}

export default Logo;
