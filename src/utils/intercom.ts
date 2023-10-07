import process from "process";

declare global {
  interface Window {
    Intercom: any;
    intercomSettings: any;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_INTERCOM_APP_ID: string;
  }
}

export const APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

// Loads Intercom with the snippet
// This must be run before boot, it initializes window.Intercom
export const load = () => {
  (function () {
    type IntercomFunction = (...args: any[]) => void;
    interface IntercomStub {
      (...args: any[]): void;
      q?: any[];
      c?: IntercomFunction;
    }

    var w = window;
    var ic = w.Intercom;

    if (typeof ic === "function") {
      ic("reattach_activator");
      ic("update", w.intercomSettings);
    } else {
      var d = document;
      var i: IntercomStub = function () {
        i.c && i.c(arguments);
      };
      i.q = [];
      i.c = function (args) {
        i.q && i.q.push(args);
      };
      w.Intercom = i;

      var l = function () {
        var s = d.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.intercom.io/widget/" + APP_ID;
        var x = d.getElementsByTagName("script")[0];
        if (x && x.parentNode) {
          x.parentNode.insertBefore(s, x);
        }
      };

      if (document.readyState === "complete") {
        l();
      } else if ((w as any).attachEvent) {
        (w as any).attachEvent("onload", l);
      } else {
        w.addEventListener("load", l, false);
      }
    }
  })();
};

// Initializes Intercom
export const boot = (options = {}, user: any = {}) => {
  window.intercomSettings = {
    ...window.intercomSettings,
    name: user.name,
    email: user.email,
  };
  window &&
    window.Intercom &&
    window.Intercom("boot", { app_id: APP_ID, ...options });
};

export const update = () => {
  window && window.Intercom && window.Intercom("update");
};
