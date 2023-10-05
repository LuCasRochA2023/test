import { useRef, useState } from "react"
import { useAdicionarParticipante } from "../state/hooks/useAdicionarParticipantes"
import { useMensagemDeErro } from "../state/hooks/useMensagemDeErro"
import styles from "./styles.module.scss"
const Formulario=()=>{
    
    
    const [nome,setNome]=useState("")
    const inputRef=useRef<HTMLInputElement>(null)
    const mensagemErro=useMensagemDeErro()
    const adicionarNaLista=useAdicionarParticipante()
    const adicionarParticipante=(evento:React.FormEvent<HTMLFormElement>)=>{
        evento.preventDefault()
        adicionarNaLista(nome)
        setNome('')
        inputRef.current?.focus()

    }
    return(
        <form onSubmit={adicionarParticipante}>
            <div className={styles.grupo_input}>
                <input value={nome}
                ref={inputRef}
                type="text" placeholder="Insira o nome dos participantes"
                onChange={evento=>setNome(evento.target.value)}/>
                <button disabled={!nome}>
                    Adicionar
                </button>
            </div>
            {mensagemErro && <p className={styles.alerta}role="alert">{mensagemErro}</p>}
            
        </form>
    )
}
export default Formulario