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
    const indent = '&nbsp;'.repeat(indentLevel);
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
            html += indent + '&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">"' + key + '"</span>: ';
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
    .method('post')
    .url('/project/new')
    .urlDesc('Creates a new project with the given title and template name.')
    .inDesc('The request body should contain the title of the project and the name of the template to use as given below.')
    .inObj({
        "title":"My Resume For CodeCraft",
        "templateName":"Obsidian"
    }
    )
    .outDesc('As a return you get a message indicating the success of the operation and, in case of success, the project object itself. You may use the id of the returned object and the necceassary information to redirect the user to the newly created project.')
    .outObj({
        "message":"project has been added successfully",
        "Project":{
        "id": "1706824084732",
        "userId": "1706821332398",
        "title": "My New One",
        "creationDate": 1706824084732,
        "lastModifiedDate": 1706824084732,
        "templateName": "Obsidian"
    }}
    )
    .grp("manageProj")
    .add()

new APIEndpoint()
    .method('get')
    .url('/project/list')
    .urlDesc('Gets a list of all projects that user has.')
    .outDesc('The Returned object is an array of project objects, each containing only the basic information of the project (not detailled).')
    .inObj(null)
    .outObj([
        {
        "id": "1706824084732",
        "userId": "1706821332398",
        "title": "My New One",
        "creationDate": 1706824084732,
        "lastModifiedDate": 1706824084732,
        "templateName": "Obsidian"
        },
        {
        "id": "1706824142334",
        "userId": "1706821332398",
        "title": "And Another One",
        "creationDate": 1706824142334,
        "lastModifiedDate": 1706824142334,
        "templateName": "Marine"
        }
        ]
    )
    .grp("manageProj")
    .add();

new APIEndpoint()
    .method('get')
    .url('/project/info/{projectId}')
    .urlDesc('Returns all related infos to the project with the given ID.')
    .outObj({
        "id": "1706863054682",
        "userId": "1706821332398",
        "title": "And Another One",
        "creationDate": 1706911726475,
        "lastModifiedDate": 1706911726475,
        "templateName": "Marine",
        "snapshot": {
            "id": "1706911726475",
            "projectId": "1706863054682",
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
    }
    )
    .outDesc('The returned object is a project object with all detailled informations that belongs to the project with the given ID')
    .grp("manageProj")
    .add();


new APIEndpoint()
    .method('get')
    .url('/project/snapshot/{projectId}')
    .urlDesc('Returns all inserted data for a project with the given ID.')

    .outObj({
        "id": "1706911726475",
        "projectId": "1706863054682",
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
    )
    .outDesc('The returned object a Snapshot object with all detailled informations that belongs to the project with the given ID')
    .grp("dataProj")

    .add();

new APIEndpoint()
    .method('patch')
    .url('/project/info')
    .urlDesc('Updates a certain field of snapshot. ')
    .inObj({
        "projectId":"1706822220158",
        "fieldValue":5,
        "fieldName":"level",
        "entryName":"Language",
        "tag":0
    }
    )
    .outObj({ "message": "Updated successfully" })
    .grp("dataProj")
    .add();

new APIEndpoint()
    .method('put')
    .url('/project/info')
    .urlDesc('Updates the whole snapshot object of a project.')
    .inDesc('The request body should contain the id of the project and the new snapshot object as given below.')
    .inObj({
        "projectId":"1706822220158",
        "snapshot":{
            "id": "1706911726475",
            "projectId": "1706863054682",
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
    }
    )
    
    .outDesc('As a return you get a message indicating the success of the operation or no... and, in case of success, the project object itself. You may use the returned object for testing if your input has been updated as expected or no, and also for redirection if needed.')
    .outObj({
        "message":"updated successfully",
        "project":{
        "id": "1706824084732",
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
    }})
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
    .method('post')
    .url('/project/info')
    .urlDesc('Adds a new element enumerable type (Languages, Skills) to the project. It is used when user wants to add a new language for example.')
    .inDesc('The request body should contain the id of the project and the name of the enumerable data type to add as given below.')
    .inObj({
        "projectId":"1706822220158",
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
        "projectId":"1706822220158",
        "entryName":"Language",
        "tag":1
    }
    )
    .outDesc('As a return you get a message indicating the success of the operation or no... and, in case of success, the project object itself. You may use the returned object for testing if the requested entry has been deleted successfully or no, and also for redirection if needed.')
    .outObj({
        "message":"data group deleted successfully",
        "project":{
        "id": "1706824084732",
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
    }})
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
    .inDesc('The request body should contain the id of the project to delete as given below. Note that the tag is also required to specify the exact element to remove.')
    .inObj({
        "projectId":"1706822220158"
    })
    .grp("manageProj")
    .add();



    
    apisProject = [...apis];
    apis=[];
}
function loadUser(){
new APIEndpoint()
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
        "message":"User created successfully",
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwNjgyMTMzMjM5OCwiaWF0IjoxNjMzNzYwNzIzfQ.7"
    })
    .add();
new APIEndpoint()
    .method('get')
    .url("/profile/info")
    .urlDesc("Gets All the personal information of the current user")
    .outDesc("The response is a JSON object containing all the personal information of the user in details (except the password of course xD).")
    .outObj({
        "id": "1706821332398",
        "email": "email.example@gmail.com",
        "firstName": "Code",
        "lastName": "Craft"
    })
    .add();
apisUser = [...apis];
apis=[];
}
// Templates Project

function loadTemplates(){new APIEndpoint()
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
    .method('get')
    .url("/template/html/{templateName}")
    .outObj( {"Content-Type": "text/html; charset=utf-8"})
    .urlDesc("returns the HTML format of a template which name is given in parameter, useful for manipulation with DOM and inserting fields")
    .add();

new APIEndpoint()
    .method('get')
    .url("/template/pdf/{templateName}")
    .urlDesc("returns the PDF format of a template which name is given in parameter, useful for downloading the template itself")
    .outObj({"Content-Type": "application/pdf"})
    .outDesc("The response is a PDF file that can be used for preview or download of the template itself.")
    .add();

new APIEndpoint()
    .method('get')
    .url("/template/thumb/{templateName}")
    .urlDesc("returns the PNG format of a template which name is given in parameter, useful for listing a templates")
    .outObj({"Content-Type": "image/png"})
    .outDesc("The response is a PNG image file that can be used for listing the templates that are available.")
    .add();

new APIEndpoint()
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
function getId(index){
    return apis[index]._url.split("/").join('-')+index.toString();
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
    return `
    <div class="container mt-4"> 
        <div class="card">
            <div class="card-header p-1 d-flex flex-wrap justify-content-between">
                <div class="btn btn-${color} disabled align-self-start">POST</div>
                <span class="mx-3 align-self-start">${formatEndPoint(api)}</span>
                <div class="btn btn-dark ml-auto collapsed " 
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