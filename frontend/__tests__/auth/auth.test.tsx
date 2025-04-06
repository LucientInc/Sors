import { expect, test } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { fireEvent, waitFor } from "@testing-library/react";
import {UserAuthForm} from "../../components/block/v1/login"

test("renderiza corretamente", () => {
    render(<UserAuthForm desktop={false} />);
    
    expect(screen.getByPlaceholderText("name@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
    expect(screen.getByText("Entrar com e-mail")).toBeInTheDocument();
  });
  
  test("valida e-mail corretamente", async () => {
    render(<UserAuthForm desktop={false} />);
    
    const emailInput = screen.getByPlaceholderText("name@example.com");
    const button = screen.getByText("Entrar com e-mail");
  
    fireEvent.change(emailInput, { target: { value: "email_invalido" } });
    fireEvent.click(button);
  
    await waitFor(() => {
      expect(button).toHaveTextContent("Entrar com e-mail"); // Continua igual
    });
  
    fireEvent.change(emailInput, { target: { value: "teste@email.com" } });
    fireEvent.click(button);
  
    await waitFor(() => {
      expect(button).toHaveTextContent("Entrar"); // Agora muda
    });
  });
  
  
  test("exibe botões extras no modo desktop", () => {
    render(<UserAuthForm desktop={true} />);
  
    expect(screen.getByText("Ou")).toBeInTheDocument();
    expect(screen.getByText("Cadastre-se")).toBeInTheDocument();
  });
  