// Dalai Solutions AS eiendom, på leie til Norway Cup / Bækkelagets SK. Koden er beskyttet av åndsverkloven og uatorisert bruk er strengt forbudt. 
    
    let proactiveMessage = "Hei, jeg hjelper deg gjerne!👋";
    let widgetStyleSheet = "https://swnevin.github.io/norwaycup_assets/styles.css";
    
    // Definer FormExtension
    const FormExtension = {
      name: 'Forms',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'Custom_Form' || trace.payload.name === 'Custom_Form',
      render: ({ trace, element }) => {
        const formContainer = document.createElement('form');
    
        formContainer.innerHTML = `
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
    
            form {
              font-family: 'Roboto', sans-serif;
              max-width: 100%;
              margin: auto;
              padding: 0;
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
              border: 2px solid #3480c2;
              background-color: #fff;
              color: #333;
              margin: 10px 0;
              padding: 10px;
              outline: none;
              font-size: 1em;
              border-radius: 8px;
              box-sizing: border-box;
            }
    
            textarea {
              height: 100px;
            }
    
            .invalid {
              border-color: red;
            }
    
            .submit {
              background-color: #3480c2;
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
          </style>
    
          <label for="name">Navn</label>
          <input type="text" class="name" name="name" required><br>
    
          <label for="email">E-post</label>
          <input type="email" class="email" name="email" required 
                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                 title="Invalid email address"><br>
    
          <label for="message">Melding</label>
          <textarea class="message" name="message" required></textarea><br>
    
          <input type="submit" class="submit" value="Send">
        `;
    
        // Validering
        formContainer.addEventListener('input', function () {
          ['name', 'email', 'message'].forEach(field => {
            const input = formContainer.querySelector(`.${field}`);
            if (input.checkValidity()) input.classList.remove('invalid');
          });
        });
    
        // Send skjema
        formContainer.addEventListener('submit', function (event) {
          event.preventDefault();
    
          const name = formContainer.querySelector('.name');
          const email = formContainer.querySelector('.email');
          const message = formContainer.querySelector('.message');
    
          if (!name.checkValidity() || !email.checkValidity() || !message.checkValidity()) {
            ['name', 'email', 'message'].forEach(field => {
              const input = formContainer.querySelector(`.${field}`);
              if (!input.checkValidity()) input.classList.add('invalid');
            });
            return;
          }
    
          formContainer.querySelector('.submit').remove(); // Fjerner submit-knappen
    
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: {
              name: name.value,
              email: email.value,
              message: message.value,
            },
          });
        });
    
        element.appendChild(formContainer);
      },
    };
    
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
