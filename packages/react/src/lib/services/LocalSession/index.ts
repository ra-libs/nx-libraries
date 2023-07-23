export class LocalSession {
  static set(name: string, value: any) {
    if (value)
      if (typeof Storage !== 'undefined') {
        sessionStorage.setItem(name, JSON.stringify(value))
      } else {
        this.setCookie(name, JSON.stringify(value))
      }
  }

  private static setCookie(cname: string, cvalue: string) {
    const d = new Date()
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000)
    const expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  }

  static get(name: string) {
    if (typeof Storage !== 'undefined') {
      // Code for localStorage/sessionStorage.
      const item = sessionStorage.getItem(name)
      return item ? JSON.parse(item) : item
    } else {
      // Sorry! No Web Storage support.. use cookie instead..
      return JSON.parse(this.getCookie(name))
    }
  }

  static check(name: string) {
    if (typeof Storage !== 'undefined') {
      if (sessionStorage.getItem(name)) {
        return true
      }
      return false
    } else {
      // No storage , use cookie..
      return this.checkCookie(name)
    }
  }

  private static getCookie(name: string) {
    name = name + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  private static checkCookie(cname: string) {
    const username = this.getCookie(cname)

    if (username !== '' && username != null) {
      return true
    } else {
      return false
    }
  }

  static remove(name: string) {
    if (typeof Storage !== 'undefined') {
      sessionStorage.removeItem(name)
    } else {
      this.deleteCookie(name)
    }
  }

  static clear() {
    if (typeof Storage !== 'undefined') {
      sessionStorage.clear()
    } else {
      this.deleteAllCookies()
    }
  }

  private static deleteAllCookies() {
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      this.deleteCookie(name)
    }
  }

  private static deleteCookie(cname: string) {
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }
}
