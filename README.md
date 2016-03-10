
# Full Stack Web Development - Lab 8: Users!

* Update the express function that handles the POST of the
  registration form to:
  * Create a new [`User`](./models/user.js) record for the new user.
  * Add the id of the newly created user record to the session in the
    `user_id` property.
* Add a new or update the existing `app.use` function to load the user
  record for the session, based on the `user_id` property.
  * Add that user record to `request` object as the `user` property.

## Some conditions to consider

* What is the proper behavior for the registration page if the user:
  * Already exists
  * Is already logged in

## Extra credit?

* Login page! Lookup the user by username:

        User.findOne({ where: { username: 'someUserName' } })
          .then(function(user) { /* ... */ })

* Logout page! To remove the existing session (new id/cookie):
  
        request.session.destroy(function(error) { /* ... */ })

