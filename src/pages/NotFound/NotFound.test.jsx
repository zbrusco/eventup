import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";

describe("NotFound Routing Component", () => {
  it("renders NotFound when a non-existent route is accessed", () => {
    render(
      <MemoryRouter initialEntries={["/rota-inexistente"]}>
        {/* Simplificacao das rotas do App.jsx */}
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>,
    );

    // Verifica se o router invocou o NotFound
    const errorMessage = screen.getByText(
      /Sorry, the page you were looking for was not found/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
