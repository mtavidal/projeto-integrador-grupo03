function verificaCamposPreenchidos(event, modal) {
    event.preventDefault();
    let inputs = document.querySelectorAll("input");
    for (let x = 0; x < inputs.length; x++) {
        if (inputs[x].value === "") return;

    }
    openModal(modal);
}
function openModal(mn) {
    let modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'Block';
    document.body.style.overflow = 'hidden';
}

function closeModal(mn) {
    let modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}