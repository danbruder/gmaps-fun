module Main exposing (main)

import Browser
import Init
import Model exposing (Model)
import Msg exposing (Msg(..))
import Update
import Url
import Url.Parser exposing ((</>), Parser, int, map, oneOf, s, string, top)
import View



-- MAIN


main : Program () Model Msg
main =
    Browser.application
        { init = Init.init
        , view = View.view
        , update = Update.update
        , subscriptions = \m -> Sub.none
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }
