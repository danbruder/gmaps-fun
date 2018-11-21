module Msg exposing (Msg(..))

import Browser
import Url exposing (Url)


type Msg
    = NoOp
    | UrlChanged Url
    | LinkClicked Browser.UrlRequest
    | SetZoomToNineteen
