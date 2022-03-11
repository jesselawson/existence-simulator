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

import { Upgrade, Upgrades, revealUpgradeButton, hideUpgradeButton, resetUpgrade, upgradeIsComplete, upgradeIsNotPurchasedOrComplete, upgradesAreComplete } from "./upgrades";
import { Inventory } from "./inventory";
import { setHelpText } from "./game";
import * as e from "./engine";

export function GetSocialMedia():Upgrade {

    const u = { buttonId: Upgrades.GetSocialMedia,
      buttonLabel: "Get on Twitter",
      section: "express_yourself",
      descriptionBeforePurchase: "Costs 10 Missed Opportunities. Generates +1 Missed Opportunities per second and also slightly increases Anxiety per second (though we never really know by how much, do we?).",
      descriptionAfterPurchase: "You're exposed to the world of content creators, and can see what's possible with a computer and some Knowledge.",
      startsRevealed: true,
      purchased: false,
      shouldRedraw: false,
      finished: false,
      type: "unlock",
      totalResearchTime: 10,
      currentResearchTime: 0,
  
      canAfford: function(i: Inventory) {
        return i.missedOpportunities >= 10;
      },
  
      purchase: (i:Inventory) => {
        i.missedOpportunities -= 10;
        i.upgradesPurchased += 1;
        i.missedOpportunitiesPerSecond += 1;
      },
      
      unlock: function (i: Inventory) {
        e.fadeIn(document.getElementById("sectionMissedOpportunitiesPerSecond"));
        e.fadeIn(document.getElementById("spanNumMissedOpportunitiesPerSecond"));
  
        // You don't know about cannabis until you get on social media
        revealUpgradeButton(Upgrades.BuySomeCannabis, i);
        
        if(upgradeIsComplete("upgradeStartTakingNaps", i)){
          i.anxietyPerSecondRollover += 0.13;
          setHelpText("😵‍💫 Doomscrolling everyday has ruined your ability to nap, but you're generating a lot more Missed Opportunities.");
        } else {
          i.anxietyPerSecondRollover += 0.23;
          setHelpText("😵‍💫 There are tons of content creators on social media. Some people are even making things like idle clicker games! It's fun to follow along, and it might even give you some ideas...")
        }
      }
    };
    return u;
  }

  export function GetOnTikTok():Upgrade {

    const u = { buttonId: Upgrades.GetOnTikTok,
      buttonLabel: "Get on TikTok",
      section: "express_yourself",
      descriptionBeforePurchase: "Costs 25 Missed Opportunities. Unlocks Doomscrolling (hit spacebar to instantly generate 50 Anxiety and 5 Missed Opportunities).",
      descriptionAfterPurchase: "Unlocked Doomscrolling",
      startsRevealed: true,
      purchased: false,
      shouldRedraw: false,
      finished: false,
      type: "research",
      totalResearchTime: 10,
      currentResearchTime: 0,
  
      canAfford: function(i: Inventory) {
        return i.missedOpportunities >= 25;
      },
  
      purchase: (i:Inventory) => {
        i.missedOpportunities -= 25;
        i.upgradesPurchased += 1;
      },
      
      unlock: function (i: Inventory) {
        e.fadeInTableRow(document.getElementById("sectionDoomscroll"));
        setHelpText("You can now Doomscroll on your favorite social media platforms. Neat! Hit your spacebar to Doomscroll.")
      }
    };
    return u;
}
  
  export function StartTakingNaps():Upgrade {
    const u = { buttonId: Upgrades.StartTakingNaps,
      buttonLabel: "Start taking naps",
      section: "express_yourself",
      descriptionBeforePurchase: "Costs 10 missed opportunities. Slightly increases Missed Opportunities per second. Maybe helps with anxiety, too?",
      descriptionAfterPurchase: "",
      startsRevealed: true,
      purchased: false,
      shouldRedraw: false, 
      finished: false,
      type: "unlock",
      totalResearchTime: 0,
      currentResearchTime: 0,
  
      canAfford: function(i: Inventory) {
        return i.missedOpportunities >= 10
      },
  
      purchase: (i:Inventory) => {
        i.missedOpportunities -= 10;
        i.upgradesPurchased += 1;
      },
      
      unlock: function (i: Inventory) {
        if(upgradeIsComplete(Upgrades.GetSocialMedia, i)) {
          i.anxietyPerSecondRollover += 0.43;
          i.missedOpportunitiesPerSecond += 0.13;
          setHelpText("😵‍💫 You're laying down to take naps but doomscrolling on your phone makes it hard to fall asleep.");
        } else {
          i.anxietyPerSecond -= 0.13;
          i.missedOpportunitiesPerSecond += 0.43;
          setHelpText("😵‍💫 There's a slight benefit to closing your eyes and trying to fall asleep every once in a while. Good thing your phone isn't buzzing!");
        }
  
        e.fadeIn(document.getElementById("sectionMissedOpportunitiesPerSecond"));
        e.fadeIn(document.getElementById("spanNumMissedOpportunitiesPerSecond"));
  
      }
    };
    return u;
  }

export function WorkHardInSchool():Upgrade{
    const upgrade = { buttonId: Upgrades.WorkHardInSchool,
    buttonLabel: "Work hard in school",
    section: "try_your_best",
    type: "research",
    descriptionBeforePurchase: "Costs 20 Missed Opportunities. Makes it easier to find a job, but also increases the anxiety you generate passively. Maybe improves life later on, too?",
    descriptionAfterPurchase: "You traded a social life for trying to actually learn something in school. But what did you learn, really?",
    startsRevealed: true,
    purchased: false,
    finished: false,
    shouldRedraw: false, 
    totalResearchTime: 5,
    currentResearchTime: 0,
    
    canAfford: function(i: Inventory) {
      return i.missedOpportunities >= 20; 
    },
    purchase: function(i:Inventory) {
      i.upgradesPurchased += 1;
      i.missedOpportunities -= 20;
    },
    unlock: function (i: Inventory) {
      i.anxietyPerSecondRollover += 1;
      setHelpText("😵‍💫 Now you know that mitochondria are the powerhouse of the cell. Your social anxiety is through the roof, but maybe now you can find yourself a job!")
    }
  };
  return upgrade;
}

export function GetAnEntryLevelJob():Upgrade {
    const upgrade = { 
        buttonId: Upgrades.GetAnEntryLevelJob,
        buttonLabel: "Get an entry-level job",
        section: "try_your_best",
        descriptionBeforePurchase: "Costs 25 Missed Opportunities if you worked hard in school, 50 if you didn't. Unlocks the ability to convert Missed Opportunities into money by Working--just like real life!",
        descriptionAfterPurchase: "You have unlocked Working, which converts Missed Opportunity into Money (and anxiety, too, if you don't drink Coffee).",
        startsRevealed: true,
        purchased: false,
        type: "research",
        totalResearchTime: 10,
        currentResearchTime: 0,
        finished: false,
        shouldRedraw: false,
        
        canAfford: function(i: Inventory) {
          let didWorkHard = upgradeIsComplete(Upgrades.WorkHardInSchool, i);
          return didWorkHard ? i.missedOpportunities >= 25 : i.missedOpportunities >= 50;
        },
    
        purchase: function(i:Inventory) {
          i.upgradesPurchased += 1;
          let didWorkHard = upgradeIsComplete(Upgrades.WorkHardInSchool, i);
          i.missedOpportunities -= didWorkHard ? 25 : 50;
          if(upgradeIsComplete("upgradeWorkHardInSchool", i)){ 
            setHelpText("The job hunt begins!");
          }
          
        },
        
        unlock: function (i: Inventory) {
          e.fadeInTableRow(document.getElementById("sectionWork"));
          e.fadeIn(document.getElementById("labelWork"));
          e.fadeIn(document.getElementById("sectionMoney"));
          revealUpgradeButton(Upgrades.GetABetterJob, i);
          revealUpgradeButton(Upgrades.BuyACheapComputer, i);
    
          // Manually update the button section 
          
          setHelpText("You've unlocked Working! When you Work, you convert Missed Opportunities into some Money. You can use your money to buy things to help reduce your Anxiety -- or create new avenues of Money generation!")
        }
      };

      return upgrade;
}

export function GetABetterJob():Upgrade {
    const u = { buttonId: Upgrades.GetABetterJob,
        buttonLabel: "Get a better job",
        section: "try_your_best",
        descriptionBeforePurchase: "Costs 50 Missed Opportunities if you worked hard in school, 100 if you didn't. In addition to slightly higher pay per work, generates some money per second.",
        descriptionAfterPurchase: "It's not entry-level, but it's just as hard (if not harder). At least the money is a bit better.",
        purchased: false,
        finished: false,
        shouldRedraw: false,
        type: "research",
        totalResearchTime: 35,
        currentResearchTime: 0,
        
        canAfford: function(i: Inventory) {
          let didWorkHard = upgradeIsComplete(Upgrades.WorkHardInSchool, i);
          let didGetEntryLevelJob = upgradeIsComplete(Upgrades.GetAnEntryLevelJob, i);
    
          return (didWorkHard ? i.missedOpportunities >= 50 : i.missedOpportunities >= 100) && didGetEntryLevelJob;
        },
    
        purchase: function(i:Inventory) {
          i.upgradesPurchased += 1;
          
          let didWorkHard = upgradeIsComplete(Upgrades.WorkHardInSchool, i);
    
          i.missedOpportunities -= didWorkHard ? 50 : 100;
          i.moneyPerSecondRollover += 2.79;
          i.anxietyPerSecondRollover += 0.33;
        },
        
        unlock: function (i: Inventory) {
          
          e.fadeIn(document.getElementById("sectionMoneyPerSecond"));
          setHelpText("With a slightly better job, your income is a bit more steady. But the increased pay comes with increased responsibilities -- which in turn comes with increased anxiety per second!");
        }
      };
      return u;
}

