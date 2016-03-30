(function () {
    var outputNode = document.getElementById('fetch-result'),
        params,
        request = new XMLHttpRequest(),
        query = '?',
        url = 'https://en.wikipedia.org/w/api.php',
        worker = new SharedWorker('../worker/main.js');

    //https://en.wikipedia.org/w/api.php?action=query&titles=Satellite&prop=info|revisions&rvprop=content&rvlimi1=1&format=json&origin=localhost

    params = {
        action: 'query',
        titles: 'Satellite',
        prop: 'info|revisions',
        rvprop: 'content',
        rvlimit: 1,
        format: 'json',
        origin: 'localhost'
    };

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            outputNode.innerText = request.responseText;
        }
    }
    request.send('GET', 'https://en.wikipedia.org/w/api.php' + query);
}());
