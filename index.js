let apis = [];
let apisProject = [];
let apisUser = [];
let apisTemplate = [];

let methods = {
    get: 'btn-success',
    post: 'btn-warning',
    patch: 'btn-secondary',
    delete: 'btn-danger',
    put: 'btn-primary'
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
    const indent = '&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(indentLevel);
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

 
// Example usage
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
    .add();

new APIEndpoint()
    .method('post')
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
    .add();

new APIEndpoint()
    .method('patch')
    .url('/project/info/{projectId}')
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
    .add();

//APIEndpoint.renderAll();
function getId(index){
    return apis[index]._url.split("/").join('-')+index.toString();
}
function  createMethodAndUrl(index){
//    <div className="d-flex justify-content-start">
    let div = document.createElement('div');
    div.className="d-flex justify-content-start";
    let meth = createMethod(index);
    let url = createUrl(index);
    div.append(meth);
    div.append(url);
    return div;

}
function createUrl(index){
    //<span className="mx-3"> @Model.Url</span>
    let url = document.createElement('span');
    url.classList.add(['mx-3']);
    let urlString = apis[index]._url;
    let newParts;
    if (urlString.includes("{")){ // surround it with spans indicatinng its params, the span class is parametri

        let parts = urlString.split("/");
        console.log(parts);
        newParts = parts.map(part=>{            
            if (part.includes("{")){
                return `<span class="parametri">${part}</span>`;
            }else{
                return part;
            }
        });
        urlString = newParts.join("/");   }
    
    url.innerHTML=urlString ;
    return url;
    
}
function createMoreButton(index){

    let targetId = getId(index);
    // Create the button element
    const button = document.createElement("div");

    // Set the class attribute
    button.className = "btn btn-primary";

    // Set the type attribute
    button.setAttribute("type", "button");

    // Set the data-bs-toggle attribute
    button.setAttribute("data-bs-toggle", "collapse");

    // Set the data-bs-target attribute
    button.setAttribute("data-bs-target", `#${targetId}`);

    // Set the aria-expanded attribute
    button.setAttribute("aria-expanded", "false");

    // Set the aria-controls attribute
    button.setAttribute("aria-controls", "collapseExample");

    // Set the button text
    button.innerText = "More...";

    return button;
}
function createMethod(index){
    //        <div class="btn btn-@color disabled">@Model.Method</div>
    let elem = document.createElement('div');
    elem.className="btn " + methods[apis[index]._method] +" disabled";
    elem.innerHTML=apis[index]._method.toString().toUpperCase();
    return elem;
}
function createUrlDescription(index){
    let elem = document.createElement('div');
    elem.innerHTML = apis[index]._urlDesc;
    return elem;

}
function createApiHead(index){
    let elem = document.createElement('div');
    elem.classList.add('card-header','p-1','d-flex','justify-content-between');
    elem.append(createMethodAndUrl(index));
    elem.append(createMoreButton(index));

    return elem;
}
function createBodyInputExample(index) {
    const bodyInputDiv = document.createElement("div");
    const requestWord = document.createElement("div");
    requestWord.innerText = "Request Body:";
    bodyInputDiv.append(requestWord);
    bodyInputDiv.innerText += apis[index]._iobjDesc;
    return bodyInputDiv;
}

function createBodyOutputExample(index) {
    const bodyOutputDiv = document.createElement("div");
    const responseWord = document.createElement("div");
    responseWord.innerText = "Response Body:";
    bodyOutputDiv.append(responseWord);
    bodyOutputDiv.innerHTML += apis[index]._oobjDesc;
    
    return bodyOutputDiv;
}
function getInput(index) {
    let div = document.createElement('div');
    div.innerHTML = generateCodeMarkup(apis[index]._iobj,0);
    return div;
}

function getOutput(index) {
    let div = document.createElement('div');
    div.innerHTML = generateCodeMarkup(apis[index]._oobj,0);
    return div;
}
function createApiBody(index){
    //<div className="collapse my-1" id="api-project-1">
    const id = getId(index);

    // Create the div element
    const div = document.createElement("div");

    // Set the class attribute
    div.className = "collapse my-1 p-2";

    // Set the id attribute
    div.id = id;

    let desc = document.createElement('div');
    if(apis[index]._decsription){desc.innerHTML = apis[index]._decsription;
    div.append(document.createElement('hr'));}
    div.append(desc);

    if (apis[index]._iobj){
        div.append(document.createElement('hr'));
        div.append(createBodyInputExample(index));
        div.append(getInput(index));
    }
    if (apis[index]._oobj){
        div.append(document.createElement('hr'));
        div.append(createBodyOutputExample(index));
        div.append(getOutput(index));
    }
    //div.append(getBodies(index));
    let cardboyd= document.createElement('div');
    cardboyd.className="card-body p-2";
    cardboyd.append(createUrlDescription(index));
    cardboyd.append(div);
    return cardboyd;

}
function createApiCard(index){
    let apibody = document.createElement('div');
    apibody.className="container mt-4";
    let cardy  = document.createElement('div');
    cardy.className='card';
    cardy.append(
       createApiHead(index)
    );
    
    cardy.append(
        createApiBody(index)
    );
    apibody.append(cardy)
    return apibody;

}


function insertAll(elemId){
    let cont = document.getElementById(elemId);
    apis.forEach((api,index)=>{
        let elem = createApiCard(index);

        cont.append(elem);
    })
}
function insertAllDomains(){
    
    insertAll('api-container-project');
}
insertAllDomains();