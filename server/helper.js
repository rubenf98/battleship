const ranks = ['diamond', 'gold', 'silver', 'bronze', 'unranked'];
exports.ranks = ranks;

const initial = [];
const initial1 =
    [
        'empty', 'boat', 'boat', 'boat', 'boat', 'boat', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'boat',
        'boat', 'boat', 'boat', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'boat', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty',
    ];

const initial2 =
    [
        'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty',
        'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty',
        'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty',
        'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'boat', 'boat', 'boat', 'empty', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
    ];

const initial3 =
    [
        'empty', 'empty', 'boat', 'boat', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'boat', 'empty', 'boat', 'boat', 'boat', 'boat', 'boat', 'empty', 'empty', 'empty',
        'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'boat', 'boat',
    ];

const initial4 =
    [
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'boat', 'boat',
        'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'boat', 'boat', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty',
        'boat', 'boat', 'boat', 'boat', 'boat', 'empty', 'boat', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
    ];
const initial5 =
    [
        'boat', 'boat', 'boat', 'boat', 'boat', 'empty', 'boat', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'boat', 'boat', 'boat', 'empty', 'boat', 'boat', 'boat', 'empty', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
    ];
const initial6 =
    [
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'boat', 'boat', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'boat', 'boat', 'empty', 'empty',
        'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'boat', 'empty', 'boat', 'boat', 'boat', 'empty', 'empty', 'empty', 'empty',
    ];
const initial7 =
    [
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'boat', 'boat', 'boat', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty',
        'boat', 'boat', 'boat', 'empty', 'boat', 'empty', 'boat', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'boat', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
    ];
const initial8 =
    [
        'boat', 'boat', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'boat', 'boat', 'boat', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'boat', 'boat', 'boat', 'empty',
        'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
    ];
const initial9 =
    [
        'boat', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'boat', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'boat', 'boat', 'boat', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'boat', 'boat', 'boat', 'boat', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty',
    ];
const initial10 =
    [
        'empty', 'empty', 'empty', 'boat', 'boat', 'boat', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'boat', 'empty',
        'empty', 'boat', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
        'empty', 'boat', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty',
        'boat', 'boat', 'boat', 'boat', 'empty', 'boat', 'empty', 'empty', 'empty', 'empty',
    ];


initial.push(initial1, initial2, initial3, initial4, initial5, initial6, initial7, initial8, initial9, initial10);
exports.initial = initial;