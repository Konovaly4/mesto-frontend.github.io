class Avatar {
  constructor(avatar, api) {
    this.avatar = avatar;
    this.api = api;
  }

  loader(isLoading, loadNote) {
    if (isLoading) {
      loadNote();
    }
  }

  loadAvatar(avLink, avFormClose, loadNote) {
    this.loader (true, loadNote);
    this.api.setAvatar(avLink)
    .then((res) => {
      if (res.ok) {                   
        return res.json();              
    } else {
      return Promise.reject(err);
    };
  })
    .then((res) => {
      this.avatar.style.backgroundImage = `url(${res.avatar})`;
      avFormClose();
    })
    .catch((err) => {
      console.log('loadAvatarError ' + err);
    })
    .finally(this.loader(false, loadNote));
  }
 
}