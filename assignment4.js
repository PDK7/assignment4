// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

function toggleInputs(on) {
  if (on) {
    $('input').prop('disabled', false);  
  } else {
    $('input').prop('disabled', true);  
  }
}

function getPotentialMatches(search_text, search_list) {
  to_return = [];  
  for (var i = 0; i < search_list.length; i++) {
    if (search_list[i].substr(0, search_text.length).toLowerCase() === search_text.toLowerCase()) {
      to_return.push(search_list[i]);
    }
  }
  to_return.sort();
  return to_return;
}

function addMatches(matches) {
  $('span.possibility').each(function(index) {
    var current_item = $(this).html();
    if (matches.indexOf(current_item) === -1) {
      $(this).slideUp(100, function(){$(this).remove();});
    } else {
      matches.splice(matches.indexOf(current_item), 1);
    }
  });    
  for (var i = 0; i < matches.length; i++) {
    $('div.flexsearch').append('<a href="http://www.google.com/#q=' + matches[i] + '" target="blank"><span class="possibility">' + matches[i] + '</span></a>');
  }
  $('span.possibility').fadeTo(100, 1);
}

(function() {
  // Magic!
  console.log('Keepin\'n it clean with an external script!');
  
  //Disable the search bar
  toggleInputs(false);
  
  //retrieve all of the data
  var search_list = [];
  $.getJSON('http://www.mattbowytz.com/simple_api.json?data=all', function(data) {  
    if (data.data !== null) {
      // build up the list
      for (var key in data.data) {
        for (var i = 0; i < data.data[key].length; i++) {
          search_list.push(data.data[key][i]);
        }
      }
      toggleInputs(true);
      console.log(search_list);
    }
  });

  console.log($('input.flexsearch-input'));
  $('input.flexsearch-input').keyup(function() {
    var search_text = $(this).val();
    var matches = []
    if (search_text.trim().length > 0) {
      matches = getPotentialMatches(search_text.trim(), search_list);
    }
    addMatches(matches);
  });
})();
