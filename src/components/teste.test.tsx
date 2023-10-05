import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";
//Jest
describe('O comportamento do Formulario.tsx',()=>{
    test('quando o input está vazio novos participantes não podem ser adicionados', () => {
        render(<RecoilRoot>
                <Formulario />
            </RecoilRoot>)
        //Encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira o nome dos participantes')
        //Encontrar o botão 
        const botao = screen.getByRole('button')
        //Garantir que o input esteja no documento
        expect(input).toBeInTheDocument()
        //Garantir que o botão esteja habilitado
        expect(botao).toBeDisabled()
    })
        test('adicionar um participante caso exista um nome preenchido', () => {
            render(<RecoilRoot>
                    <Formulario />
                    </RecoilRoot>)
            //Encontrar no DOM o input
            const input = screen.getByPlaceholderText('Insira o nome dos participantes')
            //Encontrar o botão 
            const botao = screen.getByRole('button')
            //inserir um valor no input
            fireEvent.change(input, {
                target: {
                    value: "Maluco"
                }
            })

            fireEvent.click(botao)

            expect(input).toHaveFocus()

            expect(input).toHaveValue("")

        })
        test('nomes duplicados não podem ser adicionados na lista', ()=>{
            render(<RecoilRoot>
                <Formulario />
                </RecoilRoot>)
            //Encontrar no DOM o input
            const input = screen.getByPlaceholderText('Insira o nome dos participantes')
            //Encontrar o botão 
            const botao = screen.getByRole('button')
            //inserir um valor no input
            fireEvent.change(input, {
                target: {
                    value: "Maluco"
                }
            })
            fireEvent.click(botao)
            fireEvent.change(input, {
                target: {
                    value: "Maluco"
                }
            })
            fireEvent.click(botao)

            const mensagemErro=screen.getByRole("alert")

            expect(mensagemErro.textContent).toBe('Nomes duplicados não são permitidos!')
            })
        test('A mensagem de erro deve subir após os timers', ()=>{
            jest.useFakeTimers()
            render(<RecoilRoot>
                        <Formulario />
                </RecoilRoot>)
            //Encontrar no DOM o input
            const input = screen.getByPlaceholderText('Insira o nome dos participantes')
            //Encontrar o botão 
            const botao = screen.getByRole('button')
            //inserir um valor no input
            fireEvent.change(input, {
                target: {
                    value: "Maluco"
                }
            })
            fireEvent.click(botao)
            
            fireEvent.change(input, {
                target: {
                    value: "Maluco"
                }
            })
            fireEvent.click(botao)
            let mensagemErro=screen.queryByRole('alert')

            expect(mensagemErro).toBeInTheDocument()

            act(()=>{
                jest.runAllTimers()
            })

            

            mensagemErro=screen.queryByRole('alert')
            expect(mensagemErro).toBeNull()
            })
        })