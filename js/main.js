//In order to display the menu
document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("body > section > header > a").addEventListener("click", function(){
        var region = document.querySelector("body > section");

        if ( region.getAttribute("data-state") == "drawer" ) {
          region.setAttribute("data-state", "none");

        } else {
          region.setAttribute("data-state", "drawer");
        }

    });

});

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("bb-docs-toggle").addEventListener("click", function(){
    var target = document.querySelector("ul[data-state]");
    if ( target.getAttribute("data-state") == "edit" ) {
        target.setAttribute("data-state", "");
    } else {
        target.setAttribute("data-state", "edit");
    }
  })
});