const { Text, Password, Checkbox, Relationship } = require('@keystonejs/fields');

module.exports = {
    fields: {
        firstName: {
            type: Text,
            isRequired: true
        },
        lastName: {
            type: Text,
            isRequired: true
        },
        username: {
            type: Text,
            isRequired: true 
        },
        password: {
            type: Password,
            isRequired: true
        },
        isAdmin: {
            type: Checkbox,
            defaultValue: false
        },
        courses: {
            type: Relationship,
            ref: 'Course.addedBy',
            many: true
        },
        comments: {
            type: Relationship,
            ref: 'Comment.author',
            many: true
        },
        role: {
            type: Relationship,
            ref: 'Role.assignedTo'
        }
    }
}