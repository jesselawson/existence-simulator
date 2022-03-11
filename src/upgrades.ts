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

import { canAffordCry, setHelpText } from "./game";
import { Inventory } from "./inventory";
import * as e from "./engine";
import * as ud from "./upgradesData";


export const Upgrades = {
  WorkHardInSchool: "upgradeWorkHardInSchool",
  GetAnEntryLevelJob: "upgradeGetAnEntryLevelJob",
  GetABetterJob: "upgradeGetABetterJob",
  BuyACoffeeMaker: "upgradeBuyACoffeeMaker",
  BuyAWeightedBlanket: "upgradeBuyWeightedBlanket",
  BuySomeCannabis: "upgradeBuySomeCannabis",
  SmokeCannabis: "upgradeSmokeCannabis",
  BuyAScentedCandle: "upgradeBuyAScentedCandle",
  BuyAPlant: "upgradeBuyAPlant",
  BuySomeComfyPants: "upgradeBuySomeComfyPants",
  BuyAHouse: "upgradeBuyAHouse",
  
  // WORKING
  GetAJuniorDevJob: "upgradeJuniorDeveloperJob",
  
  LearnHTML: "upgradeLearnHTML",
  LearnJavascript: "upgradeLearnJavascript",
  LearnAdvancedCoding: "uppgradeLearnAdvancedCoding",
  
  // BLOGGING
  ReadBloggingBusinessBook: "upgradeReadBloggingBusinessBook",
  StartABlog: "upgradeStartABlog",
  MonetizeBlog: "upgradeMonetizeBlog",
  BuildAutomationsForBlog: "upgradeBuildAutomationsForBlog",
  ImproveAutomationsForBlog: "upgradeImproveAutomationsForBlog",
  RefactorAutomationsForBlog: "upgradeRefactorAutomationsForBlog",
  
  // PODCASTING
  ReadPodcastingBusinessBook: "upgradeReadPodcastingBusinessBook",
  LearnAudioRecording: "upgradeLearnAudioRecording",
  BuyAudioRecordingEquipment: "upgradeBuyAudioRecordingEquipment",
  BuyAdvancedAudioRecordingEquipment: "upgradeBuyAdvancedAudioRecordingEquipment",
  StartAPodcast: "upgradeStartAPodcast",
  MonetizePodcast: "upgradeMonetizePodcast",
  BuildAutomationsForPodcast: "upgradeBuildAutomationsForPodcast",
  ImproveAutomationsForPodcast: "upgradeImproveAutomationsForPodcast",
  RefactorAutomationsForPodcast: "upgradeRefactorAutomationsForPodcast",
  
  // GAME DEVELOPMENT
  GetAGameDevJob: "upgradeGetAGameDevJob",
  ReadGameDevelopmentBook: "upgradeReadGameDevelopmentBook", 
  ReadGameTheoryAudioBook: "upgradeReadGameTheoryAudioBook",
  WriteASinglePlayerGame: "upgradeMakeASinglePlayerGame",
  WriteAMultiPlayerGame: "upgradeMakeAMultiplayerGame",
  WriteAnIdleClickerGame: "upgradeMakeAnIdleClickerGame",
  StreamOnTwitch: "upgradeStreamOnTwitch",
  StreamOnYoutube: "upgradeStreamOnYoutube",
  SponsorMouse: "upgradeSponsorMouse",
  SponsorChair: "upgradeSponsorChair",
  SponsorDrink: "upgradeSponsorDrink",
  SponsorASMR: "upgradeSponsorASMR",

  // END-GAME
  LearnQuantumCoding: "upgradeQuantumCoding",
  LearnTheoreticalCoding: "upgradeTheoreticalCoding",
  DevelopAVersionOftheHumanConsciousnessExpressedAsIdleGameMechanics: "upgradeImmportality",
  HireResearchFirm: "upgradeHireResearchFirm",
  HelpPassK12IdleCurriculum: "upgradeHelpPassK12Curriculum",
  HelpPassHigherEdGrants: "upgradeHelpPassHigherEdGrants",
  HelpPassBestLaw: "upgradeHelpPassBestLaw",
  HelpPassTVLaw: "upgradeHelpPassTVLaw",
  HelpPassChildcareLaw: "upgradeHelpPassChildcareLaw",
  HelpPassHealthcareRebatesLaw: "upgradeHealthcareRebates",
  HelpPassFoodRationsLaw: "upgradeFoodRations",
  HelpPassHousingStipendsLaw: "upgradeHousingStipends",
  
  HelpPassUBILaw: "upgradeUBI",

  RunForPresidentOfTheWorld: "upgradePresident",
  
  BuyAnNFT: "upgradeBuyAnNFT",
  BuyANewPhone: "upgradeBuyANewPhone", 
  BuyFasterInternet: "upgradeBuyFasterInternet",
  BuyACheapComputer: "upgradeBuyACheapComputer",
  BuyAMidRangeComputer: "upgradeBuyAMidRangeComputer",
  BuyAHighPerformanceComputer: "upgradeBuyATopEndComputer",
  BuyAClickerGame: "upgradeBuyAClickerGame",
  StartTakingNaps: "upgradeStartTakingNaps",
  GetSocialMedia: "upgradeGetSocialMedia",
  GetOnTikTok: "upgradeGetOnTikTok"
} as const;



