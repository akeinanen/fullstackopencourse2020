import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

    const createBlog = jest.fn()

    test('Creating a new blog', () => {
        const component = render(
            <BlogForm createBlog={createBlog} />
        )

        const title= component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')

        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: 'TestiPosti' }
        })
        fireEvent.change(author, {
            target: { value: 'Pasi' }
        })
        fireEvent.change(url, {
            target: { value: 'jp.com' }
        })
        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('TestiPosti')
        expect(createBlog.mock.calls[0][0].author).toBe('Pasi')
        expect(createBlog.mock.calls[0][0].url).toBe('jp.com')

    })

})