window.addEventListener('DOMContentLoaded', () => {
    const  forms = document.querySelectorAll("form");

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

    // data posting
    const postData = async (url, data) => {
        // внутри делаем запрос
        // при этом можем сразу обработать те данные, которые пришли
        // помещаем промис, который возвращается от fetch
        const res = await fetch(url, {
            method: "POST", // каким образом
            headers: { // что именно
                'Content-type': 'application/json'
            },
            body: data
        });
        // res промис, обработаем его как json-формат
        return await res.json();
    }

    // posting data binding
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText= `
                display: block;
                margin: 20px auto 0;
            `;

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
        openModal();
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
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000)
    }
})