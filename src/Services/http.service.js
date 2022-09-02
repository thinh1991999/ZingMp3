import axiosService from "./axios.service";

class HttpService {
  getHomeData(pageNb) {
    axiosService.addConfig({
      params: {
        page: pageNb,
      },
    });
    return axiosService.getMethod("/home", false);
  }
  getAlbum(id) {
    axiosService.addConfig({
      params: {
        id,
      },
    });
    return axiosService.getMethod("/detailplaylist", false);
  }
  getListMv(id, page, count = 15) {
    axiosService.addConfig({
      params: {
        id,
        page,
        count,
      },
    });
    return axiosService.getMethod("/listMV", false);
  }
  getTop100() {
    return axiosService.getMethod("/top100", false);
  }
  getZingChart() {
    return axiosService.getMethod("/charthome", false);
  }
  getWeekChart(id, week, year) {
    axiosService.addConfig({
      params: {
        id,
        week,
        year,
      },
    });
    return axiosService.getMethod("/weekChart", false);
  }
  getNewSong() {
    return axiosService.getMethod("/newreleasechart", false);
  }
  getVideoMV(id) {
    axiosService.addConfig({
      params: {
        id,
      },
    });
    return axiosService.getMethod("/video", false);
  }
  getSinger(alias) {
    axiosService.addConfig({
      params: {
        name: alias,
      },
    });
    return axiosService.getMethod("/artist", false);
  }
  getSearch(keyword) {
    axiosService.addConfig({
      params: {
        keyword,
      },
    });
    return axiosService.getMethod("/search", false);
  }
  getSongPlayer(id) {
    axiosService.addConfig({
      params: {
        id,
      },
    });
    return axiosService.getMethod("/song", false);
  }
  getSongInfo(id) {
    axiosService.addConfig({
      params: {
        id,
      },
    });
    return axiosService.getMethod("/infosong", false);
  }
  getLyric(id) {
    axiosService.addConfig({
      params: {
        id,
      },
    });
    return axiosService.getMethod("/lyric", false);
  }
  getRadio() {
    return axiosService.getMethod("/radio", false);
  }
  getNewFeeds(id, page) {
    axiosService.addConfig({
      params: {
        id,
        page,
      },
    });
    return axiosService.getMethod("/newFeeds", false);
  }
  getTypeHome() {
    return axiosService.getMethod("/typeHome", false);
  }
  getTypeDetail(id) {
    axiosService.addConfig({
      params: {
        id,
      },
    });
    return axiosService.getMethod("/typeDetail", false);
  }
  getEvent() {
    return axiosService.getMethod("/event", false);
  }
  getEventInfo(id) {
    axiosService.addConfig({
      params: {
        id,
      },
    });
    return axiosService.getMethod("/eventInfo", false);
  }
}

export default new HttpService();
