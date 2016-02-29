# Full Stack Web Development - Lab 5, Part 2: The Herokuning

1. Update your fork of this project with the latest code changes from
   this repository.  See:
   [Syncing a fork](https://help.github.com/articles/syncing-a-fork/)

2. Sign up for an account on [Heroku](http://heroku.com)

3. Install the heroku toolchain (`brew install heroku`)

4. Run `heroku login` to connect to your heroku account

5. Ensure that any changes you have locally committed to your local
   git repository (run `git status` to check, and then use `git add`
   and `git commit` to get things checked in).

6. Run `heroku create` to create an application on heroku to hold what
   we've built.
   
   This does a number of things, including:
   
   * Creating the new application in heroku
   * Setting up a git repository on heroku to hold the source code
   * Adding the heroku git repository as a remote repository to your
     local repository

7. Run `heroku addons:create heroku-postgresql:hobby-dev` to tell
   heroku that you want to add a database to your application.
   
8. Run `heroku config` to see the application configuration heroku has
   setup so far, including `DATABASE_URL`.

9. Run `git push heroku master`

10. Watch in amazement!

11. Go take a look at your application in *production* (url will
    depend on your application name, and the `git push` output will
    let you know what it is).

12. Add a task from the web and look at the todo list (`/todo`)

13. Run `heroku pg:psql` to get a look at your production database
    directly.
    
    Run the following SQL to see the `Task` you just added: `SELECT *
    from "Tasks";` (the quotation marks around the table name are a
    quirk of sequelize creating the table for you)
