class AddAvatarPopup extends AddPicturePopup {

    popupExt() {
        this.popupElem.form = document.forms.avatar;
        this.popupElem.head = document.getElementById('popup-avatar-title');
        this.popupElem.link = this.popupElem.form.elements.link;
        this.popupElem.button = document.getElementById('avatar-submit-button');
        this.popupElem.closeButton = document.getElementById('avatar-close-button')
        this.popupElem.linkErrMessage = document.getElementById('error-link');
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
        this.popupElem.form.reset();
        this.buttonDisactive();
        this.popupElem.head.textContent = this.placeHolders.header;
        this.popupElem.link.setAttribute('placeholder', this.placeHolders.link);
        this.popupElem.button.textContent = this.placeHolders.button;
    }

    popupOpen() {
        this.open();
        this.setSubmitButtonState();
        this.popupElem.link.setAttribute('place', 'link');
        this.formValidator.errReset(this.popupElem.linkErrMessage);
    }  

    avatarLoadNote() {
        this.popupElem.button.textContent = this.placeHolders.buttonOnLoad;
      }

    formLinkValidate() {
        this.popupExt();
        return this.formValidator.inputValidity(this.popupElem.link);
    }
    
    setSubmitButtonState() {
        this.buttonDisactive();
        if (this.formLinkValidate()) {
          this.buttonActive();
        }
    }

    function(event) {
        event.preventDefault();
        this.action.loadAvatar(this.popupElem.link.value, this.openClose.bind(this), this.avatarLoadNote.bind(this));
        return;
    }


    setEventListeners() {
        this.popupExt();
        this.popupElem.closeButton.onclick = this.openClose.bind(this);
        this.popupElem.form.addEventListener('input', this.setSubmitButtonState.bind(this));
        this.popupElem.button.onclick = this.function.bind(this);
      }
      
}