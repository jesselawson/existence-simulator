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
import * as e from "./engine";
import * as t from "./triggers";
import * as u from "./upgrades";

import { GameButton } from "./elements/game-button"; 

export function setHelpText(msg: string) {
  let textContainer = document.getElementById("helpTextMessagesContainer")!;
  let scrollContainer = document.getElementById("helpTextContainer")!;

  // Get any existing messages and fade them a bit
  if(!textContainer.lastElementChild?.classList.contains('faded-helptext')) {
    textContainer.lastElementChild?.classList.add('faded-helptext');
  }
  
  let message = document.createElement('p');
  message.classList.add('starts-hidden');
  message.innerText = "> "+msg;
  
  textContainer.appendChild(message);
  e.fadeIn(message, false);
  
  scrollContainer.scrollTop = scrollContainer.scrollHeight;
  
}

// TODO : go fade in spanBannerWorldwidePlayers somewhere when players >= 0.01
export function getBannerWorldwidePlayersText(i:i.Inventory):string {
  let count = getFancyNumber(i.worldwidePlayers,0) || 0;
  let msg = ``;
  if(i.worldwidePlayers == 0) {
    msg = `are zero people`;
  } else if(i.worldwidePlayers == 1) {
    msg = `is one person`;
  } else {
    msg = `are ${count} people`;
  }

  return msg;
}

export function getTotalInfluencePerSecond(i:i.Inventory):string {
  return getFancyNumber(i.influencePerSecond);
}

export function getFancyNumber(number:number,decimal_precision:number = 2) {
  var suffix = "";
  let decimals = decimal_precision;
  var precision = decimals;
  if (number>999999999999999999999999999999999999999999999999999){
      number = number/1000000000000000000000000000000000000000000000000000;
      suffix = "Sexdecillion";
  } else if (number>999999999999999999999999999999999999999999999999){
      number = number/1000000000000000000000000000000000000000000000000;
      suffix = "Quindecillion";
  } else if (number>999999999999999999999999999999999999999999999){
      number = number/1000000000000000000000000000000000000000000000;
      suffix = "Quattuordecillion";
  } else if (number>999999999999999999999999999999999999999999){
      number = number/1000000000000000000000000000000000000000000;
      suffix = "Tredecillion";
  } else if (number>999999999999999999999999999999999999999){
      number = number/1000000000000000000000000000000000000000;
      suffix = "Duodecillion";
  } else if (number>999999999999999999999999999999999999){
      number = number/1000000000000000000000000000000000000;
      suffix = "Undecillion";
  } else if (number>999999999999999999999999999999999){
      number = number/1000000000000000000000000000000000;
      suffix = "Decillion";
  } else if (number>999999999999999999999999999999){
      number = number/1000000000000000000000000000000;
      suffix = "Nonillion";
  } else if (number>999999999999999999999999999){
      number = number/1000000000000000000000000000;
      suffix = "Octillion";
  } else if (number>999999999999999999999999){
      number = number/1000000000000000000000000;
      suffix = "Septillion";
  } else if (number>999999999999999999999){
      number = number/1000000000000000000000;
      suffix = "Sextillion";
  } else if (number>999999999999999999){
      number = number/1000000000000000000;
      suffix = "Quintillion";
  } else if (number>999999999999999){
      number = number/1000000000000000;
      suffix = "Quadrillion";
  } else if (number>999999999999){
      number = number/1000000000000;
      suffix = "Trillion";
  } else if (number>999999999){
      number = number/1000000000;
      suffix = "Billion";
  } else if (number>999999){
      number = number/1000000;
      suffix = "Million";
  } else if (number>999){
      number = number/1000;
      suffix = "Thousand";
  }  else if (number<1000){
      precision = 2;
  }
  return number.toFixed(precision) + " " + suffix;
}

export function updateDaysAsTimeGoesBy(i: i.Inventory):void {
   // Days per second increases as your anxiety increases
   i.daysPerSecond = 1; // baseline
   i.daysPerSecond += i.anxietyPerSecond;
   i.days += i.daysPerSecond / 33;

   // This also updates the age
   i.ageYears = Math.floor(i.days / 365);
   i.ageDays = i.days % 365;
}

export function getNumYearsOld(i: i.Inventory): string {
  return i.ageYears.toFixed(0).toString();
  //return (i.days / 365).toFixed(0).toString();
}

export function getNumDaysOld(i: i.Inventory): string {
  return i.ageDays.toFixed(0).toString();
  //return Math.round(i.days % 365).toString();
}

export function onClickExistButton(i: i.Inventory): void {
  i.anxiety += 1;
  i.days += 1;
  i.totalClicks += 1;
}

