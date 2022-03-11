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

export interface GameButton {
  divId: string;
  label: string;
  num_clicks: number;
}

export function getButtonHTML(
  divId: string,
  cssClass: string,
  label: string,
  callback: CallableFunction
) {
  return `<button id="${divId}" class="${cssClass}" onclick="${callback}">${label}</button>`;
}