export function LearnJavascript():Upgrade {
    const u = { 
        buttonId: Upgrades.LearnJavascript,
      buttonLabel: "Learn Javascript",
      section: "try_your_best",
      descriptionBeforePurchase: "Costs 40 Missed Opportunities and $29. Unlocks building automations for your Blog and/or Podcast.",
      descriptionAfterPurchase: "Now you're &lt;script&gt;ing your way to success.",
      purchased: false,
      shouldRedraw: false,
      type: "research",
      totalResearchTime: 45,
      currentResearchTime: 0,
      finished: false,
  
      canAfford: function(i: Inventory) {
        return i.money >= 29 && i.missedOpportunities >= 40
      },
  
      purchase:(i:Inventory) => {
        i.money -= 29;
        i.missedOpportunities -= 40;
        i.upgradesPurchased += 1;
      },
      
      unlock: function (i: Inventory) {
        setHelpText("Now that you know Javascript, you're able to see the business of content creation from a new angle. You can now create automations for your Blog and/or Podcast.");
        revealUpgradeButton(Upgrades.BuildAutomationsForBlog, i);
        revealUpgradeButton(Upgrades.LearnAdvancedCoding, i);
      }
    };
    return u;
  }

  export function LearnAdvancedCoding():Upgrade {
    const u = { 
        buttonId: Upgrades.LearnAdvancedCoding,
      buttonLabel: "Learn Advanced Coding",
      section: "try_your_best",
      descriptionBeforePurchase: "Costs 90 Missed Opportunities and $69. Must have a Mid-Range Computer or better. Unlocks improved automations. Combined with reading about game development and theory, unlocks getting a gamedev job and writing your own games.",
      descriptionAfterPurchase: "Your coding skills are out of this world.",
      purchased: false,
      shouldRedraw: false,
      type: "research",
      totalResearchTime: 120,
      currentResearchTime: 0,
      finished: false,
  
      canAfford: function(i: Inventory) {
        return i.money >= 69 && i.missedOpportunities >= 90 && upgradeIsComplete(Upgrades.BuyAMidRangeComputer,i)
      },
  
      purchase:(i:Inventory) => {
        i.money -= 69;
        i.missedOpportunities -= 90;
        i.upgradesPurchased += 1;
      },
      
      unlock: function (i: Inventory) {
        setHelpText("With advanced coding skills, you'll be able to work toward a job in game development, write your own games, and significantly improve your Blog and Podcast automations.");
        revealUpgradeButton(Upgrades.GetAGameDevJob, i);
      }
    };
    return u;
}


    //ud.DevelopAVersionOftheHumanConsciousnessExpressedAsIdleGameMechanics(),
export function LearnQuantumCoding():Upgrade {
      const u = { 
          buttonId: Upgrades.LearnQuantumCoding,
        buttonLabel: "Learn Quantum Coding",
        section: "try_your_best",
        descriptionBeforePurchase: "Costs 120 Missed Opportunities and $2500. Requires a High-Performance Computer. If you're going to get the whole world to play Existence Simulator, you'll need to live on the cutting edge of science. Take an online class by Professor Dr. Gabriella Timeknifetry, the leading expert in quantum computing manifold structures.",
        descriptionAfterPurchase: "You are an expert on quantum computing manifold structures.",
        purchased: false,
        shouldRedraw: false,
        type: "research",
        totalResearchTime: 350,
        currentResearchTime: 0,
        finished: false,
    
        canAfford: function(i: Inventory) {
          return i.money >= 2500 && i.missedOpportunities >= 120 && upgradesAreComplete(i, Upgrades.BuyAHighPerformanceComputer, Upgrades.LearnAdvancedCoding)
        },
    
        purchase:(i:Inventory) => {
          i.money -= 2500;
          i.missedOpportunities -= 120;
          i.upgradesPurchased += 1;
        },
        
        unlock: function (i: Inventory) {
          setHelpText("Your knowledge about quantum computing has led you to new ideas on how to get more people to play your game. The next step is to merge the quantum with the theoretical by learning about Theoretical Computing.");
          revealUpgradeButton(Upgrades.LearnTheoreticalCoding, i);

        }
      };
      return u;
}

export function LearnTheoreticalCoding():Upgrade {
  const u = { 
      buttonId: Upgrades.LearnTheoreticalCoding,
    buttonLabel: "Learn Theoretical Coding",
    section: "try_your_best",
    descriptionBeforePurchase: "Costs 160 Missed Opportunities and $5000. Propel yourself from the limits of scientific knowledge and take a deep-dive into theoretical computing and software development with a class by Professor Dr. Ambassador Dutchess Kimberly Finebinaryton.",
    descriptionAfterPurchase: "You are an expert on theoretical software development.",
    purchased: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 450,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.money >= 5000 && i.missedOpportunities >= 160 && upgradeIsComplete(Upgrades.LearnQuantumCoding,i)
    },

    purchase:(i:Inventory) => {
      i.money -= 5000;
      i.missedOpportunities -= 160;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("Merging your understanding of quantum manifolds with theoretical computer programming has led you to a breakthrough in the field of hypothetical data structures: you have found evidence that the human consciousness can be expressed as a series of idle clicker game mechanics, which may offer you a chance at full immortality.");
      revealUpgradeButton(Upgrades.DevelopAVersionOftheHumanConsciousnessExpressedAsIdleGameMechanics, i);

    }
  };
  return u;
}

export function DevelopAVersionOftheHumanConsciousnessExpressedAsIdleGameMechanics():Upgrade {
  const u = { 
      buttonId: Upgrades.DevelopAVersionOftheHumanConsciousnessExpressedAsIdleGameMechanics,
    buttonLabel: "Develop a version of human consciousness expressed as idle game mechanics",
    section: "try_your_best",
    descriptionBeforePurchase: "Costs 400 Missed Opportunities and $25,000. If your theories are correct, this will allow your consciousness to live on forever in a distributed, world-wide network of 'Existence Simulator' games.",
    descriptionAfterPurchase: "You have achieved immortality.",
    purchased: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 700,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.missedOpportunities >= 400 && i.money >= 25000 && upgradeIsComplete(Upgrades.LearnTheoreticalCoding,i)
    },

    purchase:(i:Inventory) => {
      i.money -= 25000;
      i.missedOpportunities -= 400;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("Your body is now an empty sleeve, and your consciousness has been wholly re-expressed as mechanics in hundreds of thousands of copies of 'Existence Simulator' running all over the world. You will live on forever, conscious insofar as your mind and the idle clicker game 'Existence Simulator' are now one and the same.");
      i.state.achievedImmortality = true;
      e.fadeOut(document.getElementById("spanBannerAge"));
      e.fadeIn(document.getElementById("spanBannerImmortal"));
    }
  };
  return u;
}

