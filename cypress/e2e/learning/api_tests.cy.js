import { faker } from "@faker-js/faker";

describe("API testy", () => {
  it("Základní API testy", () => {
    const email = faker.internet.exampleEmail();
    const password = faker.internet.password();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const age = faker.number.int({ min: 18, max: 99 });

    cy.request({
      method: "POST",
      url: "https://tegb-backend-877a0b063d29.herokuapp.com/auth/register",
      body: {
        email: email,
        password, // ? Pokud se klíč i hodnota rovnají (password: password), můžeme zapsat jen název proměnné (password)
        firstName,
        lastName,
        age,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.user.id).to.be.ok; // Kontrola, že property user.id existuje v body odpovědi.
      expect(response.body.user.email).to.equal(email);
    });
  });

  it("Kombinace Frontend a API testů", () => {
    const email = faker.internet.exampleEmail();
    const password = faker.internet.password();
    const username = faker.internet.username();

    cy.intercept("/tegb/register").as("post_register");
    cy.visit("https://tegb-frontend-88542200c6db.herokuapp.com/");
    cy.get('[data-testid="register-button"]').click();
    cy.get('[data-testid="username-input"]').type(username);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="submit-button"]').click();
    cy.wait("@post_register").then((http) => {
      expect(http.request.body.email, `Request email = ${email}`).to.equal(
        email
      );
      // ? V rámci expectů (assertů) často můžeme definovat vlastní zprávy/názvy kontrol pro lepší přehlednost v reportech
      expect(http.response.body.email, `Response email = ${email}`).to.equal(
        email
      );
    });
  });
});
