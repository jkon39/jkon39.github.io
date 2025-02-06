/*********************************************************************************

WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca Academic 
Policy. No part *  of this assignment has been copied manually or electronically
from any other source (including 3rd party web sites) or distributed to other 
students.

Name: Johnny Nguyen
Student ID: 157003203 
Date: Wed, Feb 5, 2025
Replit Web App URL: https://replit.com/@johnnyn39/web322-app
GitHub Repository URL: https://github.com/jkon39/web322-app

********************************************************************************/ 
const storeService = require('./store-service.js');
const express = require('express'); 
const path = require('path');
const { json } = require('stream/consumers');

const app = express(); 
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

storeService.initialize().then(() => {
    app.listen(HTTP_PORT, () =>
        console.log(`Express http server listening on ${HTTP_PORT}`));

    app.get('/', (req, res) => {
        res.redirect('/about');
    });

    app.get('/about', (req, res) => {
        res.sendFile(path.join(__dirname, '/views/about.html'));
    });

    //Return filtered items
    app.get('/shop', (req, res) => {
        storeService.getPublishedItems().then(filteredItems => {
            res.send(filteredItems);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
    });

    //Return items
    app.get('/items', (req, res) => {
        storeService.getAllItems().then(items => {
            res.send(items);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
    });

    //Return categories
    app.get('/categories', (req, res) => {
        storeService.getCategories().then(categories => {
            res.send(categories);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
    });

    //Return 404
    app.use((req, res, next) => {
        res.status(404).send(`404 - Page Not Found`);
    });
})
.catch((err) => {
    console.log(err);
    app.use((req, res) => {
        res.status(404).send(err);
    })
});
