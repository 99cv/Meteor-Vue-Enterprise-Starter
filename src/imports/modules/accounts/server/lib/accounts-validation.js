import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { userSchema } from './../../shared/schemas/user-schema';

// Deny all client-side updates to user documents
Meteor.users.deny({
  update () { return true; }
});

const setupAccountsValidation = () => {
  Accounts.validateNewUser((user) => {
    try {
      userSchema.validate(user);
      return true;
    } catch (e) {
      throw e;
    }
  });

  Accounts.validateLoginAttempt(({
    type,            // (String) the service name, such as "password" or "twitter".
    allowed,         // (Boolean)  Whether this login is allowed and will be successful.
    error,           // (Error)  When allowed is false, the exception describing why the login failed.
    user,            // (Object)  When it is known which user was attempting to login, the Meteor user object.
    connection,      // (Object)  The connection object the request came in on.
    methodName,      // (String)  The name of the Meteor method being used to login.
    methodArguments  // (Array)  An array of the arguments passed to the login method
  }) => {
    // if the login failed, return false
    if (!allowed) {
      return false;
    }
    // check their email address is verified. this assumes only one email is allowed per account
    if (user.emails[0].verified === true) {
      return true;
    } else {
      throw new Meteor.Error(403, 'You must verify your email address before you can log in');
    }
  });

  // add first name and last name to user object
  // Accounts.onCreateUser((options, user) => {
  //   const customizedUser = { ...user };
  //   // We still want the default hook's 'profile' behavior.
  //   if (options.profile) {
  //     customizedUser.profile = options.profile;
  //   }
  //   return customizedUser;
  // });
};

export {
  setupAccountsValidation
};
