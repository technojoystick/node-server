function get(e) {
    var $target = $(e.target);
    var url = $target.data('target');
    var textTmp = $target.text();
    var $form = $target.siblings('form');

    $target.text(' ... ');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if ( this.status === 200 ) {
            var data = JSON.parse(xhr.responseText);
            var text = createTreeDom(data);

            $target.text(textTmp);
            $form[0].innerHTML = '';
            $form[0].appendChild(text);
        } else {
            alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
        }
    };

    xhr.onerror = function() {
        alert('Ошибка ' + xhr.status);
    };

    xhr.send(null);
}

function clear(e) {
    var $target = $(e.target);
    var $form = $target.siblings('form');
    $form.html('');
}

function createTreeDom(obj) {

    if (typeof obj !== 'object') return obj;

    var ul = document.createElement('ul');

    for (var key in obj) {
        var li = document.createElement('li');
        li.innerHTML = '<span class="key">' + key + '</span>';

        var childrenUl = createTreeDom(obj[key]);

        if (typeof childrenUl !== 'object') {
            var input = document.createElement('input');
            input.classList = 'value';
            input.innerHTML = childrenUl;
            input.value = childrenUl;
            childrenUl = input;
        }

        li.appendChild(childrenUl);

        ul.appendChild(li);
    }

    return ul;
}

function isObjectEmpty(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

$(document).on('click', '.getLink', function(e) {
    e.preventDefault();
    get(e);
});

$(document).on('click', '.clear', function(e) {
    e.preventDefault();
    clear(e);
});