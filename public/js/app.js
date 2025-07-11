// This is the best for me
// fetch('http://localhost:3000/weather?address=!')
//     .then((response) => response.json())
//     .then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
//     .catch((error) => console.log('Error: ', error))


// they used this  one
// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    // Clear old messages immediately
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    if (location.length === 0) {
        console.log('Please provide Location' )
    } else {
        fetch(`/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                    messageTwo.textContent = ''
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    }
})