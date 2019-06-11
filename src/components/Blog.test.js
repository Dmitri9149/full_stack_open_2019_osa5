import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'
afterEach(cleanup)


describe('< Blog />', () => {

  const blog = {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 31,
    user: {
      blogs: [
        '5cebe43a8754bb2698ba9725',
        '5cebe44c8754bb2698ba9726',
        '5cebe45c8754bb2698ba9727',
        '5cebe46f8754bb2698ba9728',
        '5cebe47a8754bb2698ba9729',
        '5cebe4868754bb2698ba972a',
        '5cebe4918754bb2698ba972b',
        '5cf4b21e6f83fa00e47c3d13',
        '5cf615eb75d5162594df4391',
        '5cf616ee75d5162594df4392',
        '5cf63cf275d5162594df4393',
        '5cf63d3475d5162594df4394',
        '5cf63dc575d5162594df4395',
        '5cf63e4f75d5162594df4396',
        '5cf6437575d5162594df4397',
        '5cf643d375d5162594df4398'
      ],
      username: 'username1',
      name: 'name1',
      id: '5cebe3ed8754bb2698ba9722'
    },
    id: '5cebe43a8754bb2698ba9725'
  }



  let component
  beforeEach(() => {
    component = render(
      <Blog buttonLabel="show..." blog = {blog} handleLikes = {() => {}}
        displayOrNot = { { display:'none' } }  deleteBlog = {() => {}}
      >
        <div className="testDiv" />
      </Blog>
    )
  })
  test('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  test('at start the children are not displayed', () => {
    const div1 = component.container.querySelector('.allAreVisible')
    expect(div1).toHaveStyle('display: none')
    const div2 = component.container.querySelector('.partlyVisible')
    expect(div2).not.toHaveStyle('display: none')

  })
  test('after clicking the title, children are displayed', () => {
    const title = component.container.querySelector('.clickWhenPartlyVisible')
    fireEvent.click(title)

    const div1 = component.container.querySelector('.allAreVisible')
    expect(div1).not.toHaveStyle('display: none')
    const div2 = component.container.querySelector('.partlyVisible')
    expect(div2).toHaveStyle('display: none')

  })





})
