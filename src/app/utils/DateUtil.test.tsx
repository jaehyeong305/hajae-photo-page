import formatDateDifference from './DateUtil';

describe('formatDateDifference', () => {
    const now = new Date('2024-01-10T00:00:00Z');
    const figure = [
        {
            postDate: '2024-01-10T00:00:00Z',
            expect: '방금 전 게시됨',
        },
        {
            postDate: '2024-01-05T10:00:00Z',
            expect: '4일 전 게시됨',
        },
        {
            postDate: '2024-01-05T00:00:00Z',
            expect: '5일 전 게시됨',
        },
        {
            postDate: '2023-12-12T00:00:00Z',
            expect: '29일 전 게시됨',
        },
        {
            postDate: '2023-12-11T00:00:00Z',
            expect: '1개월 전 게시됨',
        },
        {
            postDate: '2023-06-10T06:45:00Z',
            expect: '7개월 전 게시됨',
        },
        {
            postDate: '2023-02-09T00:00:00Z',
            expect: '11개월 전 게시됨',
        },
        {
            postDate: '2023-01-10T00:00:00Z',
            expect: '1년 전 게시됨',
        },
        {
            postDate: '2023-01-10T15:30:00Z',
            expect: '1년 전 게시됨',
        },
        {
            postDate: '2021-01-01T00:00:00Z',
            expect: '3년 전 게시됨',
        },
    ];

    figure.forEach((f) => {
        describe(`when now: 2024-01-10T00:00:00Z, post created at: ${f.postDate}`, () => {
            it(`returns ${f.expect}`, () => {
                jest.useFakeTimers().setSystemTime(new Date('2024-01-10T00:00:00Z'));

                const actual = formatDateDifference(f.postDate);
                expect(actual).toEqual(f.expect);

                jest.restoreAllMocks();
            });
        });
    });
});
