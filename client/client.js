const express = require('express');
const app = express();
const path = require('path')
const PORT = 9001
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT,function(){
    console.log("CONNECT TO " + PORT);
})