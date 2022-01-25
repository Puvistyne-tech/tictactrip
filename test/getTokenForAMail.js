var axios = require('axios');
var data = JSON.stringify({
    "email": "styneze@one.com"
});

var config = {
    method: 'post',
    url: 'localhost:3000/api/token',
    headers: {
        'Content-Type': 'application/json'
    },
    data : data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
