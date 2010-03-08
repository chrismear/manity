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
  
  tagIndex = 0;
  tagSlice = [];
  while ((tagSlice = MANITY.HEWORDS.slice(tagIndex, tagIndex + 10)).length > 0) {
    tags = tagSlice.join(',');
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
    tagIndex += 10;
  }
  
  // http://search.twitter.com/search.json?&q=&lang=en&rpp=50&callback=?
  hewordIndex = 0;
  twitterQuery = "";
  twitterQueryEscaped = "";
  lastTwitterQueryEscaped = "";
  while (hewordIndex <= MANITY.HEWORDS.length) {
    if (twitterQueryEscaped.length > 140 || hewordIndex == (MANITY.HEWORDS.length)) {
      url = "http://search.twitter.com/search.json?&q=" + lastTwitterQueryEscaped + "&lang=en&rpp=10&callback=?";
      $.getJSON(url, function (data) {
        if (data.results) {
          $.each(data.results, function (tweetIndex, tweet) {
            MANITY.things.push({
              'kind' : 'tweet',
              'text' : tweet['text'],
              'author' : tweet.from_user
            });
          });
          goManityGo('tweets');
        }
      });
      lastTwitterQueryEscaped = "";
      twitterQuery = "";
    }
    lastTwitterQueryEscaped = twitterQueryEscaped;
    twitterQuery = twitterQuery + MANITY.HEWORDS[hewordIndex] + " OR ";
    twitterQuery = twitterQuery.slice(0, -4);
    twitterQueryEscaped = escape(twitterQuery);
    twitterQuery += " OR ";
    hewordIndex++;
  }
  
  function goManityGo (kind) {
    MANITY.readies.push(kind);
    // if (MANITY.readies.length >= 2) {
      thingLength = MANITY.things.length;
      $.each(MANITY.bbqs, function (bbqIndex, bbq) {
        thingIndex = Math.floor(Math.random() * thingLength);
        thing = MANITY.things[thingIndex];
        $(bbq).removeClass('heword photo tweet');
        $.each(MANITY.colorClasses, function (i, colorClass) {$(bbq).removeClass(colorClass)});
        $(bbq).addClass(MANITY.colorClasses[Math.floor(Math.random() * MANITY.colorClasses.length)]);
        $(bbq).css('backgroundImage', MANITY.originalBackgroundImage);
        switch(thing.kind)
        {
        case 'photo':
          $(bbq).html('');
          $(bbq).addClass('photo');
          $(bbq).css('background-image', 'url(' + thing.url + ')');
          break;
        case 'heword':
          $(bbq).addClass('heword');
          $(bbq).html('<p>' + thing.heword + '</p>')
          break;
        case 'tweet':
          $(bbq).addClass('tweet');
          $(bbq).html('<p><span class="author">' + thing.author + '</span> <span class="text">' + thing['text'] + '</span></p>')
          break;
        }
      });
    // }
  }
});
