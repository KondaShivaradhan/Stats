const Apex = require('apex-api');
const apex = new Apex('f582bd87-1ccb-4f27-ad72-61900e1408d6');

// apex.user('BlazingBane', 'PC').then(data => {
//     console.log((data.data.children[0].metadata), data.data.children[0].stats[0].value)
// });
module.exports = apex;