$(function(){
    $(".jsheart").on("click",heartChange);
    function heartChange(){
        if ($(this).hasClass("glyphicon-heart-empty")) $(this).removeClass("glyphicon-heart-empty").addClass("glyphicon-heart")
        else if ($(this).hasClass("glyphicon-heart")) $(this).removeClass("glyphicon-heart").addClass("glyphicon-heart-empty")
    }
    $('.grid').imagesLoaded( function() {
        $(function(){
            // init Isotope
            var $grid = $('#grid').isotope({
                itemSelector: '.element-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });

            $('#filters').on( 'click', 'a', function(e) {
                e.preventDefault();
                console.log("test");
                var filterValue = $( this ).attr('data-filter');
                $grid.isotope({ filter: filterValue });
            });
            $('#filters ul li').click(function(e){
                $('#filters ul li').removeClass("active");
                $(this).addClass("active");
            });
            $("#active").trigger("click");
        });

    });
});
