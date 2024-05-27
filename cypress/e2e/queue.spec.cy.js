const circle = `div[class*="circle_circle"]`;
const content = `div[class*="circle_content"]`;
const color = "rgb(0, 50, 255)";
const secondColor = "rgb(210, 82, 225)";

describe("Очередь", () => {
  
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
  });

  it("Кнопка добавления элемента недоступна, если в поле пусто", () => {

    cy.get("input").clear();
    cy.get("button").contains("Добавить").parent().should("be.disabled");

  });

  it("Правильность добавления элемента в очередь", () => {

    cy.get("input").type("6");
    cy.should("have.value", "6");
    cy.get("button").contains("Добавить").click();

    cy.clock();
    cy.get(circle).eq(0).should("have.css", "border-color", color).contains("6");
    cy.get(content).eq(0).contains("head");
    cy.get(content).eq(0).contains("tail");

    cy.tick(500);
    cy.get(circle).should("have.css", "border-color", color).contains("6");

    cy.get("input").type("66");
    cy.should("have.value", "66");
    cy.get("button").contains("Добавить").click();

    cy.get(circle).eq(0).should("have.css", "border-color", color).contains("6");
    cy.get(content).eq(0).contains("head");

    cy.get(circle).eq(1).should("have.css", "border-color", secondColor).contains("66");
    cy.get(content).eq(1).contains("tail");

    cy.tick(500);
    cy.get(circle).eq(0).should("have.css", "border-color", color).contains("6");

    cy.get(circle).eq(1).should("have.css", "border-color", color).contains("66");

  });

  it("Правильность удаления элемента из очереди", () => {

    cy.clock();
    cy.get("input").type("6");
    cy.should("have.value", "6");
    cy.get("button").contains("Добавить").click();

    cy.tick(500);
    cy.get("input").type("66");
    cy.should("have.value", "66");
    cy.get("button").contains("Добавить").click();

    cy.tick(500);
    cy.get("button").contains("Удалить").click();
    cy.get(circle).eq(0).should("have.css", "border-color", secondColor).contains("6");
    cy.get(circle).eq(1).should("have.css", "border-color", color).contains("66");

    cy.tick(500);
    cy.get(circle).eq(0).should("have.css", "border-color", color);
    cy.get(circle).eq(1).should("have.css", "border-color", color).contains("66");
    cy.get("button").contains("Удалить").click();
    cy.get(circle).eq(1).should("have.css", "border-color", secondColor).contains("66");

    cy.tick(500);
    cy.get(circle).eq(1).should("have.css", "border-color", color);

  });

  it("Проверка поведении кнопки очистить", () => {

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
    cy.get("button").contains("Очистить").click();

    cy.tick(500);
    cy.get(circle).should("have.text", "");

  });

});