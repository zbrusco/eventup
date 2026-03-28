import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AuthRequired from "./AuthRequired";

import { AuthContext } from "../../contexts/AuthContext";

const routes = (mockUser) => (
  <MemoryRouter initialEntries={["/protected"]}>
    <AuthContext.Provider value={mockUser}>
      <Routes>
        <Route path="/" element={<AuthRequired />}>
          <Route path="protected" element={<h1>Painel do Host</h1>} />
        </Route>
        <Route path="/login" element={<h1>Página de Login</h1>} />
      </Routes>
    </AuthContext.Provider>
  </MemoryRouter>
);

describe("AuthRequired Routing Component", () => {
  it('renderiza "Loading..." enquanto os dados do usuário estão carregando', () => {
    const mockUser = {
      user: null,
      isLoading: true,
    };

    render(routes(mockUser));
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("redireciona para /login se o usuário NÃO estiver logado", () => {
    const mockUser = {
      user: null,
      isLoading: false,
    };

    render(routes(mockUser));
    expect(screen.queryByText(/Painel do Host/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Página de Login/i)).toBeInTheDocument();
  });

  it("renderiza o Outlet se o usuário ESTIVER logado", () => {
    const mockUser = {
      user: { $id: "123", name: "Zezinho" },
      isLoading: false,
    };

    render(routes(mockUser));
    expect(screen.getByText(/Painel do Host/i)).toBeInTheDocument();
  });
});
