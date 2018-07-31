if (document.getElementsByClassName('loader')[0].style.display === 'none') {
    document.getElementsByClassName('loader')[0].style.display = 'block';
}
const appDiv = document.getElementsByClassName('app')[0];
let array = null;
const keys = ['ID', 'Name', 'Age', 'Nationality', 'Overall', 'Club', 'Value', 'Wage'];
let url = window.location.href;
if (url.includes('?')) {
    const index = url.indexOf('?');
    url = url.substring(index);

    const params = url.substring(url.indexOf('?') + 1).split('&');
    params.forEach(value => {
        if (value.includes('age') || value.includes('Age')) {
            const age = value.substring(value.indexOf('=') + 1);
            if (age !== '') {
                document.getElementById('age').value = age;
            }
        } else if (value.includes('nationality') || value.includes('Nationality')) {
            const nationality = value.substring(value.indexOf('=') + 1);
            if (nationality !== '') {
                document.getElementById('nationality').value = nationality;
            }
        }
    });
} else {
    url = '';
}
$.getJSON('data.json' + url, json => {
    array = json;
    console.log(array);
    createTableIntoDiv(appDiv, array.length, keys.length, array);

    function createTableIntoDiv(div, rows, cols, array) {
        if (rows === 0 || cols === 0) {
            return '';
        }
        const table = document.createElement('table');
        const header = document.createElement('tr');
        const leftTopEmpty = document.createElement('th');
        leftTopEmpty.appendChild(document.createTextNode(''));
        header.appendChild(leftTopEmpty);
        for (let i = 0; i < cols; i++) {
            const th = document.createElement('th');
            const text = document.createTextNode(keys[i]);
            th.appendChild(text);
            header.appendChild(th);
        }
        table.appendChild(header);
        let flag = true;
        for (let i = 0; i < rows; i++){
            const tr = document.createElement('tr');
            const autoAI = document.createElement('td');
            const k = i + 1;
            autoAI.appendChild(document.createTextNode(`${k}`));
            tr.appendChild(autoAI);
            for (let j = 0; j < cols; j++) {
                const td = document.createElement('td');
                let value = array[i][keys[j]];
                if (value) {
                    value = value.replace(/[^\x00-\x7F]/g, '');
                    value = value.replace(/\?/g, '');
                    const text = document.createTextNode(value);
                    td.appendChild(text);
                    tr.appendChild(td);
                } else {
                    flag = false;
                }
            }
            if (flag) {
                table.appendChild(tr);
            } else {
                flag = true;
            }
        }
        div.appendChild(table);
        div.style.display = 'block';
        document.getElementsByClassName('loader')[0].style.display = 'none';
    }
});



function isNumberKey(evt){
    const charCode = evt.which ? evt.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

document.getElementById('submit').addEventListener('click', () => {
    document.getElementsByClassName('loader')[0].style.display = 'block';
    const appDiv = document.getElementsByClassName('app')[0].style.display = 'none';
});

document.getElementById('submitHomePage').addEventListener('click', () => {
    document.getElementsByClassName('loader')[0].style.display = 'block';
    const appDiv = document.getElementsByClassName('app')[0].style.display = 'none';
});