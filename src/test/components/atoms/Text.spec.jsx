// src/test/components/atoms/Text.spec.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Text from "../../../components/atoms/Text";

describe("Text Component", () => {
  it("renderiza el texto correctamente", () => {
    render(<Text variant="h1">Hola Mundo</Text>);
    expect(screen.getByText("Hola Mundo")).toBeInTheDocument();
  });

  it("aplica la clase CSS correctamente", () => {
    render(<Text variant="h2" className="custom-class">Test</Text>);
    const textElement = screen.getByText("Test");
    expect(textElement).toHaveClass("custom-class");
  });
  
});
