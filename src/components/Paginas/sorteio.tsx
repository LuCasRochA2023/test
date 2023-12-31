import { useState } from "react"
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes"
import { useResultadoDoSorteio } from "../../state/hooks/useResultadoDoSorteio"

const Sorteio=()=>{
    const participantes=useListaDeParticipantes()
    
    const [participanteDaVez,setParticipanteDaVez]=useState('')

    const [amigoSecreto,setAmigoSecreto]=useState('')

    const resultado=useResultadoDoSorteio()
    const sortear=(evento:React.FormEvent<HTMLFormElement>)=>{
        evento.preventDefault()
         if (resultado.has(participanteDaVez)){
            setAmigoSecreto(resultado.get(participanteDaVez)!)
         }
    }
    return (
        <section>
            <form onSubmit={sortear}>
                <select name="participanteDaVez"
                 id="participanteDaVez"
                 required
                 value={participanteDaVez}
                 placeholder="Selecione o seu nome"
                 onChange={evento=>setParticipanteDaVez(evento.target.value)}>
                    {participantes.map(participante=><option key={participante}>{participante}</option>)}
                </select>
                <button>Sortear</button>
            </form>
            {amigoSecreto&&<p role="alert">{amigoSecreto}</p>}
        </section>
    )
}

export default Sorteio