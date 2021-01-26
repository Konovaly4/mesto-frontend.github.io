export default class Avatar {
  constructor(avatar, api) {
    this.avatar = avatar;
    this.api = api;
  }

  loadAvatar(avLink, avFormClose) {
    this.api.setAvatar(avLink)
    .then((res) => {
      this.avatar.style.backgroundImage = `url(${res.data.avatar})`;
      avFormClose();
    })
    .catch((err) => {
      console.log('loadAvatarError ' + err);
    })
  }
 
}