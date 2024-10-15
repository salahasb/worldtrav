import styles from "./Sidebar.module.css";

function Copyright() {
	const date = new Date();
	const year = date.getFullYear();
	return (
		<footer className={styles.footer}>
			<p className={styles.copyright}>© Copyright {year} by WorldTrav Inc.</p>
		</footer>
	);
}

export default Copyright;
