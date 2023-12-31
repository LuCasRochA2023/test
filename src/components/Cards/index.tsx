//src/componentes/Card/index.tsx

import React from "react"

import styles from './styles.module.scss'

const Card: React.FC = ({ children }) => {
    return (
        <div className={styles.card}>
            {children}
        </div>
    )
}

export default Card