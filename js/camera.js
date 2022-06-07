function startCamera(node){
    var video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.style.width = '100%';
    video.style.height = '100%';
    node.getElementsByClassName("content")[0].appendChild(video);

    var facingMode = "user";
    var constraints = {
        audio: false,
        video: {
            facingMode: facingMode
        }
    };

  
    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
        video.srcObject = stream;
    });
}