const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req,res) => {

    const photo = {
        id: "1",
        name: "BeagleBone",
        description: "Computer"
    }

    res.send(photo);
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başlatıldı...`);
});