export interface Cost {
  anxiety?: number;
  missedOpportunities?: number;
}

// A basic upgrade that is purchased and then that's it
export interface Upgrade {
  // The label shown on the button
  buttonLabel: string;
  // Internal use
  buttonId: string;

  // "try_your_best", "spend_your_money", "express_yourself"
  // Determines which section to put this upgrade in
  section: string;

  // If provided (and true), this button pops up when the try your best box does.
  // By default, buttons are not revealed.
  startsRevealed?: boolean; 

  // Description before buying the upgrade
  descriptionBeforePurchase: string;
  // Description permanently displayed after buying
  descriptionAfterPurchase: string;
  
  // Whether this has been purchased or not.
  purchased: boolean;

  // Whether this is purchased and done researching (so, all done)
  finished: boolean;

  // If true, whole button section will be redrawn/computed. Mark true after purchase
  // and when currentResearchTime == totalResearchTime
  shouldRedraw: boolean;
  

  // Upgrade types:
  // "unlock"     Buy and then immediately unlock()
  // "research"   Buy, wait for timer, then unlock()
  type: string;
  // Time, in seconds, this takes to complete
  /* An advanced upgrade that takes time to complete.
     Think: StarCraft research. 
     * You can purchase it once you can afford it
     * You have to wait for it to complete before getting the effect
  */
  totalResearchTime: number; 
  currentResearchTime: number;

  canAfford: (i: Inventory) => boolean;
  
  // Called the moment we pay for the upgrade
  purchase: (i:Inventory) => void;

  // Called once purchased && finished == true
  unlock: (i: Inventory) => void;
}

// Returns true if the upgrade is purchased but not finished
export function upgradeIsResearching(buttonId:string,i:Inventory ):boolean {
  let outcome = false;
  i.upgrades.forEach( (u) => {
    if(u.buttonId == buttonId) {
      if(u.purchased && !u.finished){
        outcome = true;
      } else {
        outcome = false;
      }
    }  
  });

  return outcome;
}

// Returns true if the upgrade is purchased && complete
export function upgradeIsComplete(buttonId:string,i:Inventory ):boolean {
  let outcome = false;
  i.upgrades.forEach( (u) => {
    if(u.buttonId == buttonId) {
      if(u.purchased && u.finished){
        outcome = true;
      } else {
        outcome = false;
      }
    }  
  });

  return outcome;
}

// Returns true if all the upgrades passed are complete
export function upgradesAreComplete(i:Inventory, ...upgrades:string[]):boolean {
  var allUpgradesCompleted = true;
  upgrades.forEach( (upgrade) => {
    if(!upgradeIsComplete(upgrade, i)) {
      allUpgradesCompleted = false;
    }
  });
  return allUpgradesCompleted;
}

// Returns true if the upgrade is not purchased or finished
export function upgradeIsNotPurchasedOrComplete(buttonId:string,i:Inventory ):boolean {
  let outcome = false;
  i.upgrades.forEach( (u) => {
    if(u.buttonId == buttonId) {
      if(!u.purchased && !u.finished){
        outcome = true;
      } else {
        outcome = false;
      }
    }  
  });

  return outcome;
}

export function tellInterfaceTabAboutNewlyAvailableItem(tab_name:string) {
  let ele = document.getElementById(tab_name+"NewItemNotifier")!;
  ele.innerHTML = `❤️`;
}

export function revealUpgradeButton(buttonId:string, i:Inventory) {
  e.fadeIn(document.getElementById(buttonId+"Section"), false);
  
  let interfaceTab = ``;
  i.upgrades.forEach( (upgrade) => {
    if(upgrade.buttonId == buttonId) {
      switch(upgrade.section) {
        case "try_your_best":
          interfaceTab = "tryYourBest";
          break;
        case "spend_your_money":
          interfaceTab = "spendYourMoney";
          break;
        case "express_yourself":
          interfaceTab = "expressYourself";
          break;
        case "create_something":
        case "podcast_upgrades":
        case "blog_upgrades":
          interfaceTab = "createSomething";
          break;
        default:
          break;
      }
    }
  });

  if(interfaceTab != ``) {
    tellInterfaceTabAboutNewlyAvailableItem(interfaceTab);
  }
}

