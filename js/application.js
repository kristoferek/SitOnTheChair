document.addEventListener("DOMContentLoaded", function(){

/* Obsługa chowania i pokazywania list rozwijanych drop_down_list */

  var application = document.querySelector('.application');
  var dropLists = application.querySelectorAll('.drop_down_list');
  var transportChoice = application.querySelector('input#transport');

  // Chowanie wszystkich list
  function hideAllLists(){
    for (var i = 0; i < dropLists.length; i++) {
      dropLists[i].querySelector('.list_panel').style.display = "none";
    }
  }
  // Rozwijanie i zwijanie listy przy kliknięciu
  function showHideList() {
    var activeList = this.parentElement.querySelector('.list_panel')
    // Jezeli lista sie wyswietla, ukryj ja
    if (activeList.style.display == 'block'){
      activeList.style.display = 'none'
    // Jezeli lista jest ukryta, to ukryj inne listy i wyswietl aktualna
  } else {
      hideAllLists();
      activeList.style.display = 'block';
    }
  }

  // Klikniecie strzalki wywoluje funkcje pokazania lub ukrycia listy
  // Wszystkie listy dostaja dataset choice="" i choicePrice=""
  for (var i = 0; i < dropLists.length; i++) {
    dropLists[i].querySelector('.list_arrow').addEventListener('click', showHideList);
    dropLists[i].dataset.choice = "";
    dropLists[i].dataset.choicePrice = "";
  }

/* Obsluga aktualizacji pol dataset w listach i checkboxie */

  // Funkcja aktualizujca dataset choice i choicePrice listy do dalszego wykorzystania przez funkcje updateSummary
  function makeChoice(){
    // Aktualizuje dataset choice i choicePrice swojej listy wartoscia z listy
    this.parentElement.parentElement.dataset.choice = this.innerText;
    this.parentElement.parentElement.dataset.choicePrice = this.dataset.price;
    // Wpisuje i styluje wybrany z listy tekst do pola drop_down_list
    this.parentElement.parentElement.querySelector('.list_label').innerText = this.innerText;
    this.parentElement.parentElement.querySelector('.list_label').style.color = "#24baa0";
    // Po kliknieciu chowa rozwinieta liste
    hideAllLists();
  }

  // Funkcja do sumowania cen z pol dataset list i checkboxa
  function suma(){
    var suma = 0;
    for (var i = 0; i < arguments.length; i++) {
      suma += Number(arguments[i]);
    }
    return suma;
  }

  // Funkcja aktualizujaca pola summary_panel
  function updateSummary(){

    // Zanjduje pola do wypelnienia w summary_panel
    var chairDsc = application.querySelector('.title');
    var colorDsc = application.querySelector('.color');
    var patternDsc = application.querySelector('.pattern');
    var transportDsc = application.querySelector('.transport');

    var chairPrice = application.querySelector('.title.value');
    var colorPrice = application.querySelector('.color.value');
    var patternPrice = application.querySelector('.pattern.value');
    var transportPrice = application.querySelector('.transport.value');
    var sum = application.querySelector('.sum strong');

    // Wyswietla w summary_panel wartosci z list rozwijanych
    chairDsc.innerText = dropLists[0].dataset.choice;
    chairPrice.innerText = dropLists[0].dataset.choicePrice;
    colorDsc.innerText = dropLists[1].dataset.choice;
    colorPrice.innerText = dropLists[1].dataset.choicePrice;
    patternDsc.innerText = dropLists[2].dataset.choice;
    patternPrice.innerText = dropLists[2].dataset.choicePrice;

    // Wyswietla transport i cene w zaleznosci od stanu checkboxa
    if (transportChoice.checked) {
    transportDsc.innerText = transportChoice.id;
    transportPrice.innerText = transportChoice.dataset.transportPrice;
    } else {
    transportDsc.innerText = "";
    transportPrice.innerText = "";
    }

    // Wpisuje w summary_panel sume pol
    sum.innerText = suma(chairPrice.innerText, colorPrice.innerText, patternPrice.innerText, transportPrice.innerText);
  }

  // Wszystkie pola list przy kliknieciu wywoluja funkcje makeChoice i updateSummary
  var listFields = application.querySelectorAll('.list_panel li');
  for (var i = 0; i < listFields.length; i++) {
    listFields[i].addEventListener('click', makeChoice);
    listFields[i].addEventListener('click', updateSummary);
  }
  // Kliknięcie checkboxa Transport wywoluje funkcje updateSummary
    transportChoice.addEventListener('click', updateSummary);

/* Obsluga zmieniajacych sie obrazkow */

  // Funkcja zmieniajaca wyswietlany obrazek z zaleznoci od wybranego z pierwszej listy krzesla
  function updatePicture(){
    var image = application.querySelector('.image_part img');
    console.log(this.innerText);
    switch (this.innerText) {
      case 'Selena':
        image.src="images/orange.png";
        break;
      case 'Margarita':
        image.src="images/black_chair.png";
        break;
      default:
        image.src="images/red.png";
        break;
    }
    console.log(image);
  }

  // Klikniecie na dowolny element pierwszej listy wywoluje funkcje updatePicture
  var listFieldsChair = dropLists[0].querySelectorAll('li');
  for (var i = 0; i < listFieldsChair.length; i++) {
    listFieldsChair[i].addEventListener('click', updatePicture);
  }

});
