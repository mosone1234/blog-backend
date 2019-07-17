'use strict'

module.exports = (sequealize, Sequealize) => {
    const article = sequealize.define('article', {
        title: {
            type: Sequealize.STRING(255)
        },
        image: {
            type: Sequealize.STRING(255)
        },
        description: {
            type: Sequealize.STRING(255)
        }
    });
    return article;
}