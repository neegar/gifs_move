var api = "tJbLPFzHLFeecYtUmIDpVpslGejjCOQn";
var url = "http://api.giphy.com/v1/gifs/search"

var arr = ["dog", "cat", "rabbit", "skunk", "goldfish", "ferret", "gerbil", "capybara", "monkey"]
for (let i = 0; i < arr.length; i++) {
    var a = $("<button>")
    a.addClass("animal-forms")
    a.text(arr[i])
    $("#animal-array").append(a)
}
$(".submit-btn").on("click", function (e) {
    e.preventDefault();
    var c = $("#animal-input").val()
    var a = $("<button>")
    a.addClass("animal-forms")
    a.text(c)
    $("#animal-array").append(a)

})


$(document).on("click", ".animal-forms", function () {
    console.log($(this).text())
    reset()
    $.ajax({
        url,
        data: {
            q: $(this).text(),
            api_key: api,
            limit: 9
        }
    }).done(function (response) {
        console.log(response);
        for (let i = 0; i < 9; i++) {

            var b = $("<img>").attr("src", response.data[i].images.fixed_width_still.url)
            b.addClass("images")
            b.attr("data-still", response.data[i].images.fixed_width_still.url)
            b.attr("data-move", response.data[i].images.fixed_width.url)
            b.attr("data-condition", "still")
            b.css("margin-left", "10px")
            b.css("margin-bottom", "10px")
            $("#animals-gif").append(b)

        }
        clickImage()
    })
    
})
function clickImage() {
    $(".images").on("click", function () {
        
        if ($(this).attr("data-condition") == "still") {
            let src = $(this).attr("data-move")
            $(this).attr("src", src)
            $(this).attr("data-condition", "move")
        }
        else if ($(this).attr("data-condition") == "move") {
            let src = $(this).attr("data-still")
            $(this).attr("src", src)
            $(this).attr("data-condition", "still")
        }
    })
}
function reset() {
    $("#animals-gif").empty()
}
