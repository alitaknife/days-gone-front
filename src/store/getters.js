const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    userName: state => state.user.userName,
    userNickname: state => state.user.userNickname,
    email: state => state.user.email,
    phone: state => state.user.phone,
    sex: state => state.user.sex,
    location: state => state.user.location,
    weatherInfo: state => state.weather.weatherInfo
}
export default getters
