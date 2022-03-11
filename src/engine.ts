/*
  * Copyright © 2022 Jesse Lawson. [Website](https://jesselawson.org); [Email](jesse@lawsonry.com) 
  * 
  * This file is part of Existence Simulator.
  * 
  * Existence Simulator is free software: you can redistribute it and/or modify it 
  * under the terms of the GNU General Public License as published by the Free Software 
  * Foundation, either version 3 of the License, or (at your option) any later version.
  * 
  * Existence Simulator is distributed in the hope that it will be useful, but WITHOUT 
  * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
  * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
  * 
  * You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
  * 
*/

import * as i from "./inventory";

export function fadeOut(element: any) {
  var op = 1; // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = "none";
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op -= op * 0.1;
  }, 10);
}

export function fadeIn(element: any, inline: boolean = true) {
  var op = 0.1; // initial opacity
  if (inline) {
    element.style.display = "inline";
  } else {
    element.style.display = "block";
  }
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, 10);
}

// Just like fadeIn, but happens faster. For giving a visual indicator
// when the value in a badge changes. Assumes the element is already 
// set to display: <whatever it needs to be>
// Since this can be triggered many times per frame, we bake in a 
// check for teh current opacity and, if it's not already 1, 
// we'll just skip this call.
export function flashBadge(spanId:string) {
  var op = 0.1; // initial opacity
  let element = document.getElementById(spanId)!;

  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op.toString();
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.33;
  }, 10);

}

// Specifically for fading in <tr> elements where display needs to be table-row
export function fadeInTableRow(element: any) {
  var op = 0.1; // initial opacity
  
  element.style.display = "table-row";
  
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, 10);
}

export function saveGame(i: i.Inventory): void {
  try {
    localStorage.setItem("inventory", JSON.stringify(i));
  } catch (e) {
    console.error("Failed to save: " + e);
  }
}

export function loadGame() {
  let inv = JSON.parse(localStorage.getItem("inventory") || "null");
  if (inv === "null") {
    // If we don't have a valid inventory, create one
    saveGame((window as any).inventory);
    loadGame();
  }
}