import { cn } from './classNames'

describe('classNames', () => {
    test('with first param', () => {
        expect(cn('someClass')).toBe('someClass ')
    })

    test('with first and third param', () => {
        expect(
            cn('someClass', {}, ['class1', 'class2'])
        ).toBe('someClass class1 class2 ')
    })

    test('with all (true) param', () => {
        expect(
            cn('someClass', {hovered: true, scrollable: true}, ['class1', 'class2'])
        ).toBe('someClass class1 class2 hovered scrollable')
    })

    test('with all (mixed) param', () => {
        expect(
            cn('someClass', {hovered: true, scrollable: false}, ['class1', 'class2'])
        ).toBe('someClass class1 class2 hovered')
    })

    test('with all (undefined) param', () => {
        expect(
            cn('someClass', {hovered: true, scrollable: undefined}, ['class1', 'class2'])
        ).toBe('someClass class1 class2 hovered')
    })
})
