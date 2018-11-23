port module Ports exposing (initMap, locateUserOnMap)


port initMap : () -> Cmd msg


port locateUserOnMap : () -> Cmd msg
