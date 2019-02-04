# back-end

## register/Signup =
endpoint:
post request to:
/api/register

expects an object with  a username(string), 
password(string), 
and role(integer either 0 or 1, --0 for customers and 1 for admin--)

{
	"username":"me",
	"password":"new",
	"role":1
	
}


## login/Signin =
endpoint:
post request to:
/api/login

expects an object with  a username(string), 
password(string), 

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
/demo/api/reviews


{
	"review": "Sdfgfaddfgsdfg d hsdhjhrtw  thw err",
	"rating": 2,
	"reviewer": "just me"
	
}

/demo/api/books
the id i s automatically incremented. 

To GET a specific book 
/demo/api/books/:id
example:
/demo/api/books/1

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

when posting a books info the Summary section is optional and null will be place if no data is put in.
/demo/api/books

{
        "title": "C++ for all",
        "author": "Prof. SmartyPants",
        "publisher": "Tech book inc",
        "summary": "more stuff"
    }


/users/:id

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