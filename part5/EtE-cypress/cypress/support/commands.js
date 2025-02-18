Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/users/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('user', JSON.stringify(body))
      Cypress.env('authToken', body.token)
      cy.visit('http://localhost:5173')
    })
  })

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    body: blog,
    headers: {
      Authorization: `Bearer ${Cypress.env('authToken')}`
    }
  })
})
