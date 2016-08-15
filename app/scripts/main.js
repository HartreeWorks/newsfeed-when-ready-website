var installButtons = document.querySelectorAll('.btn-install');
var installButtonLabels = document.querySelectorAll('.wrap-text-install');

var webstoreUrl = 'https://chrome.google.com/webstore/detail/cdedhgmbfjhobfnphaoihdfmnjidcpim';

installButtons.forEach(function(installButton) {
  installButton.addEventListener('click', function(e) {

    if(chrome && chrome.webstore) {
      e.preventDefault();

      installButtonLabels.forEach(function(installButtonLabel) {
        installButtonLabel.innerText = 'Installing...'
      });

      chrome.webstore.install(webstoreUrl, function() {
        // Inline install succeeded
        installButtonLabels.forEach(function(installButtonLabel) {
          installButtonLabel.innerText = 'Install complete'
        });
      },
      function() {
        // Inline install failed
        installButtonLabels.forEach(function(installButtonLabel) {
          installButtonLabel.innerText = 'Redirecting...'
        });
        window.location.href = webstoreUrl;
      });
    }
  });
})
