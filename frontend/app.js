const ENDPOINT = 'http://localhost:5000/api/query/'


const searchArtists = (query) => {
    return fetch(`${ENDPOINT}${query}`)
    .then(resp => resp.json())
}

const displayResults = (results) => {
    const artistDisplay = document.getElementById('artistDisplay')
    artistDisplay.innerHTML = ''
    if (results.length > 0) {
        // Limiting the search results to the first 15 results. Future iterations would benefit from pagination
        for (let i=0; i<results.slice(0,15).length; i++) {
            let li = document.createElement('li')
            li.innerText = results[i].bandName
            li.className='list-group-item'
            artistDisplay.appendChild(li)
        }
    } else {
        // if the fetch request returns an empty list, tell the user there were no matches
        artistDisplay.innerHTML = '<div class="alert alert-info">No matching artists found</div<'
    }
    
}

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault()
    const formInput = e.target.children[0]
    if (formInput.value) {
        searchArtists(formInput.value)
        .then(bands => displayResults(bands))
        formInput.value = ''
    }   
})

