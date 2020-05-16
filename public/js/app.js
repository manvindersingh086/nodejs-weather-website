
console.log('Client side js file is loaded!')



const weatherForm = document.querySelector('form')
const search= document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageThree= document.querySelector('#message-3')
weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    messageOne.textContent='Loading...'
   
    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
        response.json().then((data) => {

            if(data.error)
            {
              messageOne.textContent(error)
            }
            else
            {
                console.log(data)
               messageOne.textContent='Temparature is '+data[0].Temperature
               messageThree.textContent = JSON.stringify(data[2].weatherDescription)
            }
            
        })
})
})