module Update exposing (update)

import Model exposing (Model)
import Msg exposing (Msg(..))
import Ports exposing (locateUserOnMap)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetZoomToNineteen ->
            ( { model | zoom = 19 }, Cmd.none )

        ZoomChanged zoom ->
            ( { model | zoom = zoom }, Cmd.none )

        LocateUserOnMap ->
            ( model, locateUserOnMap () )

        _ ->
            ( model, Cmd.none )
