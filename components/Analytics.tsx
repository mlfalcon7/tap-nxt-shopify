"use client";

import Script from "next/script";
import { publicEnv } from "@/lib/env";

export function Analytics() {
  const hasGa4 = Boolean(publicEnv.ga4Id);
  const hasTiktok = Boolean(publicEnv.tiktokPixelId);

  if (!hasGa4 && !hasTiktok) {
    return null;
  }

  return (
    <>
      {hasGa4 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${publicEnv.ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${publicEnv.ga4Id}');
            `}
          </Script>
        </>
      )}

      {hasTiktok && (
        <Script id="tiktok-init" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;
              var ttq=w[t]=w[t]||[];
              ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++){ttq.setAndDefer(ttq,ttq.methods[i]);}
              ttq.instance=function(t){var e=ttq._i[t]||[];return function(n){return e.push(n),ttq}};ttq.load=function(e,n){
                var i='https://analytics.tiktok.com/i18n/pixel/events.js';
                ttq._i=ttq._i||{};
                ttq._i[e]=[];
                ttq._i[e]._u=i;
                ttq._t=ttq._t||{};
                ttq._t[e]=+new Date;
                ttq._o=ttq._o||{};
                ttq._o[e]=n||{};
                var o=document.createElement('script');
                o.type='text/javascript';
                o.async=true;
                o.src=i+'?sdkid='+e+'&lib='+t;
                var a=document.getElementsByTagName('script')[0];
                a.parentNode.insertBefore(o,a);
              };
              ttq.load('${publicEnv.tiktokPixelId}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}
    </>
  );
}