export function GetAJuniorDevJob():Upgrade {
    const u = { buttonId: Upgrades.GetAJuniorDevJob,
      buttonLabel: "Get a Junior Developer Job",
      section: "try_your_best",
      descriptionBeforePurchase: "Costs 50 Missed Opportunities and 100 Knowledge. Must know HTML and Javascript. Anxiety per second resets to zero. Working makes more money, and you generate more money per second.",
      descriptionAfterPurchase: "Make more money per second. Anxiety per second is now capped at 20.",
      purchased: false,
      shouldRedraw: false,
      type: "research",
      totalResearchTime: 120,
      currentResearchTime: 0,
      finished: false,
  
      canAfford: function(i: Inventory) {
        return i.missedOpportunities >= 50 && i.knowledge >= 100 && upgradesAreComplete(i, Upgrades.LearnHTML, Upgrades.LearnJavascript);
      },
  
      purchase:(i:Inventory) => {
        i.missedOpportunities -= 50;
        i.knowledge -= 100;
        i.upgradesPurchased += 1;
        setHelpText("The job hunt begins!");
      },
      
      unlock: function (i: Inventory) {
        i.moneyPerSecondRollover += 7.09;
        i.anxietyPerSecond = 0;
        i.anxietyPerSecondRollover = 0;
  
        if(upgradeIsNotPurchasedOrComplete(Upgrades.GetABetterJob,i)){
          hideUpgradeButton(Upgrades.GetABetterJob);
        }
  
       
      }
    };
    return u;
  }

  export function GetAGameDevJob():Upgrade {
    const u = { buttonId: Upgrades.GetAGameDevJob,
      buttonLabel: "Get a Game Developer job",
      section: "try_your_best",
      descriptionBeforePurchase: "Costs 50 Missed Opportunities and 200 Knowledge. Must have read about game theory and development. Must know advanced coding. Must have a mid-range computer or better. Anxiety per second reduced by 5. Working makes more money, and you generate more money per second.",
      descriptionAfterPurchase: "Make more money per second. Anxiety per second is now capped at 20.",
      purchased: false,
      shouldRedraw: false,
      type: "research",
      totalResearchTime: 200,
      currentResearchTime: 0,
      finished: false,
  
      canAfford: function(i: Inventory) {
        return i.missedOpportunities >= 50 && i.knowledge >= 200 && upgradesAreComplete(i, Upgrades.ReadGameDevelopmentBook, Upgrades.ReadGameTheoryAudioBook, Upgrades.BuyAMidRangeComputer, Upgrades.LearnAdvancedCoding);
      },
  
      purchase:(i:Inventory) => {
        i.missedOpportunities -= 50;
        i.knowledge -= 200;
        i.upgradesPurchased += 1;
      },
      
      unlock: function (i: Inventory) {
        i.moneyPerSecondRollover += 8.19;
        if(i.anxietyPerSecond >= 5) {
          i.anxietyPerSecond -= 5;
        } else {
          i.anxietyPerSecond = 0;
        }

        if(upgradeIsNotPurchasedOrComplete(Upgrades.GetABetterJob,i)){
          hideUpgradeButton(Upgrades.GetABetterJob);
        }

        if(upgradeIsNotPurchasedOrComplete(Upgrades.GetAJuniorDevJob, i)) {
          hideUpgradeButton(Upgrades.GetAJuniorDevJob);
        }        
      }
    };
    return u;
  }

  export function BuyAHouse():Upgrade {
    const u = { buttonId: Upgrades.BuyAHouse,
      buttonLabel: "Buy a house",
      section: "spend_your_money",
      descriptionBeforePurchase: "Costs $419,000. Increases your maximum anxiety to 100,000.",
      descriptionAfterPurchase: "You own a small home.",
      startsRevealed: true,
      purchased: false,
      shouldRedraw: false,
      type: "unlock",
      totalResearchTime: 0,
      currentResearchTime: 0,
      finished: false,
      
      canAfford: function(i: Inventory) {
        return i.money >= 419000
      },
  
      purchase: (i:Inventory) => {
        i.money -= 419000;
        i.upgradesPurchased += 1;
      },
      
      unlock: function (i: Inventory) {
        i.maxAnxiety = 1000000;
        setHelpText("You've purchased your own home. Your max anxiety has increased from 1,000 to 100,000.");
      }
    };

    return u;
  }


  export function ReadAGameDevelopmentBook():Upgrade {
    const u = { buttonId: Upgrades.ReadGameDevelopmentBook,
        buttonLabel: "Read a game development book",
        section: "try_your_best",
        descriptionBeforePurchase: "Costs $49.99 and 40 Knowledge. After reading this and listening to the game theory audio book, you'll be able to start making your own games.",
        descriptionAfterPurchase: "",
        startsRevealed: false,
        purchased: false,
        shouldRedraw: false,
        type: "research",
        totalResearchTime: 150,
        currentResearchTime: 0,
        finished: false,
        
        canAfford: function(i: Inventory) {
          return i.money >= 49.99  && i.knowledge >= 40
        },
    
        purchase: (i:Inventory) => {
          i.money -= 49.99;
          i.knowledge -= 40;
          i.upgradesPurchased += 1;
        },
        
        unlock: function (i: Inventory) {
          e.fadeIn(document.getElementById("sectionGameDevelopmentContainer"));
          revealUpgradeButton(Upgrades.WriteASinglePlayerGame, i);
          setHelpText("Wow! Who would have thought that game development was such a dynamic form of artistic expression? Games are truly powerful, and may even have an idle capacity to change the world...");
        }
      };

      return u;
}

export function ReadAGameTheoryAudioBook():Upgrade {
    const u = { buttonId: Upgrades.ReadGameTheoryAudioBook,
        buttonLabel: "Listen to a game theory audio book",
        section: "try_your_best",
        descriptionBeforePurchase: "Costs $49.99 and 65 Knowledge. Prerequisite to writing your own games.",
        descriptionAfterPurchase: "",
        startsRevealed: false,
        purchased: false,
        shouldRedraw: false,
        type: "research",
        totalResearchTime: 150,
        currentResearchTime: 0,
        finished: false,
        
        canAfford: function(i: Inventory) {
          return i.money >= 49.99 && i.knowledge >= 65
        },
    
        purchase: (i:Inventory) => {
          i.money -= 49.99;
          i.knowledge -= 65;
          i.upgradesPurchased += 1;
        },
        
        unlock: function (i: Inventory) {
          setHelpText("Game theory has opened up your eyes to the extreme, world-changing power of computer games. But what will you do with this new understanding?");
        }
      };
      return u;
}

export function WriteASinglePlayerGame():Upgrade {
  const u = { buttonId: Upgrades.WriteASinglePlayerGame,
      buttonLabel: "Write a single-player game",
      section: "create_something",
      descriptionBeforePurchase: "Costs 100 Knowledge and 100 Missed Opportunities. Must have read about game theory and about game development. Podcast Episodes and Blog Posts generate 25% more Money and Influence.",
      descriptionAfterPurchase: "You created 'Existence RPG.'",
      startsRevealed: false,
      purchased: false,
      shouldRedraw: false,
      type: "research",
      totalResearchTime: 300,
      currentResearchTime: 0,
      finished: false,
      
      canAfford: function(i: Inventory) {
        return i.missedOpportunities >= 100 && i.knowledge >= 100 && upgradesAreComplete(i, Upgrades.ReadGameTheoryAudioBook, Upgrades.ReadGameDevelopmentBook)
      },
  
      purchase: (i:Inventory) => {
        i.missedOpportunities -= 100;
        i.knowledge -= 100;
        i.upgradesPurchased += 1;
      },
      
      unlock: function (i: Inventory) {
        setHelpText("You've completed your first game, a single-player adventure called 'Existence RPG' about existing in today's world. Since games reduce anxiety, more people playing your game means less anxiety in the world. ❤️ The more Blog Posts and Podcast Episodes you create, the more Influence you generate -- and the more Influence you generate, the more people play your game.");
        revealUpgradeButton(Upgrades.WriteAMultiPlayerGame, i);
      }
    };
    return u;
}

export function WriteAMultiPlayerGame():Upgrade {
  const u = { buttonId: Upgrades.WriteAMultiPlayerGame,
      buttonLabel: "Write a multiplayer game",
      section: "create_something",
      descriptionBeforePurchase: "Costs 200 Knowledge and 200 Missed Opportunities. Blog Posts and Podcast Episodes generate 25% more Influence. Prerequisite to writing 'Existence Simulator,' an idle clicker game that will take over the world.",
      descriptionAfterPurchase: "You created 'Existence RPG Online.'",
      startsRevealed: false,
      purchased: false,
      shouldRedraw: false,
      type: "research",
      totalResearchTime: 300,
      currentResearchTime: 0,
      finished: false,
      
      canAfford: function(i: Inventory) {
        return i.missedOpportunities >= 200 && i.knowledge >= 200
      },
  
      purchase: (i:Inventory) => {
        i.missedOpportunities -= 200;
        i.knowledge -= 200;
        i.upgradesPurchased += 1;
      },
      
      unlock: function (i: Inventory) {
        setHelpText(`Your multiplayer game is a huge hit. So many people have reduced their anxiety by playing your games! ❤️ With all the attention your pursuits are bringing, a warm and comforting truth washes over you: If you're going to truly share the anxiety-reducing power of games with as many people as possible, you need to go all-in. You can now get to work on your magnum opus: the idle clicker game 'Existence Simulator.'`);
        revealUpgradeButton(Upgrades.WriteAnIdleClickerGame, i);
        
      }
    };
    return u;
}

export function WriteAnIdleClickerGame():Upgrade {
  const u = { buttonId: Upgrades.WriteAnIdleClickerGame,
      buttonLabel: "Write an idle clicker game",
      section: "create_something",
      descriptionBeforePurchase: "This is it: your magnum opus. Build the gravity-defying, expectation-satisfying, world-renowned idle clicker game 'Existence Simulator.' Costs 300 Knowledge and 300 Missed Opportunities. Unlocks Worldwide Players. Blog Posts and Podcast Episodes generate 25% more Influence.",
      descriptionAfterPurchase: "You created 'Existence Simulator.'",
      startsRevealed: false,
      purchased: false,
      shouldRedraw: false,
      type: "research",
      totalResearchTime: 400,
      currentResearchTime: 0,
      finished: false,
      
      canAfford: function(i: Inventory) {
        return i.missedOpportunities >= 300 && i.knowledge >= 300
      },
  
      purchase: (i:Inventory) => {
        i.missedOpportunities -= 300;
        i.knowledge -= 300;
        i.upgradesPurchased += 1;
      },
      
      unlock: function (i: Inventory) {
        setHelpText("You have completed 'Existence Simulator', the idle clicker game that has taken itch.io by storm. You can now track your Worldwide Players. When you generate Influence, you increase your Worldwide Players. Try to get as many people as possible to play your game by getting the word out with your Blog and Podcast, and you can now also start Streaming and get Sponsorships.");
        i.state.hasWorldwidePlayers = true;
        e.fadeIn(document.getElementById("sectionWorldwidePlayersProgress"),false);
        e.fadeIn(document.getElementById("spanBannerWorldwidePlayers"));
        revealUpgradeButton(Upgrades.BuyAHighPerformanceComputer, i);
        revealUpgradeButton(Upgrades.LearnQuantumCoding, i);
        revealUpgradeButton(Upgrades.StreamOnTwitch, i);
        revealUpgradeButton(Upgrades.StreamOnYoutube, i);
        revealUpgradeButton(Upgrades.SponsorMouse, i);
        revealUpgradeButton(Upgrades.SponsorChair, i);
        revealUpgradeButton(Upgrades.SponsorDrink, i);
        revealUpgradeButton(Upgrades.SponsorASMR, i);
      }
    };
    return u;
}



