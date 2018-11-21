module Update exposing (update)

import Model exposing (Model)
import Msg exposing (Msg(..))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetZoomToNineteen ->
            ( { model | zoom = 19 }, Cmd.none )

        _ ->
            ( model, Cmd.none )
