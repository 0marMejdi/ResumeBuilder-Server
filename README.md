# ResumeBuilder-Server
The server side for Resume Builder App. Offering APIs to be consummed for both mobile and web as front sides.

### API endpoints:
◘ `POST /login` : logs in for un-connected users. must include `{email,password}` in body of the request. and will return a token for authorization if credentials are correct with a message of success under this form `{
"Authorization" : "Bearer eyJhbGci..."}` otherwise an error `{"message":error}`. The token should be saved to attach them to requests that require authorization.

◘ `POST /register` : registers a new user. the email must be not taken. must include a User Object attributes inside the body of request `{firstName,lastName,email,password,...}`, and also containing a png or jpg image for the user profile picture.

• `GET /profile/picture` : returns the profile picture for the current user. PNG or JPG image content as result.

◘ `GET /profile/info` : return all user personal infos (email, name, last name) included in the registration form (image is not included).

•`GET /project` : return a list of the project Ids for the current user. along with each one title, creation data, last modified date. a Project Json Object. 

•`GET /project/snapshots/{projectId}` : gets the latest saved values for fields that user has entered for a given project. return a Snapshot Json Object.

•`GET /project/thumb/{projectId}` : gets the latest saved picture as thumbnail for that specific project. return a PNG image file.

•`GET /project/pdf/{projectId}` : returns the latest pdf result (for preview or download)

•`PATCH /project/data/{projectId}` : updates a certain field of snapshot object for a given project. the request must contain `{entryName,fieldName,fieldValue,tag}` to be updated, then you expect an OK or error response. 
entry name is the name of data group. When data group is enumerable (like Languages or Skills could be more than one) entry name must have a TAG number, otherwise it's not necessary.
examples for tag name: `{entryName: "Language", fieldName: "level", fieldValue: 4, tag: 2}` this will update the 2nd Language data group, updating level value to 4. (if not provided any entryName, by default it's snapshot entry name).
or skills or etc...  

• `POST /project/data/{projectId}` : adds a new data group, requires `{entryName}` for the body.

• `DELETE /project/data/{projectId}` : removes a data group, requires `{entryName, tag}` for the body of request.

• `PUT /project/data/{projectId}` : updates the whole snapshot object with all current values. require a Snapshot Object type. (Less complex, but resources consuming).

◘ `GET /template/names` :  gets you the name list of template names.

◘ `GET /template/html/{templateName}` : returns the html content of a template given in parameter.

◘ `GET /template/pdf/{templateName}` : returns the pdf content of a template given in parameter.

◘ `GET /template/html` : returns them all html contents of templates in one json object containing array. 

◘ `GET /template/thumb/{templateName}`: returns for given template name, the thumbnail image for it. return a PNG image content

•`POST /template/{templateName}` : adds a new project for the current user using a preselected template given in param. must include in request body a Project Json Object `project: {title, creationDate}`

- Note that for every protected route. when you send a request, you must include in the headers of request your token `{ "Authorization" : $token }` 