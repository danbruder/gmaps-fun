module View exposing (view)

import Browser exposing (Document)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Encode as JE
import Model exposing (Model)
import Msg exposing (Msg(..))



--view : Model -> Browser.Document Msg
--view model =
--{ title = "Title"
--, body = [ model |> layout ]
--}


view : Model -> Document Msg
view model =
    { title = "HomScout"
    , body =
        [ topNav
        , elmMap [ zoom model.zoom ]
        , rightDrawer model
        ]
    }


zoom : Int -> Html.Attribute msg
zoom howMuch =
    property "zoom" (JE.int howMuch)



--property "zoom" (JE.int howMuch)


elmMap : List (Html.Attribute msg) -> Html msg
elmMap attrs =
    node "elm-map" attrs []


loading : Html Msg
loading =
    div [ class "spinner" ] []


topNav : Html Msg
topNav =
    header [ class "w-100 pa3 ph5-ns bg-white shadow-4 z-2 relative" ]
        [ div [ class "db dt-ns mw9 center w-100" ]
            [ div [ class "db dtc-ns v-mid tl w-50" ]
                [ a [ class "dib f5 f4-ns fw6 mt0 mb1 link black-70", href "/", title "Home" ]
                    [ text "HomScout"
                    ]
                ]
            , nav [ class "db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns" ]
                [ a [ class "f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib", href "/docs/", title "Documentation" ]
                    [ text "Docs      " ]
                ]
            ]
        ]


rightDrawer : Model -> Html Msg
rightDrawer model =
    div [ class "z-1  mw6 absolute top-0 right-0 p3 bg-white vh-100 shadow-4 w-100" ]
        [ button [ class "mt5", onClick SetZoomToNineteen ] [ text "Set zoom to 19" ]
        ]
