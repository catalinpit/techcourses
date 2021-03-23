const { Text, Relationship } = require('@keystonejs/fields');

module.exports = {
    fields: {
        name: {
            type: Text,
            isRequired: true
        },
        course: {
            type: Relationship,
            ref: 'Course.comments'
        },
        author: {
            type: Relationship,
            ref: 'User.comments'
        }
    }
}