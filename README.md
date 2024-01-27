# ResumeBuilder-Server
The server side for Resume Builder App. Offering APIs to be consummed for both mobile and web as front sides.

### API endpoints:

`POST /login` : logs in for un-connected users. must include `{email,password}` in body of the request. and will return a token for authorization if credentials are correct with a message of success under this form `{
"token" : "Bearer eyJhbGci..."}` otherwise an error `{"message":error}`. The token should be saved to attach them to requests that require authorization.

`POST /register` : registers a new user. the email must be not taken. must include a User Object attributes inside the body of request `{firstName,lastName,email,password,...}`

`GET /profile/picture` : returns the profile picture for the current user. PNG or JPG image content as result.

`GET /profile/info` : return all user personal infos (email, name, last name) included in the registration form.

`GET /project` : return a list of the project Ids for the connected user. along with each one title, creation data, last modified date. a Project Json Object. 

`GET /project/snapshots/{projectId}` : gets the latest saved values for fields that user has entered for that specific project. return a Snapshot Json object

`GET /project/thumb/{projectId}` : gets the latest saved picture as thumbnail for that specific project. return a PNG image file.

`GET /project/{projectId}` : returns the latest pdf result (for preview or download)

`PUT /project/{projectId}` `snapshot: {...}` : updates a certain field of snapshot object for the specific project. 

`GET /template` :  gets you the name list of template names.

`GET /template/html/{templateName}` : returns the html content of a template given in parameter.

or it also possible `GET /template/html` to return them all in one json object containing array. 

`GET /template/thumb/{templateName}`: returns for given template name, the thumbnail image for it. return a PNG image content

`POST /template/{templateName}` : adds a new project for the current user using a preselected template given in param. must include in request body a Project Json Object `project: {title, creationDate}` 

- Note that for every protected route. when you send a request, you must include in the headers of request your token `{ "authorization" : $token }` 