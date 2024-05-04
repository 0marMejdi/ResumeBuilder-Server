let apis = [];
let apisProject = [];
let apisUser = [];
let apisTemplate = [];

let methods = {
    get: 'success',
    post: 'warning',
    patch: 'secondary',
    delete: 'danger',
    put: 'primary'

}

class APIEndpoint {
    _method="";
    _url="";
    _iobj=null;
    _oobj=null;
    _decsription="";
    _oobjDesc="";
    _iobjDesc="";
    _urlDesc="";
    _grp = "";
    _done =false;
    done =()=>{this._done=true; return this;}
    grp = (_grp)=>{
        this._grp=_grp;
        return this;
    }

    method = (_method) => {
        this._method = _method;
        return this;
    }
    url = (_url) => {
        this._url = _url;
        return this;
    }
    inObj = (_iobj) => {
        this._iobj = _iobj;
        return this;
    }
    outObj = (_oobj) => {
        this._oobj = _oobj;
        return this;
    }
    description = (_desc) => {
        this._decsription = _desc;
        return this;
    }
    
    add = () => {
        apis.push(this);
    }
    outDesc = (_oobjDesc)=>{
        this._oobjDesc = _oobjDesc;
        return this;
    }
    inDesc = (_iobjDesc)=>{
        this._iobjDesc = _iobjDesc;
        return this;
    }
    urlDesc = (_urlDesc)=>{
        this._urlDesc = _urlDesc;
        return this;
    }
}
function generateCodeMarkup(obj, indentLevel = 0) {
    const indent = '&nbsp;&nbsp;'.repeat(indentLevel);
    let html = '<pre class="code m-0 p-0"><code>';

    if (Array.isArray(obj)) {
        if (obj.length === 0) {
            console.log("Taadet");
            html += indent + '[]';
        } else {
        html += indent + '[';
        if (obj.length > 0) {
            html += '<br>';
            obj.forEach((item, index, array) => {
                html += generateCodeMarkup(item, indentLevel + 1);
                if (index !== array.length - 1) {
                    html += ',<br>';
                }
            });
            html +=  indent;
        }
        html += ']';}
    } else if (typeof obj === 'object' && obj !== null) {
        html += indent + '{<br>';
        const keys = Object.keys(obj);
        keys.forEach((key, index) => {
            const value = obj[key];
            html += indent + '&nbsp;&nbsp;<span class="property">' + key + '</span>: ';
            if (typeof value === 'object' && value !== null) {
                if (Array.isArray(value)) {
                    if (value.length === 0) {
                        html += '[]';
                    } else {
                        html +=  generateCodeMarkup(value, indentLevel + 1);
                    }
                }
                else if (Object.keys(value).length === 0) {
                    html += '<span class="null">undefined</span>';
                } else {
                    html +=generateCodeMarkup(value, indentLevel + 1);
                }
            } else if (typeof value === 'string') {
                html += '<span class="string">"' + value + '"</span>';
            } else if (typeof value === 'number') {
                html += '<span class="number">' + value + '</span>';
            } else if (typeof value === 'boolean') {
                html += '<span class="boolean">' + value + '</span>';
            } else if (value === null) {
                html += '<span class="null">null</span>';
            } else if (value === undefined) {
                html += '<span class="null">undefined</span>';
            }
            if (index !== keys.length - 1) {
                html += ',<br>';
            } else {
                html += '<br>';
            }
        });
        html += indent + '}';
    } else {
        html += JSON.stringify(obj);
    }

    html += '</code></pre>';
    return html;
}
function loadProject(){
    
// Example usage
new APIEndpoint()
    .done()
    .method('post')
    .url('/project/new')
    .urlDesc('Creates a new project with the given title and template name.')
    .inDesc('The request body should contain the title of the project and the name of the template to use as given below.')
    .inObj({
            "title":"Blue Sea",
            "templateName":"Marine"
        }
    )
    .outDesc('As a return you get a message indicating the success of the operation and, in case of success, the project object itself. You may use the id of the returned object and the necceassary information to redirect the user to the newly created project.')
    .outObj({
            "message": "project has been added successfully",
            "project": {
                "id": "7813c97b-5adb-4722-89e5-5a73b6082a1b",
                "title": "Blue Sea",
                "creationDate": 1708017745619,
                "templateName": "Marine"
            }
        }
    )
    .grp("manageProj")
    .add()

new APIEndpoint()
    .done()
    .method('get')
    .url('/project/list')
    .urlDesc('Gets a list of all projects that user has.')
    .outDesc('The Returned object is an array of project objects, each containing only the basic information of the project (not detailled).')
    .inObj(null)
    .outObj([
            {
                "id": "7813c97b-5adb-4722-89e5-5a73b6082a1b",
                "title": "Blue Sea",
                "creationDate": 1708017745619,
                "templateName": "Marine"
            },
            {
                "id": "a0fe5464-a186-444a-97df-273f799fe9bc",
                "title": "Dark Crystal",
                "creationDate": 1707956677599,
                "templateName": "Obsidian"
            }
        ]
    )
    .grp("manageProj")
    .add();

new APIEndpoint()
    .method('get')
    .done()
    .url('/project/info/{projectId}')
    .urlDesc('Returns all related infos to the project with the given ID.')
    .outObj({
            "id": "a0fe5464-a186-444a-97df-273f799fe9bc",
            "title": "Dark Crystal",
            "creationDate": 1707956677599,
            "templateName": "Obsidian",
            "Snapshot": {
                "aboutMe": "Placeholder about me text",
                "fontFamily": "Arial",
                "reference": "Placeholder reference",
                "address": "123 Placeholder St",
                "city": "Placeholder City",
                "email": "example@example.com",
                "firstName": "John",
                "lastName": "Doe",
                "phoneNumber": "+1234567890",
                "postalCode": "12345",
                "profileTitle": "Placeholder Profile Title",
                "Education": [
                    {
                        "institutionName": "INSAT",
                        "description": "All about INSAT",
                        "degree": "Software Engineering Degree",
                        "finishMonth": 5,
                        "finishYear": 2023,
                        "startingMonth": 9,
                        "startingYear": 2019,
                        "tag": 0,
                        "toPresent": 0
                    }
                ],
                "ProfessionalExp": [
                    {
                        "city": "Tunis",
                        "description": "I did this and that and so on",
                        "companyName": "ElyaData",
                        "finishMonth": 12,
                        "finishYear": 2022,
                        "post": "Front End Developer",
                        "startingMonth": 5,
                        "startingYear": 2020,
                        "tag": 0,
                        "toPresent": 0
                    }
                ],
                "Language": [
                    {
                        "name": "English",
                        "level": "5",
                        "tag": 1
                    },
                    {
                        "name": "French",
                        "level": "2",
                        "tag": 0
                    }
                ],
                "Skill": [
                    {
                        "name": "Designing",
                        "level": "3",
                        "tag": 0
                    }
                ],
                "Interest": [
                    {
                        "name": "Sleeping",
                        "tag": 0
                    }
                ],
                "Orders": {
                    "Education": 0,
                    "ProfessionalExp": 1,
                    "Language": 2,
                    "Skill": 3,
                    "Interest": 4
                }
            }
        }

    )
    .outDesc('The returned object is a project object with all detailled informations that belongs to the project with the given ID')
    .grp("manageProj")
    .add();


new APIEndpoint()
    .done()
    .method('get')
    .url('/project/snapshot/{projectId}')
    .urlDesc('Returns all inserted data for a project with the given ID.')

    .outObj({
            "aboutMe": "Placeholder about me text",
            "fontFamily": "Arial",
            "reference": "Placeholder reference",
            "address": "123 Placeholder St",
            "city": "Placeholder City",
            "email": "example@example.com",
            "firstName": "John",
            "lastName": "Doe",
            "phoneNumber": "+1234567890",
            "postalCode": "12345",
            "profileTitle": "Placeholder Profile Title",
            "Education": [
                {
                    "institutionName": "INSAT",
                    "description": "All about INSAT",
                    "degree": "Software Engineering Degree",
                    "finishMonth": 5,
                    "finishYear": 2023,
                    "startingMonth": 9,
                    "startingYear": 2019,
                    "tag": 0,
                    "toPresent": 0
                }
            ],
            "ProfessionalExp": [
                {
                    "city": "Tunis",
                    "description": "I did this and that and so on",
                    "companyName": "ElyaData",
                    "finishMonth": 12,
                    "finishYear": 2022,
                    "post": "Front End Developer",
                    "startingMonth": 5,
                    "startingYear": 2020,
                    "tag": 0,
                    "toPresent": 0
                }
            ],
            "Language": [
                {
                    "name": "English",
                    "level": "5",
                    "tag": 1
                },
                {
                    "name": "French",
                    "level": "2",
                    "tag": 0
                }
            ],
            "Skill": [
                {
                    "name": "Designing",
                    "level": "3",
                    "tag": 0
                }
            ],
            "Interest": [
                {
                    "name": "Sleeping",
                    "tag": 0
                }
            ],
            "Orders": {
                "Education": 0,
                "ProfessionalExp": 1,
                "Language": 2,
                "Skill": 3,
                "Interest": 4
            }
        }
    )
    .outDesc('The returned object a Snapshot object with all detailed informations that belongs to the project with the given ID')
    .grp("dataProj")

    .add();

new APIEndpoint()
    .done()
    .method('patch')
    .url('/project/info')
    .urlDesc('Updates a certain field of snapshot. ')
    .description("This API allows you to update a certain field of the project information, which means that it offers you the possibility to avoid updating the whole project informations when you only need small modification. Based on Key Value, that you provide them to update. For Example Telling it to update 'firstName' to 'John'")
    .inDesc("The request body should contain the project ID and primarily a fieldName & fieldValue. the field Name is the attribute name you are going to update, like firstName, aboutMe, phoneNumber, etc... and the fieldValue, which is the new value which will replace the old value of that field, like feildValue = 'John' when you are updating firstName or anything.. But also if the field we are going to update is in a List of elements (like Languages, Skills...) it should also contain an entry name (for the type like Language) and tag (the index, like tag 0 means the first Language we are going to update)..\n Like this example Below: We are telling to update the project with that id, updating the first Language Object (the tag is 0, we are using 0-indexed values) name into english.")
    .inObj({
            "projectId":"a0fe5464-a186-444a-97df-273f799fe9bc",
            "fieldName":"name",
            "entryName":"Language",
            "tag":0,
            "fieldValue":"English"

        }
    )
    .outObj({
        "message": "updated successfully"
    })
    .grp("dataProj")
    .add();

new APIEndpoint()
    .done()
    .method('put')
    .url('/project/info')
    .urlDesc('Updates the whole snapshot object of a project.')
    .inDesc('The request body should contain the id of the project and the new snapshot object as given below.')
    .inObj({
            "projectId":"a0fe5464-a186-444a-97df-273f799fe9bc",
            "Snapshot": {
                "aboutMe": "Placeholder about me text",
                "fontFamily": "Arial",
                "reference": "Placeholder reference",
                "address": "123 Placeholder St",
                "city": "Placeholder City",
                "email": "example@example.com",
                "firstName": "John",
                "lastName": "Doe",
                "phoneNumber": "+1234567890",
                "postalCode": "12345",
                "profileTitle": "Placeholder Profile Title",
                "Education": [
                    {
                        "institutionName": "INSAT",
                        "description": "All about INSAT",
                        "degree": "Software Engineering Degree",
                        "finishMonth": 5,
                        "finishYear": 2023,
                        "startingMonth": 9,
                        "startingYear": 2019,
                        "tag": 0,
                        "toPresent": 0
                    }
                ],
                "ProfessionalExp": [
                    {
                        "city": "Tunis",
                        "description": "I did this and that and so on",
                        "companyName": "ElyaData",
                        "finishMonth": 12,
                        "finishYear": 2022,
                        "post": "Front End Developer",
                        "startingMonth": 5,
                        "startingYear": 2020,
                        "tag": 0,
                        "toPresent": 0
                    }
                ],
                "Language": [
                    {
                        "name": "English",
                        "level": 5,
                        "tag": 1
                    },
                    {
                        "name": "French",
                        "level": 2,
                        "tag": 0
                    }
                ],
                "Skill": [
                    {
                        "name": "Designing",
                        "level": 3,
                        "tag": 0
                    }
                ],
                "Interest": [
                    {
                        "name": "Sleeping",
                        "tag": 0
                    }
                ],
                "Orders": {
                    "Education": 0,
                    "ProfessionalExp": 1,
                    "Language": 2,
                    "Skill": 3,
                    "Interest": 4
                }
            }
        }
    )
    
    .outDesc('As a return you get a message indicating the success of the operation or no... ')
    .outObj({
        "message": "updated successfully",
        /*"project": {
            "id": "a0fe5464-a186-444a-97df-273f799fe9bc",
            "title": "Dark Crystal",
            "creationDate": 1707956677599,
            "templateName": "Obsidian",
            "Snapshot": {
                "aboutMe": "Placeholder about me text",
                "fontFamily": "Arial",
                "reference": "Placeholder reference",
                "address": "123 Placeholder St",
                "city": "Placeholder City",
                "email": "example@example.com",
                "firstName": "John",
                "lastName": "Doe",
                "phoneNumber": "+1234567890",
                "postalCode": "12345",
                "profileTitle": "Placeholder Profile Title",
                "Education": [
                    {
                        "institutionName": "INSAT",
                        "description": "All about INSAT",
                        "degree": "Software Engineering Degree",
                        "finishMonth": 5,
                        "finishYear": 2023,
                        "startingMonth": 9,
                        "startingYear": 2019,
                        "tag": 0,
                        "toPresent": 0
                    }
                ],
                "ProfessionalExp": [
                    {
                        "city": "Tunis",
                        "description": "I did this and that and so on",
                        "companyName": "ElyaData",
                        "finishMonth": 12,
                        "finishYear": 2022,
                        "post": "Front End Developer",
                        "startingMonth": 5,
                        "startingYear": 2020,
                        "tag": 0,
                        "toPresent": 0
                    }
                ],
                "Language": [
                    {
                        "name": "English",
                        "level": "5",
                        "tag": 1
                    },
                    {
                        "name": "French",
                        "level": "2",
                        "tag": 0
                    }
                ],
                "Skill": [
                    {
                        "name": "Designing",
                        "level": "3",
                        "tag": 0
                    }
                ],
                "Interest": [
                    {
                        "name": "Sleeping",
                        "tag": 0
                    }
                ],
                "Orders": {
                    "Education": 0,
                    "ProfessionalExp": 1,
                    "Language": 2,
                    "Skill": 3,
                    "Interest": 4
                }
            }
        }*/
    })

    .grp("dataProj")
    .add();
new APIEndpoint()
    .method('get')
    .url('/project/thumb/{projectId}')
    .urlDesc('Returns the thumbnail of the project with the given ID.')
    .outDesc('The response is a PNG image file that can be used for listing the projects that the user has.')
    .outObj({"Content-Type": "image/png"})
    .grp("convertProj")
    .add();
new APIEndpoint()
    .method('get')
    .url('/project/pdf/{projectId}')
    .urlDesc('Returns the PDF result of the project with the given ID.')
    .outDesc('The response is a PDF file that can be used for preview or download of the project.')
    .outObj({"Content-Type": "application/pdf"})
    .grp("convertProj")
    .add();
new APIEndpoint()
    .method('get')
    .url('/project/html/{projectId}')
    .urlDesc('Returns the HTML format of the project with the given ID.')
    .outDesc('The response is a HTML file that can be used for manipulation with DOM and inserting fields.')
    .outObj({"Content-Type": "text/html; charset=utf-8"})    
    .grp("convertProj")
    .add();

new APIEndpoint()
    .done()
    .method('post')
    .url('/project/info')
    .urlDesc('Adds a new element enumerable type (Languages, Skills) to the project. It is used when user wants to add a new language for example.')
    .inDesc('The request body should contain the id of the project and the name of the enumerable data type to add as given below.')
    .inObj({
        "projectId":"1474fe47-013b-4fcd-85fb-2ed3bfd65aa6",
        "entryName":"Language"
    })
    .outDesc('As a return you get a message indicating the success of the operation or no... and the tag (new index) of the newly added element.')
    .outObj({
        "message":"data group added successfully",
        "tag":1
    })
    .grp("dataProj")
    .add();


    new APIEndpoint()
    .method('delete')
    .url('/project/info')
    .urlDesc('Removes an element of enumerable type (Languages, Skills,...) from the saved data of a project.')
    .inDesc('The request body should contain the id of the project and the name of the enumerable data type to remove as given below. Note that the tag is also required to specify the exact element to remove. Also the entry name must a class name like : "Language", "Skill", "Interest", "Formation", "ProfessionalExp". \n The Example below will remove the second language (0-index) of the project with the given id. it is useful when user wants to delete a language for example after mistakenly adding it.')
    .inObj({
        "projectId":"1474fe47-013b-4fcd-85fb-2ed3bfd65aa6",
        "entryName":"Language",
        "tag":1
    }
    )
    .outDesc('As a return you get a message indicating the success of the operation or no... and, in case of success, the project object itself. You may use the returned object for testing if the requested entry has been deleted successfully or no, and also for redirection if needed.')
    .outObj({
        "message":"data group deleted successfully",
        /*"project":{
        "id": "1474fe47-013b-4fcd-85fb-2ed3bfd65aa6",
        "userId": "1706821332398",
        "title": "My New One",
        "creationDate": 1706824084732,
        "lastModifiedDate": 1706824084732,
        "templateName": "Obsidian",
        "Snapshot": {
            "firstName": "Code",
            "lastName": "Craft",
            "interests": [{"tag": 0}],
            "formations": [],
            "professionalExps": [],
            "skills": [],
            "languages": [
               {"level": 5,
                "name": "French",
                "tag": 0}]
        }
    }*/})
    .grp("dataProj")
    .add();
new APIEndpoint()
    .method('delete')
    .url('/project')
    .urlDesc('Deletes a whole project with the given ID.')
    .outDesc('As a return you get a message indicating the success of the operation or no...')
    .outObj({
        "message":"project deleted successfully"
    })
    .inDesc('The request body should contain the id of the project to delete as given below.')
    .inObj({
        "projectId":"1474fe47-013b-4fcd-85fb-2ed3bfd65aa6"
    })
    .grp("manageProj")
    .done()
    .add();

new APIEndpoint()
    .url("/project/image")
    .method("post")
    .grp("dataProj")
    .urlDesc("Allows user to add (or update) a profile image for a resume project")
    .inDesc("the sent request should be a 'multipart/form-data' request containing an image file of type PNG, JPG or JPEG, amongst with the project id")
    .inObj({projectId:"959bbf9a-51af-4a30-85a8-25ae038f8bdc", profilePicture:{type:"png",name:"myImage",content:"&lt;Buffer 89 50 4e 47 0d 0a 1a 0a 00 00..."}})
    .outDesc("the response body contains a message indicating if the operation was successful or no.")
    .outObj({"message":"image has been uploaded successfully"})
    .done()
    .add();
new APIEndpoint()
    .done()
        .url("/project/image/{projectId}")
        .method("get")
        .grp("dataProj")
        .urlDesc("Allows user to get the profile image for a given project (by id).")

        .outObj({message:"image downloaded successfully", profilePicture:{type:"png",content:"&lt;Buffer 89 50 4e 47 0d 0a 1a 0a 00 00..."}})
        .outDesc("the response body contains a message indicating if the operation was successful or no.\nAlong with the image content as buffer")

        .add()
    apisProject = [...apis];
    apis=[];
}
function loadUser(){
new APIEndpoint()
    .done()
    .method('post')
    .url("/login")
    .urlDesc("Allows users to enter their credentials in order to login")
    .inDesc("The request body should contain the email and the password of the user as given below.")
    .inObj({
        "email":"email.example@gmail.com",
        "password":"MyPasswordIs0xDeadBeef"
    })
    .outDesc("As a return you get a message indicating the success of the operation or no... and, in case of success, the authorization token (Bearer Token) to use for further requests: must be used in the Authorization header in the request to the routes that require authentication.")
    .outObj({
        "message":"logged in successfully",
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwNjgyMTMzMjM5OCwiaWF0IjoxNjMzNzYwNzIzfQ.7"
    })
    .add();
new APIEndpoint()
    .done()
    .method('post')
    .url("/register")
    .urlDesc("Allows visitors to create a new account, once entered all necessary information")
    .inDesc("The request body should contain the email, the password, the first name and the last name of the user as given below.")
    .inObj({
        "email":"email.example@gmail.com",
        "password":"MyPasswordIs0xDeadBeef",
        "firstName":"Code",
        "lastName":"Craft",
    })
    .outDesc("The response is the same as for login. As a return you get a message indicating the success of the operation or no... and, in case of success, the authorization token (Bearer Token) to use for further requests.")
    .outObj({
        "message":"user created successfully",
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwNjgyMTMzMjM5OCwiaWF0IjoxNjMzNzYwNzIzfQ.7"
    })
    .add();
new APIEndpoint()
    .done()
    .method('get')
    .url("/profile/info")
    .urlDesc("Gets All the personal information of the current user")
    .outDesc("The response is a JSON object containing all the personal information of the user in details (except the password of course xD).")
    .outObj({
        "id": "7d5a0045-e703-4a3d-b801-45ce6ee21e51",
        "email": "email.example@gmail.com",
        "firstName": "Code",
        "lastName": "Craft"
    })
    .add();
apisUser = [...apis];
apis=[];
}
function loadTemplates(){new APIEndpoint()
    .done()
    .method('get')
    .url("/template/names")
    .urlDesc("gets all the available template names")
    .outObj([
        "Marine",
        "Obsidian"
    ])
    .outDesc("The returned Object is an Array containing all the templates names that are available. you can use each template name for listing templates images or getting one explicitly")
    .add();
new APIEndpoint()
    .done()
    .method('get')
    .url("/template/html/{templateName}")
    .outObj( {"Content-Type": "text/html; charset=utf-8"})
    .urlDesc("returns the HTML format of a template which name is given in parameter, useful for manipulation with DOM and inserting fields")
    .add();
new APIEndpoint()
    .done()
    .method('get')
    .url("/template/pdf/{templateName}")
    .urlDesc("returns the PDF format of a template which name is given in parameter, useful for downloading the template itself")
    .outObj({"Content-Type": "application/pdf"})
    .outDesc("The response is a PDF file that can be used for preview or download of the template itself.")
    .add();

new APIEndpoint()
    .done()
    .method('get')
    .url("/template/thumb/{templateName}")
    .urlDesc("returns the PNG format of a template which name is given in parameter, useful for listing a templates")
    .outObj({"Content-Type": "image/png"})
    .outDesc("The response is a PNG image file that can be used for listing the templates that are available.")
    .add();

new APIEndpoint()
    .done()
    .method('get')
    .url("/template/html")
    .urlDesc("returns them all html contents of templates in one json object containing array")
    .outObj([
        {
            "name": "Marine",
            "content": "&lt;!DOCTYPE html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;... "
        },
        {
            "name": "Obsidian",
            "content": "&lt;!DOCTYPE html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;..."
        }
    ])
    .outDesc("The response is a JSON object containing all the templates names and their HTML content.")

    .add();


apisTemplate=[...apis];
apis=[];
}
function getIdFrom(api){
    return api._method+"-"+api._url.split("/").join('-').split("{").join('-').split("}").join("");
}
function insertAll(elemId){
    let cont = document.getElementById(elemId);
    apis.forEach((api)=>{
        let elem = getCard(api);

        cont.innerHTML+=elem;
    })
}
function insertAllDomains(){
    apis = [...apisProject].filter(api=>api._grp==="manageProj");
    insertAll('manageProj');
    apis = [...apisProject].filter(api=>api._grp==="dataProj");
    insertAll('dataProj');
    apis = [...apisProject].filter(api=>api._grp==="convertProj");
    insertAll('convertProj');
    apis = [...apisUser];
    insertAll('api-container-user');
    apis = [...apisTemplate]
    insertAll('api-container-template')
}
/**
 *
 * @param api : APIEndpoint
 * @param isInput : boolean
 * @return {string}
 */
