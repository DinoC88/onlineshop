import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";

function Map(props) {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 44.5328059, lng: 18.6856374 }}
    >
      <Marker position={{ lat: 44.5328059, lng: 18.6856374 }} />
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function GoogleMaps(props) {
  return (
    <div style={{ width: "100vw", height: "52vh" }}>
      <WrappedMap
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA-MU6UmFzJ2Sdyi-QQImwwfRxJVCXAE74"
        }
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
