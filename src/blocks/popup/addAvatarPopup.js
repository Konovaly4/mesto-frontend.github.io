import AddPicturePopup from './addPicturePopup';

export default class AddAvatarPopup extends AddPicturePopup {

    popupExt() {
        this.form = document.forms.avatar;
        this.head = document.getElementById('popup-avatar-title');
        this.link = this.form.elements.link;
        this.button = document.getElementById('avatar-submit-button');
        this.closeButton = document.getElementById('avatar-close-button')
        this.linkErrMessage = document.getElementById('error-link');
    }

    buttonDisactive() {
        super.buttonDisactive();
    }

    buttonActive() {
        super.buttonActive();
    }

    openClose() {
    super.openClose();
    }

    open() {
        this.openClose();
        this.popupExt();
        this.form.reset();
        this.buttonDisactive();
        this.head.textContent = this.placeHolders.header;
        this.link.setAttribute('placeholder', this.placeHolders.link);
        this.button.textContent = this.placeHolders.button;
    }

    popupOpen() {
        this.open();
        this.setSubmitButtonState();
        this.link.setAttribute('place', 'link');
        this.formValidator.errReset(this.linkErrMessage);
    }  

    avatarLoadNote() {
        this.button.textContent = this.placeHolders.buttonOnLoad;
      }

    formLinkValidate() {
        this.popupExt();
        return this.formValidator.inputValidity(this.popupElem, this.link);
    }
    
    setSubmitButtonState() {
        this.buttonDisactive();
        if (this.formLinkValidate()) {
          this.buttonActive();
        }
    }

    onSubmit(event) {
        event.preventDefault();
        this.action.loadAvatar(this.link.value, this.openClose.bind(this), this.avatarLoadNote.bind(this));
        return;
    }


    setEventListeners() {
        this.popupExt();
        this.closeButton.onclick = this.openClose.bind(this);
        this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
        this.button.onclick = this.onSubmit.bind(this);
      }
      
}