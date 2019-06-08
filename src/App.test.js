import React from 'react'
import {
  render, waitForElement, act, cleanup
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