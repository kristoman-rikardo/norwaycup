// Dette er Dalai Solutions AS sin eiendom, på leie til Bækkelaget Sportsklub / Norway Cup. Bruk utover avtale er ikke tillat.    
let widgetDescription = " ";
let inputPlaceholder = " ";
let widgetStylesheet = " ";
let browser_url = window.location.href;

 if (browser_url.includes('/?sprak=3')) {
widgetDescription = "I'm quite smart, but I need a couple of seconds to think it through⚽ I'm still in training and may make some minor mistakes.";
inputPlaceholder = "Message...";
widgetStylesheet = "https://kristoman-rikardo.github.io/buttonlabels/en.css";
} else {
widgetDescription = "Jeg er ganske smart, men trenger et par sekunder for å tenke meg om⚽ Jeg er fortsatt under opplæring, og kan derfor gjøre små feil.";
inputPlaceholder = "Skriv melding...";
widgetStylesheet = "https://kristoman-rikardo.github.io/buttonlabels/no.css";
}

// Last inn Chat-widget
let script = document.createElement("script");
(function(d, t) {
    var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
    v.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: '67b8590ef2a0a0c3b286de3d' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        assistant: {
            extensions: [FormExtension],
            banner: { description: widgetDescription },
            inputPlaceholder: inputPlaceholder,
            stylesheet: widgetStylesheet
        },
        launch: {
            event: { type: "launch", payload: { browser_url: window.location.href } }
        }
      });
    }
    v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
})(document, 'script');
