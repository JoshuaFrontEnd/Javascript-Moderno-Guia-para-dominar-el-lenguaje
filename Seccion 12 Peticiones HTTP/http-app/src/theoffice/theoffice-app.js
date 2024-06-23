/**
 * @returns { Promise<Object> } quote information
 */
const fetchQuote = async () => {

  const res = await fetch('https://officeapi.akashrajpurohit.com/quote/random')

  const data = await res.json()

  return data

}


/**
 *
 * @param { HTMLDivElement } element
 */
export const TheOfficeApp = async ( element ) => {

  element.innerHTML = 'Loading...'

  // await fetchQuote()

  const quoteLabel = document.createElement('blockquote')
  const authorLabel = document.createElement('h3')
  const nextQuoteButton = document.createElement('button')
  nextQuoteButton.innerText = 'Next Quote'

  const renderQuote = ( data ) => {
    quoteLabel.innerHTML = data.quote
    authorLabel.innerHTML = data.character
    element.replaceChildren( quoteLabel, authorLabel, nextQuoteButton )
  }

  fetchQuote()
    // .then( data => renderQuote( data ) )
    // Lo anterior puede interpretarse tambien como:
    .then( renderQuote )

  nextQuoteButton.addEventListener('click', async () => {
    element.innerHTML = 'Loading...'

    const quote = await fetchQuote()

    renderQuote( quote )

  })


}