export function onClickCreateBlogPostButton(i:i.Inventory): void {
  i.blog.posts += 1;
  i.missedOpportunities -= 1;
  i.totalClicks += 1;
}

export function onClickToggleBlogAutomationsLink(i:i.Inventory):void {
  let status = document.getElementById("spanLabelBlogAutomationsStatus")!;
  let link = document.getElementById("toggleBlogAutomationsLink")!;
  if(i.blog.automationsAreRunning) {
    i.blog.automationsAreRunning = false;
    link.innerText = "turn on";
    status.innerHTML = `<span class="badge bg-light">OFF</span>`;
  } else {
    i.blog.automationsAreRunning = true;
    link.innerText = "turn off";
    status.innerHTML = `<span class="badge bg-success">ON</span>`;
  }
}

export function canAffordCreateBlogPost(i:i.Inventory):boolean {
  return i.missedOpportunities >= 1;
}

export function onClickHireBlogFreelancerButton(i:i.Inventory): void {
  i.blog.posts += 1;
  i.money -= 25;
  i.totalClicks += 1;
}

export function canAffordHireBlogFreelancer(i:i.Inventory):boolean {
  return i.money >= 25;
}

export function onClickCreatePodcastEpisodeButton(i:i.Inventory): void {
  i.podcast.episodes += 1;
  i.missedOpportunities -= 3;
  i.totalClicks += 1;
}

export function canAffordCreatePodcastEpisode(i:i.Inventory):boolean {
  return i.missedOpportunities >= 3;
}

export function onClickTogglePodcastAutomationsLink(i:i.Inventory):void {
  let status = document.getElementById("spanLabelPodcastAutomationsStatus")!;
  let link = document.getElementById("togglePodcastAutomationsLink")!;
  if(i.podcast.automationsAreRunning) {
    i.podcast.automationsAreRunning = false;
    link.innerText = "turn on";
    status.innerHTML = `<span class="badge bg-light">OFF</span>`;
  } else {
    i.podcast.automationsAreRunning = true;
    link.innerText = "turn off";
    status.innerHTML = `<span class="badge bg-success">ON</span>`;
  }
}

export function onClickHirePodcastFreelancerButton(i:i.Inventory): void {
  i.podcast.episodes += 1;
  i.money -= 45;
  i.totalClicks += 1;
}

export function canAffordHirePodcastFreelancer(i:i.Inventory):boolean {
  return i.money >= 45;
}





// CRY
export function getCryCost(i: i.Inventory): string {
  return Math.round(
    Math.pow(i.totalCryClicks + i.baseCosts.cry, i.baseCosts.cryMultiplier)
  ).toFixed(0);
}

export function getCryCostAsNumber(i: i.Inventory): number {
  return Math.round(
    Math.pow(i.totalCryClicks + i.baseCosts.cry, i.baseCosts.cryMultiplier)
  );
}

export function canAffordCry(i: i.Inventory): boolean {
  return i.anxiety - getCryCostAsNumber(i) >= 0 ? true : false;
}

export function canAffordWork(i: i.Inventory): boolean {
  return i.missedOpportunities >= 1;
}

export function canAffordRead(i: i.Inventory): boolean {
  return i.missedOpportunities >= 1;
}

export function onClickCryButton(i: i.Inventory): void {
  i.anxiety -= getCryCostAsNumber(i);
  i.missedOpportunities += i.missedOpportunitiesFromCrying;
  i.anxietyPerSecondRollover += .31;
  
  i.totalClicks += 1;
  i.totalCryClicks += 1;
}

export function onClickDoomscrollButton(i: i.Inventory): void {
  i.anxiety += 50;
  i.missedOpportunities += 5;
  i.totalClicks += 1;
}

export function getMoneyPerSecondFromBlogPosts(i:i.Inventory): number {
  if(i.blog.hasMonetizedBlog) {
    let value = 0.00;
    // Blogs generate Money
    value += Number((i.blog.posts / 100).toFixed(2));

    if(i.blog.hasImprovedAutomations) {
      value += value * 0.25;
    }

    if(i.blog.hasRefactoredAutomations) {
      value += value * 0.25;
    }

    return Number(value.toFixed(2));
  }
  return 0;
}

export function getMoneyPerSecondFromPodcastEpisodes(i:i.Inventory):number {
  if(i.podcast.hasMonetizedPodcast) {
    let value = 0.00;
    // Podcasts generate Influence and Money
    value += Number((i.podcast.episodes / 100).toFixed(2));

    if(i.podcast.hasImprovedAutomations) {
      value += value * 0.25;
    }

    if(i.podcast.hasRefactoredAutomations) {
      value += value * 0.25;
    }

    return Number(value.toFixed(2));
  }
  return 0;
}



