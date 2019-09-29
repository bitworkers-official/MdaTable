describe('MdaList', () => {
  it('renders a heading', () => {
    cy.visit('/')
    cy.contains('h1', /mdalist/i)
  })

  it('renders the table', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: '**/getPeoples',
      response: [
        { name: 'first user', cwid: 'abcde' },
        { name: 'second user', cwid: 'defgh' },
      ],
    }).as('getPeople')
    cy.visit('/')
    cy.wait('@getPeople')
    cy.get('.mda-table')
      .find('.mda-table-cell')
      .should('have.length', 6)
  })

  it('can delete users', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: '**/getPeoples',
      response: [
        { name: 'first user', cwid: 'abcde' },
        { name: 'second user', cwid: 'defgh' },
      ],
    }).as('getPeople')
    cy.visit('/')
    cy.wait('@getPeople')
    const deleteUser = () =>
      cy
        .get('.mda-table')
        .get('button')
        .first()
        .click()
    const expectCells = (numberOfCells: number) => {
      cy.get('.mda-table')
        .find('.mda-table-cell')
        .should('have.length', 3)
    }
    deleteUser()
    expectCells(3)
    deleteUser()
    expectCells(0)
  })
})
