const metrikaScript = `
  (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
  })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');

  ym(97068190, 'init', {webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
`;

export default function YandexMetrika() {
  return (
    <>
      <script
        id="yandex-metrika-counter"
        dangerouslySetInnerHTML={{ __html: metrikaScript }}
      />
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/97068190"
            style={{ position: "absolute", left: "-9999px" }}
            alt="Счетчик Яндекс Метрики"
          />
        </div>
      </noscript>
    </>
  );
}
