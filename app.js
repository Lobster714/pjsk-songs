const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', handleSearch);

const headers = document.querySelectorAll('th');
headers.forEach(header => header.addEventListener('click', handleSort));

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
        link.target = "_blank"
        song_name.appendChild(link)
        row.appendChild(song_name)

        const producer = document.createElement('td')
        producer.innerHTML = item['producer'].toString().replaceAll(",", "<br>")
        row.appendChild(producer)

        const unit = document.createElement('td')
        unit.innerHTML = item['unit'].toString().replaceAll(",", "<br>").replaceAll("25-ji<br>", "25-ji,")
        row.appendChild(unit)

        const bpm = document.createElement('td')
        bpm.innerHTML = item['bpm'].toString()
        row.appendChild(bpm)

        const duration = document.createElement('td')
        duration.innerHTML = item['duration'].toString()
        row.appendChild(duration)

        const release = document.createElement('td')
        const date = document.createElement('input')
        const release_text = item['release'].toString()
        date.type = "date"
        date.value = release_text
        date.min = release_text
        date.max = release_text
        release.appendChild(date)
        row.appendChild(release)

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

function handleSort(event) {
    const header = event.target
    const column = header.getAttribute('data-column')
    const order = header.getAttribute('data-order')

    const newOrder = order === 'desc' ? 'asc' : 'desc'
    header.setAttribute('data-order', newOrder)

    const sortedData = [...obj].sort((a, b) => {
        if (a[column] > b[column]) {
            return newOrder === 'asc' ? 1 : -1
        } else if (a[column] < b[column]) {
            return newOrder === 'asc' ? -1 : 1
        } else {
            return 0
        }
    })

    renderTable(sortedData)
}
