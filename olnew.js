var pureCoverage = false;
      // if this is just a coverage or a group of them, disable a few items,
      // and default to jpeg format
      var format = 'image/png';
	  var bounds = [0,0,100.46409628823464,-0.8073448771592638];
   //var centers = ol.proj.transform([100.30217175557286, -1.0494630451740992], 'EPSG:4326', 'EPSG:3857');
   
      if (pureCoverage) {
        document.getElementById('filterType').disabled = true;
        document.getElementById('filter').disabled = true;
		//document.getElementById('filter1').disabled = true;
		document.getElementById('antialiasSelector').disabled = true;
        document.getElementById('updateFilterButton').disabled = true;
        document.getElementById('resetFilterButton').disabled = true;
        document.getElementById('jpeg').selected = true;
        format = "image/jpeg";
      }
	  
	  
	  
      var mousePositionControl = new ol.control.MousePosition({
        className: 'custom-mouse-position',
        target: document.getElementById('location'),
        coordinateFormat: ol.coordinate.createStringXY(5),
		projection: 'EPSG:4326',
        undefinedHTML: '&nbsp;'
      });
      var untiled = new ol.layer.Image({
		visible: true,
		contrast: 10,
        source: new ol.source.ImageWMS({
          ratio: 1,
          url: 'http://111.100.101.46:8080/geoserver/pdam_gis/wms',
          params: {'FORMAT': format,
                   'VERSION': '1.1.1', 
				//transparant:true, 
                STYLES: '',
                LAYERS: 'pdam_gis:pel_R1',
          }
        })
      });
      var tiled = new ol.layer.Tile({
        visible: true,
        source: new ol.source.TileWMS({
          url: 'http://111.100.101.46:8080/geoserver/pdam_gis/wms',
          params: {'FORMAT': format, 
                   'VERSION': '1.1.1',
                   tiled: true,
				   //transparant:true,
                STYLES: '',
                LAYERS: 'pdam_gis:pel_R1',
          }
        })
      });
	  
	  
	  var vectorj = new ol.source.Vector({
					url: 'http://111.100.101.46:8080/geoserver/pdam_gis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pdam_gis:pel_R1&maxFeatures=50&outputFormat=application%2Fjson',
					format: new ol.format.GeoJSON()
					});
	
	
	//map addLayer(basemap);
	
			 
	  /*var gmap = new google.maps.Map(document.getElementById('gmap'), {
                 disableDefaultUI: true,
                 keyboardShortcuts: false,
                 draggable: false,
                 disableDoubleClickZoom: true,
                 scrollwheel: false,
                 streetViewControl: false
       });	 */
                            
		var select = new ol.interaction.Select({
					style: new ol.style.Style({
					fill: new ol.style.Fill({
					color: 'rgba(255,255,255,0.5)'
					})
				})
			});
		var iconFeature = new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.transform([100.46409628823464,-0.8073448771592638], 'EPSG:4326', 'EPSG:3857')),
						
					});
					
	    var iconStyle = new ol.style.Style({
					image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
					anchor: [0.5, 46],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					opacity: 0.75,
					src: 'http://openlayers.org/en/master/examples/data/geolocation_marker.png'
				}))
			});

		iconFeature.setStyle(iconStyle);

	   var vectorSource = new ol.source.Vector({
							features: [iconFeature]
			});

	   var vectorLayer = new ol.layer.Vector({
						source: vectorSource
			});
			
		   	   
	   
      var projection = new ol.proj.Projection({
          code: 'EPSG:4326',
          units: 'degrees',
		  //zoom : '15',
		  axisOrientation: 'neu'
		  		 		  
      });
	  
	   		 	     
	  
      var map = new ol.Map({
	      controls: ol.control.defaults({
          attribution: true
        }).extend([mousePositionControl]),
		renderer: 'canvas',
        target: 'map',
		layers: [
			untiled,
			tiled,
			
			
			
            //basemap
	     new ol.layer.Group({
                'title': 'base',
                layers: [
                        new ol.layer.Tile({
						//preload: Infinity,
                        title: 'OSM',
                        //type: 'base',
				        //projection : centers,
						style:'',
						transparant:true,
                        visible: true,	
					    //extent : bounds,
                        source: new ol.source.OSM()
                    })
                ]
				
            }),
			
			
			
			
	     new ol.layer.Group({
			   // 'title':'tile',
               
                layers: [ tiled , untiled 
				
                    
                ]
            }), 
        
		 
		 /*new ol.layer.Group({
		        'title':'vector',
               
                layers: [ new ol.layer.Tile({
						//preload: Infinity,
                        title: 'vector',
                        //type: 'base',
				        //projection : centers,
						style:'',
						transparant:true,
                        visible: true,	
					    //extent : bounds,
                        source: vector
                    })
                ]
				
            }),*/
        ],
       view : new ol.View({
			 center: ol.proj.transform([100.363, -0.943], 'EPSG:4326', 'EPSG:3857'),
			zoom: 14
		})
      });
	  
	  
	  var planningAppsLayer = new ol.layer.Vector({
							source: tiled,
							style: new ol.style.Style({
							image: new ol.style.Icon(({
							anchor: [0.5, 40],
							anchorXUnits: 'fraction',
							anchorYUnits: 'pixels',
							src: "http://openlayers.org/en/master/examples/data/geolocation_marker.png"
					}))
				})
			});
		
	   
	   map.addLayer(planningAppsLayer);
	  
	  
	
	  
		  
		zoomslider = new ol.control.ZoomSlider();
		map.addControl(zoomslider)
		
		// Geolocation marker
		var markerEl = document.getElementById('geolocation_marker');
		var marker = new ol.Overlay({
		positioning: 'center-center',
		element: markerEl,
		stopEvent: false
		});
		map.addOverlay(marker);
		
		
	   //zoomToExtentControl = new ol.control.ZoomToExtent({
       	  
	   //map.addControl(zoomToExtentControl);	

     

	
		
	  var layerSwitcher = new ol.control.LayerSwitcher()
	  map.addControl(layerSwitcher);
	  //map.addLayer(untiled, tiled, basemap );
	  
	
	  
       map.getView().on('change:resolution', function(evt) {
        var resolution = evt.target.get('resolution');
        var units = map.getView().getProjection().getUnits();
        var dpi = 25.4 / 0.28;
        var mpu = ol.proj.METERS_PER_UNIT[units];
        var scale = resolution * mpu * 39.37 * dpi;
        if (scale >= 9500 && scale <= 950000) {
          scale = Math.round(scale / 1000) + "K";
        } else if (scale >= 950000) {
          scale = Math.round(scale / 1000000) + "M";
        } else {
          scale = Math.round(scale);
        }
        document.getElementById('scale').innerHTML = "Scale = 1 : " + scale;
      });
      //map.getView().fitExtent(bounds, map.getSize());
      map.on('singleclick', function(evt) {
        document.getElementById('nodelist').innerHTML = "Loading... please wait...";
        var view = map.getView();
        var viewResolution = view.getResolution();
        var source = untiled.get('visible') ? untiled.getSource() : tiled.getSource(); 
        var url = source.getGetFeatureInfoUrl(
          evt.coordinate, viewResolution, view.getProjection(),
          {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50});
        if (url) {
          document.getElementById('nodelist').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
        }
      });

      // sets the chosen WMS version
      function setWMSVersion(wmsVersion) {
        map.getLayers().forEach(function(lyr) {
          lyr.getSource().updateParams({'VERSION': wmsVersion});
        });
      }

      // Tiling mode, can be 'tiled' or 'untiled'
      function setTileMode(tilingMode) {
        if (tilingMode == 'tiled') {
          untiled.set('visible', false);
          tiled.set('visible', true);
        } else {
          tiled.set('visible', false);
          untiled.set('visible', true);
        }
      }

      function setAntialiasMode(mode) {
        map.getLayers().forEach(function(lyr) {
          lyr.getSource().updateParams({'FORMAT_OPTIONS': 'antialias:' + mode});
        });
      }

      // changes the current tile format
      function setImageFormat(mime) {
        map.getLayers().forEach(function(lyr) {
          lyr.getSource().updateParams({'FORMAT': mime});
        });
      }

      function setStyle(style){
        map.getLayers().forEach(function(lyr) {
          lyr.getSource().updateParams({'STYLES': style});
        });
      }

      function setWidth(size){
        var mapDiv = document.getElementById('map');
        var wrapper = document.getElementById('wrapper');

        if (size == "auto") {
          // reset back to the default value
          mapDiv.style.width = null;
          wrapper.style.width = null;
        }
        else {
          mapDiv.style.width = size + "px";
          wrapper.style.width = size + "px";
        }
        // notify OL that we changed the size of the map div
        map.updateSize();
      }

      function setHeight(size){
        var mapDiv = document.getElementById('map');
        if (size == "auto") {
          // reset back to the default value
          mapDiv.style.height = null;
        }
        else {
          mapDiv.style.height = size + "px";
        }
        // notify OL that we changed the size of the map div
        map.updateSize();
      }

      function updateFilter(){
        if (pureCoverage) {
          return;
		  
		  		  
        }
		
        var filterType = document.getElementById('filterType').value;
        var filter1 = "kode = '" + document.getElementById('filter').value +"'" ;
		var filter2 = "SRS=EPSG:4326" & "WIDTH=901" & "HEIGHT=453" & "BBOX=" ;
		var filter3 = "n_pemilik = '" + document.getElementById('filter').value +"'";
		var filter = document.getElementById('filter').value;
		/*var source1 = new ol.source.Vector({
					url: 'http://111.100.101.46:8080/geoserver/pdam_gis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pdam_gis:pel_R1&maxFeatures=50&outputFormat=application%2Fjson',
					format: new ol.format.GeoJSON()
					});
		//var coords = source1.getCoordinates();
		/*var iconFeature = new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.transform([-72.0704, 46.678], 'EPSG:4326', 'EPSG:3857')),
						name: 'Null Island',
						population: 4000,
						rainfall: 500
					});*/
		var extent = [100.35990239937435, -0.959558534372488,
                    100.37858310045499, -0.9295079851637083];
		extent = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:4326", "EPSG:3857", "zoom:17"));
		
		
        // by default, reset all filters
        var filterParams = {
          'FILTER': null,
          'CQL_FILTER': null,
          'FEATUREID': null
        };
        if (filter.replace(/^\s\s*/, '').replace(/\s\s*$/, '') != "") {
          if (filterType == "cql") {
            filterParams["CQL_FILTER"] = filter1;
          }
          if (filterType == "ogc") {
            filterParams["FILTER"] = filter;
          }
          if (filterType == "fid")
            filterParams["FEATUREID"] = filter;
          }
          // merge the new filter definitions
          map.getLayers().forEach(function(lyr) {
            lyr.getSource().updateParams(filterParams);
          });
		  
		  map.getView().fitExtent(extent, map.getSize());
        }
		
	  //zoomToExtentControl = new ol.control.ZoomToExtent({
       	  
	  //map.addControl(zoomToExtentControl);	
		

        function resetFilter() {
         if (pureCoverage) {
            return;
          }
          document.getElementById('filter').value = "";
          updateFilter();
		
		  }
		  
		

        // shows/hide the control panel
        function toggleControlPanel(){
          var toolbar = document.getElementById("toolbar");
          if (toolbar.style.display == "none") {
            toolbar.style.display = "block";
          }
          else {
            toolbar.style.display = "none";
          }
          map.updateSize()
        }
		
		var source = new ol.source.Vector({
		url: 'pel_r1.json',
		format: new ol.format.GeoJSON()
		});
		
		