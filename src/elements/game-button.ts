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

export class GameButton extends HTMLElement {
  constructor() {
    super();

    var shadow = this.attachShadow({mode: 'open'});

    // Depending on the button game-color attribute, 
    // we inject the correct colors
    const gameColorYellow = "hsl(42, 100%, 78%)";
    const gameColorBlue = "hsl(198, 37%, 46%)";
    const gameColorGreen = "hsl(139, 35%, 47%)";
    const gameColorRed = "hsl(6, 65%, 57%)";
    const gameColorDark = "hsl(40, 7%, 8%)";
    const gameColorMidDark = "hsl(280, 9%, 20%)";
    const gameColorPurple = "hsl(251, 19%, 29%)";

    var thisGameButtonColor = gameColorPurple;

    var gameColorAttributeValue = this.getAttribute('game-color')!;
    
    switch(gameColorAttributeValue) {
        case "yellow":
          thisGameButtonColor = gameColorYellow;
          break;
        case "blue":
          thisGameButtonColor = gameColorBlue;
          break;
        case "green":
          thisGameButtonColor = gameColorGreen;
          break;
        case "red":
          thisGameButtonColor = gameColorRed;
          break;
        default:
          thisGameButtonColor = gameColorPurple;
          break;
    }

    shadow.innerHTML = `<style>
    .retro{
      display: inline-block;
      vertical-align: middle;
      user-select: none;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      background: ${thisGameButtonColor};
      color: ${gameColorAttributeValue == "yellow" ? "black" : "white"};
      font-size: 20px;
      font-family: 'Roboto Mono', sans-serif;
      font-weight: 400;
      text-align: left;
      border: 3px solid black!important;
      box-shadow: 0px 2px black, 3px 3px white;
      border-radius: 0;
      
  }

  .game-button-small {
    font-size: 15px;
    padding: 0.125rem 0.33rem;
  }

  .retro:disabled {
    filter: brightness(75%);
    background: ${gameColorMidDark};
    color: white;
    box-shadow: 0px 0px white;
  }
  
  .retro:hover:not([disabled]){
      filter: brightness(110%);
      cursor: pointer;
  }

  .retro:hover:disabled {
    cursor: not-allowed;
  }
  
  .retro:active{
      filter: brightness(105%)!important;
      box-shadow: 0px 0px white;
      transform:  translateY(2px); 
  }
  
  .rbtn-small{
      box-shadow: 2px 2px black, 4px 4px white;
      padding:10px;
  }
  
  .rbtn-big{
      box-shadow: 2px 2px black, 3px 3px white;
      padding: 20px;
  }
  
  .retro-img{
      display: inline-block;
      vertical-align: middle;
      user-select: none;
      font-size: 1rem;
      background: white;
      color: black;
      font-size: 20px;
      font-family: 'Roboto Mono', sans-serif;
      font-weight: 400;
      text-align: center;
      border-radius: 0;
      box-shadow: 3px 3px black, 5px 5px white;
  }
  
  .retro-img:active{
      background-color: white!important;
      color: black!important;
      box-shadow: 0px 0px white;
      transform: translateX(5px) translateY(2px); 
  }
    `;
    
    var buttonContainer = document.createElement('button');
    // We have to do some kung-fu here to pass the id of the <game-button>
    // over to the child <button> element so that all our logical processing (like 
    // disabling the button if we can't afford it) works correctly.
    buttonContainer.setAttribute('id', this.getAttribute('actor')!);
    
    if(this.hasAttribute('class')) {
      buttonContainer.setAttribute('class', this.getAttribute('class')!);
    }

    buttonContainer.innerHTML = this.innerHTML;
    this.innerHTML = "";
    
    buttonContainer.classList.add('retro');
    shadow.append(buttonContainer); 
  }

  connectedCallback() {
    
  }

  get isDisabled() {
    let id = this.getAttribute('actor')!;
    return (this.shadowRoot?.getElementById(id) as HTMLButtonElement).disabled;
  }

  set disabled(val:boolean) {
    let id = this.getAttribute('actor')!;
    (this.shadowRoot?.getElementById(id) as HTMLButtonElement).disabled = val;
  }
}

