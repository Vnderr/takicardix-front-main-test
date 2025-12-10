// src/test/components/molecules/DinamicInput.spec.jsx
import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import DynamicInputs from "../../../components/molecules/DynamicInput";

describe("DynamicInputs Component", () => {
  it("renderiza múltiples inputs correctamente", () => {
    const inputsData = [ {name: 'nombre', placeholder: 'Nombre' }, {name: 'email', placeholder: 'Correo Electrónico' } ];
    render(<DynamicInputs Inputs={inputsData}/>);
    
    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Correo Electrónico")).toBeInTheDocument();
  });

});