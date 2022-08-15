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
}

export default new HttpService();
