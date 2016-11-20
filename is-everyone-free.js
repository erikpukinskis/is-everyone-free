var library = require("nrtv-library")


library.define(
  "tell-browser",
  function() {
    function say() {}

    say.defineOn = function(bridge) {
      throw new Error("impl")
    }

    return say
  }
)

library.using(
  ["web-element", "browser-bridge", "web-site", "tell-browser", "tell-the-universe"],
  function aVeryDeepDankSpell(element, bridge, webSite, tellBrowser, tellTheUniverse) {

    function isEveryoneFree(bridge) {

      var page = element([
        element("No.", element.style({"font-size": "50pt"})),

        element("Source: is-everyone-free.com"),

        element("Text me when everyone is"),

        element("input.phone-number", {placeholder: "enter phone number"}),

        element("button", "Let's go", {onclick: signMeUp})
      ])

      return bridge.sendPage(page)
    }

    ////////////////

    var signMeUp = bridge.defineFunction(
      [invite],
      function signMeUp(invite) {
        var number = document.querySelector(".phone-number").value

        invite({phoneNumber: number})
      }
    )

    //////////

    var getDigits = bridge.defineFunction([tellBrowser.defineOn(bridge)],
      function getDigits(say) {
      say("like, a phone number has 7 digits or 10 digits with the area code")
    })

    ///////////////

    var invite = bridge
      .defineOn(bridge)
      .withArgs(
        "post", "/send-invite",
        bridge.handle()
      )

    webSite.addRoute("post", "/send-invite", function(request, response) {

      if (isWeird(request.body.phoneNumber)) {
        response.send(getDigits.ajaxResponse())
      } else {
        tellTheUniverse("someone-wants-an-invite", request.body.phoneNumber)

        response.send(thanks.ajaxResponse())
      }
    })

    //////////////

    var thanks = bridge.defineFunction(
      [tellBrowser.defineOn(bridge)],
      function(say) {
        say("OK. It might be a while. We'll text you with updates tho.")
      }
    )

    ////////////

    webSite.addRoute("get", isEveryoneFree(bridge))
  }
)
