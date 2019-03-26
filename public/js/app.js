console.log('Client side javascript file is loaded')



 const weatherForm = document.querySelector('form')
 const search = document.querySelector('input')
                            //.className
 const messageOne = document.querySelector('#message-1')
 const messageTwo = document.querySelector('#message-2')

 weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()// no se refresca la página

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }else{
                console.log(data.location)
                console.log(data.forecast)
               
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.temperature
                
               
              
            }
        })
    })
 }) 

