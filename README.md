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