/* OLD

// <game-button id="whatever" label="Submit"/>
export class GameButton extends HTMLElement {
    constructor() {
      super();

      //let template = (document.querySelector('#game-button-template') as HTMLTemplateElement).content;
      
      //this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));
  
      var shadow = this.attachShadow({mode: 'open'});

      // Depending on the button game-color attribute, 
      // we inject the correct colors
      const gameColorYellow = "hsl(42, 100%, 78%)";
      const gameColorBlue = "hsl(198, 37%, 46%)";
      const gameColorGreen = "hsl(139, 35%, 47%)";
      const gameColorRed = "hsl(6, 65%, 57%)";
      const gameColorDark = "hsl(40, 7%, 8%)";
      const gameColorMidDark = "hsl(280, 9%, 20%)";
      const gameColorPurple = "hsl(251, 19%, 29%)";

      var thisGameButtonColor = gameColorPurple;

      var gameColorAttributeValue = this.getAttribute('game-color')!;
      
      switch(gameColorAttributeValue) {
          case "yellow":
            thisGameButtonColor = gameColorYellow;
            break;
          case "blue":
            thisGameButtonColor = gameColorBlue;
            break;
          case "green":
            thisGameButtonColor = gameColorGreen;
            break;
          case "red":
            thisGameButtonColor = gameColorRed;
            break;
          default:
            thisGameButtonColor = gameColorPurple;
            break;
      }

      shadow.innerHTML = `<style>
      .pushable {
        position: relative;
        border: none;
        background: transparent;
        padding: 0;
        cursor: pointer;
        outline-offset: 4px;
        transition: filter 250ms;
      }
      .shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background: hsl(0deg 0% 0% / 0.25);
        will-change: transform;
        transform: translateY(2px);
        transition:
          transform
          600ms
          cubic-bezier(.3, .7, .4, 1);
      }
      .edge {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background: linear-gradient(
          to left,
          hsl(10 100% 16%) 0%,
          hsl(100 100% 32%) 8%,
          hsl(200 100% 32%) 92%,
          hsl(300 100% 16%) 100%
        );
      }
      .front {
        display: block;
        position: relative;
        padding: 12px 42px;
        border-radius: 12px;
        font-size: 1.25rem;
        color: ${"yellow".includes(gameColorAttributeValue) ? "black" : "white"};
        background: ${thisGameButtonColor};
        will-change: transform;
        transform: translateY(-4px);
        transition:
          transform
          600ms
          cubic-bezier(.3, .7, .4, 1);
      }
      .pushable:hover {
        filter: brightness(110%);
      }
      .pushable:hover .front {
        transform: translateY(-5px);
        transition:
          transform
          250ms
          cubic-bezier(.3, .7, .4, 1.5);
      }
      .pushable:active .front {
        transform: translateY(-2px);
        transition: transform 34ms;
      }
      .pushable:hover .shadow {
        transform: translateY(4px);
        transition:
          transform
          250ms
          cubic-bezier(.3, .7, .4, 1.5);
      }
      .pushable:active .shadow {
        transform: translateY(1px);
        transition: transform 34ms;
      }
      .pushable:focus:not(:focus-visible) {
        outline: none;
      }</style>
      `;
      
      var buttonContainer = document.createElement('button');
      // We have to do some kung-fu here to pass the id of the <game-button>
      // over to the child <button> element so that all our logical processing (like 
      // disabling the button if we can't afford it) works correctly.
      buttonContainer.setAttribute('id', this.getAttribute('actor')!);
      

      if(this.hasAttribute('class')) {
        buttonContainer.setAttribute('class', this.getAttribute('class')!);
      }
      buttonContainer.classList.add('pushable');
      shadow.append(buttonContainer);

      //var oldId = this.getAttribute('id');
      //this.setAttribute('id', oldId+"fasdfaContainer");
  
      var shadowSpan = document.createElement('span');
      shadowSpan.setAttribute('class','shadow');
      shadowSpan.setAttribute('id', 'shadowSpan');
      buttonContainer.appendChild(shadowSpan);
  
      var edgeSpan = document.createElement('span');
      edgeSpan.setAttribute('class','edge');
      edgeSpan.setAttribute('id', 'edgeSpan');
      buttonContainer.appendChild(edgeSpan);
  
      var frontSpan = document.createElement('span');
      frontSpan.setAttribute('class','front');
      frontSpan.innerHTML = this.innerHTML;
      frontSpan.setAttribute('id', 'frontSpan');
      this.innerHTML = "";
      buttonContainer.appendChild(frontSpan);

      
  
      
    }

    connectedCallback() {
      
    }

    get isDisabled() {
      let id = this.getAttribute('actor')!;
      return (this.shadowRoot?.getElementById(id) as HTMLButtonElement).disabled;
    }

    set disabled(val:boolean) {
      let id = this.getAttribute('actor')!;
      if(val) {
        (this.shadowRoot?.getElementById(id) as HTMLButtonElement).disabled = true;
        this.shadowRoot?.getElementById('shadowSpan')?.classList.remove('shadow');
        this.shadowRoot?.getElementById('edgeSpan')?.classList.remove('edge');
        this.shadowRoot?.getElementById('frontSpan')?.classList.remove('front');
      } else {
        (this.shadowRoot?.getElementById(id) as HTMLButtonElement).disabled = false;
        this.shadowRoot?.getElementById('shadowSpan')?.classList.add('shadow');
        this.shadowRoot?.getElementById('edgeSpan')?.classList.add('edge');
        this.shadowRoot?.getElementById('frontSpan')?.classList.add('front');
      }
    }
}
  

*/