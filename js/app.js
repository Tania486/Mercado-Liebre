document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado');

    sendEmail(); 

    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            const productImgSrc = this.parentElement.querySelector('.product-img').src;
            showThankYouMessage(productImgSrc);
        });
    });
});

function sendEmail() {
    const form = document.querySelector('#contact-form');
    if (!form) {
        console.error('Formulario de contacto no encontrado');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        emailjs.sendForm(emailjsServiceID, emailjsTemplateID, form, emailjsUserID)
            .then(response => {
                alert('Correo enviado con éxito.');
                form.reset(); 
            })
            .catch(error => {
                alert('Hubo un problema al enviar el correo. Por favor, inténtalo de nuevo.');
                console.error('Error al enviar el correo:', error);
            });
    });
}

function mostrarInfo(nombre, descripcion, precio, calificacion) {
    const modalContent = `
        <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="infoModalLabel">${nombre}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>${descripcion}</p>
                        <p>Precio: $${precio}</p>
                        <p>Calificación: ${'★'.repeat(calificacion)}${'☆'.repeat(5 - calificacion)}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalContent;
    document.body.appendChild(modalContainer);

    const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
    infoModal.show();

    document.getElementById('infoModal').addEventListener('hidden.bs.modal', () => {
        modalContainer.remove();
    });
}

function showThankYouMessage(imageSrc) {
    const messageContainer = document.getElementById('thankYouMessage');
    const thankYouImage = document.getElementById('thankYouImage');

    if (!messageContainer || !thankYouImage) {
        console.error('Contenedor o imagen de agradecimiento no encontrados');
        return;
    }

    thankYouImage.src = imageSrc; 
    messageContainer.style.display = 'flex'; 
}
function closeThankYouMessage() {
    const messageContainer = document.getElementById('thankYouMessage');
    if (messageContainer) {
        messageContainer.style.display = 'none'; 
    }
}

window.addEventListener('scroll', function() {
    const scrollToHeaderButton = document.getElementById('scrollToHeader');
    
    if (window.scrollY > 300) { 
        scrollToHeaderButton.style.display = 'flex'; 
    } else {
        scrollToHeaderButton.style.display = 'none'; 
    }
});

document.getElementById('scrollToHeader').addEventListener('click', function() {
    document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
});
