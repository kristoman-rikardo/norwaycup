 (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '67436de76414aa7986e35112' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          assistant: {
             extensions: FormExtension,
             banner: {
               description: widget_Description,
                     },
             inputPlaceholder: input_Placeholder
                   },
         launch: {
            event: { type: "launch", payload: { browser_url: window.location.href } }
      }
        });
      };
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; 
      v.type = "text/javascript"; 
      s.parentNode.insertBefore(v, s);
  })(document, 'script');
