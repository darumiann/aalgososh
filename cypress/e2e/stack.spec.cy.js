const circle = `div[class*="circle_circle"]`;
const color = "rgb(0, 50, 255)";
const secondColor = "rgb(210, 82, 225)";

describe("Стек", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });

  it("Кнопка добавления недоступна, если в поле пусто", () => {

    cy.get("input").clear();
    cy.get("button").contains("Добавить").parent().should("be.disabled");

  });

  it("Правильность добавления элементов в стек", () => {

    cy.get("input").type("6");
    cy.should("have.value", "6");
    cy.get("button").contains("Добавить").click();

    cy.clock();
    cy.get(circle).should("have.css", "border-color", color).contains("6");

    cy.tick(500);
    cy.get(circle).should("have.css", "border-color", color).contains("6");
    cy.get("input").type("66");
    cy.should("have.value", "66");
    cy.get("button").contains("Добавить").click();

    cy.get(circle).eq(0).should("have.css", "border-color", color).contains("6");
    cy.get(circle).eq(1).should("have.css", "border-color", color).contains("66");

    cy.tick(500);
    cy.get(circle).eq(0).should("have.css", "border-color", color).contains("6");
    cy.get(circle).eq(1).should("have.css", "border-color", color).contains("66");

  });

  it("Правильность удаления элемента из стека", () => {

    cy.clock();
    cy.get("input").type("6");
    cy.should("have.value", "6");
    cy.get("button").contains("Добавить").click();

    cy.tick(500);
    cy.get("input").type("66");
    cy.should("have.value", "66");
    cy.get("button").contains("Добавить").click();

    cy.tick(500);
    cy.get(circle).should("have.length", 2);

    cy.tick(500);
    cy.get("button").contains("Удалить").click();

    cy.get(circle).eq(0).should("have.css", "border-color", color).contains("6");
    cy.get(circle).eq(1).should("have.css", "border-color", secondColor).contains("66");

    cy.tick(500);
    cy.get(circle).should("have.length", 1);

    cy.tick(500);
    cy.get("button").contains("Удалить").click();
    cy.get(circle).eq(0).should("have.css", "border-color", secondColor).contains("6");

    cy.tick(500);
    cy.get(`[data-testid="circle"]`).should("have.length", 0);

  });

  it("Проверка поведения кнопки очистить", () => {

    cy.get("input").clear();

    cy.clock();
    cy.get("input").type("6");
    cy.should("have.value", "6");
    cy.get("button").contains("Добавить").click();

    cy.tick(500);
    cy.get("input").type("66");
    cy.should("have.value", "66");
    cy.get("button").contains("Добавить").click();

    cy.tick(500);
    cy.get("input").type("666");
    cy.should("have.value", "666");
    cy.get("button").contains("Добавить").click();

    cy.tick(500);
    cy.get("button").contains("Очистить").click();
    cy.get(circle).should("have.length", 0);

  });
  
});