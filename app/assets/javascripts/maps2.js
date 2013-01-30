

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
      
  //     map.overlayMapTypes.insertAt(0, layer);
  //     layer.infowindow = {};
  //     layer.infowindow['template'] = $('#infowindow_template').html();
  //     addClickBehavior(layer);
  //   });
  // }

  function initializeMap() {
    cartodb.createVis('map_canvas',"http://danavery.cartodb.com/api/v1/viz/17246/viz.json")
    .done(function(vis, layers) {
      setupLayer(layers[1]);
      addClickBehavior(layers[1]);
     
      //layers[1].setCartoCSS("#{{table_name}}{ marker-allow-overlap: true }");
    })
  }

function setupLayer(layer) {
   layer.on('error', function(err) { console.log(err); });
    //layer.setCartoCSS("#{{table_name}}{ marker-fill:blue; }");
    
    // layer.setCartoCSS("#{{table_name}}{ marker-fill:blue }");
    // layer.hide();
    // layer.show();
    layer.infowindow.set('template', $('#infowindow_template').html());

  console.log(layer);
}
  // function initializeMap() {
  //   map = new L.map('cartodb-map', {
  //     center: [41.073056, -81.517778],
  //     zoom: 10
  //   });
  //   L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
  //     attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
  //   }).addTo(map);
  // }

  function addClickBehavior(layer) {
    var $activities = $('.activitybutton');
    console.log("ab");
    console.log($activities);
    $activities.click(function (e) {
      var targetId = e.target.id;
      var labelId = $(e.target).parent().attr("id");
      console.log("lid: " + labelId);
      var activityName = labelId;
      activityName = activityName.replace("_", " ");
      console.log("an " + activityName);
      if ($("#" + activityName).hasClass("selected")) {
        $("#" + activityName).addClass("unselected").removeClass("selected");
        delete currentActivities[activityName];
      }
      else {
        $("#" + activityName).removeClass("unselected").addClass("selected");
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
    //console.log(layer);



  }
  
  
  var currentActivities = {};
 

  var map = initializeMap();
});  
