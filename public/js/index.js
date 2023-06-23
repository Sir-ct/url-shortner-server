let loginBtn = document.getElementById('login-btn')
let signupBtn = document.getElementById('signup-btn')
let emailField = document.getElementById('email')
let passField = document.getElementById('password')
let error = document.getElementById('error-msg')
let success = document.getElementById('success-msg')

if(localStorage.getItem('authToken')){
    window.location.replace('/dashboard.html')
}

function main(){
    loginBtn.addEventListener('click', ()=>{
        login()
    })

    signupBtn.addEventListener('click', ()=>{
        signup()
    })
}


function signup(){
    console.log('signingup')
    fetch("/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: emailField.value, password: passField.value})
    }).then((res)=> res.json()).then((data)=>{
        console.log(data)
        if(data.message == 'Validation Error'){
            error.innerText = data.data[0].message
            return
        }

        if(!data.data){
            error.innerText = data.message
        }else{
            success.innerText= "Account creation successful, login now"
        } 
    }).catch((err)=>{
        console.log(err)
    })
}

function login(){
    fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: emailField.value, password: passField.value})
    }).then((res)=>res.json()).then((data)=>{
        console.log(data)
        if(data.message == 'Validation Error'){
            error.innerText = data.data[0].message
            return
        }

        if(!data.data){
            error.innerText = data.message
        }else{
            localStorage.setItem('authToken', data.data.token)
            window.location.replace("/dashboard.html")
        } 

    }).catch((err)=>{
        console.log(err)
    })
}


window.addEventListener('load', ()=>{
    main()
})