import { Link } from "react-router-dom"
import styles from "./Header.module.css"

export default function Header() {

    return (
        <header className={styles.header}>
            <h1 className={styles.logo} >LearnHub</h1>
            <nav className={styles.navbar}>
                <li><Link className={styles.link} to="" >Getting Started</Link></li>
                <li> <Link className={styles.link} to="">Become a Teacher</Link></li>
                <li> <Link className={`${styles.link} ${styles.signIn}`} to="" >Sign In </Link></li>
            </nav>
        </header>
    )
}