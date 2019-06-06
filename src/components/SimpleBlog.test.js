import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
import { prettyDOM } from '@testing-library/dom'
import { executionAsyncId } from 'async_hooks';

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
  console.log(prettyDOM(div))
  expect(div).toBeDefined()
  expect(div).toHaveTextContent(
    'blog has 100 likes'
  )

})