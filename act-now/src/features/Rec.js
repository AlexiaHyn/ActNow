import { cFilter } from 'collaborative-filter';


export default function recommendEvents(userIndex) {
    // TODO: Get the ratings matrix from firebase
    const ratings = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 0],
    ];
    // const recommend = require('../lib/cf_api.js');

    const result = cFilter(ratings, userIndex);
    console.log(result);
}
