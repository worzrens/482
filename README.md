# Rest api

Test task for 482.solutions

## Usage

1) run `./run.sh`
2) api now available on 172.17.0.2:4000

## Routes:

### /users/
**Allowed methods:**

 -GET, no params - returns list of users

 -POST, form-urlencoded {name, password, (description)} - creates user with specified credentials
 
### /users/<userID>
  **Allowed methods:**

 -GET, name - returns info about specified user

 -PUT, form-urlencoded {password, description} - updates info about specified user

 -DELETE, no params - removes specified user