export function hideUpgradeButton(buttonId:string) {
  e.fadeOut(document.getElementById(buttonId+"Section"));
}

export function resetUpgrade(buttonId:string,i:Inventory) {
  i.upgrades.forEach( (u) => {
    if(u.buttonId == buttonId) {
        u.purchased = false;
        u.finished = false;
        u.shouldRedraw = true;
    }  
  });
  // Remove the 'small' class on the button, which we add when the upgrade is finished
  if(document.getElementById(buttonId+"Section")?.classList.contains('small')) {
    document.getElementById(buttonId+"Section")?.classList.remove('small');
  }
}

export function dev_completeUpgrade(upgrade:string, i:Inventory){
  i.upgrades.forEach( (u) => {
    if(u.buttonId == upgrade) {
      u.purchased = true;
      u.finished = true;
      u.shouldRedraw = true;
      u.currentResearchTime = u.totalResearchTime;
      u.unlock(i);
      return;
    }
  })
}

export function generateUpgradeHtml(u:Upgrade,i:Inventory,include_section_tag:boolean = true) : string {
  let output = ``;
  let icon = ``;
  let button_classes = ``;
  let disabled_or_not = ``;
  let status = ``;
  let description = ``;

  if(!u.purchased && !u.finished) {
    status = 'not_purchased';
  } else if(u.purchased && !u.finished) {
    status = 'researching';
  } else if(u.purchased && u.finished) {
    status = 'finished';
  }

  switch(status) {
    case 'not_purchased':
      icon = "⚪";
      if(u.canAfford(i)) {
        disabled_or_not = ``;
      } else {
        disabled_or_not = `disabled`;
      }
      description = u.descriptionBeforePurchase;
      break;
    case 'researching':
      icon = "🕒";
      button_classes = `upgrade-is-researching`;
      disabled_or_not = `disabled`;
      description = ``; // Set dynamically with triggers
      break;
    case 'finished':
      icon = "✔️";
      button_classes = `upgrade-is-purchased`;
      disabled_or_not = ``;
      description = u.descriptionAfterPurchase;
      break;
      default: 
      break;
  };
  
  
  
  if(include_section_tag) {
    output += `<p id="${u.buttonId}Section" class="${u.startsRevealed ? '' : 'starts-hidden'}">`;
  }
  output += `<button id="${u.buttonId}Button" type="button" class="upgrade-button ${button_classes}" style="${u.finished ? 'cursor: not-allowed' : ''}" ${disabled_or_not}>
    <span class="upgrade-button-emoji">${icon}</span> ${u.buttonLabel}
  </button>
    <span id="label${u.buttonId}">
      <small>${description}</small>
    </span>`;

  if(include_section_tag) {
    output += `</p>`;
  }

  // Include the progress bar if we are researching
  
  output += `<div class="${status != 'researching' ? 'starts-hidden' : '' } progress mb-3">
    <div id="${u.buttonId}Progress" class="progress-bar bg-info justify-content-center" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-valuetext="Progress">
      <span class="badge bg-info"> <span id="${u.buttonId}ProgressBarPercent"></span>%</span>
    </div>
  </div>`;
  

  return output;
}

export function getUpgrades() {
  var upgradesDb: Upgrade[] = [
    // TRY YOUR BEST UPGRADES
    ud.SmokeSomeCannabis(),
    ud.WorkHardInSchool(),
    ud.GetAnEntryLevelJob(),
    ud.GetABetterJob(),
    ud.LearnHTML(),
    ud.LearnJavascript(),
    ud.LearnAdvancedCoding(),
    ud.LearnQuantumCoding(),
    ud.LearnTheoreticalCoding(),
    ud.DevelopAVersionOftheHumanConsciousnessExpressedAsIdleGameMechanics(),
    ud.LearnAudioRecording(),
    ud.GetAJuniorDevJob(),
    
    // SPEND YOUR MONEY
    ud.BuySomeCannabis(),
    ud.BuyAClickerGame(),
    ud.BuyFasterInternet(),
    ud.BuyAudioRecordingEquipment(),
    ud.BuyAdvancedAudioRecordingEquipment(),
    ud.BuyACheapComputer(),
    ud.BuyAMidRangeComputer(),
    ud.BuyAHighPerformanceComputer(),
    ud.BuyACoffeeMaker(),
    ud.BuyAScentedCandle(),
    ud.BuyAPlant(),
    ud.BuySomeComfyPants(),
    ud.BuyAWeightedBlanket(),
    ud.BuyAnNFT(),
    ud.BuyAHouse(),
    
    // GAME DEVELOPMENT
    ud.GetAGameDevJob(),
    ud.ReadAGameDevelopmentBook(),
    ud.ReadAGameTheoryAudioBook(),
    ud.WriteASinglePlayerGame(),
    ud.WriteAMultiPlayerGame(),
    ud.WriteAnIdleClickerGame(),

    // END GAME
    ud.StreamOnTwitch(),
    ud.StreamOnYouTube(),
    ud.SponsorMouse(),
    ud.SponsorChair(),
    ud.SponsorDrink(),
    ud.SponsorASMR(),
    ud.HireResearchFirm(),
    ud.HelpPassHealthcareRebates(),
    ud.HelpPassK12IdleCurriculum(),
    ud.HelpPassHigherEdGrants(),
    ud.HelpPassBestLaw(),
    
    
    // hire research
    
    // EXPRESS YOURSELF
    ud.GetSocialMedia(),
    ud.GetOnTikTok(),
    ud.StartTakingNaps(),
    
    ud.StartABlog(),
    ud.ReadABloggingBusinessBook(),
    ud.MonetizeBlog(),
    ud.BuildAutomationsForBlog(),
    ud.ImproveAutomationsForBlog(),
    ud.RefactorAutomationsForBlog(),
    
    ud.ReadAPodcastingBusinessBook(),
    ud.StartAPodcast(),
    ud.MonetizePodcast(),
    ud.BuildAutomationsForPodcast(),
    ud.ImproveAutomationsForPodcast(),
    ud.RefactorAutomationsForPodcast(),
  ];
  return upgradesDb;
}

