document.addEventListener("DOMContentLoaded", ev=>{
    const buttonGET = document.getElementById("btnGet1");
    const buttonPOST = document.getElementById("btnPost");
    const buttonPUT = document.getElementById("btnPut");
    const buttonPUTsend = document.getElementById("btnSendChanges");
    const buttonDELETE = document.getElementById("btnDelete");
    const resultsList = document.getElementById("results");
    
    const inputGET = document.getElementById("inputGet1Id");
    const inputPOSTname = document.getElementById("inputPostNombre");
    const inputPOSTlastname = document.getElementById("inputPostApellido");
    const inputPUTid = document.getElementById("inputPutId");
    const inputPUTname = document.getElementById("inputPutNombre");
    const inputPUTlastname = document.getElementById("inputPutApellido");
    const inputDELETE = document.getElementById("inputDelete");
    
    // actualizar los botones cada vez que se realice un cambio en algun input.
    inputPOSTname.addEventListener("input", checkButtons);
    inputPOSTlastname.addEventListener("input", checkButtons);
    inputPUTid.addEventListener("input", checkButtons);
    inputPUTname.addEventListener("input", checkButtons);
    inputPUTlastname.addEventListener("input", checkButtons);
    inputDELETE.addEventListener("input", checkButtons);
    
    function checkButtons()
    {
        // chequear validez de los botones
        // POST
        if(inputPOSTname.value != "" && inputPOSTlastname.value != "")
        {
            if(buttonPOST.hasAttribute("disabled"))
            {
                buttonPOST.removeAttribute("disabled");
            }
        }else{
            if(buttonPOST.hasAttribute("disabled") == false)
            {
                buttonPOST.setAttribute("disabled", "");
            }
        }
        //PUT
        if(inputPUTid.value != "")
        {
            if(buttonPUT.hasAttribute("disabled"))
            {
                buttonPUT.removeAttribute("disabled");
            }
        }else{
            if(buttonPUT.hasAttribute("disabled") == false)
            {
                buttonPUT.setAttribute("disabled", "");
            }
        }
        //PUT SEND (dentro del modal)
        if(inputPUTname.value != "" && inputPUTlastname.value != "")
        {
            if(buttonPUTsend.hasAttribute("disabled"))
            {
                buttonPUTsend.removeAttribute("disabled");
            }
        }else{
            if(buttonPUTsend.hasAttribute("disabled") == false)
            {
                buttonPUTsend.setAttribute("disabled", "");
            }
        }
        //DELETE
        if(inputDELETE.value != "")
        {
            if(buttonDELETE.hasAttribute("disabled"))
            {
                buttonDELETE.removeAttribute("disabled");
            }
        }else{
            if(buttonDELETE.classList.contains("disabled") == false)
            {
                buttonDELETE.setAttribute("disabled", "");
            }
        }
    }
    // funcion para agregar texto a la lista
    function PRINT(data)
    {
        if(data === undefined){return;}
        resultsList.innerHTML+="<hr>"
        
        if(Array.isArray(data))
        {
            data.forEach(user => {
                const line = "<li>"+"ID: "+user.id+"<br> NAME: "+user.name+"<br> LASTNAME: "+user.lastname+"</li>";
                resultsList.innerHTML+=line;
            });
        }else{
            const line = "<li>"+"ID: "+data.id+"<br> NAME: "+data.name+"<br> LASTNAME: "+data.lastname+"</li>";
            resultsList.innerHTML+=line;
        }
    }
    
    // agregar funcionalidad a los botones
    buttonGET.addEventListener("click", async ev=>{
        let response = await GET(inputGET.value);
        PRINT(response);
    });
    
    buttonPOST.addEventListener("click", async ev=>{
        let response = await POST(inputPOSTname.value, inputPOSTlastname.value);
        PRINT(response);
    });
    
    buttonPUTsend.addEventListener("click", async ev=> {
        let response = await PUT(inputPUTid.value, inputPUTname.value, inputPUTlastname.value);
        PRINT(response);
    });
    
    buttonDELETE.addEventListener("click", async ev => {
        let response = await DELETE(inputDELETE.value);
        PRINT(response);
    });
})

// funcion para mostrar la alerta en caso de error
function showAlert()
{
    const alert = document.getElementById("alert-error");
    alert.classList.add("show");
    setTimeout(function() {
        alert.classList.remove('show');
    }, 3000);
}

async function GET(id)
{
    try
    {
        let URL = "";
        if(id)
        {
            URL = "https://6542ca6701b5e279de1f9637.mockapi.io/users/"+id;
        }else{
            URL = "https://6542ca6701b5e279de1f9637.mockapi.io/users";
        }
        
        const response = await fetch(URL);
        if(response.ok)
        {
            const data = await response.json();
            return data;
        }else{
            showAlert();
            return undefined;
        }
    }catch(error){
        showAlert();
        return undefined;
    }
}

async function POST(_name, _lastname)
{
    try {
        let URL = "https://6542ca6701b5e279de1f9637.mockapi.io/users";
        const user = {name: _name, lastname: _lastname};
        const response = await fetch(URL, {method: 'POST', headers: {'Content-Type': 'application/json'} , body: JSON.stringify(user)});
        if(response.ok)
        {
            const data = await response.json();
            return data;
        }else{
            showAlert();
            return undefined;
        }
    } catch (error) {
        showAlert();
        return undefined;
    }
}

async function PUT(id, _name, _lastname)
{
    
    try {
        let URL = "https://6542ca6701b5e279de1f9637.mockapi.io/users/"+id;
        const user = {name: _name, lastname: _lastname};
        const response = await fetch(URL, {method: 'PUT', headers: {'Content-Type': 'application/json'} , body: JSON.stringify(user)});
        if(response.ok)
        {
            const data = await response.json();
            return data;
        }else{
            showAlert();
            return undefined;
        }
    } catch (error) {
        showAlert();
        return undefined;
    }
}

async function DELETE(id)
{
    try {
        let URL = "https://6542ca6701b5e279de1f9637.mockapi.io/users/"+id;
        const response = await fetch(URL, {method: 'DELETE'});
        if(response.ok)
        {
            const data = await response.json();
            return data;
        }else{
            showAlert();
            return undefined;
        }
    } catch (error) {
        showAlert();
        return undefined;
    }
}

