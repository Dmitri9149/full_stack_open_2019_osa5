import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
import { prettyDOM } from '@testing-library/dom'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Komponenttitestaus tapahtuu react-testing-library:llä',
    author: 'Dmitri',
    likes:100
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Komponenttitestaus tapahtuu react-testing-library:llä'
  )

  expect(component.container).toHaveTextContent(
    'Dmitri'
  )


  const div = component.container.querySelector('.likes')
  expect(div).toBeDefined()
  expect(div).toHaveTextContent(
    'blog has 100 likes'
  )

})

test('clicking the button 2 times calls event handler twice', async () => {
  const blog = {
    title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    author: 'Dmitri',
    likes: 100
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)


  expect(mockHandler.mock.calls.length).toBe(2)
})