export function initUpgrades() {
  let upg = getUpgrades();
  (window as any).inventory.upgrades = upg;
}

export function tryToBuyUpgrade(u:Upgrade, i:Inventory) {
  if(u.canAfford(i)) {  
    u.purchased = true;
    u.purchase(i);
    u.shouldRedraw = true;
  }
}

export function updateAllUpgrades(i:Inventory) {
  
  let resort = false;

  // If shouldRedraw, redraw the whole thing
  // If can afford and disabled, un-disable, else if not disabled, disable.
  i.upgrades.forEach((upgrade) => {

    // Check if purchased/finished, update research bars and progress
    if(upgrade.purchased) {
      if(!upgrade.finished) {
          if(upgrade.currentResearchTime >= upgrade.totalResearchTime) {
            upgrade.finished = true;
            upgrade.shouldRedraw = true;
            upgrade.unlock(i);
            

          } else {
            upgrade.currentResearchTime += 1 / 33;

            // Update the progress bar
            let fraction = upgrade.currentResearchTime / upgrade.totalResearchTime;
            let newVal = Math.round(fraction * 100);
            let progressBar = document.getElementById(
              upgrade.buttonId+"Progress"
            ) as HTMLDivElement;
            progressBar.ariaValueNow = newVal.toString();
            progressBar.style.width = newVal.toString()+"%";
            progressBar.ariaValueMin = "0"; // Just in case
            progressBar.ariaValueMax = "100"; // always going to be 100
            progressBar.ariaValueText = "Anxiety";
            document.getElementById(upgrade.buttonId+"ProgressBarPercent")!.innerText = newVal.toString();

            // Update the uploading consciousness label directly
            if(upgrade.buttonId == Upgrades.DevelopAVersionOftheHumanConsciousnessExpressedAsIdleGameMechanics) {
              if(upgrade.purchased && !upgrade.finished) {
                let desc = document.getElementById("label"+upgrade.buttonId)!;
                let progress = ((upgrade.currentResearchTime / upgrade.totalResearchTime) * 100).toFixed(2);
                desc.innerHTML = `<small>${progress}%</small>`;
              }
            }
          }
      }
    }

    // Update render state first
    if(upgrade.shouldRedraw) {

      upgrade.shouldRedraw = false;
      let target = document.getElementById(upgrade.buttonId+"Section");

      // Generate a new button render
      let newHtml = generateUpgradeHtml(upgrade,i, false);
      
      (target as any).innerHTML = newHtml;
     
      // Finally, reattach the click handler
      let button = document.getElementById(upgrade.buttonId+"Button");
      
      if(!upgrade.purchased) {
        button?.addEventListener('click',  () => tryToBuyUpgrade(upgrade, i));
      }

      // Add 'small' tag to container if purchased
      if(upgrade.purchased && !target?.classList.contains('small')) {
        target?.classList.add('small');
      }
    }

    

    

    let button:HTMLButtonElement = document.getElementById(upgrade.buttonId+"Button") as HTMLButtonElement;
    

    if(!upgrade.purchased) {
      if(button.disabled && upgrade.canAfford(i)) {
        button.disabled = false;
      }
      if(!button.disabled && !upgrade.canAfford(i)) {
        button.disabled = true;
      }
    } else {
      if(!button.disabled) {
        button.disabled = true;
      }
    }
  });
}