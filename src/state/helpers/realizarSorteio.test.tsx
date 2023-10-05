
import { realizarSorteio } from "./realizarSorteio"

describe('Dado um sorteio de amigo secreto',()=>{
    test('Cada participante não sorteie o próprio nome', ()=>{
        
        const participante=[
            'Ana',
            'João',
            'Victoria',
            'Nathalia'
        ]
        const sorteio=realizarSorteio(participante)
        participante.forEach(participante=>{
            const amigoSecreto=sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
        
        
    })
})