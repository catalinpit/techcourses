const { Text, Relationship } = require('@keystonejs/fields');
const { Content } = require('@keystonejs/fields-content');

module.exports = {
    fields: {
        name: {
            type: Text,
            isRequired: true
        },
        description: {
            type: Content,
            isRequired: true
        },
        courses: {
            type: Relationship,
            ref: 'Course.tags',
            many: true
        }
    }
}