  // ∞À¡ı!!
  function run(inputText) {
    //var el = document.getElementById('source');
    var scriptText = "function replace(text){ \n" + 
  		"	var replacedText = text; \n" + 
  		inputText + "\n" + 
  		"	return replacedText; \n" + 
		"}";
  
    var oldScript = document.getElementById('scriptContainer');
    var newScript;

    if (oldScript) {
      oldScript.parentNode.removeChild(oldScript);
    }

    newScript = document.createElement('script');
    newScript.id = 'scriptContainer';
    newScript.text = scriptText;
    document.body.appendChild(newScript);
  }
