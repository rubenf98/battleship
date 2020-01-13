const ranks = ['diamond', 'gold', 'silver', 'bronze', 'unranked'];
exports.ranks = ranks;

const initial = [];
const initial1 =
    [
        'empty', 'boat', 'boat', 'boat', 'boat', 'boat', 'empty', 'empty', 'empty', 'empty',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'boat',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'boat',
        'boat', 'boat', 'boat', 'empty', 'empty', 'empty', 'boat', 'empty', 'empty', 'empty',
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

initial.push(initial1, initial2, initial3);
exports.initial = initial;