const circle = `div[class*="circle_circle"]`;
const content = `div[class*="circle_content"]`;
const color = "rgb(0, 50, 255)";
const secondColor = "rgb(210, 82, 225)";

describe("Список", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("Кнопка добавления недоступна, если в поле пусто", () => {

    cy.get("input").clear();
    cy.get("button").contains("Добавить в head").parent().should("be.disabled");
    cy.get("button").contains("Добавить в tail").parent().should("be.disabled");
    cy.get("button").contains("Удалить по индексу").parent().should("be.disabled");

  });

  it("Корректность отрисовки дефолтного списка", () => {

    cy.get(circle).should("not.be.empty").should("have.length", 4);
    cy.get(content).eq(0).contains("head");
    cy.get(content).eq(3).contains("tail");

    cy.get(circle).eq(0).should("have.css", "border-color", color).contains("94");
    cy.get(circle).eq(1).should("have.css", "border-color", color).contains("5");
    cy.get(circle).eq(2).should("have.css", "border-color", color).contains("128");
    cy.get(circle).eq(3).should("have.css", "border-color", color).contains("34");

  });

  it("Корректность добавления элемента в head", () => {

    cy.get("input").clear();
    cy.get("button").should("be.disabled");

    cy.get(circle).should("have.length", 4);
    cy.get(`input[placeholder="Введите значение"]`).type("6");
    cy.should("have.value", "6");

    cy.clock();
    cy.get("button").contains("Добавить в head").click();
    cy.get(circle).should("have.length", 5);
    cy.get(circle).first().should("have.css", "border-color", secondColor).contains("6");

    cy.tick(500);
    cy.get(circle).first().contains("6");
    cy.get(content).eq(0).contains("head");

    cy.tick(1000);
    cy.get(circle).first().should("have.css", "border-color", color).contains("6");
    cy.get(content).eq(0).contains("head");

  });

  it("Корректность добавления элемента в tail", () => {

    cy.get("input").clear();
    cy.get("button").should("be.disabled");

    cy.get(circle).should("have.length", 4);

    cy.clock();
    cy.get(`input[placeholder="Введите значение"]`).type("66");
    cy.should("have.value", "66");
    cy.get("button").contains("Добавить в tail").click();
    cy.get(circle).should("have.length", 5);
    cy.get(circle).eq(3).should("have.css", "border-color", secondColor).contains("66");

    cy.tick(500);
    cy.get(circle).eq(4).should("have.css", "border-color", "rgb(127, 224, 81)").contains("66");
    cy.get(content).last().contains("tail");

  });

  it("Корректность добавления элемента по индексу", () => {

    cy.get("input").clear();

    cy.get(circle).should("have.length", 4);

    cy.clock();
    cy.get(`input[placeholder="Введите значение"]`).type("666");
    cy.should("have.value", "666");
    cy.get(`input[placeholder="Введите индекс"]`).type("1");
    cy.should("have.value", "1");
    cy.get("button").contains("Добавить по индексу").click();

    cy.tick(1000);
    cy.get(circle).should("have.length", 5);

    cy.get(circle).first().should("have.css", "border-color", secondColor).contains("666");

    cy.tick(500);
    cy.get(content).eq(0).contains("head");
    cy.get(circle).first().should("have.css", "border-color", secondColor);

    cy.get(circle).eq(1).should("have.css", "border-color", secondColor).contains("666");

    cy.tick(500);
    cy.get(circle).eq(1).should("have.css", "border-color", "rgb(127, 224, 81)").contains("666");

    cy.tick(500);
    cy.get(circle).eq(1).should("have.css", "border-color", color).contains("666");

  });

  it("Корректность удаления элемента из head", () => {

    cy.clock();
    cy.get("button").contains("Удалить из head").click();
    cy.get(circle).eq(0).should("have.css", "border-color", color);
    cy.get(circle).eq(1).should("have.css", "border-color", secondColor);

    cy.tick(500);
    cy.get(circle).eq(0).should("have.css", "border-color", color);

  });

  it("Корректность удаления элемента из tail", () => {

    cy.clock();
    cy.get("button").contains("Удалить из tail").click();
    cy.get(circle).last().should("have.css", "border-color", secondColor);

    cy.tick(500);
    cy.get(circle).should("have.css", "border-color", color);

  });

  it("Корректность удаления элемента по индексу", () => {

    cy.clock();
    cy.get(`input[placeholder="Введите индекс"]`).type("0");
    cy.should("have.value", "0");
    cy.get("button").contains("Удалить по индексу").click();

    cy.get(circle).eq(0).should("have.css", "border-color", color);

    cy.tick(500);
    cy.get(circle).eq(0).should("have.css", "border-color", secondColor);
    cy.get(circle).eq(1).should("have.css", "border-color", secondColor);

    cy.tick(1000);
    cy.get(circle).should("have.css", "border-color", secondColor);
    cy.get(circle).should("have.length", 3);
    
  });

})