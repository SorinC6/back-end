# back-end

## register/Signup =
endpoint:
post request to:
`/api/register`

expects an object with  a username(string), password(string), 
and role(integer either 0 or 1, --0 for customers and 1 for admin--)

{
	"username":"me",
	"password":"new",
	"role":1
	
}


## login/Signin =
endpoint:
post request to:
`/api/login`

expects an object with  a username(string), password(string), 
it generates a token that can be either saved in stat or save locally as the

{
	"username":"me",
	"password":"new",
    "role":1
	
}

{
	"username": "1",
	"password": "1",
    "role": 0
	
}
{
	"username": "kenneth",
	"password": "password",
    "role": 1
	
}


/api/users
[
    {
        "id": 1,
        "username": "me",
        "password": "$2a$14$JZ2eR.7f8j2oAcbS72NfJ.Py26wp9v6hzxGQBGWaxkJ6vCNTolrxq",
        "role": 1,
        "true": null
    }
]

There are currently Demo endpoint you can use to get reviews and books 
get:
`/demo/api/reviews`
to post reviews pasws an abject with the review(string), rating(integer), reviewer(string), and books_id(string)properties included. it  should ook like the following
`/demo/api/reviews`
{
	"review": "Sdf gfah dd gsdf",
	"rating": 4,
	"reviewer": "juste",
	"book_id" : 1
	
}
to update a review use endpoint `/demo/api/reviews/:id` 
`/demo/api/reviews/4` 
you will need to include review(string), rating(integer) and reviewer(string).
example below:

{
      
        "review": "everything newer",
        "rating": 5,
        "reviewer": "new person"
    }


`/demo/api/books`
the id is automatically incremented. 
but you must implement string values for title, author, publisher.
when posting a books info the Summary section(string data) is optional and null will be place if no data is put in.

{
        "title": "C++ for all",
        "author": "Prof. SmartyPants",
        "publisher": "Tech book inc",
        "summary": "more stuff"
    }

To GET a specific book 
`/demo/api/books/:id`
example:
`/demo/api/books/1`

[
    {
        "id": 1,
        "title": "FirstBook",
        "author": "me",
        "publisher": "book inc",
        "summary": "stuff",
        "true": null
    },
    {
        "id": 2,
        "title": "SecondBook",
        "author": "me",
        "publisher": "bookinc",
        "summary": null,
        "true": null
    },
    {
        "id": 3,
        "title": "C++ for all",
        "author": "Prof. SmartyPants",
        "publisher": "Tech book inc",
        "summary": "more stuff",
        "true": null
    }
]



`/demo/api/users/:id`
to get request specific user data you will need the id of the user,
or simple input the beloww to get them all.
`/demo/api/users`

The user is an aray stucture of user objects like whats listed below.

[
    {
        "id": 1,
        "username": "me",
        "password": "$2a$14$JZ2eR.7f8j2oAcbS72NfJ.Py26wp9v6hzxGQBGWaxkJ6vCNTolrxq",
        "role": 1,
        "true": null
    }
]

## Running
`npm run server`, `yarn server`: Runs the Dev back-end server.

`yarn start` : Runs only the back-end server.

# Environment Variables

# Tech-Stack

## Back-End Dependencies ```(Production)```

### BcryptJS

Bcrypt is an adaptive hash function which adjusts the cost of hashing, which means that in the future as computers become more powerful, simply increasing the salt rounds will suffice at keeping Main Course secure due to the amount of processing time that would be required to generate all possible password combinations. | [View Dependency](https://www.npmjs.com/package/bcryptjs)

### Cors

Used to configure API security. This was used to allow for secure communication between the front-end and back-end servers. | [View Dependency](https://github.com/expressjs/cors)

### ExpressJS

A prebuilt NodeJS framework that makes creating server side applications simple, fast, and flexible. NodeJS is powered by Google's V8 Engine which means it's powerful and can handle a large number of requests without lapsing in dependability. Also, this means that this is a highly scalable choice when you consider the Event Loop which manages all asynchronous operations allowing the program to continue to run as expected without stops. | [View Dependency](http://expressjs.com/)

### Helmet

A collection of nine smaller middleware functions that set security-related HTTP headers appropriatley. This protects Main Course from numerous well known vulnerablilites. | [View Dependency](https://helmetjs.github.io/)

### JSON Web Token

Realizing that there is not inherent benefit to using tokens over sessions, we chose to implement jwts due to the added benefit of storing the session on the client side as opposed to being in-memory. Main Course is built with the active server in mind and the potential to have the application be accessed from various devices in different locations. With this, instead of running the risk of having a session be interrupted due to data roaming, connection issues, or server side problems, we chose to store the session information on the client side. We also found this to be more efficient for our needs, as jwts eliminate the need to fetch additional information from the DB to validate the user. | [View Dependency](https://www.npmjs.com/package/jsonwebtoken)

## Back-End Dependencies ```(Development)```

### Dotenv

Dotsenv allows us to universally set environment variables. | [View Dependency](https://www.npmjs.com/package/dot-env)

### Sqlite3


### Jest

Chosen for its out of the box readiness. Jest comes with inbuilt mocking, the ability to run tests in parallel, it works with both the front-end and back-end, has promise support, and is a one stop shop for most testing needs within the scope of this project. | [View Dependency](https://jestjs.io/)

### Morgan

An HTTP request logging middleware used for production to easily identify bugs in routes. | [View Dependency](https://github.com/expressjs/morgan)

### Nodemon

Automatically restarts the server on save making production more efficient. | [View Dependency](https://nodemon.io/)

### Supertest

Using supertest with jest for integration testing makes things easy to implement and easy to read. | [View Dependency](https://www.npmjs.com/package/supertest)


## Backend API

### Auth Token Payload

The JWT payload will look like this:

```
{
  username: "usersname",
  password: "random hashed password"
  role: 
};
```