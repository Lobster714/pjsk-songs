const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', handleSearch);

fetch("https://raw.githubusercontent.com/Lobster714/pjsk-songs/refs/heads/master/scraper/data.json")
    .then(res => res.json())
    .then(data => {
        obj = data
    })

function renderTable(data) {
    const tableBody = document.querySelector('#dataTable tbody')
    tableBody.innerHTML = ""
    
    data.forEach((item) => {
        const row = document.createElement('tr')
        
        const jacket = document.createElement('td')
        const img = new Image(64, 64)
        img.src = item["jacket"]
        jacket.appendChild(img)
        row.appendChild(jacket)

        const song_name = document.createElement('td')
        const link = document.createElement('a')
        link.href = item['link']
        link.textContent = item['name']
        song_name.appendChild(link)
        row.appendChild(song_name)

        const producer = document.createElement('td')
        producer.innerHTML = item['producer'].toString().replaceAll(",", "<br>")
        row.appendChild(producer)

        const unit = document.createElement('td')
        unit.innerHTML = item['unit'].toString().replaceAll(",", "<br>")
        row.appendChild(unit)

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