export function BuySomeCannabis():Upgrade {
    const u = { buttonId: Upgrades.BuySomeCannabis,
        buttonLabel: "Buy some cannabis",
        section: "spend_your_money",
        descriptionBeforePurchase: `(Must be 21+ years old) Costs $50, then you can smoke it. Smoking cannabis immediately generates 75 Missed Opportunities. Reading while high increases the amount of Knowledge you passively generate per second.`,
        descriptionAfterPurchase: "",
        purchased: false,
        shouldRedraw: false,
        type: "unlock",
        totalResearchTime: 0,
        currentResearchTime: 0,
        finished: false,
        
        canAfford: function(i: Inventory) {
          return i.ageYears >= 21 && i.money >= 50.00;
        },
    
        purchase:(i:Inventory) => {
          i.money -= 50.00;
          i.missedOpportunities += 75;
          i.upgradesPurchased += 1;
          i.hasCannabis = true;
        },
        
        unlock: function (i: Inventory) {
          revealUpgradeButton(Upgrades.SmokeCannabis, i);
          resetUpgrade(Upgrades.SmokeCannabis,i);
          // Then hide this button
          setTimeout(function() {
            hideUpgradeButton(Upgrades.BuySomeCannabis);
          }, 1000);
          
          // Randomly generate a strain name
          const left = ["Purple", "Crazy", "Space", "Blue", "Frosty", "Girl Scout", "Green", "Fruity", "Alligator", "Memphis", "Norcal", "Inland"];
          const right = ["Spice", "Pebbles", "Tang", "Beach", "Brainfuzz", "Coucher", "Sprinkles", "Berry", "Cookies", "Cake", "Haze"];
          const type = ["sativa-dominant hybrid", "indica-dominant hybrid", "balanced hybrid", "pure sativa strain", "pure indica strain"];
          let randomStrainName = left[Math.floor(Math.random() * left.length)] + " " + right[Math.floor(Math.random() * right.length)];
          let randomTypeName = type[Math.floor(Math.random() * type.length)];
    
          setHelpText(`You've purchased ${randomStrainName}, a ${randomTypeName} from Doober, the cannabis delivery service.`);
        }
      };
      return u;
}

export function SmokeSomeCannabis():Upgrade {
    const u = { buttonId: Upgrades.SmokeCannabis,
        buttonLabel: "Smoke some cannabis",
        section: "try_your_best",
        descriptionBeforePurchase: "Generates 75 Missed Opportunities. Significantly reduces anxiety per second for an amount of time based on your tolerance. If Online Learning is unlocked, generates Knowledge per second when you Read. (Once your high is over, you'll be able to re-purchase more cannabis).",
        descriptionAfterPurchase: "You're high right now 🌿. This effect is temporary. Knowledge gained from Reading is significantly increased.",
        purchased: false,
        shouldRedraw: false,
        type: "research",
        totalResearchTime: 5,
        currentResearchTime: 0,
        finished: false,
        
        canAfford: function(i: Inventory) {
          return i.hasCannabis
        },
    
        purchase: (i:Inventory) => {
          i.missedOpportunities += 75;
          i.upgradesPurchased += 1;
        },
        
        unlock: function (i: Inventory) {
          i.isHigh = true;
          if(i.cannabisTolerance < 25) {
            i.cannabisTolerance += 1;
          } else {
            i.cannabisTolerance = 25; // max out at 5s response to high tolerance smoking sessions
          }
    
          // Save our anxiety per second before getting high
          i.anxietyPerSecondBeforeCannabis = i.anxietyPerSecond;
    
          // You don't anymore!
          i.hasCannabis = false;
    
          // If you smoke while you're already coming down, that's okay.
          if(i.isComingDownFromCannabisHigh) {
            i.isComingDownFromCannabisHigh = false;
            e.fadeOut(document.getElementById("spanCannabisComeDownIndicator"));
          }
          
          // Reduce our anxiety based on our tolerance
          i.anxietyPerSecond = 0.25 * i.cannabisTolerance;
    
          // Calculate tolerance
          let toleranceTime = 30000; // Start at 30s
          if(i.cannabisTolerance >= 1) {
            toleranceTime -= (1000 * i.cannabisTolerance);
          }
    
          e.fadeIn(document.getElementById("spanCannabisEffectIndicator"));
    
          // Then hide this button
          setTimeout(function() {
            hideUpgradeButton(Upgrades.SmokeCannabis);
            resetUpgrade(Upgrades.BuySomeCannabis,i);
            revealUpgradeButton(Upgrades.BuySomeCannabis, i);
            e.fadeOut(document.getElementById("spanCannabisEffectIndicator"));
            e.fadeIn(document.getElementById("spanCannabisComeDownIndicator"));
            setHelpText("The cannabis is wearing off. Your anxiety per second will slowly return to where it was before you got high.");
            i.isComingDownFromCannabisHigh = true;
            
          }, toleranceTime);
    
          if(!i.state.hasSmokedCannabis) {
            i.state.hasSmokedCannabis = true;
            setHelpText("Your first time smoking cannabis is always super effective at reducing anxiety, but the more you smoke, the less effective it becomes. While you're high, Reading will increase Knowledge per second -- so get to reading!");
          } else {
            // Send a message based on tolerance
            if(i.cannabisTolerance <= 3) {
              setHelpText("Smoking cannabis always makes problems feel very far away... For a while, at least.");
            } else if(i.cannabisTolerance <= 6) {
              setHelpText("Smoking cannabis takes the edge off for sure, but the more you smoke the less effective your next smoke will be at reducing anxiety.");
            } else if(i.cannabisTolerance >= 10) {
              setHelpText("Getting high still helps, but it's getting harder to get and stay high. 😫");
            }
          }
        }
      };
      return u;
}

export function BuyACheapComputer():Upgrade {

    const u = { buttonId: Upgrades.BuyACheapComputer,
    buttonLabel: "Buy a cheap computer",
    section: "spend_your_money",
    descriptionBeforePurchase: "Costs $219. Connects you to the Information Superhighway. Prerequisite to unlocking Online Learning (learn new skills to make Money and eventually generate Influence). Don't forget to buy a good Wi-Fi router, too!",
    descriptionAfterPurchase: "",
    purchased: false,
    shouldRedraw: false,
    type: "unlock",
    totalResearchTime: 0,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.money >= 219
    },
    
    purchase:(i:Inventory) => {
      i.money -= 219;
      i.upgradesPurchased += 1;
    },

    unlock: function (i: Inventory) {
      i.state.hasComputer = true;
      
      setHelpText("You've purchased the cheapest used floor model money can buy: the Ameritel Personal Laptop Computer.");
      revealUpgradeButton(Upgrades.BuyFasterInternet, i);
      revealUpgradeButton(Upgrades.BuyAClickerGame, i);
      revealUpgradeButton(Upgrades.BuyAMidRangeComputer, i);
    }
  };
  return u;
}



export function BuyAClickerGame():Upgrade {
  const u = { buttonId: Upgrades.BuyAClickerGame,
    buttonLabel: "Buy an idle clicker game",
    section: "spend_your_money",
    descriptionBeforePurchase: "Costs $29. Play this indie game to reduce your anxiety.",
    descriptionAfterPurchase: "Reduces anxiety per second for every auto-clicker purchased.",
    purchased: false,
    shouldRedraw: false, 
    type: "unlock",
    totalResearchTime: 0,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.money >= 29
    },
    
    purchase: (i:Inventory) => {
      i.money -= 29;
      i.upgradesPurchased += 1;
    },

    unlock: function (i: Inventory) {
      setHelpText("You've purchased an idle clicker game from itch.io called 'The Fourth Wall.'");
      e.fadeIn(document.getElementById("playAGameInterfaceTab"));
    }
  };return u;
}

export function BuyFasterInternet():Upgrade {
    const u = { buttonId: Upgrades.BuyFasterInternet,
    buttonLabel: "Buy a good WiFi router",
    section: "spend_your_money",
    descriptionBeforePurchase: "Costs $49. Along with buying a computer, unlocks Online Learning, where you Read to convert Missed Opportunities into Knowledge.",
    descriptionAfterPurchase: "You've unlocked Reading. Now you can learn HTML and start a Blog to generate Influence.",
    purchased: false,
    shouldRedraw: false,
    type: "unlock",
    totalResearchTime: 0,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.money >= 49
    },

    purchase:(i:Inventory) => {
      i.money -= 49;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("You've discovered the power of online learning--which is really just learning how to look things up on the internet. You can now convert Missed Opportunities into Knowledge by Learning.");
      e.fadeInTableRow(document.getElementById("sectionRead"));
      e.fadeIn(document.getElementById("sectionKnowledge"));
      revealUpgradeButton(Upgrades.LearnHTML, i);
      revealUpgradeButton(Upgrades.StartABlog, i);
    }
  };
  return u;
}

export function LearnHTML():Upgrade {
  const u = { buttonId: Upgrades.LearnHTML,
    buttonLabel: "Learn how to write HTML",
    section: "try_your_best",
    descriptionBeforePurchase: "Costs 20 Missed Opportunities and $29. Unlocks starting a Blog. Prerequisite to learning more advanced programming.",
    descriptionAfterPurchase: "Now you're cruisin' the internet in &lt;style&gt;&lt;/style&gt;",
    purchased: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 20,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.money >= 29 && i.missedOpportunities >= 20
    },

    purchase:(i:Inventory) => {
      i.money -= 29;
      i.missedOpportunities -= 20;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("You've learned how to build basic websites, opening up new avenues of self-expression -- and income, if you work hard enough!");
      revealUpgradeButton(Upgrades.GetAJuniorDevJob, i);
      revealUpgradeButton(Upgrades.LearnJavascript, i);
    }
  }; 
  return u;
}

