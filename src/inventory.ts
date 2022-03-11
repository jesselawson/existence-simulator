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

import * as u from "./upgrades";

export interface Inventory {
  gameOver: boolean;
  totalClicks: number;
  totalCryClicks: number;
  totalDoubtClicks: number;
  totalSufferClicks: number;
  ageYears: number; // An easy way to store the number of years old we are
  ageDays: number;  // Days % 365
  days: number;
  daysPerSecond: number;
  anxiety: number;
  maxAnxiety: number;
  anxietyRollover: number; // Used for calculating anxiety per frame
  anxietyPerSecond: number;
  anxietyPerSecondRollover: number; // Lets us modify anx/s modularly (e.g., buying a blanket while high doesn't mess up the numbers)
  missedOpportunities: number;
  missedOpportunitiesRollover: number;
  missedOpportunitiesPerSecond: number;
  missedOpportunitiesFromCrying: number;
  intrusiveThoughts: number; // Lots of placeholders for some ideas I had that never did pan out.
  intrusiveThoughtsPerSecond: number;
  nervousBreakdownDays: number;
  totalNervousBreakdowns: number;
  upgrades: u.Upgrade[];
  autoDoubtPerSecond: number;
  socialMediaAccounts: number;
  upgradesPurchased: number;
  money: number;
  moneyRollover: number; // Used for calculating money per frame
  moneyPerSecond: number;
  moneyPerSecondRollover: number; 
  knowledge: number;
  knowledgeRollover: number;
  knowledgePerSecond: number;
  knowledgePerSecondRollover: number;
  hasCannabis: boolean; // True if they have some weed to smoke
  isComingDownFromCannabisHigh: boolean; // true if we need to bring back their anxiety to pre-smoking levels (i.e., the weed has worn off)
  cannabisTolerance: number;
  anxietyPerSecondBeforeCannabis: number; // How much anxiety/s we had before we started smoking
  clickerGameAnxietyReduction: number; // The anxiety/s reduction you get from your idle clicker game
  influence: number;
  influencePerSecond: number;
  influencePerSecondFromBlogging: number;
  influencePerSecondFromPodcasting: number;
  influencePerSecondRollover: number;
  worldwidePlayers: number;
  isHigh: boolean; // If true, they have smoked but have not finished their come-down
  majorGovernmentApprovals: number;
  state: {
    cryButtonEnabled: boolean;
    doubtButtonEnabled: boolean;
    jobEnabled: boolean;
    sufferButtonEnabled: boolean;
    hasSmokedCannabis: boolean; // Smoked for the first time
    gameOver: boolean;
    hasWorldwidePlayers: boolean;
    hasComputer: boolean;
    reached100MillionPlayers: boolean;
    achievedImmortality: boolean;
  };
  blog: {
    posts: number;
    postsRollover: number;
    postsPerSecond: number;
    postsPerSecondRollover: number;
    hasMonetizedBlog: boolean;
    timestampLastTriedToPurchaseFreelancer: Date;
    hasAutomatedBlog: boolean;
    automationsAreRunning: boolean;
    hasImprovedAutomations: boolean;
    hasRefactoredAutomations: boolean;
  };
  podcast: {
    episodes: number;
    episodesRollover: number;
    episodesPerSecond: number;
    episodesPerSecondRollover: number;
    hasMonetizedPodcast: boolean;
    timestampLastTriedToPurchaseFreelancer: Date;
    hasAutomatedPodcast: boolean;
    automationsAreRunning: boolean;
    hasImprovedAutomations: boolean;
    hasRefactoredAutomations: boolean;
  };
  baseCosts: {
    cry: number;
    cryMultiplier: number;
    sleep: number;
    sleepMultiplier: number;
    suffer: number;
    sufferMultiplier: number;
  };
  gameFinishedLoading: boolean;
}

var inventory = {
  gameOver: false,
  totalClicks: 0,
  totalCryClicks: 0,
  totalDoubtClicks: 0,
  totalSufferClicks: 0,
  days: 5840,
  ageYears: 16,
  ageDays: 0,
  anxiety: 0,
  anxietyRollover: 0,
  maxAnxiety: 1000,
  anxietyPerSecond: 0,
  anxietyPerSecondRollover: 0,
  missedOpportunities: 0,
  missedOpportunitiesPerSecond: 0,
  missedOpportunitiesRollover: 0,
  missedOpportunitiesFromCrying: 1.5,
  intrusiveThoughts: 0,
  intrusiveThoughtsPerSecond: 0,
  daysPerSecond: 14,
  nervousBreakdownDays: 30,
  totalNervousBreakdowns: 0,
  autoDoubtPerSecond: 0,
  socialMediaAccounts: 0,
  upgradesPurchased: 0,
  knowledge: 0,
  knowledgeRollover: 0,
  knowledgePerSecond: 0,
  knowledgePerSecondRollover: 0,
  money: 0,
  moneyRollover: 0,
  moneyPerSecond: 0,
  moneyPerSecondRollover: 0,
  hasCannabis: false,
  isComingDownFromCannabisHigh: false,
  cannabisTolerance: 0,
  anxietyPerSecondBeforeCannabis: 0,
  clickerGameAnxietyReduction: 0,
  influence:0,
  influencePerSecond:0,
  influencePerSecondRollover:0,
  influencePerSecondFromBlogging:0,
  influencePerSecondFromPodcasting:0,
  worldwidePlayers: 250,
  isHigh: false,
  majorGovernmentApprovals: 0,
  state: {
    cryButtonEnabled: false,
    jobEnabled: false,
    doubtButtonEnabled: false,
    sufferButtonEnabled: false,
    hasSmokedCannabis: false,
    gameOver: false,
    hasWorldwidePlayers: false,
    hasComputer: false,
    reached100MillionPlayers: false,
    achievedImmortality: false,

  },
  blog: {
    posts: 0,
    postsRollover: 0,
    postsPerSecond: 0,
    postsPerSecondRollover: 0,
    hasMonetizedBlog: false,
    hasAutomatedBlog: false,
    automationsAreRunning: true,
    timestampLastTriedToPurchaseFreelancer: new Date(),
    hasImprovedAutomations: false,
    hasRefactoredAutomations: false,
  },
  podcast: {
    episodes: 0,
    episodesRollover: 0,
    episodesPerSecond: 0,
    episodesPerSecondRollover: 0,
    hasMonetizedPodcast: false,
    hasAutomatedPodcast: false,
    automationsAreRunning: true,
    timestampLastTriedToPurchaseFreelancer: new Date(),
    hasImprovedAutomations: false,
    hasRefactoredAutomations: false,
  },
  baseCosts: {
    cry: 7,
    cryMultiplier: 1.13,
    sleep: 100,
    sleepMultiplier: 1.27,
    suffer: 100,
    sufferMultiplier: 1.33
  },
  gameFinishedLoading: false,
  upgrades: u.getUpgrades()
};

export function initInventory() {
  let inv = inventory;
  (window as any).inventory = inv;
}

export function getInventory() {
  return inventory;
}
