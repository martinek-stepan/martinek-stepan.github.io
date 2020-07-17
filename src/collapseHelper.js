module.exports = {
  collapse: function (expand, arr) {
    let $ = window.$;
    let headers = $('.collapse').siblings(".card-header");

    for (let header of headers) {
      let technologies = $(header).find(".technology");
      let found = false;
      for (let tech of technologies) {
        if (arr.includes($(tech).text())) {
          found = true;
          break;
        }
      }

      if (found && expand) {
        $(header).siblings(".collapse").addClass('show');
      } else if (!expand && !found) {
        $(header).siblings(".collapse").removeClass('show');
      }
    }
  }
};