$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var $input = $('input').val().split(' ');
    $('input').val('');
    if ($input.length > 1) {
      $input = $input.join('%20');
    }
    $.get('https://galvanize-cors-proxy.herokuapp.com/http://poetrydb.org/author/' + $input + '/author,title.json')
      .then(findPoemTitles)
      .then(findPoemLines)
      .then(createIpsumArray);
  });
});




// ----------------------------------------------
function findPoemTitles(data) {
  var titles = data.map(function(poem) {
    return poem.title;
  });
  return titles;
};
// ----------------------------------------------
function findPoemLines(titles) {
  var randomTitles = [];
  if (titles.length > 5) {
    while (randomTitles.length < 5) {
      randomTitles.push(titles[Math.floor(Math.random() * (titles.length -1))]);
    }
  }

  var promises = randomTitles.map(function(title) {
    return $.get('https://galvanize-cors-proxy.herokuapp.com/http://poetrydb.org/title/' + title + '/title,lines.json');
  });

  return Promise.all(promises);
}
// ----------------------------------------------
function createIpsumArray(allTheData) {
  var ipsum = [];
  while (ipsum.length < 25) {
    for (var i = 0; i < allTheData.length; i++) {
      var lines = allTheData[i][0].lines;
      ipsum.push(lines[Math.floor(Math.random() * (lines.length - 1))]);
    }
  }

  addIpsumToPage(ipsum);
}
// ----------------------------------------------
function addIpsumToPage(ipsum) {
  var ipsum = ipsum.join(' ');
  $('.ipsum').html('');
  $('.ipsum').append('<article class="card blue-grey darken-1"></article>');
  $('article').append('<p class="card-content white-text flow-text">' + ipsum + '</p>');
};
