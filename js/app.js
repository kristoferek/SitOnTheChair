document.addEventListener("DOMContentLoaded", function(){


  //Zapisz do tablicy elementy menu 1 poziomu
  var menuElements = document.querySelectorAll('.top-menu> ul > li');
  console.log(menuElements);

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

    // Prosi o zanzacznie checkboxDiv ze zgodą na przetwarzanie danch
    if (zgoda.checked === false) {
      komunikat += '<i class="fa fa-check-square-o fa-lg" aria-hidden="true"></i> &nbsp;&nbsp;Zaznacz zgodę na przetwarzanie danych (wymagane)';
      zgodaDiv.style.borderColor = 'red';
    } else {
      zgodaDiv.style.borderColor = originalBorderColor;
    }

    // Jesli brak uwag do wyswietlenia wyslij formularz, w innym przypadku
    // wyswietle je w div errorMsg
    if (komunikat.length === 0) {
      form.submit();
    } else {
      errorMsg.innerHTML = komunikat;
    }
  }

  // Odnajduje guzik Submit i przy kliknieciu wywoluje validate()
  var submitButton = form.elements.submitBtt;
  console.log(submitButton);
  submitButton.addEventListener('click', validate);


  // Sprawdza stan checkboxa i zmienia na przeciwny, styluje checkboxDiv
  function changeCheckboxState(){
    // Odnajduje ukryty checkbox zgody na przetwarzanie danych
    var checkboxInput = this.querySelector('#agreement');
    // Zmienia stan checkboxa na przeciwny
    checkboxInput.checked = !checkboxInput.checked;
    // Zmienia klase checkboxDiv na zaznaczony lub odznaczony (.unchecked)
    // w zaleznosci od stanu ukrytego chackboxa
    if (checkboxInput.checked) {
      this.classList.remove('unchecked');
    } else {
      this.classList.add('unchecked');
    }
  }

  // Definiuje zmienna checkboxDiv i przy kliknieciu wywoluje changeCheckboxState
  var checkboxDiv = document.querySelector('div.checkbox');
  console.log(checkboxDiv);
  checkboxDiv.addEventListener('click', changeCheckboxState);

});
