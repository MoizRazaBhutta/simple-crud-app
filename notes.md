# CRUD API with MongoDB and Express JS

1. Start with npm init -y to initialize node project.
2. Create index.js file as main backend file to begin with.
3. For Mongo DB login to atlas
4. Create a new project and create a cluster to deploy the free version of mongodb
5. Username:moizraza10_db_user Password:gZ3bHUqyvwDfDC4L for MongoDB Atlas
6. After you setup then create a connection string
7. Use node package for mongodb and get the connection string
8. We will be connecting the express js with mongoose so npm install that
9. Best practice is to first connect mongodb then listen to the app.
10. Create a model and connect it with the mongoose.
11. Remember in Express JS we can not directly use req.body without middleware
12. We can have query and req parameter like

```js
// http://localhost:3000/api/users/42/orders?status=delivered

// Id here is req.params and query parameter is status
app.get("/api/users/:id/orders", (req, res) => {
  const userId = req.params.id;
  const status = req.query.status;
  res.send(`User: ${userId}, Order Status: ${status}`);
});

```

13. We use findByIdAndUpdate method to get the item from mongodb and update the particular id
14. So basically mongoose.model has these methods for adding deleting updating. Remember these findById, findByIdAndUpdate and findByIdAndDelete
15. `app.use(express.urlencoded({ extended: false }));` use this middleware to expect formData from client and parse its body.
16. We can pass something like this 

```HTML
<form method="POST" action="/login">
  <input type="text" name="username" />
  <input type="password" name="password" />
  <button type="submit">Login</button>
</form>
```

17. If you remove the middleware line, req.body will be undefined, because Express doesn’t automatically know how to parse the form data.
18. So if your frontend sends complex/nested objects (like user[address][city]=Toronto), use { extended: true }.
19. Content-Type: application/x-www-form-urlencoded this can is dealt with urlencoded ones and Content-Type: application/json are dealt with app.use(express.json())
20. 