# The test

Our product owners have tasked us with building an app that helps our patients' kids have something to entertain themselves with while they wait for their appointments.

Given a list of animals, build an app that pulls a random set of gifs for the chosen one using the provided GraphQL API. We have decided to start with cats, dogs, elephants, lions, and monkeys, because who doesn't love monkeys?!

The category should be filterable by either choosing one of those categories or by typing parts of it in an input field.

Apply any changes to any part of the provided stack you see fit to get the best performance.

The GraphQL API is available at http://localhost:8080/v1/graphql.
The API is built using Hasura and exposes two fields “gifs” and “gifs_aggregate”. The query arguments are based on SQL concepts. You can explore the data with http://localhost:8080/console/api/api-explorer.

The only technical requirements for the test are to use React and the API (with its database) provided through Docker. Feel free to add any other libraries you see fit in your code. We’ve included a React project built in Vite with a SampleQuery component to give you a head start.

As you know, our stack aligns with the tech in place here. The key areas we’re assessing with this test is the UI, the connection to a backend and how the data is structured and performs at the database level.

# Starting the project

With Docker and Node installed, run `docker-compose up` to start the server. Running it will bootstrap the database with sample data and Hasura's metadata. The DB is exposed in port 5432 mapped to your local environment. This is the connection string `postgres://postgres:postgrespassword@postgres:5432/postgres`.

To run the react app, inside `app` run `npm install` then run `npm run dev`. Vite will open in http://localhost:5173/.

# Project outcome

The project offers on main page located at the root level of the app http://localhost:5173/.

![](images/default.png)

In this page, you can choose two way to load aminal pictures by cagegory:

* By selecting a category from the list.
* By typing the category name (or partially) in the text field.

Randomly the app will pick a number of pictures of the chosen category to display.

![](images/main.png)

## Features

* Support partial names for categories to search. If the text match multiple categories, it will return all matching categories.
![](images/multiple-cat.png)
* By introduccing an empty string, you can clear the previous set of images.
* The text field implements the debouce approach by waiting half second before triggering the query. This allow the user to type with incurring in too many resquest against the API.
* Because images are big and many *(the app can randomly generate up to 100 images to display)*, the app use [react-lazy-load-image-component](https://www.npmjs.com/package/react-lazy-load-image-component)