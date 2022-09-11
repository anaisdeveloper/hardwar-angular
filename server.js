
	// create an express app
    const express = require('express');
    const path = require("path");
    const app = express();
    
    // use the express-static middleware
    app.use(express.static("./dist/hardware"));
    
    // define the first route
    app.get('/*', function (req, res) {
      res.sendFile('index.html', {root: 'dist/hardware/'});
    })
   
    // start the server listening for requests
    app.listen(process.env.PORT || 3000);
    