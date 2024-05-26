const circle = `div[class*="circle_circle"]`;
const color = "rgb(0, 50, 255)";
const secondColor = "rgb(210, 82, 225)";

describe("Строка", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion")
  })
  
  it("Кнопка добавления недоступная, если в поле пусто", () => {

    cy.get("input").clear();
    cy.get("button").should("be.disabled");

  });

  it("Строка разворачивается правильно", () => {

    cy.get("input").type("check");
    cy.should("have.value", "check");
    cy.get("button").contains("Развернуть").click();

    cy.clock();
    cy.get(circle).eq(0).should("have.css", "border-color", secondColor).contains("c");
    cy.get(circle).eq(1).should("have.css", "border-color", color).contains("h");
    cy.get(circle).eq(2).should("have.css", "border-color", color).contains("e");
    cy.get(circle).eq(3).should("have.css", "border-color", color).contains("c");
    cy.get(circle).eq(4).should("have.css", "border-color", secondColor).contains("k");  
    
    cy.tick(1000);
    cy.get(circle).eq(0).should("have.css", "border-color", "rgb(127, 224, 81)").contains("k");
    cy.get(circle).eq(1).should("have.css", "border-color", "rgb(127, 224, 81)").contains("c");
    cy.get(circle).eq(2).should("have.css", "border-color", "rgb(127, 224, 81)").contains("e");
    cy.get(circle).eq(3).should("have.css", "border-color", "rgb(127, 224, 81)").contains("h");
    cy.get(circle).eq(4).should("have.css", "border-color", "rgb(127, 224, 81)").contains("c");
    
  });

});