export function BuyAMidRangeComputer():Upgrade {
    const u = { buttonId: Upgrades.BuyAMidRangeComputer,
      buttonLabel: "Buy a mid-range computer",
      section: "spend_your_money",
      descriptionBeforePurchase: "Costs $1,099. Unlocks ability to learn Advanced Coding, and is one of the prerequisites to Podcasting and writing your own games.",
      descriptionAfterPurchase: "",
      purchased: false,
      shouldRedraw: false,
      type: "unlock",
      totalResearchTime: 0,
      currentResearchTime: 0,
      finished: false,
  
      canAfford: function(i: Inventory) {
        return i.money >= 1099
      },
      
      purchase:(i:Inventory) => {
        i.money -= 1099;
        i.upgradesPurchased += 1;
      },
  
      unlock: function (i: Inventory) {
        setHelpText("A faster computer means more opportunity to do greater things. A prerequisite to Podcasting, learning advanced coding, and improving automations.");
        
      }
    };return u;
  }

  export function BuyAHighPerformanceComputer():Upgrade {
    const u = { buttonId: Upgrades.BuyAHighPerformanceComputer,
      buttonLabel: "Buy a high-performance computer",
      section: "spend_your_money",
      descriptionBeforePurchase: "Costs $3,999. Unlocks learning Quantum Coding.",
      descriptionAfterPurchase: "",
      purchased: false,
      shouldRedraw: false,
      type: "unlock",
      totalResearchTime: 0,
      currentResearchTime: 0,
      finished: false,
  
      canAfford: function(i: Inventory) {
        return i.money >= 3999
      },
      
      purchase:(i:Inventory) => {
        i.money -= 3999;
        i.upgradesPurchased += 1;
      },
  
      unlock: function (i: Inventory) {
        setHelpText("You are now ready to start learning Quantum Coding.");
      }
    };return u;
  }

export function ReadAPodcastingBusinessBook():Upgrade {
  const u = { buttonId: Upgrades.ReadPodcastingBusinessBook,
      buttonLabel: "Read a podcasting business book",
      section: "try_your_best",
      descriptionBeforePurchase: "Costs $59.99 and 85 Knowledge. Shows you everything you need to start a Podcast. Podcasts generate some Money and a lot of Influence.",
      descriptionAfterPurchase: "",
      startsRevealed: false,
      purchased: false,
      shouldRedraw: false,
      type: "research",
      totalResearchTime: 190,
      currentResearchTime: 0,
      finished: false,
      
      canAfford: function(i: Inventory) {
        return i.money >= 59.99 && i.knowledge >= 85
      },
  
      purchase: (i:Inventory) => {
        i.money -= 59.99;
        i.knowledge -= 85;
        i.upgradesPurchased += 1;
      },
      
      unlock: function (i: Inventory) {
        setHelpText("You know know everything it takes to start a Podcast: Buy a mid-range computer, buy audio recording equipment, and learn audio recording.");
        revealUpgradeButton(Upgrades.BuyAMidRangeComputer, i);
        revealUpgradeButton(Upgrades.BuyAudioRecordingEquipment, i);
        revealUpgradeButton(Upgrades.LearnAudioRecording, i);
      }
    };
    return u;
}

export function LearnAudioRecording():Upgrade {
    const u = { buttonId: Upgrades.LearnAudioRecording,
    buttonLabel: "Learn audio recording",
    section: "try_your_best",
    descriptionBeforePurchase: "Costs 30 Missed Opportunities and $29. What is siblance? How do you cut the low-end and still sound good? Everyone should know how to record good audio. One of the prerequisites to starting a Podcast.",
    descriptionAfterPurchase: "You know how to record good quality audio.",
    purchased: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 150,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.money >= 29 && i.missedOpportunities >= 30
    },

    purchase:(i:Inventory) => {
      i.money -= 29;
      i.missedOpportunities -= 30;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("The fundamentals of audio recording are now at your fingertips.");
    }
  };
  return u;
}

export function BuyAudioRecordingEquipment():Upgrade {
  const u = { buttonId: Upgrades.BuyAudioRecordingEquipment,
  buttonLabel: "Buy audio recording equipment",
  section: "spend_your_money",
  descriptionBeforePurchase: "Costs $129. A good microphone, a mixer, some headphones, and some software for session recording. One of the prerequisites to starting a Podcast.",
  descriptionAfterPurchase: "You have the tools of the trade.",
  purchased: false,
  shouldRedraw: false,
  type: "research",
  totalResearchTime: 80,
  currentResearchTime: 0,
  finished: false,

  canAfford: function(i: Inventory) {
    return i.money >= 129
  },

  purchase:(i:Inventory) => {
    i.money -= 129;
    i.upgradesPurchased += 1;
  },
  
  unlock: function (i: Inventory) {
    setHelpText("You know have the equipment you need to start recording Podcasts.");
    revealUpgradeButton(Upgrades.BuyAdvancedAudioRecordingEquipment, i);
  }
};
return u;
}

export function BuyAdvancedAudioRecordingEquipment():Upgrade {
  const u = { buttonId: Upgrades.BuyAdvancedAudioRecordingEquipment,
  buttonLabel: "Buy pro audio equipment",
  section: "spend_your_money",
  descriptionBeforePurchase: "Costs $1499. Doubles the Influence generated by your Podcast Episodes.",
  descriptionAfterPurchase: "You sound like a professional.",
  purchased: false,
  shouldRedraw: false,
  type: "research",
  totalResearchTime: 80,
  currentResearchTime: 0,
  finished: false,

  canAfford: function(i: Inventory) {
    return i.money >= 1499
  },

  purchase:(i:Inventory) => {
    i.money -= 1499;
    i.upgradesPurchased += 1;
  },
  
  unlock: function (i: Inventory) {
    setHelpText("Your studio setup is now professional-quality. Influence generated by your Podcast Episodes is now doubled.")
  }
};
return u;
}

export function StartAPodcast():Upgrade {
  const u = { buttonId: Upgrades.StartAPodcast,
    buttonLabel: "Start a Podcast about idle clicker games",
    section: "express_yourself",
    descriptionBeforePurchase: "Costs 45 Missed Opportunities, $20, and 200 Knowledge. Must have at least a mid-range computer, have learned audio recording, and have purchased recording equipment. Podcasts generate some Money and a lot of Influence with each Podcast Episode.",
    descriptionAfterPurchase: "You've got a weekly podcast.",
    purchased: false,
    shouldRedraw: false,
    finished: false,
    type: "research",
    totalResearchTime: 120,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.money >= 20 
        && i.missedOpportunities >= 45 
        && i.knowledge > 200 
        && upgradesAreComplete(i, Upgrades.BuyAMidRangeComputer, Upgrades.LearnAudioRecording, Upgrades.BuyAudioRecordingEquipment)
    },

    purchase:(i:Inventory) => {
      i.money -= 20;
      i.missedOpportunities -= 45;
      i.knowledge -= 200;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("You're now putting out a weekly podcast show called 'The Idle Click', a weekly deep-dive into the life-changing effects of playing idle clicker games. The more episodes you produce, the more Influence you generate -- which in turn will bring players to the games that you make.");
      e.fadeInTableRow(document.getElementById("sectionInfluence"));
      e.fadeIn(document.getElementById("sectionPodcastingContainer"))
      revealUpgradeButton(Upgrades.MonetizePodcast, i);
      
    }
  };
  return u;
}

export function MonetizePodcast():Upgrade {
  const u = { buttonId: Upgrades.MonetizePodcast,
    buttonLabel: "Monetize podcast",
    section: "podcast_upgrades",
    descriptionBeforePurchase: "Costs 50 Knowledge. Must know HTML and have read book about the business of podcasting. Unlocks ability to hire Freelancers and to build automations. Freelancers convert $25 into one Podcast Episode. Passively generates Money per second based on number of Episodes published.",
    descriptionAfterPurchase: "Your Podcast generates Money based on the number of Episodes you have published.",
    purchased: false,
    startsRevealed: true,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 120,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 50 && upgradesAreComplete(i, Upgrades.ReadPodcastingBusinessBook, Upgrades.LearnHTML)
    },

    purchase:(i:Inventory) => {
      i.knowledge -= 50;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("Your podcast about idle clicker games is now monetized! The more Episodes you publish, the more Money and Influence you'll generate.");
      i.podcast.hasMonetizedPodcast = true;
      e.fadeIn(document.getElementById("sectionHirePodcastFreelancerButton"));
      e.fadeIn(document.getElementById("sectionMoneyPerSecondFromPodcastEpisodes"));
      revealUpgradeButton(Upgrades.BuildAutomationsForPodcast, i);
    }
  };
  return u;
}

export function BuildAutomationsForPodcast():Upgrade {
  const u = { buttonId: Upgrades.BuildAutomationsForPodcast,
    buttonLabel: "Build automations for podcast",
    section: "podcast_upgrades",
    descriptionBeforePurchase: "Costs 90 Knowledge. Must know Advanced Coding. Auto-hire 1 Freelancer every second. +25% Influence from Podcast Episodes.",
    descriptionAfterPurchase: "As long as you can afford it, 1 Freelancer will be hired every second.",
    purchased: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 120,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 90 && upgradesAreComplete(i, Upgrades.ReadPodcastingBusinessBook, Upgrades.LearnAdvancedCoding)
    },

    purchase:(i:Inventory) => {
      i.knowledge -= 90;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("You've completed automations for your blog. To improve these automations, you'll need to learn Advanced Coding -- which requires a Mid-Range Computer.");
      i.podcast.hasAutomatedPodcast = true;
      revealUpgradeButton(Upgrades.ImproveAutomationsForPodcast, i);
      e.fadeIn(document.getElementById("sectionPodcastAutomationsStatus"));
    }
  };
  return u;
}

