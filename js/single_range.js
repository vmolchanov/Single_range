"use strict";


(function() {

    /**
     * @param {Element} range
     * @constructor
     */
    function SingleRange(range) {
        this._line = range.querySelector(".single-range__line");
        this._btn = range.querySelector(".single-range__btn");
        this._min = +range.getAttribute("data-min");
        this._max = +range.getAttribute("data-max");
        this._output = document.querySelector("input[data-for=single-range]");
        this._value = this._min;

        /** @type {number} цена деления */
        this._divVal = this._line.getBoundingClientRect().width / (this._max - this._min);

        var that = this;

        if (this._output !== null) {
            // установка значения по умолчанию при загрузке странице
            this._output.value = this._value;

            this._output.oninput = function() {
                if (that._inputValidate()) {
                    that._setBtnPosition(that._output.value);
                }
            }
        }

        this._btn.onmousedown = function() {
            document.onmousemove = function(event) {
                var coordX = event.pageX - that._line.getBoundingClientRect().left;
                that._moveAt(coordX, that._line.getBoundingClientRect().width);
                that._setValue();
            };

            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };

    }


    /**
     * Перемещение ползунка на заданное расстояние
     * @param {number} shift
     * @param {number} lineWidth
     * @private
     */
    SingleRange.prototype._moveAt = function(shift, lineWidth) {
        /** @type {number} координата минимального значения */
        var beginPoint = -this._btn.getBoundingClientRect().width / 2;
        /** @type {number} координата максимального значения */
        var endPoint = lineWidth - this._btn.getBoundingClientRect().width / 2;

        if (shift < beginPoint) {
            this._btn.style.left = beginPoint;
        } else if (shift >= endPoint) {
            this._btn.style.left = endPoint + "px";
        } else {
            this._btn.style.left = shift + "px";
        }
    };


    /**
     * Проверка input#single-range на корректность
     * @returns {boolean}
     * @private
     */
    SingleRange.prototype._inputValidate = function() {
        var regexp = /^-?\d+$/;

        if (!regexp.test(this._output.value)) {
            if (this._output.value.length === 1) {
                if (this._output.value !== "-") {
                    this._output.value = this._min;
                }
            } else {
                this._output.value = this._output.value.slice(0, -1);
            }
            return false;
        }

        if (this._output.value < this._min || this._output.value > this._max)
            return false;

        return true;
    };


    /**
     * Установить ползунок на заданное значение
     * @param {string} value
     * @private
     */
    SingleRange.prototype._setBtnPosition = function(value) {
        var btnWidth = this._btn.getBoundingClientRect().width;
        this._btn.style.left = Math.floor((value - this._min) * this._divVal) - btnWidth / 2 + "px";
        this._value = value;
    };


    /**
     * Вычисление значения относительно положения ползунка
     * @private
     */
    SingleRange.prototype._setValue = function() {
        var btnLeft = this._btn.getBoundingClientRect().left;
        var btnWidth = this._btn.getBoundingClientRect().width;
        var lineLeft = this._line.getBoundingClientRect().left;
        var coordCenter = btnLeft - lineLeft + btnWidth / 2;

        this._value = this._min + Math.floor(coordCenter / this._divVal);

        if (this._output === null) {
            console.log(this._value);
        } else {
            this._output.value = this._value;
        }
    };


    /**
     * @returns {string}
     */
    SingleRange.prototype.getValue = function() {
        return this._value;
    };



    window.SingleRange = SingleRange;

})();
