const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));

app.post('/api', (request, resposne) => {
    console.log(request);
});

app.post()