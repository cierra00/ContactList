const staticCache = 'Type: Static Version: 11';
const dynamicCache = 'Type: Dynamic Version: 1';
const assets = [
'./pages/fallback.html', 
'/index.html',
'/app.js',
'js/ui.js',
'./js/materialize.min.js',
'/img/task.png',
'https://fonts.googleapis.com/icon?family=Material+Icons',

]
const limitCacheSize = (name, size)=>{
  cashes.open(name).then((cache) => {
    cache.keys().then((keys)=>{
      if(keys.length >size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    })
  })
}

self.addEventListener("install", (event) =>{
  try{console.log(`SW: Event fired: ${event.type}`);
  event.waitUntil(caches.open(staticCache).then(
    (cache)=>{
      console.log('Cache created');
      cache.addAll(assets);
    }
  ))
  } catch(err){
    console.log(err);
  }
  

});
self.addEventListener("activate", (event)=>{
  try{
    //console.log(`SWA: Event fired: ${event.type}`);
    event.waitUntil(
      caches.keys().then((keys) =>{
        return Promise.all(
          keys.filter((key)=>{ key
            !== staticCache && key !== dynamicCache
          }).map((key) => caches.delete(key))
        )
      })
    )
  } catch(err){
    console.log(err);
  }


});
self.addEventListener("fetch", function (event) {
  //fires whenever the app requests a resource (file or data)
  // console.log(`SW: Fetching ${event.request.url}`);
  //next, go get the requested resource from the network
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchRes) => {
            return caches.open(dynamicCache).then((cache) => {
              cache.put(event.request.url, fetchRes.clone());
              limitCacheSize(dynamicCache)
              return fetchRes;
            });
          })
        );
      })
      .catch(() => caches.match("/pages/fallback.html"))
  );
});


