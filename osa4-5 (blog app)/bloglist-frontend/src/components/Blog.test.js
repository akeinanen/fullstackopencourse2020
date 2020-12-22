import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component

    beforeEach(() => {
        const blog = {
            title: 'TestiBlog',
            author: 'JP',
            url: 'jp.com/testiblog',
            likes: 15
        }
        component = render(
            <Blog blog={blog} />
        )
    })

    test('renders only title', () => {

        expect(component.container).toHaveTextContent(
            'TestiBlog'
        )

        expect(component.container).not.toHaveTextContent(
            'jp.com/testiblog'
        )
    })

    test('renders rest of the data when "show more"-button is clicked', () => {

        const button = component.getByText('show more')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent(
            'jp.com/testiblog'
        )
    })

})

describe('random', () => {

    test('Clicking like multiple times works', () => {

        const mockHandler = jest.fn()

        const blog = {
            title: 'TestiBlog',
            author: 'JP',
            url: 'jp.com/testiblog',
            likes: 15
        }

        const component = render(
            <Blog blog={blog} addLike={mockHandler} />
        )

        const button = component.getByText('show more')
        fireEvent.click(button)

        const Likebutton = component.getByText('like')
        fireEvent.click(Likebutton)
        fireEvent.click(Likebutton)

        expect(blog.likes).toBe(17)
    })
})