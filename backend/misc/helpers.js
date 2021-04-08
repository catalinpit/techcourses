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

module.exports = {
    isAdmin,
    isLoggedIn,
    isOwner,
    isAdminOrOwner,
    access
}