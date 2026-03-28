import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { AuthContext } from "../../contexts/AuthContext";

describe("Navbar Navigation Component", () => {
  const rotasDeTeste = (mockUser) => (
    <AuthContext.Provider value={{ user: mockUser }}>
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<h1>Pagina About</h1>} />
          <Route path="/login" element={<h1>Pagina Login</h1>} />
          <Route path="/host" element={<h1>Dashboard do Host</h1>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  it('Navega para a página "About" ao clicar no link correspondente', async () => {
    const user = userEvent.setup();

    render(rotasDeTeste(null));

    expect(screen.getByText(/Home/i)).toBeInTheDocument();

    const aboutLink = screen.getByRole("link", { name: /about/i });
    await user.click(aboutLink);

    expect(screen.queryByText(/Home/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Pagina About/i)).toBeInTheDocument();
  });

  it("O ícone de Login/Avatar leva para /login se NÃO houver usuário logado", async () => {
    const user = userEvent.setup();

    render(rotasDeTeste(null));

    const avatarLink = screen.getByRole("link", { name: "" });
    expect(avatarLink).toHaveAttribute("href", "/login");

    await user.click(avatarLink);

    expect(screen.getByText(/Pagina Login/i)).toBeInTheDocument();
  });

  it("O ícone de Login/Avatar leva o usuário para /host se ele JÁ ESTIVER logado", async () => {
    const userLoggedIn = { name: "Teste" };
    const user = userEvent.setup();

    render(rotasDeTeste(userLoggedIn));

    const avatarLinks = screen.getAllByRole("link");
    const avatarLink = avatarLinks[avatarLinks.length - 1];
    expect(avatarLink).toHaveAttribute("href", "/host");

    await user.click(avatarLink);
    expect(screen.getByText(/Dashboard do Host/i)).toBeInTheDocument();
  });
});
