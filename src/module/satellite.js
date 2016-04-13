(function () {
    var outputNode = document.getElementById('fetch-result'),
        params,
        request = new XMLHttpRequest(),
        query,
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
        origin: 'http://0.0.0.0:3000'
    };

    query = Object.keys(params).reduce(function (sum, current, i) {
        return `${sum}${i ? '&' : ''}${current}=${encodeURIComponent(params[current])}`;
    }, '?');

    request.onreadystatechange = function () {
        console.log(request);
        if (request.readyState === 4) {
            outputNode.innerText = request.responseText;
        }
    }
    request.open('GET', 'https://en.wikipedia.org/w/api.php' + query);
    request.send();
}());
