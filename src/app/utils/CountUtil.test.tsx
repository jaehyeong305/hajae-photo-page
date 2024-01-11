import addCommasToNumber from './CountUtil';

describe('formatDateDifference', () => {
    const now = new Date('2024-01-10T00:00:00Z');
    const figure = [
        {
            number: 111,
            expect: '111',
        },
        {
            number: 1111,
            expect: '1,111',
        },
        {
            number: 12345,
            expect: '12,345',
        },
        {
            number: 987654,
            expect: '987,654',
        },
        {
            number: 1234123412341234,
            expect: '1,234,123,412,341,234',
        },
    ];

    figure.forEach((f) => {
        describe(`when number is ${f.number}`, () => {
            it(`returns ${f.expect}`, () => {
                const actual = addCommasToNumber(f.number);
                expect(actual).toEqual(f.expect);
            });
        });
    });
});
