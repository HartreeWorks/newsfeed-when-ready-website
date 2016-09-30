var installButtons = document.querySelectorAll('.btn-install');
var installButtonLabels = document.querySelectorAll('.wrap-text-install');

var webstoreUrl = 'https://chrome.google.com/webstore/detail/cdedhgmbfjhobfnphaoihdfmnjidcpim';

console.log(installButtons);
console.log('hmm');

for (var i = 0; i < installButtons.length; ++i) {
  installButtons[i].addEventListener('click', function(e) {

    ga('send', 'event', 'Inline install', 'Started');

    if(chrome && chrome.webstore) {
      e.preventDefault();

      installButtonLabels.forEach(function(installButtonLabel) {
        installButtonLabel.innerText = 'Installing...';
      });

      chrome.webstore.install(webstoreUrl, function() {
        // Inline install succeeded
        installButtonLabels.forEach(function(installButtonLabel) {
          installButtonLabel.innerText = 'Install complete :)';

          ga('send', 'event', 'Inline install', 'Success');
        });
      },
      function() {
        // Inline install failed
        ga('send', 'event', 'Inline install', 'Failed or cancelled');

        installButtonLabels.forEach(function(installButtonLabel) {
          installButtonLabel.innerText = 'Redirecting...';
        });
        window.location.href = webstoreUrl;
      });
    }
    else {
      ga('send', 'event', 'Inline install', 'Failed: browser was not Google Chrome.');
    }
  });
}

var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

if(isFirefox){
   document.querySelector('body').className += ' is-firefox';
}

if(isSafari){
   document.querySelector('body').className += ' is-safari';
}