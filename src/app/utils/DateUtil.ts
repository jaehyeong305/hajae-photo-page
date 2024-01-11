const formatDateDifference = (dateString: string): string => {
    const now = new Date();
    const postDate = new Date(dateString);
    const differenceInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    const timeUnits = [
        { unit: '년', secondsInUnit: 31536000 },
        { unit: '개월', secondsInUnit: 2592000 },
        { unit: '일', secondsInUnit: 86400 },
        { unit: '시간', secondsInUnit: 3600 },
        { unit: '분', secondsInUnit: 60 },
        { unit: '초', secondsInUnit: 1 },
    ];

    for (const { unit, secondsInUnit } of timeUnits) {
        const unitCount = Math.floor(differenceInSeconds / secondsInUnit);
        if (unitCount > 0) {
            if (unit === '개월' && unitCount >= 12) {
                return '1년 전 게시됨';
            }
            return `${unitCount}${unit} 전 게시됨`;
        }
    }

    return '방금 전 게시됨';
};

export default formatDateDifference;