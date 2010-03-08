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
  MANITY.things = [];
  MANITY.colorClasses = ['ENERGYLEGS', 'BACON', 'JETFIGHTERS', 'PUNCHING'];
  MANITY.readies = []
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
  
  MANITY.originalBackgroundImage = $('.BBQ:first').css('backgroundImage');
  
  $.each(MANITY.HEWORDS, function (i, heword) {
    MANITY.things.push({
      'kind' : 'heword',
      'heword' : heword
    });
  });
  goManityGo('hewords');
  
  // http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json

  tags = MANITY.HEWORDS.join(',');
  url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + MANITY.flickrApiKey + "&format=json&per_page=50&media=photos&tags=" + escape(tags) + "&jsoncallback=?";
  $.getJSON(url, function (data) {
    if (data.stat == "ok") {
      $.each(data.photos.photo, function (photoIndex, photo) {
        MANITY.things.push({
          kind : 'photo',
          url : "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg"
        });
      });
    }
    goManityGo('photos');
  });

  
  function goManityGo (kind) {
    MANITY.readies.push(kind);
    if (MANITY.readies.length >= 2) {
      thingLength = MANITY.things.length;
      $.each(MANITY.bbqs, function (bbqIndex, bbq) {
        thingIndex = Math.floor(Math.random() * thingLength);
        thing = MANITY.things[thingIndex];
        $(bbq).removeClass('heword photo');
        $.each(MANITY.colorClasses, function (i, colorClass) {$(bbq).removeClass(colorClass)});
        $(bbq).css('backgroundImage', MANITY.originalBackgroundImage);
        switch(thing.kind)
        {
        case 'photo':
          $(bbq).addClass('photo');
          $(bbq).css('background-image', 'url(' + thing.url + ')');
          break;
        case 'heword':
          $(bbq).addClass('heword');
          $(bbq).addClass(MANITY.colorClasses[Math.floor(Math.random() * MANITY.colorClasses.length)]);
          $(bbq).html('<p>' + thing.heword + '</p>')
        }
      });
    }
  }
});
