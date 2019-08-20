window.onload = function(){
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture', false);

    xhr.send();

    if (xhr.status!==200) {
        alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        console.log(xhr.responseText);
    }

};
