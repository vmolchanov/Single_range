"use strict";

(function() {

    var singleRangeWrapper = document.querySelector(".single-range");
    var singleRange = new SingleRange(singleRangeWrapper);

    var input = document.querySelector("[data-for=single-range]");

    console.log(input);

    input.addEventListener("change", function () {
        console.log(singleRange.getValue());
    });

})();
