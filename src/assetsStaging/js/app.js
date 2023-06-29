$('.sidenav a').on('click', function(e) {
    page = $(e.target).attr('href').replace('#', '')
    $('.content').load(`pages/${page}.html`)
})