document.addEventListener("DOMContentLoaded", function(){

/* Wyświetlanie menu */
  //Zapisz do tablicy elementy menu 1 poziomu
  var menuElements = document.querySelectorAll('.top-menu> ul > li');

  // Dodaj nasłuchowanie dla elemenów menu 1 poziomu
  for (var i = 0; i < menuElements.length; i++) {
    menuElements[i].addEventListener('mouseover', displaySubmenu);
    menuElements[i].addEventListener('mouseout', hideSubmenu);
  }

  // Wyswietla submenu
  function displaySubmenu(){
    var submenu = this.querySelector('ul');
    if (submenu !== null){
      submenu.classList.remove('hidden');
    }
  }
  // Ukrywa submenu
  function hideSubmenu(){
    var submenu = this.querySelector('ul');
    if (submenu !== null){
      submenu.classList.add('hidden');
    }
  }

/* Wyswietlanie slidera */
  var sliderActiveIndex = 0;
  var sliderArr = document.querySelectorAll('.slider');
  var sliderLastIndex = sliderArr.length - 1;

  // Dodaje animacje wjazdu slider
  // @keyframes slideFromLeft

  // Funkcja chowa aktualny slider i pokazuje poprzedni
  function moveLeft(){
    if (sliderActiveIndex === 0) {
      sliderArr[sliderActiveIndex].classList.add('hidden');
      sliderActiveIndex = sliderLastIndex;
      sliderArr[sliderActiveIndex].classList.remove('hidden');
      sliderArr[sliderActiveIndex].style.animation = 'slideInLeft 1s';
    } else {
      sliderArr[sliderActiveIndex].classList.add('hidden');
      sliderActiveIndex-- ;
      sliderArr[sliderActiveIndex].style.animation = 'slideInLeft 1s';
      sliderArr[sliderActiveIndex].classList.remove('hidden');
    }
  }

  // Funkcja chowa aktualny slider i pokazuje nastepny
  function moveRight(){
    if (sliderActiveIndex === sliderLastIndex) {
      sliderArr[sliderActiveIndex].classList.add('hidden');
      sliderActiveIndex = 0;
      sliderArr[sliderActiveIndex].style.animation = 'slideInRight 1s';
      sliderArr[sliderActiveIndex].classList.remove('hidden');
    } else {
      sliderArr[sliderActiveIndex].classList.add('hidden');
      sliderActiveIndex++ ;
      sliderArr[sliderActiveIndex].style.animation = 'slideInRight 1s';
      sliderArr[sliderActiveIndex].classList.remove('hidden');
    }
  }

  for (var i = 0; i < sliderArr.length; i++) {
    var leftArr = sliderArr[i].querySelector('.left-arrow');
    var rightArr = sliderArr[i].querySelector('.right-arrow');
    leftArr.addEventListener('click', moveLeft);
    rightArr.addEventListener('click', moveRight);
  }


/* Wyswietlanie paska z tytulem na blokach z obrazami*/
  // Znajduje bloki z obrazkami i chowa blok z nazwa  po janechaniu myszka
  function hideTitleBar(){
    var titleBar = this.querySelector('div.title-bar');
    titleBar.style.visibility = 'hidden';
  }
  function showTitleBar(){
    var titleBar = this.querySelector('div.title-bar');
    titleBar.style.visibility = 'visible';
  }

  var productNameBlock = document.querySelectorAll('.product-img');
  for (var i = 0; i < productNameBlock.length; i++) {
    productNameBlock[i].addEventListener('mouseover', hideTitleBar);
    productNameBlock[i].addEventListener('mouseout', showTitleBar);
  }

/* Walidacja formularza */
  //Odnajduje formularz
  var form = document.forms[0];

  // Sprawdza poprawnosc pol formularza
  function validate(e){

    e.preventDefault();
    // Tworzy zmienne inputow do zbadania
    var zgoda = form.elements.agreement;
    var zgodaDiv = zgoda.parentElement;
    var originalBorderColor = '#a4e1d1';
    var imie = form.elements.senderName;
    var mail = form.elements.email;
    var textBox = form.elements.message;
    var errorMsg = document.getElementById('errormsg');

    // Sprawdz warunki i wyświetl zmienna komunikat
    var komunikat = "";

    // Prosi o wypełnienie pola imię
    if (imie.value.length === 0) {
      komunikat += '<i class="fa fa-handshake-o fa-lg" aria-hidden="true"></i> &nbsp;&nbsp;Podaj swoje imię... miło jest wiedzieć, od kogo przyszła wiadomość<br>';
      imie.style.borderColor = 'red';
    } else {
      imie.style.borderColor = originalBorderColor;
    }

    //Prosi podanie poprawnego email'a
    if (mail.value.indexOf('@')===-1) {
      komunikat += '<i class="fa fa-envelope-o fa-lg" aria-hidden="true"></i> &nbsp;&nbsp;Podaj poprawny adres email (adres powinien zwierać @)<br>';
      mail.style.borderColor = 'red';
    } else {
      mail.style.borderColor = originalBorderColor;
    }

    //Prosi napisanie treści wiadomości
    if (textBox.value.length === 0) {
      komunikat += '<i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i> &nbsp;&nbsp;Wpisz treść wiadomości...przecież nie chcesz wysłać pustego maila :-)<br>';
      textBox.style.borderColor = 'red';
    } else {
      textBox.style.borderColor = originalBorderColor;
    }

    // Prosi o zanzacznie checkboxDiv ze zgodą na przetwarzanie danych
    if (zgoda.checked === false) {
      komunikat += '<i class="fa fa-check-square-o fa-lg" aria-hidden="true"></i> &nbsp;&nbsp;Zaznacz zgodę na przetwarzanie danych (wymagane)';
      zgodaDiv.style.borderColor = 'red';
    } else {
      zgodaDiv.style.borderColor = originalBorderColor;
    }

    // Jesli brak uwag do wyswietlenia wyslij formularz, w innym przypadku
    // wyswietle je w div errorMsg
    if (komunikat.length === 0) {
      errorMsg.innerHTML = komunikat;
      form.submit;
    } else {
      errorMsg.innerHTML = komunikat;
    }
  }

  // Odnajduje guzik Submit i przy kliknieciu wywoluje validate()
  var submitButton = form.elements.submitBtt;
  submitButton.addEventListener('click', validate);

  // Sprawdza stan checkboxa i zmienia na przeciwny, styluje checkboxDiv
  function changeCheckboxState(){
    // Odnajduje ukryty checkbox zgody na przetwarzanie danych
    var checkboxInput = this.querySelector('#agreement');

    // Zmienia stan checkboxa na przeciwny
    checkboxInput.checked = !checkboxInput.checked;

    // Zmienia klase checkboxDiv na odznaczony lub nie (.unchecked) i ukrywa lub pokazuje "ptaszka" w zaleznosci od stanu ukrytego chackboxa
    if (checkboxInput.checked) {
      this.classList.remove('unchecked');
    } else {
      this.classList.add('unchecked');
    }
  }

  // Odnajduje checkboxDiv i przy kliknieciu wywoluje changeCheckboxState
  var checkboxDiv = document.querySelector('div.checkbox');
  checkboxDiv.addEventListener('click', changeCheckboxState);

});
