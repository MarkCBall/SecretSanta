# Express App - To Demonstrate

- MVC Structure
- Connection To Mongodb Using Mongoose
- Using a CSS Framework

## To Run

```
cd myblogapp && npm install

# to start with nodemon - linux/macosx

npm run debug

# to start with nodemon - windows

npm run windows
```



## To Do
- Add router endpoints for editing, updating and deleting
- Add an admin/user model & routes for creating, updating deleting posts
- Add a CSS framework to pretty up the layout
- Refactor code ie. The App Error Handler to seperate out the handling of Mongoose Validation errors

### Note: EJS doesnt natively handle layouts to accomodate this we are using express-ejs-layouts
### For setting up vs-code debugger see [here](https://github.com/Microsoft/vscode-recipes/tree/master/nodemon)


## MONGOOSE - ERROR HANDLING - posts_controller.js - Create Action

- As discussed in class on Nov 6, the existing create action didnt provide a good user experience as it only sent a json response back to the browser.

- A good user experience would have the create form rerendered with the validation errors rendered in the form - with the form populated with the initial content resubmitted.

- To demonstrate this we added a conditional validation message to posts/new.ejs

- The create action has been refactored to achieve this, as it is promise based 
  - on success we ```res.redirect('/blog')``` and render our blog list page. 
  - on error we catch the error and tell it to move to the next middleware - see line 65.
    The 'next' action in the case of error is our App Error Handler - which is on Line 39 of app.js - as the error handler has access to the error object as well as the request we are able to access the original request body and rerender the form - new.ejs [Lines 44 to 48 of app.js]
  - for rendering not the use of ```res.locals``` to set variables that are available for rendering in the ejs templates

## SLUGGING - mongoose-slug-generator - https://www.npmjs.com/package/mongoose-slug-generator

- Rather than use our simplistic slugging method - I found the above plugin which will automatically generate unique slugs - by simply incorporating in the schema for posts - read the docs but this has been added to our schema in models/post.js.
- Also note in our posts_controller.js I automatically create a summary if it doesnt exist lines 56-60 of posts_controller.js

## TESTING OUR ERROR HANDLER
- A the above slug solution always ensures a slug is generated I added a validation that the title needs to be more than 3 characters see lines 31-35 of models/post.js
- So to trigger an error on our new form just enter a title less than this.