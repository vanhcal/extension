
function getCurrentTabUrl(callback) {
    var queryInfo = {
      active: true,
      currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;
      console.assert(typeof url == 'string', 'tab.url should be a string');
      callback(url);
    });
}

function getCurrentTabTitle(callback) {
    var queryInfo = {
      active: true,
      currentWindow: true
    };
    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0];
      var title = tab.title;
      callback(title);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    title = getCurrentTabTitle(function(title) {
    console.log('TITLLEEEEEEEEE' + title) 
      
        url = getCurrentTabUrl(function(url) {
        console.log('URLLLLLLL' + url)

            $.ajax({
              type: "POST",
              url: "http://americasvoice.org/wp-admin/admin-ajax.php",
              data: "action=clips_action&clips_url=" + url + "&clips_article_title=" + title, 
              // Republicans+Have+Absolutely+No+Idea+How+to+Handle+This+Awful+CBO+Report&clips_date=March+14%2C+2017&distribution_date=20170315&clips_source=&clips_category=&clips_author=&clips_location=National&clips_body=test&clips_language=&_wpnonce=&_wp_http_referer=",
              contentType: "application/x-www-form-urlencoded",
              success: function(data, textStatus, xhr) {
                console.log(data + "\n" + textStatus + "\n" + xhr)
              },
              error: function (request, error) {
                console.log(arguments);
                alert(" Can't do because: " + error);
              }
            });
        });
    });
});
