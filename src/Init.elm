module Init exposing (init)

import Browser.Navigation as Nav
import Model exposing (Model)
import Msg exposing (Msg)
import Url


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( { zoom = 13
      }
    , Cmd.none
    )
