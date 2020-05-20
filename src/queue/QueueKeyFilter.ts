
const BAD_WORDS = [
    'ASS', 'ARSE',
    'BOOB', 'BUTT', 'BUM',
    'CLIT', 'COCK', 'COK', 'COQ', 'CUCK', 'CUK', 'CUM', 'CUNT',
    'DAMN', 'DICK',
    'FUCK',
    'KKK',
    'LABIA',
    'METH',
    'NAZI', 'NIGGA', 'NIPL',
    'PEE', 'PENIS', 'PISS', 'POO',
    'SHIT',
    'TIT',
    'VAG',
    'WEED',
];

export function keyContainsBadWord(key: string): boolean {
    return BAD_WORDS.some((word) => {
        const wordRegex = buildRegexFromWord(word);
        return wordRegex.test(key);
    });
}

function buildRegexFromWord(word: string): RegExp {
    let rWord = word;
    rWord = rWord.replace(/A/g, '[A4]');
    rWord = rWord.replace(/B/g, '[B38]');
    rWord = rWord.replace(/E/g, '[E3]');
    rWord = rWord.replace(/G/g, '[G6]');
    rWord = rWord.replace(/I/g, '[I1]');
    rWord = rWord.replace(/L/g, '[L1]');
    rWord = rWord.replace(/O/g, '[O0Q]');
    rWord = rWord.replace(/S/g, '[S5]');
    rWord = rWord.replace(/T/g, '[T7]');
    rWord = rWord.replace(/Z/g, '[Z2]');
    return new RegExp(rWord);
}
