import { fireEvent, render,screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import Rodape from "./rodape"
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes"

jest.mock('../state/hooks/useListaDeParticipantes',()=>{
    return {
        useListaDeParticipantes:jest.fn()
    }
})

const mockNavegacao=jest.fn()
const mockSorteio=jest.fn()

jest.mock('../state/hooks/useSorteador',()=>{
    return{
        useSorteador:()=>mockSorteio
    }
})
jest.mock('react-router-dom',()=>{
    return{
        useNavigate:()=>mockNavegacao
    }
})

describe('Onde não existem participantes suficientes',()=>{
    beforeEach(()=>{
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })
    test('A brincadeira não pode ser iniciada',()=>{
        render(<RecoilRoot>
            <Rodape/>
        </RecoilRoot>)
        const botao=screen.getByRole('button')
        expect(botao).toBeDisabled()
    })
})
describe('Onde existem participantes suficientes',()=>{
    beforeEach(()=>{
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana','Marcela','Luiza'])
    })
    test('A brincadeira pode ser iniciada',()=>{
        render(<RecoilRoot>
            <Rodape/>
        </RecoilRoot>)
        const botao=screen.getByRole('button')
        expect(botao).not.toBeDisabled()
    })
    test('A brincadeira foi iniciada',()=>{
        render(<RecoilRoot>
            <Rodape/>
        </RecoilRoot>)
        const botao=screen.getByRole('button')
        fireEvent.click(botao)

        expect(mockNavegacao).toHaveBeenCalled()
        expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
        expect(mockSorteio).toHaveBeenCalledTimes(1)


    })
})