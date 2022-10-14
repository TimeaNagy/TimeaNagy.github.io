import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgcCookieConsentConfig, NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieService implements OnDestroy {
  public cc: any;
  private statusChangeSubscription: Subscription = new Subscription;

  constructor(private translate: TranslateService, private ccService: NgcCookieConsentService) { }

  public getCookie(name: string) {
    let cookieArray: Array<string> = document.cookie.split(';');
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < cookieArray.length; i += 1) {
      c = cookieArray[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  public deleteCookie(cookieName: string) {
    this.setCookie({ name: cookieName, value: '', expireDays: -1 });
  }

  public setCookie(params: any) {
    let date: Date = new Date();
    date.setTime(date.getTime() + (params.expireDays ? params.expireDays : 1) * 24 * 60 * 60 * 1000);
    document.cookie =
      (params.name ? params.name : '') + '=' +
      (params.value ? params.value : '') + ';' +
      (params.session && params.session == true ? '' : 'expires=' + date.toUTCString() + ';') + 'path=' +
      (params.path && params.path.length > 0 ? params.path : '/') + ';' +
      (location.protocol === 'https:' && params.secure && params.secure == true ? 'secure' : '');
  }

  public initCookieConsent(): void {
    this.translate
      .get(['cookieMessage', 'cookieAllow', 'cookieDeny', 'cookiePolicy'])
      .subscribe(data => {
        this.ccService.getConfig().content = this.ccService.getConfig().content || {};
        let content = this.ccService.getConfig().content
        if (content) {
          content.message = data['cookieMessage'];
          content.allow = data['cookieAllow'];
          content.deny = data['cookieDeny'];
          content.policy = data['cookiePolicy'];
        }

        this.ccService.destroy();
        this.ccService.init(this.ccService.getConfig());
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        if (event.status === 'allow') {
          this.setCookie({
            name: 'language',
            value: this.translate.store.currentLang,
            session: true
          })
        }
      });
  }

  ngOnDestroy(): void {
    this.statusChangeSubscription.unsubscribe();
  }
}

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'fancywebsite.github.io'
  },
  palette: {
    popup: {
      background: 'var(background-primary)'
    },
    button: {
      background: 'var(background-secondary)'
    }
  },
  theme: 'edgeless',
  type: 'opt-out',
  elements: {
    message: '<span id="cookieconsent:desc" class="cc-message"></span>',
    messagelink: '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
    allow: '<a aria-label="allow cookies" tabindex="0" class="cc-btn cc-allow cookie-button-allow">{{allow}}</a>',
    deny: '<a aria-label="deny cookies" tabindex="0" class="cc-btn cc-deny cookie-button-deny">{{deny}}</a>'
  },
};
