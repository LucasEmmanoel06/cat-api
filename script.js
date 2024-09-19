function sorteioGato() {
    fetch('https://cataas.com/cat?type=small&position=center')
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Erro ao buscar imagem');
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            document.getElementById('my_image').setAttribute('src', imageUrl);
        })
        .catch(error => console.error('Erro:', error)); 
}

function checkDevice() {

    if (window.innerWidth <= 767) { //se for mobile
        document.getElementById('mobile').classList.remove('hidden');
        document.getElementById('desktop').classList.add('hidden');
    } else { //se for desktop
        document.getElementById('desktop').classList.remove('hidden');
        document.getElementById('mobile').classList.add('hidden');
    }

}

function getUserMedia(constraints) {
    // if Promise-based API is available, use it
    if (navigator.mediaDevices) {
      return navigator.mediaDevices.getUserMedia(constraints);
    }
      
    // otherwise try falling back to old, possibly prefixed API...
    var legacyApi = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
      
    if (legacyApi) {
      // ...and promisify it
      return new Promise(function (resolve, reject) {
        legacyApi.bind(navigator)(constraints, resolve, reject);
      });
    }
  }
  
  function getStream (type) {
    if (!navigator.mediaDevices && !navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      alert('User Media API not supported.');
      return;
    }
  
    var constraints = {};
    constraints[type] = true;
    
    getUserMedia(constraints)
      .then(function (stream) {
        var mediaControl = document.querySelector(type);
        
        if ('srcObject' in mediaControl) {
          mediaControl.srcObject = stream;
        } else if (navigator.mozGetUserMedia) {
          mediaControl.mozSrcObject = stream;
        } else {
          mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
        }
        
        mediaControl.play();
      })
      .catch(function (err) {
        alert('Error: ' + err);
      });
    }

window.onload = checkDevice
window.onresize = checkDevice
