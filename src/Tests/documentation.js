let apis=[];
let methods = {
    get: 'btn btn-outline-success disabled',
    post: 'btn btn-outline-warning disabled',
    patch: 'btn btn-outline-secondary disabled',
    delete: 'btn btn-outline-danger disabled',
    put: 'btn btn-outline-primary disabled'
}
class APIEndpoint{
    _method;
    _url;
    _iobj;
    _oobj;
    _decsription;

    method=(_method)=>{
        this._method=_method;
        return this;
    }
    url=(_url)=>{
        this._url=_url;
        return this;
    }
    inObj=(_iobj)=>{
        this._iobj=_iobj;
        return this;
    }
    outObj=(_oobj)=>{
        this._oobj=_oobj;
        return this;
    }
    description=(_desc)=>{
        this._decsription=_desc;
        return this;
    }
    static toggle = ()=>{

    }
    static renderAll = ()=>{
        apis.forEach((api,index)=>{

            return `<div id="API${index}"></div><span class="${methods[api._method]}"> ${methods[api._method].toUpperCase()} </span>`
            + `<span>${api._url}: </span>`
            + `<span class="btn-outline-dark" onclick="APIEndpoint.toggle(${index})"> </span>`
            
            +`</div>`;
        })
    }
    add = ()=>{
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
                if (Object.keys(value).length===0 ) {
                    html += '<span class="null">undefined</span>';
                } else {
                    html +=  generateCodeMarkup(value, indentLevel + 1);
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

// Example JSON object
var jsonObj = {
    "name": "John Doe",
    "age": 30,
    "is_active": true,
    "email": "john.doe@example.com",
    "address": null,
    "nestedObject": {
        "name":"omar",
        "firstName":"Mejdi",
        "age":16,
        "aboutMe":undefined
    }
};