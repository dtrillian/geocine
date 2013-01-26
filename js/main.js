//In order to display the menu
document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("body > section > header > a").addEventListener("click", function(){
        var region = document.querySelector("body > section");

        if ( region.getAttribute("data-state") == "drawer" ) {
          region.setAttribute("data-state", "none");

        } else {
          region.setAttribute("data-state", "drawer");
        }

    });

});

$(function(){
    $(document).on('click', '#mapClick', function(){
        $('#theaters').hide();
        $('#movies').hide();
        $('#about').hide();
        $('#map').show();
        $('#openPanel').click();

    });

    $('#theatersClick').on('click', function(){
        $('#theaters').show();
        $('#movies').hide();
        $('#about').hide();
        $("#map").hide();
        $('#openPanel').click();
    });

    $('#moviesClick').on('click', function(){
        $('#theaters').hide();
        $('#movies').show();
        $('#about').hide();
        $("#map").hide();
        $('#openPanel').click();
    });

    $('#aboutClick').on('click', function(){
        $('#theaters').hide();
        $('#movies').hide();
        $('#about').show();
        $("#map").hide();
        $('#openPanel').click();
    });
/*
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var altitude = position.coords.altitude;
            //document.getElementById('geolocation').innerHTML = 'latitude : ' + latitude + '<br />' + 'longitude : ' + longitude + '<br />' + 'altitude : ' + altitude + '<br />';

            getSalles_list(latitude,longitude);

        });
    }else{
        // Pas de geoloc => on choisit une position par défaut
        var  latitude=48.8151684;
        var longitude=2.3635036;

        getSalles_list(latitude,longitude);

    }
*/
    getFilms();


    

});
    function getSalles_list(latitude,longitude) {
        var urlWsAllocine="http://api.allocine.fr/rest/v3/theaterlist?partner=YW5kcm9pZC12M3M&count=25&page=1&lat="+latitude+"&long="+longitude+"&format=json";
        var script = document.createElement('script');
        script.src = urlWsAllocine + '&callback=getSallesListCallback';
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function getFilms() {
        var urlWsAllocine="http://api.allocine.fr/rest/v3/movielist?partner=YW5kcm9pZC12M3M&count=25&filter=nowshowing&page=1&order=theatercount&format=json";
        var script = document.createElement('script');
        script.src = urlWsAllocine + '&callback=getFilmsCallback';
        document.getElementsByTagName('head')[0].appendChild(script);
    };

function getSallesListCallback(data) {
        //alert(data.feed.totalResults);
        var i=1;
        for each(salle in data.feed.theater) {
            //alert("> "+salle.name);

            if(salle.picture!=undefined) {
                $('#theaters ul').append(
                    "<li>\
                      <img src='"+salle.picture.href+"'>\
                      <dl>\
                        <dt>"+salle.name+"</dt>\
                        <dd>\
                          <span>"+salle.distance+" km</span>\
                        </dd>\
                      </dl>\
                    </li>"
                );
                console.log("PROUT" + salle.name);
            }

            i++;
            if (i>25) break;
        }
    }


function getFilmsCallback(data) {
        //alert(data.feed.totalResults);
        var i=1;
        for each(film in data.feed.movie) {
            //alert("> "+salle.name);

            if(film.poster!='undefined') {
                $('#movies ul').append(
                    "<li>\
                      <img src='"+film.poster.href+"'>\
                      <dl>\
                        <dt>"+film.title+"</dt>\
                        <dd>\
                          <span>Presse: "+film.statistics.pressRating+"/5 - Public:"+film.statistics.userRating+"/5</span>\
                        </dd>\
                      </dl>\
                    </li>"
                );
                console.log("PROUT" + film.title);
            }

            i++;
            if (i>25) break;
        }
    }

    function getSalles(latitude,longitude) {
	var urlWsAllocine="http://api.allocine.fr/rest/v3/theaterlist?partner=YW5kcm9pZC12M3M&count=25&page=1&lat="+latitude+"&long="+longitude+"&format=json";
	var script = document.createElement('script');
	script.src = urlWsAllocine + '&callback=getSallesCallback';
	document.getElementsByTagName('head')[0].appendChild(script);
}

function getSallesCallback(data) {
	//alert(data.feed.totalResults);
	var i=1;
	for each(salle in data. feed.theater) {
		//alert("> "+salle.name);
		var myMarkerLatLng = new CM.LatLng(salle.geoloc.lat,salle.geoloc.long);
		var myMarker = new CM.Marker(myMarkerLatLng, { title: salle.name , icon:pincinema_icon});

		if(salle.picture!==undefined) {
			myMarker.bindInfoWindow(
			"<div style='text-align:center'><strong style='font-size:1.1em;'>"+salle.name+"</strong><br />" + 
			"<img style='width:100%' src='"+salle.picture.href+"'><br />" + 
			"<p>"+salle.address+"<br />"+salle.postalCode+" "+salle.city+"</p>"+
			"<p><a href='#"+salle.code+"'>Voir les films diffusés dans cette salle</a></p></div>");
		}else{
			// Pas d'image
			myMarker.bindInfoWindow(
			"<div style='text-align:center'><strong style='font-size:1.1em;'>"+salle.name+"</strong><br />" + 
			"<p>"+salle.address+"<br />"+salle.postalCode+" "+salle.city+"</p>"+
			"<p><a href='#"+salle.code+"'>Voir les films diffusés dans cette salle</a></p></div>");
		}
		map.addOverlay(myMarker);

		i++;
		if (i>25) break;
	}
}


if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(function(position){
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var altitude = position.coords.altitude;
		//document.getElementById('geolocation').innerHTML = 'latitude : ' + latitude + '<br />' + 'longitude : ' + longitude + '<br />' + 'altitude : ' + altitude + '<br />';

		var myMarkerLatLng = new CM.LatLng(latitude,longitude);
		var myMarker = new CM.Marker(myMarkerLatLng, {
			title: "Ma position" , icon:maposition_icon
		});

		myMarker.bindInfoWindow(
		"<div style='text-align:center'><em>Vous êtes ici !</em></div>");


		map.setCenter(myMarkerLatLng, 13);
		map.addOverlay(myMarker);

		getSalles(latitude,longitude);
		getSalles_list(latitude,longitude);


	});
}else{
	// Pas de geoloc => on choisit une position par défaut
	var  latitude=48.8151684;
	var longitude=2.3635036;
	var myMarkerLatLng = new CM.LatLng(latitude,longitude);
	var myMarker = new CM.Marker(myMarkerLatLng, {
		title: "Ma position" , icon:maposition_icon
	});

	map.setCenter(myMarkerLatLng, 13);
	map.addOverlay(myMarker);

	getSalles(latitude,longitude);
	getSalles_list(latitude,longitude);
}


