const dotenv = require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const {
  isAdmin,
  isLoggedIn,
  isOwner,
  isAdminOrOwner,
  access
} = require('./misc/helpers');

const UserSchema = require('./schemas/User');
const CourseSchema = require('./schemas/Course');
const CommentSchema = require('./schemas/Comment');
const RoleSchema = require('./schemas/Role');
const TagSchema = require('./schemas/Tag');

const PROJECT_NAME = 'courses-in-tech';
const adapterConfig = { mongoUri: process.env.MONGO };

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET
});

keystone.createList('User', {
  fields: UserSchema.fields,
  labelField: 'username',
  access: {
    read: access.isAdminOrOwner,
    update: access.isAdmin,
    create: access.isAdmin,
    delete: access.isAdmin,
    auth: true
  }
});

keystone.createList('Course', {
  fields: CourseSchema.fields,
  access: {
    read: true,
    update: access.isAdmin,
    create: access.isAdmin,
    delete: access.isAdmin,
    auth: true
  }
});

keystone.createList('Comment', {
  fields: CommentSchema.fields,
  access: {
    read: true,
    update: access.isAdminOrOwner,
    create: access.isLoggedIn,
    delete: access.isAdminOrOwner,
    auth: true
  }
});

keystone.createList('Role', {
  fields: RoleSchema.fields,
  access: {
    read: isAdmin,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    auth: true
  }
});

keystone.createList('Tag', {
  fields: TagSchema.fields,
  access: {
    read: true,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    auth: true
  }
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'username',
    secretField: 'password'
  }
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/', src: 'public' }),
    new AdminUIApp({ 
      name: PROJECT_NAME, 
      enableDefaultRoute: true, 
      authStrategy,
      isAccessAllowed: isLoggedIn
    })
  ],
};
