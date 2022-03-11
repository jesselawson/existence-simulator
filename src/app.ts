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
import * as g from "./game";
import * as e from "./engine";
import * as u from "./upgrades";
import * as t from "./triggers";

import * as bootstrap from 'bootstrap';

require('normalize-css');

// Before anything, init everything. This ensures the variables are in global space
i.initInventory();
u.initUpgrades();
t.initTriggers();

// If we don't have anything in the save, prime it.
if (localStorage.getItem("inventory") === (null || "undefined" || undefined)) {
  e.saveGame(i.getInventory());
}

g.play(i.getInventory());
g.initDevelopmentTools(i.getInventory());
g.initDoomscrollHandler(i.getInventory());

function clearNewNotification(tab_name:string) {
  let ele = document.getElementById(tab_name+"NewItemNotifier")!;
  ele.innerHTML = ``;
}

let tryYourBestTab = new bootstrap.Tab(document.getElementById('tryYourBestInterfaceTab'));
let spendYourMoneyTab = new bootstrap.Tab(document.getElementById('spendYourMoneyInterfaceTab'));
let expressYourselfTab = new bootstrap.Tab(document.getElementById('expressYourselfInterfaceTab'));
let createSomethingTab = new bootstrap.Tab(document.getElementById('createSomethingInterfaceTab'));

document.getElementById("tryYourBestInterfaceTab")!.addEventListener('click', function (e) {
  e.preventDefault();
  tryYourBestTab.show();
  clearNewNotification('tryYourBest');
});

document.getElementById("spendYourMoneyInterfaceTab")!.addEventListener('click', function (e) {
  e.preventDefault();
  spendYourMoneyTab.show();
  clearNewNotification('spendYourMoney');
});

document.getElementById("expressYourselfInterfaceTab")!.addEventListener('click', function (e) {
  e.preventDefault();
  expressYourselfTab.show();
  clearNewNotification('expressYourself');
});

document.getElementById("createSomethingInterfaceTab")!.addEventListener('click', function (e) {
  e.preventDefault();
  createSomethingTab.show();
  clearNewNotification('createSomething');
});