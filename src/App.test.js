import React from 'react'
import {
  render, waitForElement, cleanup
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

afterEach(cleanup)

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {


    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('kirjaudu')
    )

    const blogs = component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(0)
  })
})

describe('<App />', () => {
  it('if user logged, blogs are rendered', async () => {


    beforeEach(() => window.localStorage.clear())



    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)


    await waitForElement(
      () => component.getByText('---')
    )


    const blogs = component.container.querySelectorAll('.partlyVisible')


    expect(blogs.length).toBe(38)
  })
})