//! farklı dosyalardan gelen veriler
import { setStorage, getStorage, icons, userIcon } from "./helpers.js";

//! html elemanlarını çagırma
const form = document.querySelector("form");
const noteList = document.querySelector("ul");

//! global degiskenler
var map;
var coords;
var notes = getStorage() || [];
var markerLayer = [];

//haritayı ekrana basan fonksiyon
function loadMap(coords) {
  map = L.map("map").setView(coords, 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //imleçleri tutacagmız ayrı bir katman olusturma
  markerLayer = L.layerGroup().addTo(map);

  // kullanıcının konumuna imleç bas
  L.marker(coords, { icon: userIcon }).addTo(map);

  // lokalden gelen verileri ekrana bas
  renderNoteList(notes);

  //haritadaki tıklanma olaylarını izle
  map.on("click", onMapClick);
}

// iptal butonuna tıklanırsa formu temizle ve kapat
form[3].addEventListener("click", () => {
  //formu temizle
  form.reset();
  // formu kapat
  form.style.display = "none";
});

//form gönderilirse yeni bir not olustur ve storage a kaydet
form.addEventListener("submit", (e) => {
  // 1) yenilemeyi engeller
  e.preventDefault();

  // 2) inputlardaki verilerden bir note objesi olustur
  const newNote = {
    id: new Date().getTime(),
    title: form[0].value,
    date: form[1].value,
    status: form[2].value,
    coords: coords,
  };

  // 3) dizinin başına yeni notu ekle
  notes.unshift(newNote);

  // 4) note ları ekrana bas
  renderNoteList(notes);

  // 5) local storage güncelle
  setStorage(notes);

  // 6) formu kapat
  form.style.display = "none";
  form.reset();
});

//not için imleç katmanına yeni bir imleç ekler
function renderMarker(note) {
  //imleç olustur
  L.marker(note.coords, { icon: icons[note.status] })
    //imleci katmana ekle
    .addTo(markerLayer)
    .bindPopup(note.title);
}

// ekrana notları basar
function renderNoteList(items) {
  //önceden eklenen elemanları temizle
  noteList.innerHTML = ``;
  markerLayer.clearLayers();
  //dizideki her bir obje için note kartı bas
  items.forEach((note) => {
    //li elemanı olustur
    const listEle = document.createElement("li");

    // data-id ekleme
    listEle.dataset.id = note.id;

    //içerigini belirle
    listEle.innerHTML = `
      <div class="info">
      <p>${note.title}</p>
      <p>
        <span>Tarih:</span>
        <span>${note.date}</span>
      </p>
      <p>
        <span>Durum:</span>
        <span>${note.status}</span>
      </p>
    </div>
    <div class="icons">
      <i id="fly" class="bi bi-airplane-fill"></i>
      <i id="delete" class="bi bi-trash3-fill"></i>
    </div>
    `;
    //elemanı listeye ekle
    noteList.appendChild(listEle);

    //elemanı haritaya ekle
    renderMarker(note);
  });
}

//kullanıcının konumunu alma
navigator.geolocation.getCurrentPosition(
  //konumu alırsa haritayı kullanıcının konumuna göre yukler
  (e) => {
    loadMap([e.coords.latitude, e.coords.longitude]);
  },
  // konumu alamazsa varsayılan olarak ankarada baslatır
  () => {
    loadMap([39.953925, 32.858552]);
  }
);

// haritadaki tıklanma olaylarında çalısır
function onMapClick(event) {
  //tıklanan yerin konumuna erişip global degisken aktardık
  coords = [event.latlng.lat, event.latlng.lng];

  //formu göster
  form.style.display = "flex";

  //ilk inputu odaklar
  form[0].focus();
}

// silme ve uçuş
noteList.addEventListener("click", (e) => {
  // tıklanılan elemanın id sine erişme
  const found_id = e.target.closest("li").dataset.id;

  if (
    e.target.id === "delete" &&
    confirm("Silme işlemini onaylıyor musunuz?")
  ) {
    // id sini bildiğimiz elmanı diziden çıkart
    notes = notes.filter((note) => note.id != found_id);

    // lokali güncelle
    setStorage(notes);

    // ekranı güncelle
    renderNoteList(notes);
  }

  if (e.target.id === "fly") {
    // id'sini bildiğimiz elmanı dizideki haline erişme
    const note = notes.find((note) => note.id == found_id);

    // not'un kordinatlarına git
    map.flyTo(note.coords);
  }
});
