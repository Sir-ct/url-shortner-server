function main(){
    let bodyContainer = document.getElementById('display-body-container')
    let btn = document.getElementById('submit-btn')
    let fullUrl = document.getElementById('full')
    let customUrl = document.getElementById('custom')
    let logoutBtn = document.getElementById('logout-btn')

    logoutBtn.addEventListener('click', ()=>{
        localStorage.removeItem('authToken')
        window.location.replace('/')
    })

    btn.addEventListener('click', (e)=>{
        e.preventDefault()

        addUrl(fullUrl, customUrl)
    })

    fetch('/geturl', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'short-token': localStorage.getItem('authToken')
        }
    }).then((res)=>res.json()).then((data)=>{
        console.log(data)
        data.data.forEach((item)=>{
            bodyContainer.innerHTML += `<div class="display-body">
            <div class="full-url"><a href="${item.full_url}">${item.full_url}</a></div>
            <div class="short-url"><a href="${item.short_url}">${item.short_url}</a> <div class="copy" onclick="copy('${item.short_url}');">copy</div></div>
            <div>${item.clicks}</div>
            <div><img src="${item.qr_code}" > </div>
        </div>`
        })
    }).catch((err)=>{
        console.log(err)
    })
}


function addUrl(full, custom){

    let formBody = custom.value ? {
        full_url: full.value,
        custom_url: custom.value
    } : {
        full_url: full.value
    }

    fetch('/createurl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'short-token': localStorage.getItem('authToken')
        },
        body: JSON.stringify(formBody)
    }).then((res)=>res.json()).then((data)=>{
        console.log(data)
        if(data.message === 'Url created successfully'){
            window.location.reload()
        }else{
            alert(`${data.message}: ${data.data[0]?.message}`)
        }
    }).catch((err)=>{
        console.log(err)
    })
}

window.addEventListener('load', ()=>{
    main()
})