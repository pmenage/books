describe('Books.vue', () => {
  it('clicking on right arrow should take to the next page of results', () => {
    cy.visit('/')
    cy.get('.v-data-footer__pagination').should($div => expect($div.text()).to.include('1-5'));
    cy.get('.v-data-footer__icons-after button').click();
    cy.get('.v-data-footer__pagination').should($div => expect($div.text()).to.include('6-10'));
  });
});
