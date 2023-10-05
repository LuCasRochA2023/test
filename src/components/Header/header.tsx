import styles from "./styles.module.scss";
import dado from "./Wavy Buddies Out of Stock.png"
const Header=()=>{
    return(
        <header className={styles.header}>
            <img src={dado} className={styles.dado}></img>
            <h1 className={styles.text}>Sorteador de Amigo Secreto</h1>
        </header>
    )
}
export default Header