

// fetch is a browser based API;fetch is not accessible in node.js;fetch is a function


const weatherForm = document.querySelector('form')
const searchEle = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchEle.value
    console.log(location)

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent  = data.location
            messageTwo.textContent = data.forecast
        }
        
    })
})
})