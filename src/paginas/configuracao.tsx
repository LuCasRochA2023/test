import Card from "../components/Cards"
import Formulario from "../components/Formulario"
import ListaParticipantes from "../components/listaDeParticipantes"
import Rodape from "../components/rodape"

const Configuracao=()=>{
    return(
    <Card>
        <section>
            <h2>Vamos começar</h2>
            <Formulario/>
            <ListaParticipantes/>
            <Rodape/>
        </section>
    </Card>
    )
}
export default Configuracao