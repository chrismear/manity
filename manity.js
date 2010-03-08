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
  for (i=0; i<10; i++) {
    $('#MANTAGE').append('<div class="PINT"></div>')
  }
  $('.PINT').each(function (i, pint) {
    $(pint).css('margin-left', -(Math.floor(Math.random()*300)) + 'px');
    for (i=0; i<10; i++) {
      $(pint).append('<div class="BBQ"></div>')
    }
    $(pint).append('<div class="OLD-SPICE"></div>')
    $(pint).children('.BBQ').height((Math.floor(Math.random() * 11)*5 + 55) + 'px');
  });
});
