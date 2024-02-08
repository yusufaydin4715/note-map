// lokalden parametre oalrak gelen elmanı alır
export const getStorage = () => {
  // lokalden key ile eşleşen veriyi alma
  const strData = localStorage.getItem("notes");

  // gelen string veriyi js verisine çevir ve döndür
  return JSON.parse(strData);
};

// lokale parametre olarak gelen elemanı kaydeder
export const setStorage = (data) => {
  // stringe çevir
  const strData = JSON.stringify(data);

  // lokale kaydet
  localStorage.setItem("notes", strData);
};

// ICON LAR
export var userIcon = L.icon({
  iconUrl: "/images/Person.png",
  iconSize: [50, 50],
  popupAnchor: [0, -20],
  shadowUrl: "/images/my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [30, 34],
});

var homeIcon = L.icon({
  iconUrl: "/images/Home_8.png",
  iconSize: [70, 75],
  popupAnchor: [0, -20],
  shadowUrl: "/images/my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [30, 34],
});

var businessIcon = L.icon({
  iconUrl: "/images/Briefcase_8.png",
  iconSize: [70, 75],
  popupAnchor: [0, -20],
  shadowUrl: "/images/my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [30, 34],
});

var visitIcon = L.icon({
  iconUrl: "/images/Aeroplane_8.png",
  iconSize: [70, 75],
  popupAnchor: [0, -20],
  shadowUrl: "/images/my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [30, 34],
});

var parkIcon = L.icon({
  iconUrl: "/images/Parking_8.png",
  iconSize: [70, 75],
  popupAnchor: [0, -20],
  shadowUrl: "/images/my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [30, 34],
});

//
export const icons = {
  visit: visitIcon,
  home: homeIcon,
  business: businessIcon,
  park: parkIcon,
};
