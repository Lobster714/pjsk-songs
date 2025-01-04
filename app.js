// Reference to the search input field in the DOM
const searchInput = document.getElementById('searchInput');
// Add an event listener to handle input changes in the search field
searchInput.addEventListener('keyup', handleSearch);

fetch("https://raw.githubusercontent.com/Lobster714/pjsk-songs/refs/heads/master/scraper/data.json")
    .then(res => res.json())
    .then(data => {
        obj = data
    })

function renderTable(data) {
    const tableBody = document.querySelector('#dataTable tbody')
    tableBody.innerHTML = ""
    
    data.forEach(item => {
        const row = document.createElement('tr')

        for (let key in item) {
            const cell = document.createElement('td')
            cell.textContent = item[key]
            row.appendChild(cell)
        }

        tableBody.appendChild(row)
    })
}

renderTable()

function handleSearch() {
    const query = searchInput.value.toLowerCase()

    const filteredData = obj.filter(item => {
        return Object.values(item).some(
            val => String(val).toLowerCase().includes(query)
        )
    })

    renderTable(filteredData)
}

