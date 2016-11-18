$(document).ready(function() {

  $("input").easyAutocomplete(options);

  $('form').submit(function(event) {
    event.preventDefault();
    $('.ipsum').html('');
    var $input = $('input').val().split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1));
    $('.ipsum').append('<div class="page-header"></div>');
    $('.page-header').append('<h1>' + $input[$input.length - 1] + '-Ipsum</h1>');
    $('input').val('');
    if ($input.length > 1) {
      $input = $input.join('%20');
    }
    $.get('https://galvanize-cors-proxy.herokuapp.com/http://poetrydb.org/author/' + $input + '/author,title.json')
      .then(findPoemTitles)
      .then(findPoemLines)
      .then(createIpsumArray);
  });

  $('button').click(function() {
    $('.ipsum').html('');
    var input = options['data'][Math.floor(Math.random() * (options['data'].length - 1))];
    input = input.split(' ');
    $('.ipsum').append('<div class="page-header"></div>');
    $('.page-header').append('<h1>' + input[input.length - 1] + '-Ipsum ('+ input.join(' ') + ')</h1>');
    if (input.length > 1) {
      input = input.join('%20');
    }
    $.get('https://galvanize-cors-proxy.herokuapp.com/http://poetrydb.org/author/' + input + '/author,title.json')
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
  }else {
    randomTitles.push(titles);
  }

  var promises = randomTitles.map(function(title) {
    return $.get('https://galvanize-cors-proxy.herokuapp.com/http://poetrydb.org/title/' + title + '/title,lines.json');
  });

  return Promise.all(promises);
}
// ----------------------------------------------
function createIpsumArray(allTheData) {
  var ipsum = [];
  if (allTheData.length < 3) {
    for (var i = 0; i < allTheData.length; i++) {
      var lines = allTheData[i][0].lines;
      ipsum.push(lines[Math.floor(Math.random() * (lines.length - 1))]);
    }
  }else {
    while (ipsum.length < 40) {
      for (var i = 0; i < allTheData.length; i++) {
        var lines = allTheData[i][0].lines;
        ipsum.push(lines[Math.floor(Math.random() * (lines.length - 1))]);
      }
    }
  }


  addIpsumToPage(ipsum);
}
// ----------------------------------------------
function addIpsumToPage(ipsum) {
  var ipsum = ipsum.join(' ');
  $('.ipsum').append('<article></article>');
  $('article').append('<p>' + ipsum + '</p>');
};


var options = {
  data: [
    "Adam Lindsay Gordon",
    "Alan Seeger",
    "Alexander Pope",
    "Algernon Charles Swinburne",
    "Amy Levy",
    "Andrew Marvell",
    "Anne Bradstreet",
    "Anne Bronte",
    "Anne Killigrew",
    "Anne Kingsmill Finch",
    "Annie Louisa Walker",
    "Ben Jonson",
    "Charles Sorley",
    "Charlotte Bronte",
    "Christina Rossetti",
    "Christopher Marlowe",
    "Coventry Patmore",
    "Edgar Allan Poe",
    "Edmund Spenser",
    "Edward Fitzgerald",
    "Edward Taylor",
    "Edward Thomas",
    "Eliza Cook",
    "Elizabeth Barrett Browning",
    "Emily Bronte",
    "Emily Dickinson",
    "Emma Lazarus",
    "Ernest Dowson",
    "Eugene Field",
    "Francis Thompson",
    "Geoffrey Chaucer",
    "George Gordon, Lord Byron",
    "George Herbert",
    "George Meredith",
    "Gerard Manley Hopkins",
    "Helen Hunt Jackson",
    "Henry David Thoreau",
    "Henry Vaughan",
    "Henry Wadsworth Longfellow",
    "Hugh Henry Brackenridge",
    "Isaac Watts",
    "James Thomson",
    "James Whitcomb Riley",
    "Jane Austen",
    "Jane Taylor",
    "John Clare",
    "John Donne",
    "John Dryden",
    "John Greenleaf Whittier",
    "John Keats",
    "John Milton",
    "John Wilmot",
    "Jonathan Swift",
    "Joseph Warton",
    "Joyce Kilmer",
    "Julia Ward Howe",
    "Jupiter Hammon",
    "Katherine Philips",
    "Lady Mary Chudleigh",
    "Lewis Carroll",
    "Lord Alfred Tennyson",
    "Major Henry Livingston, Jr.",
    "Mark Twain",
    "Matthew Arnold",
    "Michael Drayton",
    "Oliver Wendell Holmes",
    "Paul Laurence Dunbar",
    "Percy Bysshe Shelley",
    "Phillis Wheatley",
    "Ralph Waldo Emerson",
    "Richard Crashaw",
    "Richard Lovelace",
    "Robert Browning",
    "Robert Burns",
    "Robert Herrick",
    "Robert Louis Stevenson",
    "Robert Southey",
    "Robinson",
    "Rupert Brooke",
    "Samuel Coleridge",
    "Samuel Johnson",
    "Sarah Flower Adams",
    "Sidney Lanier",
    "Sir John Suckling",
    "Sir Philip Sidney",
    "Sir Thomas Wyatt",
    "Sir Walter Raleigh",
    "Sir Walter Scott",
    "Stephen Crane",
    "Thomas Campbell",
    "Thomas Flatman",
    "Thomas Hood",
    "Thomas Moore",
    "Thomas Warton",
    "Walt Whitman",
    "Walter Savage Landor",
    "William Allingham",
    "William Blake",
    "William Cullen Bryant",
    "William Ernest Henley",
    "William Morris",
    "William Shakespeare",
    "William Topaz McGonagall",
    "William Vaughn Moody",
    "William Wordsworth"
  ],
  list: {
		  match: {
			 enabled: true
  }
  }
};
