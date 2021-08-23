const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    userName: state => state.user.userName,
    userNickname: state => state.user.userNickname
}
export default getters
