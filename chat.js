//Dette er Dalai Solutions AS sitt produkt og eiendel, på leie til Norway Cup / Bækkelagets SK. Koden er beskyttet av åndsverkloven og all uautorisert bruk er forbudt.
let proactiveMessage = "Hei, jeg hjelper deg gjerne!👋";
let widgetStyleSheet = "https://swnevin.github.io/norwaycup_assets/styles.css";

fetch("https://swnevin.github.io/norwaycup_assets/extensions.js")
  .then(response => response.text())
  .then(script => eval(script))
  .then(() => {
    console.log("Extensions.js lastet inn.");
    
    // Last inn Voiceflow-widget
    let script = document.createElement("script");
    script.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: '67436de76414aa7986e35112' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        allowDangerousHTML: true,
        assistant: {
          extensions: [FormExtension],
          stylesheet: widgetStyleSheet
        }
      }).then(() => {
        console.log('Voiceflow widget loaded successfully');
        window.voiceflow.chat.proactive.clear();
        window.voiceflow.chat.proactive.push(
          { type: 'text', payload: { message: proactiveMessage } }
        );
      }).catch((err) => console.error('Widget load failed:', err));
    };
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    document.head.appendChild(script);
  })
  .catch(error => console.error("Feil ved innlasting av extensions.js:", error));
