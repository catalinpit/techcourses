const dotenv = require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const UserSchema = require('./schemas/User');
const CourseSchema = require('./schemas/Course');
const CommentSchema = require('./schemas/Comment');
const RoleSchema = require('./schemas/Role');

const PROJECT_NAME = 'courses-in-tech';
const adapterConfig = { mongoUri: process.env.MONGO };

/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET
});

const isAdmin = ({ authentication: { item: user } }) => !!user && !!user.isAdmin;
const isLoggedIn = ({ authentication: { item: user } }) => !!user;

const isOwner = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }

  return { id: user.id }
}

const isAdminOrOwner = auth => {
  const admin = access.isAdmin(auth);
  const owner = access.isOwner(auth);

  return admin ? admin : owner;
}

const access = { isAdmin, isOwner, isLoggedIn, isAdminOrOwner };

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
})

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
