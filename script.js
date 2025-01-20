// Dette er Dalai Solutions AS sin eiendom, på leie til Norway Cup / Bækkelagets SK. Bruk utover avtale er ikke tillat.    
let proactiveMessage = " ";
let widgetStyleSheet = "https://swnevin.github.io/norwaycup_assets/styles.css";
let widgetDescription = " ";
let browserUrl = window.location.href;

 if (browserUrl.includes('/?sprak=3')) {
widgetDescription = "I'm pretty smart, so just ask! Don't share any sensitive personal information with me.";
proactiveMessage = "I'm happy to help!👋";
} else if (browserUrl.includes('/?sprak=1')) {
widgetDescription = "Jeg er ganske smart, så bare spør! Ikke gi meg sensitiv personinformasjon.";
proactiveMessage = "Hei, jeg hjelper deg gjerne!👋";
} else {
widgetDescription = "Jeg er ganske smart, så bare spør! Ikke gi meg sensitiv personinformasjon.";
proactiveMessage = "Hei, jeg hjelper deg gjerne!👋";
}

// Definer FormExtension
const FormExtension = {
    name: 'Forms',
    type: 'response',
    match: ({ trace }) =>
      trace.type === 'Custom_Form' || trace.payload.name === 'Custom_Form',
    render: ({ trace, element }) => {
      const formContainer = document.createElement('form');
  
      // Form HTML
      formContainer.innerHTML = `
        <style>
          form {
            font-family: 'Roboto', sans-serif;
            max-width: 100%;
            margin: auto;
            padding: 0px;
            background-color: transparent;
            border-radius: 8px;
          }
          label {
            font-size: 1em;
            color: #333;
            display: block;
            margin: 10px 0 5px;
            font-weight: 500;
          }
          input[type="text"], input[type="email"], textarea {
            width: 100%;
            border: 2px solid #4AC8DD;
            background-color: #fff;
            color: #333;
            margin: 10px 0;
            padding: 10px;
            outline: none;
            font-size: 1em;
            font-family: Arial, sans-serif;
            border-radius: 8px;
            box-sizing: border-box;
          }
          textarea {
            height: 100px;
          }
          .submit {
            background-color: #4AC8DD;
            border: none;
            color: white;
            padding: 12px;
            border-radius: 8px;
            margin-top: 20px;
            width: 100%;
            cursor: pointer;
            font-size: 1em;
            font-weight: 500;
          }
          .success-message {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-family: 'Roboto', sans-serif;
            font-size: 1.5em;
            font-weight: bold;
            color: #2C7E7C;
          }
          .success-icon {
            font-size: 3em;
            color: #2C7E7C;
          }
          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-family: 'Roboto', sans-serif;
            font-size: 1.2em;
            color: #666;
          }
        </style>
  
        <label for="email">Mail</label>
        <input type="email" class="email" name="email" required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Ugyldig e-post"><br><br>
  
        <label for="topic">Emne</label>
        <input type="text" class="topic" name="topic" required><br><br>
  
        <label for="userQuestion">Melding</label>
        <textarea class="userQuestion" name="userQuestion" required></textarea><br><br>
  
        <input type="submit" class="submit" value="Send">
      `;
  
      // Submit Event Listener
      formContainer.addEventListener('submit', function (event) {
        event.preventDefault();
  
        // Collect form values
        const email = formContainer.querySelector('.email').value;
        const topic = formContainer.querySelector('.topic').value;
        const userQuestion = formContainer.querySelector('.userQuestion').value;
  
        // Validate data if needed
        if (!email || !topic || !userQuestion) {
          alert('Du må fylle ut alle feltene!');
          return;
        }
  
        window.voiceflow.chat.interact({
          type: 'text',
          payload: {
            email,
            topic,
            userQuestion,
          },
        });
  
        element.innerHTML = `
          <div class="loading">Sender inn skjemaet...</div>
        `;
  
        setTimeout(() => {
          element.innerHTML = `
            <div class="success-message">
              <div class="success-icon">✅</div>
              <div>Skjemaet er sendt inn!</div>
            </div>
          `;
        }, 1500); 
      });
  
      if (element) {
        element.appendChild(formContainer);
      } else {
        console.error('Invalid element passed to render function.');
      }
    },
  };  
// Last inn Chat-widget
let script = document.createElement("script");
script.onload = function() {
  window.voiceflow.chat.load({
    verify: { projectID: '67436de76414aa7986e35112' },
    url: 'https://general-runtime.voiceflow.com',
    versionID: 'production',
    allowDangerousHTML: true,
    assistant: {
      description: widgetDescription,
      extensions: [FormExtension],
      stylesheet: widgetStyleSheet,
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
