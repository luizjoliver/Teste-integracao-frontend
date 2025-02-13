import { render, screen } from '@testing-library/react';
import App from './paginas/Principal/App';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import Cartoes from './componentes/Cartoes/index';
describe('Rotas', () => {
  test('Deve renderizar a rota principal', () => {
    render(<App />, {
      wrapper: BrowserRouter,
    });

    const usuario = screen.getByText('Olá, Joana :)!');

    expect(usuario).toBeInTheDocument();
  });

  test('Deve renderizar a rota cartões', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const meusCartoes = screen.getByText('Meus cartões');
    expect(meusCartoes).toHaveTextContent('Meus cartões');
  });
});
