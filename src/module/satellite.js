(function () {
    var outputNode = document.getElementById('fetch-result'),
        request = new XMLHttpRequest(),
        url = 'http://localhost:3000/todo/users',
        worker = new SharedWorker('../worker/main.js');

    request.addEventListener('load', function () {
        var users = JSON.parse(request.responseText);
        users.forEach(function (user) {
            outputNode.textContent += `${user.username} :: ${new Date(user.created)}`;
        });
    });
    request.open('GET', url);
    request.send();
}());
