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





window.onload = checkDevice
window.onresize = checkDevice