function onClickWorkButton(i: i.Inventory): void {
  i.totalClicks += 1;
  i.missedOpportunities -= 1;
  //i.missedOpportunitiesPerSecond += 0.13;

  // Generate a random fraction of money and anxiety
  const rand = 1+(Math.floor(Math.random() * 5) / 10) + (Math.floor(Math.random() * 9) / 100);

  if(!u.upgradeIsComplete(u.Upgrades.BuyACoffeeMaker, i)) {
    i.anxiety += rand;
    
    if(u.upgradeIsComplete(u.Upgrades.GetABetterJob, i)) {
      i.money += rand; // just doubles what we're making randomly
    }

    if(u.upgradeIsComplete(u.Upgrades.GetAJuniorDevJob,i)) { 
      i.money += rand;
    }
  }

  i.money += rand;
}

function onClickReadButton(i: i.Inventory): void {
  i.totalClicks += 1;
  i.missedOpportunities -= 1;

  // Generate a random amount of cents per click
  const rand = 1+(Math.floor(Math.random() * 5) / 10) + (Math.floor(Math.random() * 9) / 100);
  i.knowledge += rand;

  // This is not a reliable indicator of whether someone's high or not
  if(i.isHigh) {
    i.knowledgePerSecondRollover += 0.01 * rand;
  }
}

// A helper function to easily retrieve a button
// Assumes that all buttons are of type <game-button>
function getGameButton(name: string): HTMLButtonElement | null {
  var gameButtons = document.getElementsByTagName("game-button");
  for(var a=0; a<gameButtons.length;a++){
    if(gameButtons[a].getAttribute('actor') == name) {
      // returns the first match
      return gameButtons[a].shadowRoot?.getElementById(name) as HTMLButtonElement;
    }
  }
  return null;
}

export function initDoomscrollHandler(i:i.Inventory) {
  document.addEventListener("keyup", (event) => {
    if(u.upgradeIsComplete(u.Upgrades.GetOnTikTok, i)) {
      onClickDoomscrollButton(i);
    }
  });
}

// Helpers I use during development; feel free to modify this as needed.
export function initDevelopmentTools(i: i.Inventory) {
  // During development, I can add anxiety quickly
  // event = keyup or keydown
  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      i.anxiety += 50;
      i.days += 50;
    }
    if (event.code === "Enter") {
      i.missedOpportunities += 50;
    }
    if(event.code === "Digit5") {
      i.upgrades.forEach( (upgrade) => {
        upgrade.currentResearchTime = upgrade.totalResearchTime;
        console.log("--> All research upgrades have been converted to unlocks.")
      })
    }
    if(event.code === "Digit1") {
      i.anxiety = 50;
      i.anxietyPerSecond = 0;
    }
    if(event.code === "Digit2") {
      i.money += 50;
    }
    if(event.code ==="Digit9") {
      i.money += 5000;
      i.knowledge += 5000;
      i.days+=9000;
      i.missedOpportunities += 500;
      i.totalCryClicks += 50;
      i.anxiety = 200;
      i.money = 500;
    }
    if(event.code === "Digit8") {
      u.dev_completeUpgrade(u.Upgrades.WorkHardInSchool, i);
      u.dev_completeUpgrade(u.Upgrades.GetAnEntryLevelJob, i);
      u.dev_completeUpgrade(u.Upgrades.GetABetterJob, i);
      u.dev_completeUpgrade(u.Upgrades.BuyACheapComputer, i);
      u.dev_completeUpgrade(u.Upgrades.BuyFasterInternet, i);
      u.dev_completeUpgrade(u.Upgrades.LearnHTML, i);
      u.dev_completeUpgrade(u.Upgrades.StartABlog, i);
      u.dev_completeUpgrade(u.Upgrades.LearnJavascript, i);
      u.dev_completeUpgrade(u.Upgrades.BuyAMidRangeComputer, i);
      u.dev_completeUpgrade(u.Upgrades.ReadBloggingBusinessBook, i);
      u.dev_completeUpgrade(u.Upgrades.ReadGameTheoryAudioBook, i);
      u.dev_completeUpgrade(u.Upgrades.ReadGameDevelopmentBook, i);
      u.dev_completeUpgrade(u.Upgrades.LearnAudioRecording, i);
      u.dev_completeUpgrade(u.Upgrades.LearnAdvancedCoding, i);
      u.dev_completeUpgrade(u.Upgrades.LearnQuantumCoding, i);
      u.dev_completeUpgrade(u.Upgrades.LearnTheoreticalCoding, i);
      //u.dev_completeUpgrade(u.Upgrades.ReadPodcastingBusinessBook, i);
      u.dev_completeUpgrade(u.Upgrades.BuyAudioRecordingEquipment, i);
      u.dev_completeUpgrade(u.Upgrades.StartAPodcast, i);
      i.knowledge += 500;
    }
  });
}