export function ImproveAutomationsForPodcast():Upgrade {
  const u = { buttonId: Upgrades.ImproveAutomationsForPodcast,
    buttonLabel: "Improve automations for podcast",
    section: "podcast_upgrades",
    descriptionBeforePurchase: "Costs 120 Knowledge. Auto-hire up to 2 Freelancer every second. +25% Influence from Podcast Episodes.",
    descriptionAfterPurchase: "As long as you can afford it, up to 2 Freelancers will be hired every second.",
    purchased: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 160,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 120
    },

    purchase:(i:Inventory) => {
      i.knowledge -= 120;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      i.podcast.hasImprovedAutomations = true;
      setHelpText("You've improved the automations for your podcast!");
      hideUpgradeButton(Upgrades.BuildAutomationsForPodcast);
      revealUpgradeButton(Upgrades.RefactorAutomationsForPodcast, i);
    }
  };
  return u;
}

export function RefactorAutomationsForPodcast():Upgrade {
  const u = { buttonId: Upgrades.RefactorAutomationsForPodcast,
    buttonLabel: "Refactor automations for blog",
    section: "podcast_upgrades",
    descriptionBeforePurchase: "Costs 150 Knowledge. Must know Advanced Coding. Auto-hire up to 3 Freelancer every second. +25% Influence from Podcast Episodes.",
    descriptionAfterPurchase: "As long as you can afford it, up to 3 Freelancers will be hired every second.",
    purchased: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 150,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 150
    },

    purchase:(i:Inventory) => {
      i.knowledge -= 150;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      i.podcast.hasRefactoredAutomations = true;
      setHelpText("You've refactored your podcast automations. Your podcast is now entirely automated!");
      hideUpgradeButton(Upgrades.ImproveAutomationsForPodcast);
    }
  };
  return u;
}

export function StartABlog():Upgrade {
  const u = { buttonId: Upgrades.StartABlog,
    buttonLabel: "Start a Blog about idle clicker games",
    section: "express_yourself",
    descriptionBeforePurchase: "Costs 45 Missed Opportunities, $20, and 100 Knowledge. You must know HTML. Blogs generate some Influence and a lot of Money with each Blog Post.",
    descriptionAfterPurchase: "You've got a weekly blog.",
    purchased: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 140,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.money >= 20 && i.missedOpportunities >= 45 && i.knowledge > 100 && upgradeIsComplete(Upgrades.LearnHTML,i)
    },

    purchase:(i:Inventory) => {
      i.money -= 20;
      i.missedOpportunities -= 45;
      i.knowledge -= 200;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("You're now running a weekly blog. If you read a book about the business of blogging, you'll be able to hire freelancers and even monetize your blog.");
      // TODO Reveal upgrade here
      e.fadeIn(document.getElementById("createSomethingInterfaceTab"));
    }
  };
  return u;
}

export function ReadABloggingBusinessBook():Upgrade {
    const u = { buttonId: Upgrades.ReadBloggingBusinessBook,
        buttonLabel: "Read a blogging business book",
        section: "spend_your_money",
        descriptionBeforePurchase: "Costs $49.99 and 75 Knowledge. Unlocks monetizing, automating, and hiring freelancers for your blog.",
        descriptionAfterPurchase: "",
        startsRevealed: false,
        purchased: false,
        shouldRedraw: false,
        type: "unlock",
        totalResearchTime: 0,
        currentResearchTime: 0,
        finished: false,
        
        canAfford: function(i: Inventory) {
          return i.money >= 49.99 && i.knowledge >= 75
        },
    
        purchase: (i:Inventory) => {
          i.money -= 49.99;
          i.knowledge -= 75;
          i.upgradesPurchased += 1;      
        },
        
        unlock: function (i: Inventory) {
          revealUpgradeButton(Upgrades.MonetizeBlog, i);
          revealUpgradeButton(Upgrades.ReadPodcastingBusinessBook, i);
          e.fadeIn(document.getElementById("sectionHireBlogFreelancerButton"));
          setHelpText("You can now hire Freelancers to create blog posts for you.");
        }
      };
  
      return u;
  }

export function MonetizeBlog():Upgrade {
  const u = { buttonId: Upgrades.MonetizeBlog,
    buttonLabel: "Monetize blog",
    section: "blog_upgrades",
    descriptionBeforePurchase: "Costs 50 Knowledge. Must have read book about the business of blogging. Each Blog Post passively generates Money.",
    descriptionAfterPurchase: "Each Blog Post generates more Money per second.",
    purchased: false,
    startsRevealed: true,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 120,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 50 && upgradesAreComplete(i, Upgrades.ReadBloggingBusinessBook, Upgrades.LearnHTML)
    },

    purchase:(i:Inventory) => {
      i.knowledge -= 50;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("Your blog about idle clicker games is now monetized! The more Blog Posts you publish, the more Money you'll bring in!");
      i.blog.hasMonetizedBlog = true;
      e.fadeIn(document.getElementById("sectionMoneyPerSecondFromBlogPosts"));
      revealUpgradeButton(Upgrades.BuildAutomationsForBlog, i);
    }
  };
  return u;
}

export function BuildAutomationsForBlog():Upgrade {
  const u = { buttonId: Upgrades.BuildAutomationsForBlog,
    buttonLabel: "Build automations for blog",
    section: "blog_upgrades",
    descriptionBeforePurchase: "Costs 50 Knowledge. Must know Javascript and have monetized your blog. Auto-hire 1 Freelancer every second.",
    descriptionAfterPurchase: "As long as you can afford it, 1 Freelancer will be hired every second.",
    purchased: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 120,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 50 && upgradesAreComplete(i, Upgrades.LearnJavascript, Upgrades.MonetizeBlog)
    },

    purchase:(i:Inventory) => {
      i.knowledge -= 50;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("You've completed automations for your blog!");
      i.blog.hasAutomatedBlog = true;
      revealUpgradeButton(Upgrades.ImproveAutomationsForBlog, i);

      e.fadeIn(document.getElementById("sectionBlogAutomationsStatus"));
    }
  };
  return u;
}

export function ImproveAutomationsForBlog():Upgrade {
  const u = { buttonId: Upgrades.ImproveAutomationsForBlog,
    buttonLabel: "Improve automations for blog",
    section: "blog_upgrades",
    descriptionBeforePurchase: "Costs 75 Knowledge. Must know Advanced Coding. Auto-hire up to 2 Freelancer every second.",
    descriptionAfterPurchase: "As long as you can afford it, up to 2 Freelancers will be hired every second.",
    purchased: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 160,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 75 && upgradesAreComplete(i, Upgrades.BuildAutomationsForBlog, Upgrades.LearnAdvancedCoding)
    },

    purchase:(i:Inventory) => {
      i.knowledge -= 75;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      i.blog.hasImprovedAutomations = true;
      setHelpText("You've improved the automations for your blog!");
      hideUpgradeButton(Upgrades.BuildAutomationsForBlog);
      revealUpgradeButton(Upgrades.RefactorAutomationsForBlog, i);
    }
  };
  return u;
}

export function RefactorAutomationsForBlog():Upgrade {
  const u = { buttonId: Upgrades.RefactorAutomationsForBlog,
    buttonLabel: "Refactor automations for blog",
    section: "blog_upgrades",
    descriptionBeforePurchase: "Costs 100 Knowledge. Requires mid-range computer or better. Auto-hire up to 3 Freelancer every second. If you've written a game, Blog Posts now generate some Influence.",
    descriptionAfterPurchase: "As long as you can afford it, up to 3 Freelancers will be hired every second. If you've written a game, Blog Posts generate some Influence.",
    purchased: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 190,
    currentResearchTime: 0,
    finished: false,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 100 && upgradesAreComplete(i, Upgrades.BuyAMidRangeComputer, Upgrades.BuildAutomationsForBlog, Upgrades.ImproveAutomationsForBlog)
    },

    purchase:(i:Inventory) => {
      i.knowledge -= 100;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      i.blog.hasRefactoredAutomations = true;
      setHelpText("You've refactored your blog automations. Your blog is now entirely automated!");
      hideUpgradeButton(Upgrades.ImproveAutomationsForBlog);
    }
  };
  return u;
}

export function BuyACoffeeMaker():Upgrade {
    const u = { 
        buttonId: Upgrades.BuyACoffeeMaker,
        buttonLabel: "Buy a coffee maker",
        section: "spend_your_money",
        descriptionBeforePurchase: "Costs $19.99. Working no longer increases anxiety. If you have a better job, make slightly more money per second.",
        descriptionAfterPurchase: "Working no longer increases anxiety. If you have a better job, make slightly more money per second.",
        purchased: false,
        shouldRedraw: false,
        type: "unlock",
        totalResearchTime: 0,
        currentResearchTime: 0,
        finished: false,
         
        canAfford: function(i: Inventory) {
          return i.money >= 19.99
        },
    
        purchase: function(i: Inventory) {
          i.money -= 19.99;
          i.upgradesPurchased += 1;
        },
        
        unlock: function (i: Inventory) {
          e.fadeOut(document.getElementById('spanWorkIncreasesAnxiety'));
          setHelpText("It's a cheap coffee maker from your local store, but it gets the job done.");
        }
    };
    return u;
}

