window.onload = function(){
    getInfo();
    openPopup();
    /*sort();*/
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
        let newItem = document.createElement('li');
        let newImg = document.createElement('img');
        let newDiv = document.createElement('div');
        let newSpan = document.createElement('span');
        let newSpan1 = document.createElement('span');
        let newSpan2 = document.createElement('span');

        let myList = document.getElementById('contentList');
        newItem.classList.add('content__item');

        /*Блок записи данных как data-атрибутов*/
        let dataName = users.results[i].name.first;
        let dataSrcImgLg = users.results[i].picture.large;
        let dataStreet = users.results[i].location.street;
        let dataCity = users.results[i].location.city;
        let dataState = users.results[i].location.state;
        let dataEmail = users.results[i].email;
        let dataPhone = users.results[i].phone;     //считываем телефон как дата атрибут
        /*Конец блока*/

        /*Блок добавления data-атрибутов к элементам списка*/
        newItem.setAttribute('dataName', dataName);
        newItem.setAttribute('dataSrcImgLg', dataSrcImgLg);
        newItem.setAttribute('dataStreet', dataStreet);
        newItem.setAttribute('dataCity', dataCity);
        newItem.setAttribute('dataState', dataState);
        newItem.setAttribute('dataEmail', dataEmail);
        newItem.setAttribute('dataPhone', dataPhone);  // присваиваем каждому элементу списка id в виде атрибута
        /*Конец блока*/

        newDiv.classList.add('content__name');
        myList.appendChild(newItem);

        let srcNewImg = users.results[i].picture.medium;
        newItem.appendChild(newImg);
        newImg.src = srcNewImg;
        newImg.classList.add('content__img');

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

        let itemTarget = event.target.closest('li');    //выбираем элемент, по которому был совершен клик

        let item = itemTarget.cloneNode();
        item.classList.add('content__item','content__item--widthLow','content__item--bcgWhite');

        function showPopup(){
            /* Блок создания новых элементов */
            let setDiv = document.createElement('div');
            let setImage = document.createElement('img');
            let setSpan = document.createElement('span');
            let setSpan1 = document.createElement('span');
            let setSpan2 = document.createElement('span');
            let setSpan3 = document.createElement('span');
            /* Конец блока */

            /* Блок дбавления информации в popup-окно */
                setImage.src = item.getAttribute('dataSrcImgLg'); //адрес картинки
                item.appendChild(setImage);
                setImage.classList.add('content__img');

                item.appendChild(setDiv);
                setDiv.classList.add('content__userInfo');

                let nameIs = itemTarget.getElementsByTagName('span');
                console.log(nameIs);

                for (let i=0; i<nameIs.length; i++) {
                    let nameIsOne = nameIs[i].innerHTML;
                    let newName = document.createElement('span');
                    newName.textContent = nameIsOne;
                    newName.classList.add('content__span','content__span--inline');
                    setDiv.appendChild(newName);
                }

                setSpan.innerHTML = 'Телефон: ' + item.getAttribute('dataPhone'); //телефон
                setSpan.classList.add('content__span','content__span--nonMargin');
                setDiv.appendChild(setSpan);

                setSpan1.innerHTML = 'Штат: ' + item.getAttribute('dataState'); //ттат
                setSpan1.classList.add('content__span','content__span--nonMargin');
                setDiv.appendChild(setSpan1);

                setSpan2.innerHTML = 'Город: ' + item.getAttribute('dataCity'); //город
                setSpan2.classList.add('content__span','content__span--nonMargin');
                setDiv.appendChild(setSpan2);

                setSpan3.innerHTML = 'Улица: ' + item.getAttribute('dataStreet'); //улица
                setSpan3.classList.add('content__span','content__span--nonMargin');
                setDiv.appendChild(setSpan3);
            /* Конец блока */

            let popup = document.querySelector('.content__popup');
            let windowHide = document.querySelector('.window-hide');

            popup.classList.add('visible');
            popup.classList.remove('hidden');
            windowHide.classList.add('visible');
            windowHide.classList.remove('hidden');

            popup.appendChild(item);
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

/*let sort = function() {
    let button = document.querySelector('.btn-sorted');
    button.onclick = function(){

        let items = document.querySelectorAll('.content__item');
        let names=[];
        for (let i=0; i<items.length; i++) {
            names = items[i].getAttribute('dataName');
            names.sort();
        }
    }
};*/



