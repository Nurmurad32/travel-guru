import React , { Component } from 'react';
import './GoogleMap.css'


class GoogleMap extends Component {



  componentDidMount(){
    this.renderMap()
  }

   renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC8SvZ5uYVZsDvkhCqeNM0sBsoSULUJW20&callback=initMap")
    window.initMap = this.initMap
  }


   initMap = () => {

    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    })


   }

   render(){
  return (
    <main>
      <p style={{textAlign:'center',color:'#F9A51A'}}>MAP</p>
      <div id="map"></div>
      
    </main>
  )
}
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default GoogleMap;