function getIOJSON(api,isInput){
    let descriptionPart= "";
    let objPart= "";
    let desc, obj;
    if (isInput){
        obj = api._iobj;
        desc=api._iobjDesc;
    }else{
        obj = api._oobj;
        desc=api._oobjDesc;
    }
    if (!obj && ! desc)
        return "";
    if (obj){
        objPart= `<div>${generateCodeMarkup(obj)}</div>`
    }
    let boga;
    if (isInput)
        boga="<hr class=\"m-1\"><p class='d-inline-block card m-1 mt-2' style='background-color: bisque; color:#27ae60'>Request</p> <br>"
    else
        boga="<hr class=\"m-1\"><p class='d-inline-block card m-1 mt-2' style='background-color: bisque; color:crimson'>Response</p> <br>"

    descriptionPart = `<div> ${boga} ${desc} </div> `
    return descriptionPart+objPart;
}
function formatEndPoint(api){
    let urlString = api._url;
    let newParts;
    if(urlString.includes("{")){ // surround it with spans indicatinng its params, the span class is parametri
        let parts = urlString.split("/");
        newParts = parts.map(part=>{
            if (part.includes("{")){
                return `<span class="parametri">${part}</span>`;
            }else{
                return part;
            }
        });
        urlString = newParts.join("/");
    }

    return urlString ;
}
/**
 *
 * @param api : APIEndpoint
 * @return {string}
 */
function getCard(api){
    let color =methods[api._method];
    let moreColor = (api._done)?"dark":"outline-dark"
    return `
    <div class="container mt-4 custom-padding"> 
        <div class="card custom-padding custom-margin ">
            <div class="card-header p-1 d-flex flex-wrap justify-content-between">
                <div class="btn btn-${color} disabled align-self-start">${api._method.toUpperCase()}</div>
                <span class="mx-3 align-self-start">${formatEndPoint(api)}</span>
                <div class="btn btn-${moreColor} ml-auto collapsed " 
                    type="button" data-bs-toggle="collapse" data-bs-target="#${getIdFrom(api)}" 
                    aria-expanded="false" aria-controls="collapseExample">
                    More...
                </div>
            </div>
            <div class="card-body p-2">
                
                ${(api._urlDesc)?"<div>"+api._urlDesc+"</div>":""}
                <div class="my-1 p-2 collapse" id="${getIdFrom(api)}" style="">
                    
                    ${(api._decsription)?"<div id='baah'><hr>"+api._decsription +"</div>":""}
                    ${getIOJSON(api,true)}
                    ${getIOJSON(api,false)}
                </div>
            </div>
        </div>
    </div>`
}

loadProject();
loadUser();
loadTemplates();
insertAllDomains();
