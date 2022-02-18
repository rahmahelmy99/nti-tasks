const transTypes = ["withdraw", "addBalance"]
const customerInfo = [ "customerName", "customerBalance", "customerTrans"]
const addCustomer = document.querySelector("#addCustomer")  
const datawrap = document.querySelector("#datawrap")
const delAll = document.querySelector("#delAll")
const singlewrap = document.querySelector("#singlewrap")

const createMyOwnElement = (element) => {
    try {
        let myElement = document.createElement(element.element)
        element.parent.appendChild(myElement)
        if(element.textContent) myElement.textContent=element.textConten
        if (element.classes) myElement.classList = element.classes
 
        element.attributes.forEach(attribute => {
            myElement.setAttribute(attribute.key, attribute.val)
        })
        return myElement
    }
    catch(e){console.log(e)}
}

const elementObjCreator = (element, parent,textContent,classes, attributes) => {
    return { element, parent,textContent,classes, attributes }
}


//read data from  the local storage
const readFromStorage = (storageItem) => {
    let data
    try {
        data = JSON.parse(localStorage.getItem(storageItem)) 
        if (!Array.isArray(data)) throw new Error("Data not array")
    }
    catch (e) {
        data = []
    }
    return data
}
//write data in the local storage
const writeDataToStorage = (storageItem, data) => {
    localStorage.setItem(storageItem, JSON.stringify(data))
}
// draw customer information
const drawCustomer = (customer,index)=> {
    const tr = createMyOwnElement(elementObjCreator("tr", datawrap, null, null, []))
    createMyOwnElement(elementObjCreator("td", tr, customer.accNum, null, []))
    createMyOwnElement(elementObjCreator("td", tr, customer.customerName, null, []))
    createMyOwnElement(elementObjCreator("td", tr, customer.customerBalance, null, []))
    createMyOwnElement(elementObjCreator("td", tr, customer.customerTrans, null, []))
    
    const td = createMyOwnElement(elementObjCreator("td", tr, null, null, []))
    const singleBtn = createMyOwnElement( elementObjCreator("button", td," Show ", "btn btn-success mx-3", [])
    )
    singleBtn.addEventListener("click", () => showElement(customer))
    const addTransBtn = createMyOwnElement(
        elementObjCreator("a", td,"AddTransaction", "btn btn-warning mx-3", [{ key: "href", val: "addTrans.html" }])
    )
    const delBtn = createMyOwnElement(elementObjCreator("button", td, " Delete ", "btn btn-danger mx-3", [])
    )
    delBtn.addEventListener("click", () => deleteCustomer(index))
}
const drawAllCustomers = (customers) => {
    datawrap.textContent = ""
    if (customers.length == 0) drawEmptyRow(5)
    else customers.forEach((customer, index) => drawCustomer(customer, index))
}

//delete customer
const deleteCustomer = (index)=>{
    const customers = readFromStorage("customers")
    customers.splice(index,1)
    writeDataToStorage("customers", customers)
    drawAllCustomers(customers)
}

const showElement=(customer)=>{
    writeDataToStorage("customer", customer)
    window.location.href="singleCustomer.html"
}

const drawEmptyRow = (colSpan) => {
    const tr = createMyOwnElement(elementObjCreator("tr", datawrap, null, "alert alert-danger", []))
    createMyOwnElement(elementObjCreator("td", tr, "no customers yet", "text-center", [{ key: "colspan", val: colSpan }]))
}
const drawTransTypes = (transTypes)=>{ 
    transTypes.forEach((trans) => {
        createMyOwnElement(elementObjCreator("option", document.querySelector("#transType"), trans, null, [{ key: "value", val: trans }]))
    })
}

if (addCustomer) {
    const transTypes = ["withdraw", "addBalance"]
    drawTransTypes(transTypes)
    addCustomer.addEventListener("submit",  (e)=> {
        e.preventDefault()
        let customer = { accNum: Date.now(),}
        customerInfo.forEach((head) => customer[head] = addCustomer.elements[head].value)
        const customers = readFromStorage("customers") 
        customers.push(customer)
        writeDataToStorage("customers", customers) 
       // addCustomer.reset()
        window.location.href = "allCustomer.html"
    })
}
if(datawrap) {
    drawAllCustomers(readFromStorage("customers") )
    delAll.addEventListener("click", () => {
        writeDataToStorage("customers", [])
        drawAllCustomers([])
    })
}
if(singlewrap){
    const customer = JSON.parse(localStorage.getItem("customer"))
    singlewrap.innerHTML = `
    <div class="col-md-6 col-12 border border-2 border-primary">
    <h5>accNum</h5>
    <p>${customer.accNum}</p>
    </div>
    <div class="col-md-6 col-12 border border-2 border-primary">
    <h5>Name</h5>
    <p>${customer.customerName}</p>
    </div>
    <div class="col-md-12 col-12 border border-2 border-primary">
    <h5>balance</h5>
    <p>${customer.customerBalance}</p>
    </div>
    <div class="col-md-12 col-12 border border-2 border-primary">
    <h5>transaction</h5>
    <p>${customer.customerTrans} </p>
    </div>
    
 `
}
