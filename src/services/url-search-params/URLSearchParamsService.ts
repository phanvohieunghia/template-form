export class URLSearchParamsService {
  private static _instance: URLSearchParamsService

  public static get instance(): URLSearchParamsService {
    if (!URLSearchParamsService._instance) {
      URLSearchParamsService._instance = new URLSearchParamsService()
    }
    return URLSearchParamsService._instance
  }

  public static get get() {
    const queryString = window.location.search

    const params = new URLSearchParams(queryString)

    const queryObject: { [key: string]: string } = {}
    params.forEach((value, key) => {
      queryObject[key] = value
    })
    return { ...queryObject }
  }

  public static set(key: string, value: string) {
    const updatedParams = new URLSearchParams()
    updatedParams.set(key, value)
    const newURL = `${window.location.pathname}?${updatedParams.toString()}`
    window.history.pushState({}, '', newURL)
  }
}