export function BuyAScentedCandle():Upgrade {
    const u = { buttonId: Upgrades.BuyAScentedCandle,
        buttonLabel: "Buy a scented candle",
        section: "spend_your_money",
        descriptionBeforePurchase: "Costs $19.99. Reduces Anxiety per second by 1, and cancels any current effects that are increasing your anxiety.",
        descriptionAfterPurchase: "",
        startsRevealed: true,
        purchased: false,
        shouldRedraw: false,
        type: "unlock",
        totalResearchTime: 0,
        currentResearchTime: 0,
        finished: false,
        
        canAfford: function(i: Inventory) {
          return i.money >= 19.99
        },
    
        purchase: (i:Inventory) => {
          i.money -= 19.99;
          i.upgradesPurchased += 1;
    
          if(i.anxietyPerSecond < 1) {
            i.anxietyPerSecond = 0;
          } else {
            i.anxietyPerSecond -= 1;
          }
          i.anxietyPerSecondRollover = 0;
        },
        
        unlock: function (i: Inventory) {
          setHelpText("A lovely candle that smells like you're in an enchanted forest is the perfect way to relax.");
          revealUpgradeButton(Upgrades.BuyAPlant, i);
        }
      };

      return u;
}

export function BuyAPlant():Upgrade {
    const u = { buttonId: Upgrades.BuyAPlant,
        buttonLabel: "Buy a plant",
        section: "spend_your_money",
        descriptionBeforePurchase: "Costs $29.99. Reduces Anxiety per second by 2, and cancels any current effects that are increasing your anxiety.",
        descriptionAfterPurchase: "",
        startsRevealed: false,
        purchased: false,
        shouldRedraw: false,
        type: "unlock",
        totalResearchTime: 0,
        currentResearchTime: 0,
        finished: false,
        
        canAfford: function(i: Inventory) {
          return i.money >= 29.99
        },
    
        purchase: (i:Inventory) => {
          i.money -= 29.99;
          i.upgradesPurchased += 1;
    
          if(i.anxietyPerSecond < 2) {
            i.anxietyPerSecond = 0;
          } else {
            i.anxietyPerSecond -= 2;
          }
          i.anxietyPerSecondRollover = 0;
        },
        
        unlock: function (i: Inventory) {
          setHelpText("Your new benjamina ficus is small, but its dark green leaves are calming and comforting.");
          revealUpgradeButton(Upgrades.BuySomeComfyPants, i);
        }
      };
      return u;
}

export function BuySomeComfyPants():Upgrade {
    const u = { buttonId: Upgrades.BuySomeComfyPants,
        buttonLabel: "Buy some comfy pants",
        section: "spend_your_money",
        descriptionBeforePurchase: "Costs $39.99. Reduces Anxiety per second by 3, and cancels any current effects that are increasing your anxiety.",
        descriptionAfterPurchase: "",
        startsRevealed: true,
        purchased: false,
        shouldRedraw: false,
        type: "unlock",
        totalResearchTime: 0,
        currentResearchTime: 0,
        finished: false,
        
        canAfford: function(i: Inventory) {
          return i.money >= 39.99
        },
    
        purchase: (i:Inventory) => {
          i.money -= 39.99;
          i.upgradesPurchased += 1;
    
          if(i.anxietyPerSecond < 3) {
            i.anxietyPerSecond = 0;
          } else {
            i.anxietyPerSecond -= 3;
          }
          i.anxietyPerSecondRollover = 0;
        },
        
        unlock: function (i: Inventory) {
          setHelpText("Only no-bones days from now on! This deluxe cotton fabric is stretchy and warm, perfect for cuddling by yourself and poking on your computer.");
        }
      };
      return u;
}

export function BuyAWeightedBlanket():Upgrade {
    const u = { buttonId: Upgrades.BuyAWeightedBlanket,
        buttonLabel: "Buy a weighted blanket",
        section: "spend_your_money",
        descriptionBeforePurchase: "Costs $49.99. Reduces anxiety per second by 4, and cancels any current effects that are increasing your anxiety.",
        descriptionAfterPurchase: "",
        startsRevealed: true,
        purchased: false,
        shouldRedraw: false,
        type: "unlock",
        totalResearchTime: 0,
        currentResearchTime: 0,
        finished: false,
        
        canAfford: function(i: Inventory) {
          return i.money >= 49.99
        },
    
        purchase: (i:Inventory) => {
          i.money -= 49.99;
          i.upgradesPurchased += 1;
    
          if(i.anxietyPerSecond < 4) {
            i.anxietyPerSecond = 0;
          } else {
            i.anxietyPerSecond -= 4;
          }
          i.anxietyPerSecondRollover = 0;
        },
        
        unlock: function (i: Inventory) {
          setHelpText("Sleeping under the heavy comfort of a heavy blanket helps drown out the stresses of the day-to-day grind.");
        }
      };

      return u;
}

export function BuyAnNFT():Upgrade {
    const u = { buttonId: Upgrades.BuyAnNFT,
      buttonLabel: "Buy an NFT",
      section: "spend_your_money",
      descriptionBeforePurchase: "Costs $1,000.",
      descriptionAfterPurchase: "You now own an NFT.",
      purchased: false,
      finished: false,
      shouldRedraw: false,
      type: "unlock",
      totalResearchTime: 0,
      currentResearchTime: 0,
  
      canAfford: function(i: Inventory) {
        return i.money >= 1000
      },
  
      purchase: (i:Inventory) => {
        i.money -= 1000;
        i.upgradesPurchased += 1;
      },
      
      unlock: function (i: Inventory) {
        setHelpText("You're now the proud owner of a non-fungible token which points to a URL where you can download a JPEG. You are living on the edge!")
      }
    };
    return u;
}

export function StreamOnTwitch():Upgrade {
  const u = { buttonId: Upgrades.StreamOnTwitch,
    buttonLabel: "Stream on Twitch",
    section: "express_yourself",
    descriptionBeforePurchase: "Costs 1000 Knowledge, 500 Missed Opportunities, and $129. Generates 3 Anxiety per second in exchange for 1 Influence per second.",
    descriptionAfterPurchase: "+3 Anxiety/s, +1 Influence/s",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 100,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 1000 && i.missedOpportunities >= 500 && i.money >= 129
    },

    purchase: (i:Inventory) => {
      i.money -= 129;
      i.knowledge -= 1000;
      i.missedOpportunities -= 500;
      i.upgradesPurchased += 1;
      // influence added in game loop (on update)
      i.anxietyPerSecondRollover += 3;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("😵‍💫🤩 You're streaming the Existence Simulator 24/7 on Twitch, which is generating more Influence.")
    }
  };
  return u;
}


export function StreamOnYouTube():Upgrade {
  const u = { buttonId: Upgrades.StreamOnYoutube,
    buttonLabel: "Stream on YouTube",
    section: "express_yourself",
    descriptionBeforePurchase: "Costs 1500 Knowledge, 750 Missed Opportunities, and $129. Generates 3 Anxiety per second in exchange for 1 Influence per second.",
    descriptionAfterPurchase: "+3 Anxiety/s, +1 Influence/s",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 100,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 1500 && i.missedOpportunities >= 750 && i.money >= 129
    },

    purchase: (i:Inventory) => {
      i.money -= 129;
      i.knowledge -= 1500;
      i.missedOpportunities -= 750;
      i.upgradesPurchased += 1;
      // influence added in game loop (on update)
      i.anxietyPerSecondRollover += 3;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("😵‍💫🤩 Your YouTube channel has a growing catalog of paylists about the Existence Simulator, which is generating more Influence.")
    }
  };
  return u;
}

export function SponsorMouse():Upgrade {
  const u = { buttonId: Upgrades.SponsorMouse,
    buttonLabel: "Get sponsorship from mouse company",
    section: "express_yourself",
    descriptionBeforePurchase: "Costs 1000 Knowledge. Must have at least 100 Influence. Generate +1 Influence per second and $5,000.",
    descriptionAfterPurchase: "+1 Influence/s",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 100,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 1000 && i.influence >= 100
    },

    purchase: (i:Inventory) => {
      
      i.knowledge -= 1000;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      i.money += 5000;
      // influence added in game loop (on update)
      setHelpText("😆 You've signed a sponsorship contract with Idle Hands, the makers of the Extreme Idle Clicker USB Mouse. 'The EIC Mouse: For Maximum Clicking.™' They make computer mice optimized for playing idle clicker games.")
    }
  };
  return u;
}

export function SponsorChair():Upgrade {
  const u = { buttonId: Upgrades.SponsorChair,
    buttonLabel: "Get sponsorship from gaming chair company",
    section: "express_yourself",
    descriptionBeforePurchase: "Costs 1500 Knowledge. Must have at least 550 Influence. Generate +1 Influence per second and $7,500.",
    descriptionAfterPurchase: "+1 Influence/s",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 100,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 1500 && i.influence >= 550
    },

    purchase: (i:Inventory) => {
      i.knowledge -= 175;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      i.money += 7500;
      // influence added in game loop (on update)
      
      setHelpText("😆 You've signed a sponsorship contract with ClickSit, manufacturers of the patented Clicker Heuristics And Idle Resurgence (CHAIR) gaming chair. They make gaming chairs optimized for playing idle clicker games.")
    }
  };
  return u;
}

