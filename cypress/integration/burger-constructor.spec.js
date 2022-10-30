require('@4tw/cypress-drag-drop');

describe('burger constructor works correctly', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('drag-and-drop', () => {
    cy.get(
      '.bun   + section[class^="ingredients-group"] > a:first-child',
    ).drag('[class^="burger-constructor"]');
    cy.get(
      '.sauce + section[class^="ingredients-group"] > a:first-child',
    ).drag('[class^="burger-constructor"]');
    cy.get(
      '.main  + section[class^="ingredients-group"] > a:first-child',
    ).drag('[class^="burger-constructor"]');

    let defaultText = '';

    cy.get(
      '[class^="burger-constructor"] > [class^="burger-constructor_otherIngredients"] > :nth-child(1)',
    )
      .invoke('text')
      .then((text) => {
        defaultText = text;
      });

    cy.get(
      '[class^="burger-constructor"] > [class^="burger-constructor_otherIngredients"] > :nth-child(2)',
    ).drag(
      '[class^="burger-constructor"] > [class^="burger-constructor_otherIngredients"] > :nth-child(1)',
    );

    cy.get(
      '[class^="burger-constructor"] > [class^="burger-constructor_otherIngredients"] > :nth-child(1)',
    )
      .invoke('text')
      .then((text) => {
        expect(defaultText).to.not.equal(text);
      });

    cy.get(
      '[class^="burger-constructor"] > [class^="burger-constructor_otherIngredients"] > :nth-child(2)',
    )
      .invoke('text')
      .then((text) => {
        expect(defaultText).to.equal(text);
      });

    cy.get('div[class^="burger-constructor"]').should(
      'contain',
      'булка',
    );

    cy.get('div[class^="burger-constructor_bun"]').should((item) => {
      expect(item).to.have.length(2);
    });
  });
});
