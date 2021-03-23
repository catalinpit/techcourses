const { Text, Select, CalendarDay, Relationship } = require('@keystonejs/fields');
const { Markdown } = require('@keystonejs/fields-markdown');

module.exports = {
    fields: {
        name: {
            type: Text,
            isRequired: true
        },
        releaseDate: {
            type: CalendarDay,
            defaultValue: new Date().toISOString('YYYY-MM-DD').substring(0, 10), // Today's date
        },
        author: {
            type: Text,
            isRequired: true
        },
        description: {
            type: Markdown,
            isMultiline: true
        },
        status: {
            type: Select,
            options: [
                {
                    value: 'DRAFT',
                    label: 'Draft'
                },
                {
                    value: 'UNPUBLISHED',
                    label: 'Unpublished'
                },
                {
                    value: 'PUBLISHED',
                    label: 'Published'
                }
            ],
            defaultValue: 'DRAFT'
        },
        addedBy: {
            type: Relationship,
            ref: 'User.courses'
        },
        comments: {
            type: Relationship,
            ref: 'Comment.course',
            many: true
        }
    }
}