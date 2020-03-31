
const $input = $('#input-search')
const $message1 = $('#message-1')
const $message2 = $('#message-2')

$input.focus()

$('form').submit(function(e) {
  e.preventDefault()
  const url = `/weather?address=${$input.val()}`
  
  $message1.text('Loding data...')
  $message2.text('')
  
  axios(url).then(({data}) => {
    if (data.error) return $message1.text(data.error)
    
    $message1.text(data.placename)
    $message2.text(data.forecastData)
  }).catch((error) => {
    $message1.text(`Error: ${error}`)
    console.log(error)
  })
})
