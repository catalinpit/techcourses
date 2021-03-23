const { Text, Checkbox, Relationship } = require('@keystonejs/fields');

module.exports = {
    fields: {
        name: {
            type: Text,
            isRequired: true
        },
        canManageComments: {
            type: Checkbox,
            label: 'This user can add/edit/delete comments',
            defaultValue: false,
        },
        assignedTo: {
            type: Relationship,
            ref: 'User.role',
            many: true
        }
    }
}