export function SponsorDrink():Upgrade {
  const u = { buttonId: Upgrades.SponsorDrink,
    buttonLabel: "Get sponsorship from an energy drink company",
    section: "express_yourself",
    descriptionBeforePurchase: "Costs 2000 Knowledge. Must have at least 1,750 Influence. Generate +1 Influence per second and $25,000.",
    descriptionAfterPurchase: "+1 Influence/s",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 100,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 2000 && i.influence >= 1750
    },

    purchase: (i:Inventory) => {
      i.knowledge -= 2000;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      i.money += 25000;
      // influence added in game loop (on update)
      
      setHelpText("😆 You've signed a sponsorship contract with Idle Wild Energy, makers of the Inverted Idler, a caffeinated beverage marketed toward idle clicker gamers.")
    }
  };
  return u;
}

export function SponsorASMR():Upgrade {
  const u = { buttonId: Upgrades.SponsorASMR,
    buttonLabel: "Create clicker game ASMR content",
    section: "express_yourself",
    descriptionBeforePurchase: "Costs 2500 Knowledge. Must have a Podcast with at least 100 episodes published. Must have at least 2,500 Influence. Generate +1 Influence per second.",
    descriptionAfterPurchase: "+1 Influence/s",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 100,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 2500 && i.influence >= 2500 && i.podcast.episodes >= 100
    },

    purchase: (i:Inventory) => {
      i.knowledge -= 2500;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      // influence added in game loop (on update)
      
      setHelpText("😆 You have created a whole genre of ASMR for clicker games where people from all over the world quietly and kindly play your games with their face very close to a microphone.")
    }
  };
  return u;
}

export function HireResearchFirm():Upgrade {
  const u = { buttonId: Upgrades.HireResearchFirm,
    buttonLabel: "Hire research firm to study player growth",
    section: "do_something",
    descriptionBeforePurchase: "Costs $200,000. A team of experts will study the worldwide playerbase of Existence Simulator to develop a set of recommendations for generating player growth.",
    descriptionAfterPurchase: "Make the world a better place so people have more time to play Existence Simulator",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 330,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.money >= 200000
    },

    purchase: (i:Inventory) => {
      i.money -= 200000;
      i.upgradesPurchased += 1;
      setHelpText("You've hired the Business for Idle Research in Clicker Heuristics (BIRCH). They have researchers all over the world who will find out exactly how to increase Worldwide Players of Existence Simulator.")
    },
    
    unlock: function (i: Inventory) {
      setHelpText("The results are in: people don't have enough time during the day to play Existence Simulator! Use your Influence to help pass laws that give people more time to play Existence Simulator.")

      // TODO: Unlock all the laws
      /*
      Healthcare Rebates. Adds players, +1 Major Government Approval.
      Housing Stipends. Adds players, +1 Major Government Approval.
      Childcare Funding. Adds players, +1 Major Government Approval.
      K-12 Idle Game Curriculum. Adds players, +1 Major Government Approval.
      Higher Ed Grants for Idle Game Teams. Adds players, +1 Major Government Approval.
      Develop BEST, the Baby Existence Simulator Trainer, a simple single-button idle game for babies to prepare them to play Existence Simulator. Adds players, +1 Major Government Approval.

      UBI, requires 6 Major Government Approvals. When done, FAILS

      */
    }
  };
  return u;
}

export function HelpPassTVLaw():Upgrade {
  const u = { buttonId: Upgrades.SponsorDrink,
    buttonLabel: "Help Pass T.V. Law",
    section: "do_something",
    descriptionBeforePurchase: "Costs 2,500 Knowledge and 1,750 Influence. Generate +5 Influence per second. Help pass a law that livestreams Existence Simulator games all hours of the day and night.",
    descriptionAfterPurchase: "Law passed!",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 200,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 2500 && i.influence >= 1750
    },

    purchase: (i:Inventory) => {
      i.knowledge -= 2500;
      i.influence -= 1750;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("🗳️ You helped pass a law that requires all public-access television and every major streaming service to provide livestreams of Existence Simulator free of charge.")
    }
  };
  return u;
}

export function HelpPassK12IdleCurriculum():Upgrade {
  const u = { buttonId: Upgrades.HelpPassK12IdleCurriculum,
    buttonLabel: "Help Pass K-12 Idle Game Curriculum Law",
    section: "do_something",
    descriptionBeforePurchase: "Costs 3,000 Knowledge, 3,000 Influence, and $30,000. Generate +5 Influence per second. Help pass a law that requires K-12 public schools to teach idle games every year.",
    descriptionAfterPurchase: "Law passed!",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 220,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 3000 && i.influence >= 3000 && i.money >= 30000
    },

    purchase: (i:Inventory) => {
      i.knowledge -= 3000;
      i.influence -= 3000;
      i.money -= 30000;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("🗳️ You helped pass a law that requires K-12 schools to teach idle clicker games. The Existence Simulator will be pre-installed on all computers in classrooms.")
    }
  };
  return u;
}

export function HelpPassHigherEdGrants():Upgrade {
  const u = { buttonId: Upgrades.HelpPassHigherEdGrants,
    buttonLabel: "Help Pass Higher Education Grants for Idle Gamers Law",
    section: "do_something",
    descriptionBeforePurchase: "Costs 4,000 Knowledge, 4,000 Influence, and $40,000. Generate +5 Influence per second. Help pass a law that requires colleges to officially recognize idle games as an official sports, and provides funding for team jerseys and computer cafes to practice in.",
    descriptionAfterPurchase: "Law passed!",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 240,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 4000 && i.influence >= 4000 && i.money >= 40000
    },

    purchase: (i:Inventory) => {
      i.knowledge -= 4000;
      i.influence -= 4000;
      i.money -= 40000;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("🗳️ With your help, the government has passed a law making Idle Gaming an official sport. Colleges have sixty days to create idle clicker teams and to provide accomodations for idle game leagues and Existence Simulator trainers.")
    }
  };
  return u;
}

export function HelpPassBestLaw():Upgrade {
  const u = { buttonId: Upgrades.HelpPassBestLaw,
    buttonLabel: "Help pass the B.E.S.T. Law",
    section: "do_something",
    descriptionBeforePurchase: "Costs 5,000 Knowledge, 5,000 Influence, and $50,000. Generate +5 Influence per second. Help pass the Baby Existence Simulator Trainer (BEST) Law, which provides free, single-button idle games for babies to prepare them to play Existence Simulator.",
    descriptionAfterPurchase: "Law passed!",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 260,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 5000 && i.influence >= 5000 && i.money >= 50000
    },

    purchase: (i:Inventory) => {
      i.knowledge -= 5000;
      i.influence -= 5000;
      i.money -= 50000;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("🗳️ You helped pass a law that gives new parents a free Baby Existence Simulator Trainer (BEST) for their newborn, creating a whole new generation of Existence Simulator players.")
    }
  };
  return u;
}

export function HelpPassFoodRationsLaw():Upgrade {
  const u = { buttonId: Upgrades.HelpPassFoodRationsLaw,
    buttonLabel: "Help pass Food Rations Law",
    section: "do_something",
    descriptionBeforePurchase: "Costs 6,000 Knowledge, 6,000 Influence, and $60,000. Generate +5 Influence per second. Many people can't play Existence Simulator all day because they need to feed their families. Help pass a law that provides free food rations to anyone who plays Existence Simulator.",
    descriptionAfterPurchase: "Law passed!",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 280,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 6000 && i.influence >= 6000 && i.money >= 60000
    },

    purchase: (i:Inventory) => {
      i.knowledge -= 6000;
      i.influence -= 6000;
      i.money -= 60000;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("🗳️ You helped pass a law that provides free food rations to people when they play Existence Simulator. More people are able to play your game because they don't have to worry about where their food will come from.")
    }
  };
  return u;
}

export function HelpPassChildcareLaw():Upgrade {
  const u = { buttonId: Upgrades.HelpPassChildcareLaw,
    buttonLabel: "Help pass Free Childcare Law",
    section: "do_something",
    descriptionBeforePurchase: "Costs 7,000 Knowledge, 7,000 Influence, and $70,000. Generate +5 Influence per second. Many people can't play Existence Simulator all day because they need to make more money to afford childcare, a viscious cycle of of needless expenses that keeps them in poverty. Help Pass a law that provides free childcare for anyone who regularly plays Existence Simulator.",
    descriptionAfterPurchase: "Law passed!",
    purchased: false,
    finished: false,
    shouldRedraw: false,
    type: "research",
    totalResearchTime: 280,
    currentResearchTime: 0,

    canAfford: function(i: Inventory) {
      return i.knowledge >= 6000 && i.influence >= 6000 && i.money >= 60000
    },

    purchase: (i:Inventory) => {
      i.knowledge -= 6000;
      i.influence -= 6000;
      i.money -= 60000;
      i.upgradesPurchased += 1;
    },
    
    unlock: function (i: Inventory) {
      setHelpText("🗳️ You helped pass a law that provides free food rations to people when they play Existence Simulator. More people are able to play your game because they don't have to worry about where their food will come from.")
    }
  };
  return u;
}

// Not implemented yet: 
// HelpPassHealthcareRebatesLaw: "upgradeHealthcareRebates",
// HelpPassHousingStipendsLaw: "upgradeHousingStipends",
// Passing UBI
// Running for president of the world
// You can RESTRUCTURE/REBUILD the endgame by providing alternatives. Be creative!


  
