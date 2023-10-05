import { fireEvent, render,screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes"
import Sorteio from "./sorteio"
import { useResultadoDoSorteio } from "../../state/hooks/useResultadoDoSorteio"


jest.mock('../../state/hooks/useResultadoDoSorteio',()=>{
    return {
        useResultadoDoSorteio:jest.fn()
    }
})
jest.mock('../../state/hooks/useListaDeParticipantes',()=>{
    return {
        useListaDeParticipantes:jest.fn()
    }
})



describe('Página de sorteio',()=>{
    const participantes=[
        'Ana',
        'Catarina',
        'Jorel'

    ]
    const resultado=new Map([
        ['Ana', 'Jorel'],
        ['Jorel', 'Catarina'],
        ['Catarina', 'Ana']
    ])
    beforeEach(()=>{
        (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado);

        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);

    })
    
    test('Todos os participantes podem exibir o seu amigo secreto',()=>{
        render(<RecoilRoot>
            <Sorteio/>
        </RecoilRoot>)

        const opcoes=screen.queryAllByRole('option')
        expect(opcoes).toHaveLength(participantes.length)
    })
    test('O amigo secreto é exibido quando selecionado',()=>{
        render(<RecoilRoot>
            <Sorteio/>
        </RecoilRoot>)

        const select=screen.getByPlaceholderText('Selecione o seu nome')

        fireEvent.change(select,{
            target:{
                value: participantes[0]
            }
        })
        const botao=screen.getByRole('button')

        fireEvent.click(botao)

        const amigoSecreto=screen.getByRole('alert')

        expect(amigoSecreto).toBeInTheDocument()
    })
})