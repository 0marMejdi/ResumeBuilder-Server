let apis = [];
let methods = {
    get: 'btn-success',
    post: 'btn-warning',
    patch: 'btn-secondary',
    delete: 'btn-danger',
    put: 'btn-primary'
}

class APIEndpoint {
    _method;
    _url;
    _iobj=null;
    _oobj=null;
    _decsription;


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
    static toggle = (index) => {
        const apiElement = document.getElementById(`API${index}`);
        console.log("we are inside");
        apiElement.classList.toggle('hide');
        if (apiElement.innerHTML){
            apiElement.innerHTML="";
        }else{
            apiElement.innerHTML=APIEndpoint.renderPartial(index);
        }
    }
    static renderApi = (index)=>{
        let html="";
        let api = apis[index];
        html += `<div class="container m-3">`;
        html += `<span class="${methods[api._method]}">${api._method.toUpperCase()}</span> `;
        html += `<span>${api._url}: </span>`;
        html += `<div class="btn btn-outline-dark" onclick="APIEndpoint.toggle(${index})">Toggle</div>`;

        html += APIEndpoint.renderPartial(index)
        html += `</div>`;
        html += `<hr>`;
        return html;
    }
    static renderPartial=(index)=>{
        let html="";
        let api = apis[index];
        // html += `<hr>`;
        html += `<div id="API${index}" >`;
        html += `<div class="description">${api._decsription}</div>`;
        html += `<div>Input Object : </div>`
        html += generateCodeMarkup(api._iobj);
        html += `<div>Output Object : </div>`

        html += generateCodeMarkup(api._oobj);
        html += `</div>`;


        return html;

}
    static renderAll = () => {
        let html = '';
        apis.forEach((api, index) => {
            html+=APIEndpoint.renderApi(index);
        });
        document.getElementById('api-container').innerHTML = html;
        document.querySelectorAll("#btn.btn-dark").forEach(bt=>bt.click());
    }
    add = () => {
        apis.push(this);
    }
}

function generateCodeMarkup(obj, indentLevel = 0) {
    const indent = '&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(indentLevel);

    let html = '<pre class="code"><code>';

    if (typeof obj === 'object' && obj !== null) {
        html += indent + '{<br>';
        Object.entries(obj).forEach(([key, value], index, array) => {
            html += indent + '&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">"' + key + '"</span>: ';

            if (typeof value === 'object' && value !== null) {
                if (Object.keys(value).length === 0) {
                    html += '<span class="null">undefined</span>';
                } else {
                    html += '<br>' + generateCodeMarkup(value, indentLevel + 1);
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


            if (index !== array.length - 1) {
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
    .description('Returns a list of all projects that use has.')
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
    .description('Returns all related infos to the project with the given ID.')
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
    .description('Updates a certain field of snapshot. ')
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
    url.innerHTML= apis[index]._url;
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
    elem.innerHTML=apis[index]._method;
    return elem;
}
function createApiHead(index){

    let elem = document.createElement('div');
    elem.classList.add('card-body','p-0','d-flex','justify-content-between');
    elem.append(createMethodAndUrl(index));
    elem.append(createMoreButton(index));
    return elem;
}
function createBodyInputExample() {
    const bodyInputDiv = document.createElement("div");
    bodyInputDiv.innerText = "Expected Body Input as Example:";
    return bodyInputDiv;
}

function createBodyOutputExample() {
    const bodyOutputDiv = document.createElement("div");
    bodyOutputDiv.innerText = "Expected Body Output as Example:";
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
    div.className = "collapse my-1";

    // Set the id attribute
    div.id = id;

    let desc = document.createElement('div');
    desc.innerHTML = apis[index]._decsription;
    div.append(document.createElement('hr'));
    div.append(desc);

    if (apis[index]._iobj){
        div.append(document.createElement('hr'));
        div.append(createBodyInputExample());
        div.append(getInput(index));
    }
    if (apis[index]._oobj){
        div.append(document.createElement('hr'));
        div.append(createBodyOutputExample());
        div.append(getOutput(index));
    }
    //div.append(getBodies(index));

    return div;

}
function createApiCard(index){
    let apibody = document.createElement('div');
    apibody.className="container mt-5";
    let cardy  = document.createElement('div');
    cardy.className='card p-2';
    cardy.append(
       createApiHead(index)
    );
    cardy.append(
        createApiBody(index)
    );
    apibody.append(cardy)
    return apibody;

}


function insertAll(){
    let cont = document.getElementById('api-container');
    apis.forEach((api,index)=>{
        let elem = createApiCard(index);

        cont.append(elem);
    })
}
insertAll();