function doGameOver(i: i.Inventory) {
  e.fadeOut(document.getElementById("game-container"));
  (window as any).setTimeout(() => {
    e.fadeIn(document.getElementById("game-over-screen"), false);
    // TODO: Update statistics
    document.getElementById("gameover-age")!.innerText = getNumYearsOld(i);
  }, 1000);
}

// Usage:
// for each upgrade as u:
//  if canAffordUpgrade(u.baseCost)
function canAffordUpgrade(c: u.Cost, i: i.Inventory): boolean {
  // Check anxiety
  let hasAnxietyCost = c.anxiety ? true : false;
  let hasMissedOpportunityCost = c.missedOpportunities ? true : false;

  let canAfford = true;

  if (hasAnxietyCost) {
    if(c.anxiety) {
      if (i.anxiety < c.anxiety) {
        canAfford = false;
      }
    }
  }

  if (hasMissedOpportunityCost) {
    if(c.missedOpportunities) {
      if (i.missedOpportunities < c.missedOpportunities) {
        canAfford = false;
      }
    }
  }

  return canAfford;
}

// Runs once on page load in app.ts
export function onInit(i: i.Inventory) {

  // Initiate the custom elements
  customElements.define('game-button', GameButton);
  
  // Add event listeners to btnHandlers then forEach through
  // them to add a callback on "click"
  let btnHandlers = new Map<string, () => void>();

  btnHandlers.set("ExistButton", () => onClickExistButton(i));
  btnHandlers.set("CryButton", () => onClickCryButton(i));
  btnHandlers.set("DoomscrollButton", () => onClickDoomscrollButton(i));
  btnHandlers.set("WorkButton", () => onClickWorkButton(i));
  btnHandlers.set("ReadButton", () => onClickReadButton(i));
  btnHandlers.set("CreateBlogPostButton", () => onClickCreateBlogPostButton(i));
  btnHandlers.set("HireBlogFreelancerButton", () => onClickHireBlogFreelancerButton(i));
  btnHandlers.set("CreatePodcastEpisodeButton", () => onClickCreatePodcastEpisodeButton(i));
  btnHandlers.set("HirePodcastFreelancerButton", () => onClickHirePodcastFreelancerButton(i));

  btnHandlers.set("toggleBlogAutomationsLink", () => onClickToggleBlogAutomationsLink(i));
  btnHandlers.set("togglePodcastAutomationsLink", () => onClickTogglePodcastAutomationsLink(i));
  
  // Generate/Render all upgrade buttons, and add them to btnHandlers.
  i.upgrades.forEach( (upgrade) => {
    const upgradeElement = document.createElement("div");
    upgradeElement.innerHTML = u.generateUpgradeHtml(upgrade,i);
    
    // Where we put the upgrade depends on its section value
    //console.log(`--> Placing ${upgrade.buttonId} in ${upgrade.section}`)
    switch(upgrade.section) {
      case "try_your_best":
        document.getElementById("tryYourBestInterfaceContainer")?.appendChild(upgradeElement);
        break;
      case "spend_your_money":
        document.getElementById("spendYourMoneyInterfaceContainer")?.appendChild(upgradeElement);
        break;
      case "express_yourself":
        document.getElementById("expressYourselfInterfaceContainer")?.appendChild(upgradeElement);
        break;
      case "create_something":
        document.getElementById("sectionCreateSomethingUpgradesContainer")?.appendChild(upgradeElement);
        break;
      case "blog_upgrades":
        document.getElementById("sectionBlogUpgradesContainer")?.appendChild(upgradeElement);
        break;
      case "podcast_upgrades":
        document.getElementById("sectionPodcastUpgradesContainer")?.appendChild(upgradeElement);
        break;
      case "do_something":
        document.getElementById("sectionDoSomethingContainer")?.appendChild(upgradeElement);
        break;
      default:
        //document.getElementById("tryYourBestInterfaceContainer")?.appendChild(upgradeElement);
        break;
    }

    btnHandlers.set(upgrade.buttonId+"Button", () => u.tryToBuyUpgrade(upgrade, i)); // Add event listener
  });

  /*btnHandlers.forEach((value: () => void, key: string) => {
    if (document.getElementById(key) != null) {
      (document.getElementById(
        key
      ) as HTMLInputElement).addEventListener("click", () => value());
    }
  });*/

  // Upgraded version for the fancy button. Need to update the upgrades generators to
  // use the fancy buttons too, right? Maybe not! Maybe they can stay boring. (Hint: They can!)
  btnHandlers.forEach((value: () => void, key: string) => {
    if (getGameButton(key) != null) {
      getGameButton(key)?.addEventListener("click", () => value());
    } else {
      // Try to fudge the old school buttons here:
      if (document.getElementById(key) != null) {
        (document.getElementById(
          key
        ) as HTMLInputElement).addEventListener("click", () => value());
      }
    }
  });
  
  
}

