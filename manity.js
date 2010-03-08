/*

              ____----------- _____
\~~~~~~~~~~/~_--~~~------~~~~~     \
 `---`\  _-~      |                   \
   _-~  <_         |                    \[]
 / ___     ~~--[""] |      ________-------'_
> /~` \    |-.   `\~~.~~~~~                _ ~ - _
 ~|  ||\%  |       |    ~  ._                ~ _   ~ ._
   `_//|_%  \      |          ~  .             ~-_   /\
          `--__     |    _-____  /\               ~-_ \/.
              ~--_ /  ,/ -~-_ \ \/         _______---~/
                  ~~-/._<   \ \`~~~~~~~~~~~~~     ##--~/
                         \    ) |`------##---~~~~-~  ) )
                          ~-_/_/                  ~~ ~~

*/

$(document).ready(function () {
  MANITY.bbqs = [];
  for (i=0; i<7; i++) {
    $('#MANTAGE').append('<div class="PINT"></div>')
  }
  $('.PINT').each(function (i, pint) {
    $(pint).css('margin-left', -(Math.floor(Math.random()*300)) + 'px');
    for (j=0; j<7; j++) {
      bbq = $('<div class="BBQ"></div>');
      $(pint).append(bbq);
      MANITY.bbqs.push(bbq);
    }
    $(pint).append('<div class="OLD-SPICE"></div>')
    $(pint).children('.BBQ').height((Math.floor(Math.random() * 11)*5 + 55) + 'px');
  });
  
  // http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json
  tags = MANITY.HEWORDS.join(',');
  url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + MANITY.flickrApiKey + "&format=json&media=photos&sort=interestingness-desc&tags=" + escape(tags) + "&jsoncallback=?";
  $.getJSON(url, function (data) {
    if (data.stat == "ok") {
      MANITY.photos = [];
      $.each(data.photos.photo, function (photoIndex, photo) {
        MANITY.photos.push("http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
      });
      photoIndex = 0;
      $.each(MANITY.bbqs, function (bbqIndex, bbq) {
        if (photoIndex >= MANITY.photos.length) {
          photoIndex = 0;
        };
        $(bbq).css('background-image', 'url(' + MANITY.photos[photoIndex] + ')');
        photoIndex++;
      });
    }
  });
});
