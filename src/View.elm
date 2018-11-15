module View exposing (view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (Model)
import Msg exposing (Msg)


dummyView =
    div []
        [ h1 []
            [ text "hey" ]
        ]


view : Model -> Browser.Document Msg
view model =
    { title = "Title"
    , body = [ dummyView ]
    }
