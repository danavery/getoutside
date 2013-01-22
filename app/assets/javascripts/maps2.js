$(function () {

  // function initializeMap() {

  //   var latlng = new google.maps.LatLng(41.073056, -81.517778);
  //   var mapOptions = {
  //     zoom: 10,
  //     center: latlng,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    
  //   cartodb.createLayer(map, {
  //     type: 'cartodb',
  //     options: {
  //      table: 'locations',
  //      user_name: 'danavery',
  //      query: 'select * from locations'
  //     }
  //   }).done(function(layer) { 
  //     console.log(layer);
  //     map.overlayMapTypes.setAt(0, layer);
  //     addClickBehavior(layer);
  //   });
  // }

  function initializeMap() {
    cartodb.createVis('map_canvas',"http://danavery.cartodb.com/api/v1/viz/17246/viz.json")
    .done(function(vis, layers) {
      addClickBehavior(layers[1]);
    })
  }

  function addClickBehavior(layer) {
    var $activities = $('.activitybutton');
    $activities.click(function (e) {
      var targetId = e.target.id;
      var activityName = targetId.replace("_", " ");
      console.log(activityName);
      if ($("#" + targetId).hasClass("selected")) {
        $("#" + targetId).addClass("unselected").removeClass("selected");
        delete currentActivities[activityName];
      }
      else {
        $("#" + targetId).removeClass("unselected").addClass("selected");
        currentActivities[activityName] = 1;
      }
      console.log(currentActivities);
      updateLayer(layer);
    })

  }

  function updateLayer(layer) {
    activityString = "";
    activityArray = [];
    for (var a in currentActivities) {
      activityArray.push("'" + a + "'");
    }
    if (activityArray.length > 0) {
    activityString = activityArray.join(",");
    query = "SELECT * FROM locations where locations.place_id in ";
    query = query +  "(select place_id from activities where activity in ";
    query = query + "(" + activityString + ") ";
    query = query + "group by place_id ";
    query = query + "having count(*) = " + activityArray.length + ")";
    }
    else {
      query = "select * from locations";
    }
    layer.setQuery(query);
  }
  
  
  var currentActivities = {};
 

  var map = initializeMap();
});  