// Scheduled to run every 33ms (which is about 30FPS) in app.ts
export function onUpdate(i: i.Inventory) {

  updateDaysAsTimeGoesBy(i);

  // All timers and intervals

  // Update the Anxiety Progress bar
  // Since these are 0 - 1000, we need to compute a fraction
  let fraction = i.anxiety / i.maxAnxiety;
  let newVal = Math.round(fraction * 100);
  let progressBar = document.getElementById(
    "anxietyProgress"
  ) as HTMLDivElement;
  progressBar.ariaValueNow = newVal.toString();
  progressBar.style.width = newVal.toString()+"%";
  progressBar.ariaValueMin = "0";
  progressBar.ariaValueMax = "100"; // always going to be 100
  progressBar.ariaValueText = "Anxiety";

  // First disable any button that we can't afford
  let ExistButton = getGameButton("ExistButton")!;
  let CryButton = getGameButton("CryButton")!;
  let WorkButton = getGameButton("WorkButton")!;
  let ReadButton = getGameButton("ReadButton")!;
  let CreateBlogPostButton = getGameButton("CreateBlogPostButton")!;
  let HireBlogFreelancerButton = getGameButton("HireBlogFreelancerButton")!;
  let CreatePodcastEpisodeButton = getGameButton("CreatePodcastEpisodeButton")!;
  let HirePodcastFreelancerButton = getGameButton("HirePodcastFreelancerButton")!;
  
  // exist
  if (i.anxiety === i.maxAnxiety) {
    ExistButton.disabled = true;
  }

  if (i.anxiety !== i.maxAnxiety && ExistButton?.disabled) {
    ExistButton.disabled = false;
  }

  // cry
  if (!canAffordCry(i)) {
    CryButton.disabled = true;
  } else {
    if (CryButton?.disabled) {
      CryButton.disabled = false;
    }
  }

  // work
  if(!canAffordWork(i)){
    WorkButton.disabled = true;
  } else {
    if(WorkButton.disabled) {
      WorkButton.disabled = false;
    }
  }

   // read
   if(!canAffordRead(i)){
    ReadButton.disabled = true;
  } else {
    if(ReadButton.disabled) {
      ReadButton.disabled = false;
    }
  }

  // create blog post
  if(!canAffordCreateBlogPost(i)) {
    CreateBlogPostButton.disabled = true;
  } else {
    if(CreateBlogPostButton.disabled) {
      CreateBlogPostButton.disabled = false;
    }
  }

  if(!canAffordHireBlogFreelancer(i)) {
    HireBlogFreelancerButton.disabled = true;
  } else {
    if(HireBlogFreelancerButton.disabled) {
      HireBlogFreelancerButton.disabled = false;
    }
  }

    // create podcast episode
    if(!canAffordCreatePodcastEpisode(i)) {
      CreatePodcastEpisodeButton.disabled = true;
    } else {
      if(CreatePodcastEpisodeButton.disabled) {
        CreatePodcastEpisodeButton.disabled = false;
      }
    }
  
    if(!canAffordHirePodcastFreelancer(i)) {
      HirePodcastFreelancerButton.disabled = true;
    } else {
      if(HirePodcastFreelancerButton.disabled) {
        HirePodcastFreelancerButton.disabled = false;
      }
    }

  // Second, update all labels (like prices and counts)

  // Update all span values
  let labels = new Map<string, string>();

  labels.set("spanNumAnxiety", i.anxiety.toFixed(0));
  labels.set("spanNumAnxietyInProgressBar", i.anxiety.toFixed(0));
  labels.set("spanNumMaxAnxiety", i.maxAnxiety.toFixed(0));
  labels.set("spanCryCost", getCryCost(i));
  labels.set("spanNumMisedOpportunitiesFromCrying", i.missedOpportunitiesFromCrying.toFixed(2));
  labels.set("spanNumMissedOpportunities", i.missedOpportunities.toFixed(2));
  labels.set("spanNumMoney", getFancyNumber(i.money));
  labels.set("spanNumMoneyPerSecond", i.moneyPerSecond.toFixed(2));
  labels.set("spanNumKnowledge", i.knowledge.toFixed(2));
  labels.set("spanNumKnowledgePerSecond", i.knowledgePerSecond.toFixed(2));
  labels.set("spanNumClickerGameAnxietyReduction", i.clickerGameAnxietyReduction.toFixed(2));
  labels.set("spanNumYearsOld", getNumYearsOld(i));
  labels.set("spanNumDaysOld", getNumDaysOld(i));
  labels.set("spanNumAnxietyPerSecond", i.anxietyPerSecond.toFixed(2));
  labels.set("spanNumMissedOpportunitiesPerSecond", i.missedOpportunitiesPerSecond.toFixed(2));
  labels.set("spanMoneyCount", i.money.toFixed(2));
  labels.set("spanNumInfluence", i.influence.toFixed(2));
  labels.set("spanNumBlogPosts", getFancyNumber(i.blog.posts) + (i.blog.posts == 1 ? ' post' : ' posts'));
  labels.set("spanNumPodcastEpisodes", getFancyNumber(i.podcast.episodes) + (i.podcast.episodes == 1 ? ' episode' : ' episodes'));
  labels.set("spanNumMoneyPerSecondFromBlogPosts", getMoneyPerSecondFromBlogPosts(i).toString());
  labels.set("spanNumMoneyPerSecondFromPodcastEpisodes", getMoneyPerSecondFromPodcastEpisodes(i).toString());
  labels.set("spanBannerNumWorldwidePlayers", getBannerWorldwidePlayersText(i));
  // Since we are generating influence from number of podcast episodes, let's clean up how we show influence/s from podcasting
  labels.set("spanNumInfluencePerSecond", (i.influencePerSecond - i.influencePerSecondFromPodcasting).toFixed(2));
  labels.set("spanNumInfluencePerSecondFromBlogging", i.influencePerSecondFromBlogging.toFixed(2).toString());
  labels.set("spanNumInfluencePerSecondFromPodcasting", (i.influencePerSecond + i.influencePerSecondFromPodcasting).toFixed(2).toString());
  
  // labelAnxietyPerSecond
  // spanNumAnxietyPerSecond
  // labelMissedOpportunitiesPerSecond
  // spanNumMissedOpportunitiesPerSecond

  labels.forEach((value: string, key: string) => {
    //console.log(`Trying ${key} -> ${value}...`);
    if (document.getElementById(key) != null) {
      if (document.getElementById(key)!.innerText !== value) {
        document.getElementById(key)!.innerText = value;
      }
    }
  });

  // Check for new trigger conditions met
  t.updateTriggers(i);
  u.updateAllUpgrades(i);


  // Update generators
  if (i.state.cryButtonEnabled) {
    if (i.anxiety < i.maxAnxiety) {
      let trueAnxietyPerSecond = (i.anxietyPerSecond - i.clickerGameAnxietyReduction);
      if(trueAnxietyPerSecond < 0) { 
        trueAnxietyPerSecond = 0; 
      }
      
      i.anxietyRollover +=  trueAnxietyPerSecond / 33;
      while (i.anxietyRollover - .01 >= 0.00) {
        i.anxietyRollover -= .01;
        i.anxiety += .01;
      }
      
    } else {
      // End game condition 
      if (i.anxiety >= i.maxAnxiety) {
        i.gameOver = true;
        doGameOver(i);
      }
    }
  }

  // To ensure we don't accidentally go below zero
  if (i.anxiety < 0) {
    i.anxiety = 0;
  }

  // Update Anxiety Per Second Rollover
  if (i.anxietyPerSecondRollover > 0.00) {
    i.anxietyPerSecondRollover -= .01;
    i.anxietyPerSecond += .01;
  }

  if(i.anxietyPerSecondRollover < 0.00) {
    i.anxietyPerSecondRollover = 0;
  }

  // Update Money Per Second Rollover
  if (i.moneyPerSecondRollover > 0.00) {
    i.moneyPerSecondRollover -= 0.01;
    i.moneyPerSecond += 0.01;
  }

  if(i.moneyPerSecondRollover < 0.00) {
    i.moneyPerSecondRollover = 0;
  }

  // Update Knowledge Per Second Rollover
  if (i.knowledgePerSecondRollover > 0.00) {
    i.knowledgePerSecondRollover -= .01;
    i.knowledgePerSecond += .01;
  }

  if(i.anxietyPerSecondRollover < 0.00) {
    i.anxietyPerSecondRollover = 0;
  }

  // Update missed opportunity generator
  if(i.missedOpportunitiesPerSecond > 0) {
    i.missedOpportunitiesRollover += i.missedOpportunitiesPerSecond / 33;
    while(i.missedOpportunitiesRollover - .01 > 0.00) {
      i.missedOpportunitiesRollover -= .01;
      i.missedOpportunities += .01;
    }
  }

  // Baseine influence per second 
  if(i.podcast.episodes >= 1) {
    i.influencePerSecond = (i.podcast.episodes / 1000);
  } else {
    i.influencePerSecond = 0;
  }

  // Since we reset influence here, we need to account for bonuses to influence per second here
  if(u.upgradeIsComplete(u.Upgrades.StreamOnTwitch, i)) {
    i.influencePerSecond += 1;
  }
  if(u.upgradeIsComplete(u.Upgrades.StreamOnYoutube, i)) {
    i.influencePerSecond += 1;
  }
  if(u.upgradeIsComplete(u.Upgrades.SponsorASMR, i)) {
    i.influencePerSecond += 1;
  }
  if(u.upgradeIsComplete(u.Upgrades.SponsorChair, i)) {
    i.influencePerSecond += 1;
  }
  if(u.upgradeIsComplete(u.Upgrades.SponsorASMR, i)) {
    i.influencePerSecond += 1;
  }
  if(u.upgradeIsComplete(u.Upgrades.SponsorMouse, i)) {
    i.influencePerSecond += 1;
  }

  // Update influence per second based on blog posts and podcast episodes
  i.influencePerSecondFromBlogging = 0;

  if(i.blog.hasRefactoredAutomations) {
    if(u.upgradeIsComplete(u.Upgrades.WriteASinglePlayerGame, i)) {
      i.influencePerSecondFromBlogging += (i.blog.posts / 1000) * .25;
    }

    if(u.upgradeIsComplete(u.Upgrades.WriteAMultiPlayerGame, i)) {
      i.influencePerSecondFromBlogging += (i.blog.posts / 1000) * .25;
    }

    if(u.upgradeIsComplete(u.Upgrades.WriteAnIdleClickerGame, i)) {
      i.influencePerSecondFromBlogging += (i.blog.posts / 1000) * .25;
    }
  }

  i.influencePerSecond += i.influencePerSecondFromBlogging;

  i.influencePerSecondFromPodcasting = 0;

  if(i.podcast.hasAutomatedPodcast) {
    i.influencePerSecondFromPodcasting += (i.podcast.episodes / 10000) * 0.25;
  }
  if(i.podcast.hasImprovedAutomations) {
    i.influencePerSecondFromPodcasting += (i.podcast.episodes / 10000) * 0.25;
  }
  if(i.podcast.hasRefactoredAutomations){
    i.influencePerSecondFromPodcasting += (i.podcast.episodes / 10000) * 0.25;
  }
  if(u.upgradeIsComplete(u.Upgrades.BuyAdvancedAudioRecordingEquipment, i)) {
    i.influencePerSecondFromPodcasting *= 2;
  }

  i.influencePerSecond += i.influencePerSecondFromPodcasting;

  if(i.influencePerSecond > 0) {
    i.influencePerSecondRollover += i.influencePerSecond / 33;
    while(i.influencePerSecondRollover - 0.01 > 0.00) {
      i.influencePerSecondRollover -= 0.01;
      i.influence += 0.01;
    }
  }

  // Update money generators
  if( (i.moneyPerSecond + getMoneyPerSecondFromBlogPosts(i) + getMoneyPerSecondFromPodcastEpisodes(i)) > 0) {
    i.moneyRollover += (i.moneyPerSecond + getMoneyPerSecondFromBlogPosts(i) + getMoneyPerSecondFromPodcastEpisodes(i)) / 33;
    while(i.moneyRollover - .01 > 0.00) {
      i.moneyRollover -= .01;
      i.money += .01;
    }
  }

  if(i.knowledgePerSecond > 0) {
    i.knowledgeRollover += i.knowledgePerSecond / 33;
    while(i.knowledgeRollover - 0.01 > 0.00) {
      i.knowledgeRollover -= 0.01;
      i.knowledge += 0.01;
    }
  }

  if(i.blog.postsPerSecond > 0) {
    i.blog.postsRollover += i.blog.postsPerSecond / 33;
    while(i.blog.postsRollover - .01 > 0.00) {
      i.blog.postsRollover -= 0.01;
      i.blog.posts += 0.01;
    }
  }

  // If blog automations are active, try to hire freelancers
  if(i.blog.hasAutomatedBlog) {
    if(i.blog.automationsAreRunning) {
      let now = new Date();
      let secondsSinceLastAttemptedFreelancerPurchase = (now.getTime() / 1000) - (i.blog.timestampLastTriedToPurchaseFreelancer.getTime() / 1000);
      if(secondsSinceLastAttemptedFreelancerPurchase > 1) {
        i.blog.timestampLastTriedToPurchaseFreelancer = now;
        if(i.money >= 25) {
          i.blog.posts += 1;
          i.money -= 25;
        }
        if(i.blog.hasImprovedAutomations) {
          if(i.money >= 25) {
            i.blog.posts += 1;
            i.money -= 25;
          }
        }
        if(i.blog.hasRefactoredAutomations) {
          if(i.money >= 25) {
            i.blog.posts += 1;
            i.money -= 25;
          }
        }
      }
    }
  }

  // If podcast automations are active, try to hire freelancers
  if(i.podcast.hasAutomatedPodcast) {
    if(i.podcast.automationsAreRunning) {
      let now = new Date();
      let secondsSinceLastAttemptedFreelancerPurchase = (now.getTime() / 1000) - (i.podcast.timestampLastTriedToPurchaseFreelancer.getTime() / 1000);
      if(secondsSinceLastAttemptedFreelancerPurchase > 1) {
        i.podcast.timestampLastTriedToPurchaseFreelancer = now;
        if(i.money >= 25) {
          i.podcast.episodes += 1;
          i.money -= 25;
        }
        if(i.podcast.hasImprovedAutomations) {
          if(i.money >= 45) {
            i.podcast.episodes += 1;
            i.money -= 45;
          }
        }
        if(i.podcast.hasRefactoredAutomations) {
          if(i.money >= 45) {
            i.podcast.episodes += 1;
            i.money -= 45;
          }
        }
      }
    }
  }

  // Update worldwide players
  if(i.state.hasWorldwidePlayers) {
    let multiplier = 1;
    if(i.blog.hasRefactoredAutomations) {
      multiplier += 0.05;
    }
    if(i.podcast.hasAutomatedPodcast) {
      multiplier += 0.05;
    }
    if(i.podcast.hasImprovedAutomations) {
      multiplier += 0.05;
    }

    if(i.podcast.hasRefactoredAutomations) {
      multiplier += 0.05;
    }

    // After 100M, don't increase anymore until we pass legislation.
    if(!i.state.reached100MillionPlayers) {
      i.worldwidePlayers = i.influence * 1000 * multiplier;
    }
  }



  // Update cannabis effects
  if(i.anxietyPerSecondBeforeCannabis > 0) {
    //let rand = 1+(Math.floor(Math.random() * 5) / 10) + (Math.floor(Math.random() * 9) / 100);
    //i.knowledge += rand;
  }
  // When we're done smoking, our anxiety slowly creeps back up to pre-smoking levels
  if(i.isComingDownFromCannabisHigh) {
    if(i.anxietyPerSecond >= i.anxietyPerSecondBeforeCannabis) {
      i.isComingDownFromCannabisHigh = false;
      i.isHigh = false;
      i.anxietyPerSecond = i.anxietyPerSecondBeforeCannabis; // Just in case
      e.fadeOut(document.getElementById("spanCannabisComeDownIndicator"));
    } else {
      // We're not back to our pre-high levels, so increase!
      i.anxietyPerSecond += 0.01; // .01 per frame.
    }
  }

  // Update idle clicker game effect
  // The more you play, the more your anxiety is reduced per second
  if((window as any).embeddedIdleClickerGameTotalClicksEver != null) {
    // This should exist since we preload it in the index.html file
    i.clickerGameAnxietyReduction = 0.01; // A baseline
    if((window as any).embeddedIdleClickerGameGenerators['autoClickers'].numPurchased != null) {
      i.clickerGameAnxietyReduction += (window as any).embeddedIdleClickerGameGenerators['autoClickers'].numPurchased / 100;
    }
  }
 
}

export function play(i: i.Inventory) {
  onInit(i);

  window.setInterval(function () {
    if(!i.gameOver){
      onUpdate(i);
    }
  }, 33); // 33ms gives us about 30fps
  window.setInterval(() => e.saveGame(i), 2500);

  // This is called ONCE per page load. If we have localStorage data, load it all up
  if (localStorage.getItem("inventory") != null) {
    e.loadGame();
  }
}


