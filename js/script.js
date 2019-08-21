window.onload = function(){
    getInfo();
    openPopup();
};

let getInfo = function(){
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture', false);

    xhr.send();

    if (xhr.status!==200) {
        alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        //alert(xhr.responseText);
    }
    let results = xhr.responseText;
    let users = JSON.parse(results);
    console.log(users);

    for (let i=0; i<users.results.length; i++) {
        //console.log(users.results[i].name.first);
        let newItem = document.createElement('li');
        let newImg = document.createElement('img');
        let newDiv = document.createElement('div');
        let newSpan = document.createElement('span');
        let newSpan1 = document.createElement('span');
        let newSpan2 = document.createElement('span');

        let myList = document.getElementById('contentList');
        newItem.classList.add('content__item');
        newDiv.classList.add('content__name');
        myList.appendChild(newItem);

        let srcNewImg = users.results[i].picture.medium;
        newItem.appendChild(newImg);
        newImg.src = srcNewImg;
        newImg.classList.add('content__img');

        let srcImgLg = users.results[i].picture.large;

        newItem.appendChild(newDiv);
        newDiv.classList.add('content__name');

        let nameGender = users.results[i].name.title;
        newSpan.textContent = nameGender;
        newSpan.classList.add('content__title');
        newDiv.appendChild(newSpan);

        let nameFirst = users.results[i].name.first;
        newSpan1.textContent = nameFirst;
        newSpan1.classList.add('content__title');
        newDiv.appendChild(newSpan1);

        let nameLast = users.results[i].name.last;
        newSpan2.textContent = nameLast;
        newSpan2.classList.add('content__title');
        newDiv.appendChild(newSpan2);

    }
};

let openPopup = function(){

    let items = document.querySelectorAll('.content__item');
    let contentList = document.getElementById('contentList');

    contentList.onclick = function(event) {
        let li = event.target.closest('li');
        if (!li) return;

        let popup = document.querySelector('.content__popup');
        let itemTarget = event.target.closest('li');
        let item = itemTarget.cloneNode();
        item.classList.add('content__item');

        function showPopup(){
            let popup = document.querySelector('.content__popup');
            let windowHide = document.querySelector('.window-hide');
            popup.classList.add('visible');
            popup.classList.remove('hidden');
            windowHide.classList.add('visible');
            windowHide.classList.remove('hidden');
            popup.appendChild(item);

            let image = itemTarget.getElementsByTagName('img');
            let newImage = document.createElement('img');
            item.appendChild(newImage);

            let nameIs = itemTarget.getElementsByTagName('span');
            console.log(nameIs);

            for (let i=0; i<nameIs.length; i++) {
                let nameIsOne = nameIs[i].innerHTML;
                let newName = document.createElement('span');
                newName.textContent = nameIsOne;
                newName.classList.add('content__name');
                item.appendChild(newName);
            }

        }
        showPopup();

        function closePopup() {
            let closeButton = document.querySelector('.content__popup-close');
            let popup = document.querySelector('.content__popup');
            let windowHide = document.querySelector('.window-hide');
            closeButton.onclick = function() {
                popup.classList.add('hidden');
                popup.classList.remove('visible');
                windowHide.classList.add('hidden');
                windowHide.classList.remove('visible');
                popup.removeChild(item);

            }
        }
        closePopup();
    };
};



