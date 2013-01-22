// $(function () {

//   function toggleActivity(event) {
//     console.log("toggleActivity");
//     //get activityAreas object
//     var activityAreas = event.data.activityAreas;
//     var selectedActivity = event.data.activityAreas.activity;
//     var placeArray = activityAreas.placeArray;
//     var targetId = event.target.id;

//     if ( activitiesOnMap[selectedActivity] === 1) {
//       // decrement markersOnMap for each place
//       $("#" + targetId).addClass("unselected").removeClass("selected");
//       $.each(placeArray, function(index, place) {
//         decrementMarkerOnMap(place);
//       });
//       activitiesOnMap[selectedActivity] = 0;
//     }
//     else {
//       // increment markersOnMap for each place
//       $("#" + targetId).addClass("selected").removeClass("unselected");
//       $.each(placeArray, function(index, place) {
//         incrementMarkerOnMap(place);
//       });
//       activitiesOnMap[selectedActivity] = 1;

//     }
//     updateMarkers(activitiesOnMap);
//   }

//   function updateMarkers(myActivitiesOnMap) {
//        //spin through markersOnMap
//     //set map for markers with a count attribute equal to getNumActivitiesSelected
//     //set map to null for others
//     var numActivities = getNumActivitiesSelected(myActivitiesOnMap);
//     $.each(markersOnMap, function(index, markerRecord) {
//       //console.log(markerRecord);
//       if (markerRecord["count"] === numActivities) {
//         markerRecord["marker"].setMap(map);
//       }
//       else {
//         markerRecord["marker"].setMap(null);
//       }
//     });
//   }


//   function getNumActivitiesSelected(myActivitiesOnMap) {
//     var numActivities = 0;
//     $.each(myActivitiesOnMap, function(index, activity) {
//       if (activity === 1) {
//         numActivities += 1;
//       } 
//     })
//     return numActivities;
//   }

//   function incrementMarkerOnMap(place) {
//     console.log("incrementMarkerOnMap start");
//     console.log(markersOnMap);

//     var placeId = place.placeId;
//     console.log("adding: " + placeId);
//     if (typeof markersOnMap[placeId] === 'undefined') { 

//       var newMarker = makeMarkerForPlace(place);
//       //newMarker.setMap(map);
//       markersOnMap[placeId] = {};

//       markersOnMap[placeId]["marker"] = newMarker;
//       markersOnMap[placeId]["marker"].setMap(map);
//       markersOnMap[placeId]["count"] = 0;
//     }
//     markersOnMap[placeId]["count"] = markersOnMap[placeId]["count"] + 1;
//     console.log("count: " + markersOnMap[placeId]["count"]);
//     console.log(markersOnMap[placeId]["count"]);
//     console.log(markersOnMap);
//     console.log("incrementMarkerOnMap end\n\n");


//   }

//   function decrementMarkerOnMap(place) {
//     console.log("decrementMarkerOnMap start");
//     console.log(markersOnMap);

//     var placeId = place.placeId;
//     console.log("removing: " + placeId);
//     markersOnMap[placeId]["count"] = markersOnMap[placeId]["count"] - 1;
//     console.log("count: " + markersOnMap[placeId]["count"]);
//     if (markersOnMap[placeId]["count"] === 0) {
//       markersOnMap[placeId]["marker"].setMap(null);
//       delete markersOnMap[placeId];
//     }

//     console.log(markersOnMap);
//     console.log("decrementMarkerOnMap end\n\n");

//   }

//   function makeMarkerForPlace(place) {
//     var lat = place.coordinates[0];
//     var lng = place.coordinates[1];

//     var latlng = new google.maps.LatLng(lat,lng);
//     var marker = new google.maps.Marker({ position: latlng, 
//      title: place.placeName });
//     var infowindow = new google.maps.InfoWindow( {
//       content: place.placeName
//     });
//     google.maps.event.addListener(marker, 'click', function() {
//       infowindow.open(map, marker);
//     });
//     return marker;
//   }

//   function initializeMap() {
//     var latlng = new google.maps.LatLng(41.073056, -81.517778);
//     var myOptions = {
//       zoom: 10,
//       center: latlng,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     };
//     var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

//     $('#hiking').click({ activityAreas: hikingAreas }, toggleActivity);
//     $('#swimming').click( { activityAreas: swimmingAreas }, toggleActivity);
//     $('#sledding').click( { activityAreas: sleddingAreas }, toggleActivity);

//     return map;
//   }

//   // these will be returned from the server, for now hard-coded
//   var hikingAreas = {activity: "hiking", 
//   placeArray: [
//   {
//     placeId: 11,
//     placeName: "Munroe Falls Metro Park - Tallmadge Meadows Area",
//     coordinates: [41.123856,-81.440063]
//   },
//   { 
//     placeId: 12,
//     placeName: "Silver Creek Metro Park - Boathouse",
//     coordinates: [40.996475,-81.688293]
//   } 
//   ]
// };
// var swimmingAreas = {activity: "swimming", 
// placeArray: [
// {
//   placeId: 13,
//   placeName: "swimmin' hole",
//   coordinates: [41.087399,-81.518387]
// },
// { 
//   placeId: 12,
//   placeName: "Silver Creek Metro Park - Boathouse",
//   coordinates: [40.996475,-81.688293]
// }, 
// { placeId: 14,
//   placeName: "Munroe Falls Metro Park - Lake Area",
//   coordinates: [41.134647, -81.420364]
// },
// { placeId: 15,
//   placeName: "Silver Creek Metro Park - Bathhouse &amp; Pheasant Run Area",
//   coordinates: [40.997715,-81.667984]
// }
// ]
// };
// var sleddingAreas = { activity: "sledding",
// placeArray: [
// {
//   placeId: 16,
//   placeName: "Sand Run Metro Park - North Hawkins Area",
//   coordinates: [41.129646,-81.567017]
// },
// {
//   placeId: 17,
//   placeName: "Liberty Park - Recreation Area",
//   coordinates: [41.317699,-81.419205]
// }
// ]
// };

//   //hash keyed on placeID
//   var markersOnMap = {};

//   //hash keyed on activity name
//   var activitiesOnMap = {};
//   var map = initializeMap();
// });

