import {openModal, closeModal} from "./modal";
import {postData} from "../services/postData";

function forms(formSelector) {
    const  forms = document.querySelectorAll(formSelector);

    // messages to the user
    const message = {
        loading: '/spinner.svg',
        success: 'Спасибо! Мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // bind the postData () function for each form
    forms.forEach(item => {
        bindPostData(item);
    });

    // posting data binding
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.classList.add("spiner-position")

            form.insertAdjacentElement('afterend', statusMessage);

            // collecting all data from the form
            const formData = new FormData(form);

            // formData to json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // sending data to the server
            postData('http://localhost:3000/requests', json)
                .then(data => {
                    showThanksModal(message.success);
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                    statusMessage.remove();
                })
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document. querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal('.modal');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            // prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000)
    }
}

export default forms;