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
	"password":"new"
	
}