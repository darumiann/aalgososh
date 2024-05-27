import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Тестирование компонента Button", () => {
  it("Корректная отрисовка кнопки с текстом", () => {
    const view = render(<Button text="test" />);
    expect(view).toMatchSnapshot();
  });


  it("Корректная отрисовка кнопки без текста", () => {
    const view = render(<Button />);
    expect(view).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки с индикацией загрузки", () => {
    const view = render(<Button isLoader={true} />);
    expect(view).toMatchSnapshot();
  });

  it("Корректность вызова калбека при клике на кнопку", () => {
    const handleTestClick = jest.fn();
    render(<Button onClick={handleTestClick} text="testing" />);
    fireEvent.click(screen.getByText("testing"));
    expect(handleTestClick).toHaveBeenCalled();
  });
});