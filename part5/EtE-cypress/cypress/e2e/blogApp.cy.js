

let blog
let token
let likesArrayOriginal = []
describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('form').should('exist')
    cy.get('input[name="Username"]').should('exist')
    cy.get('input[name="Password"]').should('exist')
    cy.get('button[type="submit"]').contains('login')
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'test',
        username: 'username',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 
      cy.visit('http://localhost:5173')
    })

    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('username')
      cy.get('input[name="Password"]').type('password')
      cy.get('button[type="submit"]').click()

      cy.contains('blogs')
      cy.contains('test logged in')
      })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('usernmae')
      cy.get('input[name="Password"]').type('password')
      cy.get('button[type="submit"]').click()

      cy.contains('Error, invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html')
        .should('not.contain', 'test logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'test',
        username: 'username',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 

      cy.login({ username: 'username', password: 'password' })
    })

    it('a blog can be created and is added to the list of blogs', function() {
      let blog = {
        title: 'test blog',
        author: 'tester',
        url: 'example.cl'
      }

      cy.createBlog(blog)
      .then((response) => {
        expect(response.status).to.eq(200)
      })

      cy.visit('http://localhost:5173')

            
      cy.contains('test blog by tester')
      
    })

    it('user can like post', function() {
      

      cy.createBlog({
        title: 'test blog',
        author: 'tester',
        url: 'example.cl'
      })
      cy.visit('http://localhost:5173')

      cy.contains('view').click()
      cy.contains('0 Likes')
      cy.get('#Like').click()
      cy.contains('view').click()
      cy.contains('1 Likes')
    })
  })
  describe('remove Blog', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'test',
        username: 'username',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 

      cy.login({ username: 'username', password: 'password' })
      cy.createBlog({
        title: 'test blog',
        author: 'tester',
        url: 'example.cl'
      }).then((response) => {
        blog = response.body
      })
    })

    it('user who created the blog', function() {
      cy.visit('http://localhost:5173')
      cy.contains('view').click()
      cy.contains('Remove')
    })

    it('user who created can delete it', function() {
      cy.visit('http://localhost:5173')
      cy.contains('view').click()
      cy.contains('Remove').click()

      cy.get('html').should('not.contain', 'test blog by tester')

    })

    it('user didn t create the blog', function() {
      const user = {
        name: 'test2',
        username: 'username2',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 

      cy.login({ username: 'username2', password: 'password' })

      cy.visit('http://localhost:5173')
      cy.contains('view').click()
      cy.get('html').should('not.contain', 'Remove')
    })

    it('user didn t create the blog can t delete it', function() {
      const user = {
        name: 'test2',
        username: 'username2',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 

      cy.login({ username: 'username2', password: 'password' })
        .then((response) => {
          token = response.token
        })

      cy.visit('http://localhost:5173')
      cy.request({
        method: 'DELETE',
        url: `http://localhost:3001/api/blogs/${blog.id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
        .then((response) => {
          cy.expect(response.status).to.eq(401)
        })
      cy.get('html').should('not.contain', 'Remove')
    })
  })

  describe('Blogs', function() {
    beforeEach(function() {
      let blogs = [
        {
          title: 'test blog bigger',
          author: 'tester',
          url: 'example.cl',
          likes:20
        },
        {
          title: 'test blog',
          author: 'tester',
          url: 'example.cl',
        },
        {
        title: 'test blog big',
        author: 'tester',
        url: 'example.cl',
        likes:10
      }
      ]

      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'test',
        username: 'username',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 

      cy.login({ username: 'username', password: 'password' })
      cy.createBlog(blogs[0])
      cy.createBlog(blogs[1])
      cy.createBlog(blogs[2])

      likesArrayOriginal = blogs.map(blog => blog.likes || 0)

    })

    it('blogs ordered by likes, original array is not sorted', function() {
      const likesArray = []

      cy.visit('http://localhost:5173')
      cy.get('.blog').each(blog => {
        cy.wrap(blog).contains('view').click()
      })
      cy.get('.likes').then(likes => {
        likes.each((index, like) => {
          const likeText = Cypress.$(like).text()
          const likeNumber = parseInt(likeText)
          
          likesArray.push(likeNumber)
          console.log(likesArray)
        })
      console.log(likesArray, likesArrayOriginal)
      })
      expect(likesArray).to.not.eq(likesArrayOriginal)
    })

    it('blogs ordered by likes, original array is sorted', function() {
      const likesArray = []

      cy.visit('http://localhost:5173')
      cy.get('.blog').each(blog => {
        cy.wrap(blog).contains('view').click()
      })
      cy.get('.likes').then(likes => {
        likes.each((index, like) => {
          const likeText = Cypress.$(like).text()
          const likeNumber = parseInt(likeText)
          const sortedOriginalArray = likesArrayOriginal.sort((a, b) => b - a)
          console.log(likeNumber, index)
          console.log(sortedOriginalArray)

          expect(likeNumber).to.eq(sortedOriginalArray[index])
        })
      })
    })
  })
})

