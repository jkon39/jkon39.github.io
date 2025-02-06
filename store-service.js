const fs = require('fs');
const path = require('path');

let items = [];
let categories = [];

function initialize() {
    return new Promise((resolve, reject) => {
        let filePath = path.join(__dirname, '/data/items.json');
        fs.readFile(filePath, 'utf-8', (err, fileData) => {
            if (err) {
                console.log(err.message);
                reject(`File could not be read.`);
            } else {
                items = JSON.parse(fileData);
            }
        });
        filePath = path.join(__dirname, '/data/categories.json')
        fs.readFile(filePath, 'utf-8', (err, fileData) => {
            if (err) {
                console.log(err.message);
                reject(`File could not be read.`);
            } else {
                categories = JSON.parse(fileData);
            }
        });
        resolve();
    });
}

function getAllItems() {
    return new Promise((resolve, reject) => {
        if (items.length > 0) {
            resolve(items);
        } else {
            reject(`No Items have been found.`);
        }
    });
}

function getPublishedItems() {
    return new Promise((resolve, reject) => {
        const publishedItems = items.filter(item => item.published === true);
        if (publishedItems.length > 0) {
            resolve(publishedItems);
        } else {
            reject(`No Items have been published.`);
        }
    });
}

function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length > 0) {
            resolve(categories);
        } else {
            reject(`No Categories have been found.`);
        }
    });
}

module.exports = { initialize, getAllItems, getPublishedItems, getCategories,
    items, categories
 };