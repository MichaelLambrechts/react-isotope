import { useState, useEffect, useMemo, createElement } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "";
var styles = {};
styleInject(css);

var useState$1 = useState, useEffect$1 = useEffect, useMemo$1 = useMemo;
var getX = function (col, width) {
    return col * width + 10;
};
var getY = function (row, height) {
    return row * height + 10;
};
var index = (function (props) {
    var children = props.children, gridLayout = props.gridLayout, unitWidth = props.unitWidth, unitHeight = props.unitHeight, noOfCols = props.noOfCols, filters = props.filters;
    var _a = useState$1(gridLayout), cards = _a[0], udpateCards = _a[1];
    var clonedChildrens = useMemo$1(function () {
        return children
            .filter(function (child) { return cards.findIndex(function (g) { return g.id === child.key; }) !== -1; })
            .map(function (child) {
            var key = child.key;
            var layoutIndex = cards.findIndex(function (g) { return g.id === key; });
            var cardLayout = cards[layoutIndex];
            var _a = cardLayout.h, h = _a === void 0 ? 1 : _a, _b = cardLayout.w, w = _b === void 0 ? 1 : _b, col = cardLayout.col, row = cardLayout.row;
            var style = {
                transition: "all 0.5s ease-in-out",
                width: unitWidth * w + "px",
                height: unitHeight * h + "px",
                left: "" + (col ? 10 * col * w + "px" : 0),
                top: "" + (row ? 10 * row * h + "px" : 0),
                transform: "translate(" + getX(col, unitWidth) + "px, " + getY(row, unitHeight) + "px)",
                position: "absolute"
            };
            return __assign({}, child, { props: __assign({}, child.props, { style: style }) });
        });
    }, [cards, children, unitHeight, unitWidth, noOfCols]);
    useEffect$1(function () {
        var currentCol = 0;
        var intersection = function (arr1, arr2) {
            return arr1.filter(function (i) { return -1 !== arr2.findIndex(function (a) { return a === i; }); });
        };
        var checkedFilterLabels = filters
            .filter(function (f) { return f.isChecked; })
            .map(function (f) { return f.label; });
        var filteredCards = gridLayout.filter(function (card) {
            return intersection(checkedFilterLabels, card.filter).length ||
                checkedFilterLabels.includes("all");
        });
        var mappedCards = filteredCards.map(function (card, i) {
            if (currentCol === noOfCols) {
                currentCol = 0;
            }
            return __assign({}, card, { row: Math.floor(i / noOfCols), col: currentCol++ });
        });
        udpateCards(mappedCards);
    }, [filters, gridLayout]);
    return createElement("div", { className: styles["isotope-container"] }, clonedChildrens);
});

export default index;
//# sourceMappingURL=index.es.js.map
