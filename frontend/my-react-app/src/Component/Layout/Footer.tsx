import styles from "./Footer.module.css"
export default function Footer() {

    return (
        <main className={styles.footer}>
            <p> 2024 LearnHub. All righst reserved</p>
            <div className={styles.footer_list}>
                <p> Terms</p>
                <p> Provacy</p>
                <p> Contact</p>
            </div>
        </main>
    )
}