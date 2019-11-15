
let MAPKEY = "AIzaSyBWwmbbG3OOp2vp6YDweXFWrCD79fOc5aw";
let map;


document.addEventListener("DOMContentLoaded", () => {
    let s = document.createElement("script");

    document.head.appendChild(s);


    s.addEventListener("load", () => {

        if (navigator.geolocation) {
            let giveUp = 1000 * 30;  //30 seconds
            let tooOld = 1000 * 60 * 60;  //1 hour
            options = {
                enableHighAccuracy: true,
                timeout: giveUp,
                maximumAge: tooOld
            }

            navigator.geolocation.getCurrentPosition(function (position) {

                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map = new google.maps.Map(document.getElementById("map"), {
                    center: pos,
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                    
                });

                //show message
                // let infoWindow = new google.maps.InfoWindow;
                // infoWindow.setPosition(pos);
                // infoWindow.setContent('You are here');
                // infoWindow.open(map);

                let marker = new google.maps.Marker({position: pos, label: "You are here!"});
               
                marker.setMap(map);

                //fomatted address
                displayAddress(pos);

            }, function (err) {
                let errors = {
                    //err is a number
                    1: 'No permission',
                    2: 'Unable to determine',
                    3: 'Took too long'
                }
                document.querySelector('h1').textContent = errors[err];
            }, options);
        } else {
            //using an old browser that doesn't support geolocation
        }


    });
    s.src = `https://maps.googleapis.com/maps/api/js?key=${MAPKEY}`;
   
});

function displayAddress(pos){
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${MAPKEY}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let parts = data.results[0].address_components;
          let divAddr=document.querySelector('#divAddr');
          divAddr.insertAdjacentHTML(
            "beforeend",
            `<p>Formatted_Address: ${data.results[0].formatted_address}</p>`
          );
     
        })
        .catch(err => console.warn(err.message));
}
