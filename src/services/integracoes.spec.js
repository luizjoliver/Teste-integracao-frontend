import { fireEvent } from "@testing-library/react";
import api from "../services/api.js"
import { buscaTransacoes } from './transacoes';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import App from '../paginas/Principal/App';
// import { buscaTransacoes } from './transacoes';

// describe('Requisição para API', () => {
//     test('Deve retornar uma lista de transações', async () =>{
//         const transacoes = await buscaTransacoes()

//         expect(transacoes).toHaveLength(3)

//         render(<App/>, {wrapper:BrowserRouter})

//         const transacao = await screen.findAllByText('Novembro')
//         transacao.forEach((transacao) => expect(transacao).toBeInTheDocument())
//     })
// });

 jest.mock("./api")

const mockTransacoes = [
    {
        id:1,
        transacao:'Depósito',
        valor:'100',
        data:'22/11/2022',
        mes:'Novembro'
    }
]

const mockRequisicao = (retorno) => {
    return new Promise((resolve) =>{
        setTimeout(() =>{
            resolve({
                data:retorno
            })
        },200)
    })
}

const mockRequisicaoErro = (retorno) => {
    return new Promise((_,reject) =>{
        setTimeout(() =>{
            reject()
        },200)
    })
}
describe('Requisição para API', () => {

    test('Deve retornar uma lista de transacoes', async () =>{
        api.get.mockImplementation(() => mockRequisicao(mockTransacoes))

        const transacoes = await buscaTransacoes()

        expect(transacoes).toEqual(mockTransacoes)
        expect(api.get).toHaveBeenCalledWith("/transacoes")
    })

    test('Deve retornar uma lista vaziar ao ocorrer um erro ', async () =>{
        api.get.mockImplementation(() => mockRequisicaoErro(mockTransacoes))

        const transacoes = await buscaTransacoes()

        expect(transacoes).toEqual([])
        expect(api.get).toHaveBeenCalledWith("/transacoes")
    })

})