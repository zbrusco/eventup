import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import Login from "./Login";
import { AuthContext } from "../../contexts/AuthContext";
import * as api from "../../api";

// simulando a API
vi.mock("../../api", () => ({
  loginUser: vi.fn(),
}));

describe("Login Component User Actions", () => {
  it("preenchimento e envio do form de login", async () => {
    const user = userEvent.setup();
    const mockSetUser = vi.fn();

    // armazenar usuario ficticio
    api.loginUser.mockResolvedValueOnce({
      user: { name: "Estudante Teste", email: "estudante@test.com" },
    });

    // renderiza o login com as rotas e contexto do usuario
    render(
      <AuthContext.Provider value={{ setUser: mockSetUser }}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/host" element={<h1>Mock Host Dashboard</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const emailInput = screen.getByPlaceholderText(/Email address/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Log in/i });

    // simula input do usuario
    await user.type(emailInput, "estudante@test.com");
    await user.type(passwordInput, "secretPassword123");

    // verifica input do usuario
    expect(emailInput).toHaveValue("estudante@test.com");
    expect(passwordInput).toHaveValue("secretPassword123");

    await user.click(submitButton);

    await waitFor(() => {
      expect(api.loginUser).toHaveBeenCalledTimes(1);
      expect(api.loginUser).toHaveBeenCalledWith({
        email: "estudante@test.com",
        password: "secretPassword123",
      });
    });

    // verificar no contexto se o usuario fez o login
    expect(mockSetUser).toHaveBeenCalledWith({
      name: "Estudante Teste",
      email: "estudante@test.com",
    });

    // verifica se o usuario foi redirecionado para /host
    expect(screen.getByText("Mock Host Dashboard")).toBeInTheDocument();
  });
});
