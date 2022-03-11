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
import { setHelpText } from "./game";
import { revealUpgradeButton, upgradeIsComplete, Upgrades, upgradesAreComplete } from "./upgrades";
//import {upgradeStartAPodcastTriggers} from "./triggers/upgradeStartAPodcast";

export interface Trigger {
  // If true, this event has already been triggered
  hasFired: boolean;

  // A message to the player

  // If true, triggered = true and we fire onTrigger
  condition: (i: i.Inventory) => boolean;
  
  // The function that fires when this condition is triggered
  effect: (i: i.Inventory) => void;
}

// This is an easy way to automatically calculate the time between updates
// based on the number of strings passed, that way we can just worry about 
// passing strings and not about what specific time they have to appear
export function buildIdleGameResearchUpdates(upgrade:string, ...msgs:string[]) {
  let count = 1;
  let triggerArray:Trigger[] = [];

  let interval = Math.round(100 / msgs.length);

  msgs.forEach( (msg) => {
    triggerArray.push(updateDescAtProgress(upgrade, count == 1 ? 1 : Math.round(count * interval), msg));
    count += 1;
  });

  return triggerArray;
}

export function getUpgradeProgress(buttonId:string):number {
  //console.log(`Trying to read ${buttonId}`);
  try {
    return Number(document.getElementById(buttonId+"Progress")!.ariaValueNow);
  } catch(e) {
    console.log(`--> Failed to read button progress for ${buttonId}:` + e);
  }
}

export function setProgressDescription(buttonId:string,desc:string) {
  document.getElementById("label"+buttonId)!.innerHTML = `<small>${desc}</small>`;
  
}

export function updateDescAtProgress(buttonId:string,num:number,desc:string):Trigger {
  let t:Trigger = {
    hasFired: false,
    condition: function (i: i.Inventory) {
      return getUpgradeProgress(buttonId) >= num;
    },
    effect: function (i: i.Inventory) {
      setProgressDescription(buttonId, desc);
    },
  };
  return t;
}

export function whenUpgradeCompleteFadeInSection(upgradeButtonId:string,sectionId:string,helpText:string = "") {
  let t:Trigger = {
    hasFired: false,
    condition: function (i: i.Inventory) {
      return upgradeIsComplete(upgradeButtonId,i);
    },
    effect: function (i: i.Inventory) {
      e.fadeIn(document.getElementById(sectionId));

      if(helpText != "") {
        setHelpText(helpText);
      }
    },
  };
  return t;
}

/** 
 * Reveal an upgrade when another upgrade is finished, optionally including help text
 * @param triggerButtonId {string} When this upgrade is complete...
 * @param targetButtonId {string} ... reveal this upgrade.
*/
export function whenUpgradeCompleteRevealUpgradeButton(triggerButtonId:string,targetButtonId:string,helpText:string = "") {
  let t:Trigger = {
    hasFired: false,
    condition: function (i: i.Inventory) {
      return upgradeIsComplete(triggerButtonId,i);
    },
    effect: function (i: i.Inventory) {
      revealUpgradeButton(targetButtonId, i);

      if(helpText != "") {
        setHelpText(helpText);
      }
    },
  };
  return t;
}

// The initial state of all triggers.
var triggersDb:Trigger[] = [
  {
    hasFired: false,
    condition: function (i: i.Inventory) {
      return document.readyState === "complete";
    },
    effect: function (i: i.Inventory) {
      setHelpText(
        "Welcome to the Existence Simulator. Begin existing by clicking the 'Exist' button."
      );
      e.fadeIn(document.getElementById("game-container"), false);
      e.fadeOut(document.getElementById("loading-container"));
    }
  },
  {
    hasFired: false,
    condition: function (i: i.Inventory) {
      return i.totalClicks >= 1 ? true : false;
    },
    effect: function (i: i.Inventory) {
      e.fadeIn(document.getElementById("labelNumAnxiety"));
      setHelpText(
        "As you exist, you generate anxiety. Try generating at least 10."
      );
    }
  },
  {
    // show cry button
    hasFired: false,
    condition: function (i: i.Inventory) {
      return i.anxiety > 9 ? true : false;
    },
    effect: function (i: i.Inventory) {
      i.state.cryButtonEnabled = true;
      e.fadeInTableRow(document.getElementById("sectionCry"));
      //e.fadeIn(document.getElementById('sectionMaxAnxiety'));
      setHelpText(
        "The anxiety just builds and builds -- just like real life! You can always reduce your anxiety immediately by Crying. Try that now."
      );
    }
  },
  {
    hasFired: false,
    condition: function (i: i.Inventory) {
      return i.money >= 500 ? true : false;
    },
    effect: function (i: i.Inventory) {
      revealUpgradeButton("upgradeBuyAnNFT", i);
    }
  },
  {
    // show cry label and generating section
    hasFired: false,
    condition: function (i: i.Inventory) {
      return i.totalCryClicks >= 1 ? true : false;
    },
    effect: function (i: i.Inventory) {
      //e.fadeIn(document.getElementById("sectionGenerating"), false);
      e.fadeIn(document.getElementById("labelCryCost"));
      e.fadeIn(document.getElementById("sectionMaxAnxietyPerSecond"));
      e.fadeIn(document.getElementById("spanNumAnxietyPerSecond"));
      setHelpText(
        "Crying helps reduce anxiety immediately--but it also increases the amount of anxiety you passively generate. Try Crying five times."
      );
    }
  },
  {
    hasFired: false,
    condition: function (i: i.Inventory) {
      return i.totalCryClicks >= 4 ? true : false;
    },
    effect: function (i: i.Inventory) {
      setHelpText(
        "Almost done! Let's have one more good Cry."
      );
    }
  },
  {
    // show cry label and generating section
    hasFired: false,
    condition: function (i: i.Inventory) {
      return i.totalCryClicks >= 5 ? true : false;
    },
    effect: function (i: i.Inventory) {
      // TODO: fade in anxiety progress
      e.fadeIn(document.getElementById("anxietyProgress"), false);
      setHelpText(
        "Now you're a regular anxiety machine--just like real life! Try making it to 100 anxiety."
      );
    }
  },
  {
    // introduce missed opportunities
    hasFired: false,
    condition: function (i: i.Inventory) {
      return i.totalCryClicks >= 5 && i.anxiety >= 100 ? true : false;
    },
    effect: function (i: i.Inventory) {
      setHelpText(
        "Each time you cry, you also generate Missed Opportunities. One of the key features of existing is trading your Missed Opportunties for different ways to Try your Best. Life's also supposed to be fun! So don't forget to Express Yourself, too."
      );
      
      e.fadeIn(document.getElementById("labelNumMissedOpportunitiesGeneratedFromCrying"));
      e.fadeIn(document.getElementById("tryYourBestInterfaceTab"), false);
      //e.fadeIn(document.getElementById('interfaceTabsContainer'), false);
      e.fadeIn(document.getElementById('interfaceContentContainer'), false);
      e.fadeIn(document.getElementById("sectionMissedOpportunities"));
      e.fadeIn(document.getElementById("spanNumMissedOpportunities"));
      e.fadeIn(document.getElementById("expressYourselfInterfaceTab"), false);  
    }
  },
  {
    // As soon as you make money, show store
    hasFired: false,
    condition: function (i: i.Inventory) {
      return i.money > 0;
    },
    effect: function (i: i.Inventory) {
      setHelpText(
        "Look at you taking charge of your life, making your own money, and not letting things get the best of you! Why not spend some of that hard-earned money? Go on! You've earned it!"
      );

      e.fadeIn(document.getElementById("spendYourMoneyInterfaceTab"), false);

      revealUpgradeButton("upgradeBuyACoffeeMaker", i);

      revealUpgradeButton("upgradeBuyWeightedBlanket", i);
    }
  },
  {
    // LEARN: Nervous breakdown
    hasFired: false,
    condition: function (i: i.Inventory) {
      return i.anxiety >= 800;
    },
    effect: function (i: i.Inventory) {
      setHelpText(
        "The more you exist, the more anxiety you generate. If you max out your anxiety, you'll have a nervous breakdown (game over), so you'll need to get it down!"
      );
      //e.fadeIn(document.getElementById("sectionDoubt"), false);
      //i.state.doubtButtonEnabled = true;
    }
  },
  {
    // as soon as starts reading, show what they can learn
    hasFired: false,
    condition: function (i: i.Inventory) {
      return i.knowledge >= 1; // Essentially one or two button clicks
    },
    effect: function (i: i.Inventory) {
      
      setHelpText(
        'The internet has opened up your eyes to what is possible in this existence -- like learning new skills, building video games, blogging and podcasting about video games, and so much more!'
      );
      
      revealUpgradeButton(Upgrades.ReadGameDevelopmentBook, i);
      revealUpgradeButton(Upgrades.ReadGameTheoryAudioBook, i);
    },
  },

  {
    // If clicker game is bought, fade in the anxiety reduction badge
    hasFired: false,
    condition: function (i: i.Inventory) {
      let totalEmbeddedClicks = (window as any).embeddedIdleClickerGameTotalClicksEver;
      if(totalEmbeddedClicks != null) {
        return totalEmbeddedClicks >= 1;
      } else {
        return false;
      }
    },
    effect: function (i: i.Inventory) {
      setHelpText(
        "Playing the idle game destresses and rejuvinates. But enough about Existence Simulator! 🤣 Auto-clickers in 'The Fourth Wall' slightly decrease your anxiety per second."
      );
      
      e.fadeIn(document.getElementById("badgeClickerGameAnxietyReduction"));
    },

    
  },

  {
    // Show blog upgrades when complete
    hasFired: false,
    condition: function (i: i.Inventory) {
      return upgradeIsComplete(Upgrades.StartABlog,i)
    },
    effect: function (i: i.Inventory) {
      revealUpgradeButton(Upgrades.ReadBloggingBusinessBook, i);
    },

    
  },

  {
    // As soon as we start blogging, show influence
    hasFired: false,
    condition: function (i: i.Inventory) {
      return i.influence > 0
    },
    effect: function (i: i.Inventory) {
      setHelpText(
        "Blogging, among other things, produces Influence. Once you've written your first game, Influence will increase Worldwide Players of your games. You can also spend Influence to get Laws passed that make it easier for people to play your games."
      );

      e.fadeIn(document.getElementById("sectionInfluence"));
      e.fadeIn(document.getElementById("sectionInfluencePerSecond"));
      
    },
  },

  {
    // Hard stop at 100M players to introduce end-game (research firm, then pass the laws, then run for president of the world)
    hasFired: false,
    condition: function (i: i.Inventory) {
      return upgradesAreComplete(i, Upgrades.StreamOnTwitch, Upgrades.StreamOnYoutube, Upgrades.SponsorASMR, Upgrades.SponsorChair, Upgrades.SponsorDrink, Upgrades.SponsorMouse)
    },
    effect: function (i: i.Inventory) {
      setHelpText(
        "The Existence Simulator has been at the top of every Best Of list, but it's not enough. You need *every* person on Earth playing Existence Simulator. Hire a research firm to figure out how to get more players."
      );

      revealUpgradeButton(Upgrades.HireResearchFirm, i);
    },
  },
  
];


export function getResearchUpgadeUpdates():Trigger[][] {
  var upgradeLearnJavascriptTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.LearnJavascript, 1, "Studying the DOM..."),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 11, "Getting elements by their IDs..."),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 31, "Setting intervals and values..."),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 49, "Setting timeouts and variables..."),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 63, "Studying onclick events..."),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 71, "Adding event listeners to elements..."),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 88, "Studying numbers and making them go up..."),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 95, "Practicing..."),
  ];
  
  var upgradeReadGameTheoryBookTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 1, "Chapter 1: The world of games"),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 11, "Chapter 2: The art and style of first-person games"),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 31, "Chapter 3: The feel and substance of third-person games"),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 49, "Chapter 4: The unifying quality of idle clicker games"),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 63, "Chapter 5: Ten reasons to only build idle games"),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 71, "Chapter 6: How idle games can take over the world"),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 88, "Chapter 7: Was Wolfenstein Really an Idle Clicker Game?"),
    updateDescAtProgress(Upgrades.ReadGameTheoryAudioBook, 95, "Chapter 8: Self-study quiz"),
  ];
  
  var upgradeReadAGameDevelopmentBookTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.ReadGameDevelopmentBook, 1, "Chapter 1: Introduction to game development"),
    updateDescAtProgress(Upgrades.ReadGameDevelopmentBook, 11, "Chapter 2: The game loop"),
    updateDescAtProgress(Upgrades.ReadGameDevelopmentBook, 31, "Chapter 3: Rendering things"),
    updateDescAtProgress(Upgrades.ReadGameDevelopmentBook, 49, "Chapter 4: Updating things"),
    updateDescAtProgress(Upgrades.ReadGameDevelopmentBook, 63, "Chapter 5: Assets and animation"),
    updateDescAtProgress(Upgrades.ReadGameDevelopmentBook, 71, "Chapter 6: Game genres and theories"),
    updateDescAtProgress(Upgrades.ReadGameDevelopmentBook, 88, "Chapter 7: Programming patterns and their applications"),
    updateDescAtProgress(Upgrades.ReadGameDevelopmentBook, 95, "Chapter 8: Self-study quiz"),
  ];

  var upgradeReadBloggingBusinessBookTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.ReadBloggingBusinessBook, 1, "Chapter 1: Zen in the art of typing words"),
    updateDescAtProgress(Upgrades.ReadBloggingBusinessBook, 11, "Chapter 2: Figuring out what to say"),
    updateDescAtProgress(Upgrades.ReadBloggingBusinessBook, 31, "Chapter 3: How to say what you mean"),
    updateDescAtProgress(Upgrades.ReadBloggingBusinessBook, 49, "Chapter 4: Creating a schedule and sticking to it"),
    updateDescAtProgress(Upgrades.ReadBloggingBusinessBook, 63, "Chapter 5: The existential philosophy of content creation"),
    updateDescAtProgress(Upgrades.ReadBloggingBusinessBook, 71, "Chapter 6: Tips from the pros"),
    updateDescAtProgress(Upgrades.ReadBloggingBusinessBook, 88, "Chapter 7: Hosting your blog in WordPress"),
    updateDescAtProgress(Upgrades.ReadBloggingBusinessBook, 95, "Chapter 8: Self-study quiz"),
  ];

  var upgradeReadPodcastingBusinessBookTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.ReadPodcastingBusinessBook, 1, "Chapter 1: Introduction making mouth sounds that make people go 'hmm'"),
    updateDescAtProgress(Upgrades.ReadPodcastingBusinessBook, 11, "Chapter 2: The vocal box and inflection, or, saying bye to your fry"),
    updateDescAtProgress(Upgrades.ReadPodcastingBusinessBook, 31, "Chapter 3: The tools of the trade"),
    updateDescAtProgress(Upgrades.ReadPodcastingBusinessBook, 49, "Chapter 4: Record your voice with this one weird trick"),
    updateDescAtProgress(Upgrades.ReadPodcastingBusinessBook, 63, "Chapter 5: Trimming, slicing, and editing session recordings"),
    updateDescAtProgress(Upgrades.ReadPodcastingBusinessBook, 71, "Chapter 6: I know what you did last episode (you had too many plosives!)"),
    updateDescAtProgress(Upgrades.ReadPodcastingBusinessBook, 88, "Chapter 7: Ten things I hate about room acoustics"),
    updateDescAtProgress(Upgrades.ReadPodcastingBusinessBook, 95, "Chapter 8: Self-study quiz"),
  ];
  
  var upgradeMonetizeBlogTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.MonetizeBlog, 1, "Deconstructing template..."),
    updateDescAtProgress(Upgrades.MonetizeBlog, 11, "Adding shortcodes..."),
    updateDescAtProgress(Upgrades.MonetizeBlog, 21, "Registering ad accounts..."),
    updateDescAtProgress(Upgrades.MonetizeBlog, 31, "Configuring ad settings..."),
    updateDescAtProgress(Upgrades.MonetizeBlog, 41, "Trying out different ad models..."),
    updateDescAtProgress(Upgrades.MonetizeBlog, 51, "Building banner ads..."),
    updateDescAtProgress(Upgrades.MonetizeBlog, 61, "Placing banner ads..."),
    updateDescAtProgress(Upgrades.MonetizeBlog, 71, "Building sidebar ads..."),
    updateDescAtProgress(Upgrades.MonetizeBlog, 81, "Placing sidebar ads..."),
    updateDescAtProgress(Upgrades.MonetizeBlog, 91, "Adding traffic funnels and landing pages..."),
    updateDescAtProgress(Upgrades.MonetizeBlog, 97, "Adding adblocker modal...")
]
;
  
  var upgradeWorkHardInSchoolTriggers:Trigger[] = [
      updateDescAtProgress(Upgrades.WorkHardInSchool, 1, "Studying algebra..."),
      updateDescAtProgress(Upgrades.WorkHardInSchool, 10, "Studying history..."),
      updateDescAtProgress(Upgrades.WorkHardInSchool, 20, "Studying psychology..."),
      updateDescAtProgress(Upgrades.WorkHardInSchool, 30, "Studying civics..."),
      updateDescAtProgress(Upgrades.WorkHardInSchool, 40, "Studying english..."),
      updateDescAtProgress(Upgrades.WorkHardInSchool, 50, "Studying literature..."),
      updateDescAtProgress(Upgrades.WorkHardInSchool, 60, "Studying computers..."),
      updateDescAtProgress(Upgrades.WorkHardInSchool, 70, "Studying finance..."),
      updateDescAtProgress(Upgrades.WorkHardInSchool, 80, "Studying calculus..."),
      updateDescAtProgress(Upgrades.WorkHardInSchool, 90, "Studying game development (elective)..."),
  ]
  ;
  
  var upgradeGetAnEntryLevelJobTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.GetAnEntryLevelJob, 1, "Asking around for openings..."),
    updateDescAtProgress(Upgrades.GetAnEntryLevelJob, 10, "Applying to places in town..."),
    updateDescAtProgress(Upgrades.GetAnEntryLevelJob, 25, "Interviewing with a place that seems nice..."),
    updateDescAtProgress(Upgrades.GetAnEntryLevelJob, 35, "Still waiting for a call-back..."),
    updateDescAtProgress(Upgrades.GetAnEntryLevelJob, 45, "Interviewing with another place that seems okay..."),
    {
      hasFired: false,
      condition: function (i: i.Inventory) {
        return getUpgradeProgress(Upgrades.GetAnEntryLevelJob) >= 50 && i.state.hasSmokedCannabis;
      },
      effect: function (i: i.Inventory) {
        setProgressDescription(Upgrades.GetAnEntryLevelJob, "Trying to convince first place that you didn't smoke cannabis...");
      },
    },
    updateDescAtProgress(Upgrades.GetAnEntryLevelJob, 60, "Checking online for job openings..."),
    updateDescAtProgress(Upgrades.GetAnEntryLevelJob, 70, "Interviewing over video chat..."),
    updateDescAtProgress(Upgrades.GetAnEntryLevelJob, 80, "Completing a background check..."),
    updateDescAtProgress(Upgrades.GetAnEntryLevelJob, 90, "Filling out paperwork..."),
    updateDescAtProgress(Upgrades.GetAnEntryLevelJob, 95, "Reading training binder..."),
    updateDescAtProgress(Upgrades.GetAnEntryLevelJob, 98, "Signing documents..."),
  ];
  
  var upgradeGetABetterJobTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.GetABetterJob, 1, "Asking around for openings..."),
    updateDescAtProgress(Upgrades.GetABetterJob, 10, "Looking for places hiring..."),
    updateDescAtProgress(Upgrades.GetABetterJob, 25, "Interviewing with a place that seems decent..."),
    updateDescAtProgress(Upgrades.GetABetterJob, 35, "Scheduling interviews..."),
    updateDescAtProgress(Upgrades.GetABetterJob, 45, "Interviewing with a different place that seems fine..."),
    {
      hasFired: false,
      condition: function (i: i.Inventory) {
        return getUpgradeProgress(Upgrades.GetABetterJob) >= 50 && i.state.hasSmokedCannabis;
      },
      effect: function (i: i.Inventory) {
        setProgressDescription(Upgrades.GetABetterJob, "Trying to convince first place that you didn't smoke cannabis...");
      },
    },
    updateDescAtProgress(Upgrades.GetABetterJob, 60, "Checking online for job openings..."),
    updateDescAtProgress(Upgrades.GetABetterJob, 70, "Interviewing over video chat..."),
    updateDescAtProgress(Upgrades.GetABetterJob, 80, "Completing a background check..."),
    updateDescAtProgress(Upgrades.GetABetterJob, 90, "Filling out paperwork..."),
    updateDescAtProgress(Upgrades.GetABetterJob, 95, "Completing mandatory sexual harassment training..."),
    updateDescAtProgress(Upgrades.GetABetterJob, 98, "Completing mandatory cybersecurity awareness training..."),
  ];

  var upgradeGetAJuniorDevTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.GetAJuniorDevJob, 1, "Asking around for openings..."),
    updateDescAtProgress(Upgrades.GetAJuniorDevJob, 10, "Looking for places hiring..."),
    updateDescAtProgress(Upgrades.GetAJuniorDevJob, 25, "Interviewing with a place that seems decent..."),
    updateDescAtProgress(Upgrades.GetAJuniorDevJob, 35, "Scheduling more interviews..."),
    updateDescAtProgress(Upgrades.GetAJuniorDevJob, 60, "Checking online for job openings..."),
    updateDescAtProgress(Upgrades.GetAJuniorDevJob, 70, "Interviewing over video chat..."),
    updateDescAtProgress(Upgrades.GetAJuniorDevJob, 80, "Completing a take-home assignment..."),
    updateDescAtProgress(Upgrades.GetAJuniorDevJob, 90, "Filling out paperwork..."),
    updateDescAtProgress(Upgrades.GetAJuniorDevJob, 95, "Completing mandatory HR training..."),
    updateDescAtProgress(Upgrades.GetAJuniorDevJob, 98, "Completing mandatory cybersecurity awareness training..."),
  ];

  var upgradeGetAGameDevTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.GetAGameDevJob, 1, "Asking around for openings..."),
    updateDescAtProgress(Upgrades.GetAGameDevJob, 10, "Looking for places hiring..."),
    updateDescAtProgress(Upgrades.GetAGameDevJob, 25, "Interviewing with a place that games online games..."),
    updateDescAtProgress(Upgrades.GetAGameDevJob, 35, "Scheduling more interviews..."),
    updateDescAtProgress(Upgrades.GetAGameDevJob, 60, "Checking online for job openings..."),
    updateDescAtProgress(Upgrades.GetAGameDevJob, 70, "Interviewing over video chat..."),
    updateDescAtProgress(Upgrades.GetAGameDevJob, 80, "Completing a take-home assignment..."),
    updateDescAtProgress(Upgrades.GetAGameDevJob, 90, "Filling out paperwork..."),
    updateDescAtProgress(Upgrades.GetAGameDevJob, 95, "Completing mandatory HR training..."),
    updateDescAtProgress(Upgrades.GetAGameDevJob, 98, "Completing mandatory cybersecurity awareness training..."),
  ];

  var upgradeLearnHTMLTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.LearnHTML, 1, "Studying the &lt;a&gt; tag..."),
    updateDescAtProgress(Upgrades.LearnHTML, 7, "Studying &lt;a&gt; and href..."),
    updateDescAtProgress(Upgrades.LearnHTML, 14, "Studying the &lt;h1&gt; and other heading tags..."),
    updateDescAtProgress(Upgrades.LearnHTML, 21, "Studying the &lt;head&gt; and &lt;body&gt;..."),
    updateDescAtProgress(Upgrades.LearnHTML, 28, "Learning how to set the &lt;title&gt; and use &lt;link&gt; tags..."),
    updateDescAtProgress(Upgrades.LearnHTML, 35, "Trying new ways to use &lt;div&gt; tags..."),
    updateDescAtProgress(Upgrades.LearnHTML, 45, "Studying the &lt;a&gt; tag..."),
    updateDescAtProgress(Upgrades.LearnHTML, 55, "Building practice websites..."),
    updateDescAtProgress(Upgrades.LearnHTML, 67, "Learning about aria tags..."),
    updateDescAtProgress(Upgrades.LearnHTML, 79, "Learning about data attributes..."),
    updateDescAtProgress(Upgrades.LearnHTML, 85, "Learning CSS..."),
  ];
  
  var upgradeStartAPodcastTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.StartAPodcast, 1, "Gathering ideas..."),
    updateDescAtProgress(Upgrades.StartAPodcast, 9, "Formulating show components..."),
    updateDescAtProgress(Upgrades.StartAPodcast, 17, "Writing first draft of pilot episode..."),
    updateDescAtProgress(Upgrades.StartAPodcast, 29, "Rewriting first draft of pilot episode..."),
    updateDescAtProgress(Upgrades.StartAPodcast, 35, "Researching show formats..."),
    updateDescAtProgress(Upgrades.StartAPodcast, 42, "Testing equipment..."),
    updateDescAtProgress(Upgrades.StartAPodcast, 59, "Recording a first draft episode..."),
    updateDescAtProgress(Upgrades.StartAPodcast, 70, "Trying out different post-processing chains..."),
    updateDescAtProgress(Upgrades.StartAPodcast, 78, "Creating marketing material for social media..."),
    updateDescAtProgress(Upgrades.StartAPodcast, 85, "Generating hype..."),
    updateDescAtProgress(Upgrades.StartAPodcast, 91, "Lining up guests..."),
    updateDescAtProgress(Upgrades.StartAPodcast, 95, "Uploading episodes..."),
    whenUpgradeCompleteFadeInSection(Upgrades.StartAPodcast, "sectionInfluence", "With a blog and a podcast, you're now able to generate Influence. As you create content, you generate more Influence -- but your Influence will wane if you take too long to produce more content.")
  ];
  
  var upgradeStartABlogTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.StartABlog, 1, "Gathering ideas..."),
    updateDescAtProgress(Upgrades.StartABlog, 7, "Trying out different platforms..."),
    updateDescAtProgress(Upgrades.StartABlog, 14, "Putting together some topics..."),
    updateDescAtProgress(Upgrades.StartABlog, 22, "Designing a website template..."),
    updateDescAtProgress(Upgrades.StartABlog, 31, "Finding a hosting provider..."),
    updateDescAtProgress(Upgrades.StartABlog, 44, "Trying out different typography settings..."),
    updateDescAtProgress(Upgrades.StartABlog, 49, "Importing fonts..."),
    updateDescAtProgress(Upgrades.StartABlog, 55, "Writing the About Me page..."),
    updateDescAtProgress(Upgrades.StartABlog, 65, "Writing and designing the Blog layout page..."),
    updateDescAtProgress(Upgrades.StartABlog, 75, "Writing the first blog post..."),
    updateDescAtProgress(Upgrades.StartABlog, 85, "Creating content for the upcoming week..."),
    updateDescAtProgress(Upgrades.StartABlog, 94, "Generating hype on social media..."),
    updateDescAtProgress(Upgrades.StartABlog, 96, "Lining up interviews..."),
    updateDescAtProgress(Upgrades.StartABlog, 99, "Clicking the publish button..."),
    whenUpgradeCompleteRevealUpgradeButton(Upgrades.StartABlog, Upgrades.StartAPodcast, "Your blog is now live! Everyone wants to read more about your idle clicker game obsession. Blogs can be monetized (once you learn Javascript and read a book about the business of blogging), and generate Influence -- which generates more blog traffic (which, in turn, generates more money!). So go on! Create something!")
  ];

  var upgradeGetOnSocialMediaTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.GetSocialMedia, 1, "Signing up..."),
    updateDescAtProgress(Upgrades.GetSocialMedia, 20, "Working on profile..."),
  ];

  var upgradeGetOnTikTokTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.GetOnTikTok, 1, "Signing up..."),
    updateDescAtProgress(Upgrades.GetOnTikTok, 20, "Working on profile..."),
    updateDescAtProgress(Upgrades.GetOnTikTok, 25, "Liking creators and videos to get to the better sides of TikTok..."),
  ];

  var upgradeLearnQuantumCodingTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.LearnQuantumCoding, 1, "Studying the manifold structure..."),
    updateDescAtProgress(Upgrades.LearnQuantumCoding, 20, "Tweaking with superpositioning particles..."),
    updateDescAtProgress(Upgrades.LearnQuantumCoding, 45, "Ideating on multi-state atrophy..."),
    updateDescAtProgress(Upgrades.LearnQuantumCoding, 60, "Structuring entanglement scenarios..."),
    updateDescAtProgress(Upgrades.LearnQuantumCoding, 75, "Experimenting with the adiabatic theorem..."),
    updateDescAtProgress(Upgrades.LearnQuantumCoding, 85, "Calculating transmons and ion traps..."),
  ];

  var upgradeLearnTheoreticalCodingTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.LearnTheoreticalCoding, 1, "Studying automata theory..."),
    updateDescAtProgress(Upgrades.LearnTheoreticalCoding, 20, "Compiling notes on computational complexity theory..."),
    updateDescAtProgress(Upgrades.LearnTheoreticalCoding, 45, "Deciphering data structures..."),
    updateDescAtProgress(Upgrades.LearnTheoreticalCoding, 60, "Parallelizing information-based entropy models..."),
    updateDescAtProgress(Upgrades.LearnTheoreticalCoding, 75, "Implementing machine learning paradigms..."),
    updateDescAtProgress(Upgrades.LearnTheoreticalCoding, 85, "Computing quantum-mechanical phenomena..."),
  ];

  var upgradeWriteASinglePlayerGameTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.WriteASinglePlayerGame, 1, "Building the menu scene..."),
    updateDescAtProgress(Upgrades.WriteASinglePlayerGame, 11, "Constructing the basic game loop..."),
    updateDescAtProgress(Upgrades.WriteASinglePlayerGame, 21, "Prototyping controls..."),
    updateDescAtProgress(Upgrades.WriteASinglePlayerGame, 31, "Developing assets..."),
    updateDescAtProgress(Upgrades.WriteASinglePlayerGame, 41, "Importing assets..."),
    updateDescAtProgress(Upgrades.WriteASinglePlayerGame, 51, "Keyframing animations..."),
    updateDescAtProgress(Upgrades.WriteASinglePlayerGame, 61, "Updating rendering pipeline..."),
    updateDescAtProgress(Upgrades.WriteASinglePlayerGame, 71, "Creating entity component system..."),
    updateDescAtProgress(Upgrades.WriteASinglePlayerGame, 81, "Creating upgrade system..."),
    updateDescAtProgress(Upgrades.WriteASinglePlayerGame, 91, "Building narrative progression tracking..."),
    updateDescAtProgress(Upgrades.WriteASinglePlayerGame, 97, "Adding easter eggs...")
  ];

  var upgradeWriteAMultiPlayerGameTriggers:Trigger[] = [
    updateDescAtProgress(Upgrades.WriteAMultiPlayerGame, 1, "Building the menu scene..."),
    updateDescAtProgress(Upgrades.WriteAMultiPlayerGame, 11, "Constructing the basic game loop..."),
    updateDescAtProgress(Upgrades.WriteAMultiPlayerGame, 21, "Prototyping controls..."),
    updateDescAtProgress(Upgrades.WriteAMultiPlayerGame, 31, "Developing assets..."),
    updateDescAtProgress(Upgrades.WriteAMultiPlayerGame, 41, "Importing assets..."),
    updateDescAtProgress(Upgrades.WriteAMultiPlayerGame, 51, "Keyframing animations..."),
    updateDescAtProgress(Upgrades.WriteAMultiPlayerGame, 61, "Updating rendering pipeline..."),
    updateDescAtProgress(Upgrades.WriteAMultiPlayerGame, 71, "Building network integrations..."),
    updateDescAtProgress(Upgrades.WriteAMultiPlayerGame, 81, "Creating upgrade system..."),
    updateDescAtProgress(Upgrades.WriteAMultiPlayerGame, 91, "Building narrative progression tracking..."),
    updateDescAtProgress(Upgrades.WriteAMultiPlayerGame, 97, "Adding easter eggs...")
  ];

  var upgradeBuyAdvancedAudioRecordingEquipmentTriggers:Trigger[] = buildIdleGameResearchUpdates(
    Upgrades.BuyAudioRecordingEquipment,
    "Selecting off-brand microphone...",
    "Selecting off-brand CLR cable...",
    "Selecting off-brand mixer...",
    "Selecting off-brand headphones...",
    "Selecting off-brand digital audio workstation...",
    "Hooking up components to computer...",
  );

  var upgradeBuyAudioRecordingEquipmentTriggers:Trigger[] = buildIdleGameResearchUpdates(
    Upgrades.BuyAdvancedAudioRecordingEquipment,
    "Selecting name-brand microphone...",
    "Selecting name-brand CLR cable...",
    "Selecting name-brand mixer...",
    "Selecting name-brand headphones...",
    "Selecting name-brand digital audio workstation...",
    "Hooking up components to computer...",
  );

  var upgradeMonetizePodcastTriggers:Trigger[] = buildIdleGameResearchUpdates(
    Upgrades.MonetizePodcast,
    "Mapping out locations for ads...",
    "Signing up for ad networks...",
    "Splicing content for ad placement...",
    "Cataloging advertising channels and partners...",
    "Prototyping ad placements...",
    "Refactoring ad placement strategies...",
    "Getting Beta listener feedback...",
    "Incorporating feedback into future episodes...",
    "Uploading newly spliced ad episodes...",
    "Switching on advertisement automations..."
  );

  var upgradeWriteAnIdleClickerGameTriggers:Trigger[] = buildIdleGameResearchUpdates(
    Upgrades.WriteAnIdleClickerGame,
    "Creating exist button...",
    "Building function to handle exist button...",
    "Building core game loop to prototype concept...",
    "Building cry button...",
    "Building function to handle cry button...", 
    "Adding cry button to game loop...",
    "Prototyping existence and crying functionality...",
    "Adding an anxiety progress bar...",
    "Incorporating anxiety progress bar into game loop...",
    "Testing out rising anxiety loop...",
    "Making max anxiety cause game over...",
    "Building CSS mockup...",
    "Converting CSS to nes.css for prototype...",
    "Building a basic set of upgrades...",
    "Generating upgrade loop...",
    "Generating dynamic upgrade functionality...",
    "Creating array-based upgrade manager...",
    "Uploading prototype to itch.io...",
    "Responding to comments on itch.io...",
    "Back to drawing board to incorporate comments on prototype...",
    "Map out further upgrades...",
    "Build out a multi-panel system for interface...",
    "Construct the Try Your Best panel...",
    "Build out upgrades system for Try Your Best panel...",
    "Construct the Spend Your Money panel...",
    "Build out upgrades for Spend Your Money panel...", 
    "Construct the Play a Game panel...",
    "Incorporate an idle clicker game inside your idle clicker game...",
    "Build out the Express Yourself panel...",
    "Create upgrades for Express Yourself panel...",
    "Build out the Create Something panel...",
    "Build upgrades for Create Something panel...",
    "Iterate over upgrades to make sure costs make sense...",
    "Build out system for calculating values...",
    "Attach values to labels during update loop...",
    "Orchestrate an end-game scenario...",
    "Map out upgrades to make it to end-game...",
    "Build inventory loop...",
    "Build out html templates...",
    "Build game button controller...",
    "Fine-tune upgrades costs and effects...",
    "Build system for anxiety reduction...",
    "Build engine components...",
    "Iterate and validate...",
    "Upload updated version to itch.io..."
  );

  var upgradeLearnAdvancedCodingTriggers:Trigger[] = buildIdleGameResearchUpdates(
    Upgrades.LearnAdvancedCoding,
    "Learning C/C++...",
    "Learning Python...",
    "Learning Ruby...",
    "Learning Haskell...",
    "Learning Typescript...",
    "Learning Brainf*ck...",
    "Learning assembly...",
    "Learning Rust...",
    "Learning Elm...",
    "Learning Rocket...",
    "Learning Lua...",
    "Learning Java...",
    "Learning Befunge...",
    "Learning Chef...",
    "Learning FRACTRAN...",
    "Learning GolfScript...",
    "Learning INTERCAL...",
    "Learning JSF*ck...",
    "Learning LOLCODE...",
    "Learning Malbolge...",
    "Learning Piet...",
    "Learning Rockstar...",
    "Learning Shakespeare...",
    "Learning Unlambda...",
    "Learning Whitespace...",
  );

  var upgradeLearnAudioRecordingTriggers:Trigger[] = buildIdleGameResearchUpdates(
    Upgrades.LearnAudioRecording,
    "Studying wave elements...",
    "Studying timbre and sonic spaces...",
    "Studying microphones...",
    "Studying dynamic microphones...",
    "Studying condenser microphones...",
    "Studying mic pickup patterns...",
    "Studying noise avoidance...",
    "Studying the proximity effect...",
    "Studying balanced audio...",
    "Studying levels...",
    "Studying filters...",
    "Studying DAWs and other software...",
    "Studying acoustic spaces...",
    "Practicing what you've learned..."
  );

  let triggerPacksToAdd = [
    buildIdleGameResearchUpdates(
      Upgrades.StreamOnTwitch,
      "Creating channel..."),
    buildIdleGameResearchUpdates(
      Upgrades.StreamOnYoutube, "Creating channel..."
    ),
    buildIdleGameResearchUpdates(Upgrades.SponsorASMR, "Recording in progress..."),
    buildIdleGameResearchUpdates(Upgrades.SponsorChair, "Negotiating contract..."),
    buildIdleGameResearchUpdates(Upgrades.SponsorMouse, "Negotiating contract..."),
    buildIdleGameResearchUpdates(Upgrades.SponsorDrink, "Negotiating contract..."),
    upgradeLearnAudioRecordingTriggers,
    upgradeLearnAdvancedCodingTriggers,
    upgradeBuyAdvancedAudioRecordingEquipmentTriggers,
    upgradeBuyAudioRecordingEquipmentTriggers,
    upgradeMonetizePodcastTriggers,
    upgradeWriteAnIdleClickerGameTriggers,
    upgradeWriteAMultiPlayerGameTriggers,
    upgradeWriteASinglePlayerGameTriggers,
    upgradeGetAJuniorDevTriggers,
    upgradeGetAGameDevTriggers,
    upgradeLearnTheoreticalCodingTriggers,
    upgradeLearnQuantumCodingTriggers,
    upgradeGetOnTikTokTriggers,
    upgradeGetOnSocialMediaTriggers,
    upgradeGetABetterJobTriggers,
    upgradeGetAnEntryLevelJobTriggers,
    upgradeStartAPodcastTriggers,
    upgradeStartABlogTriggers,
    upgradeLearnHTMLTriggers,
    upgradeWorkHardInSchoolTriggers,
    upgradeMonetizeBlogTriggers,
    upgradeReadPodcastingBusinessBookTriggers,
    upgradeReadBloggingBusinessBookTriggers,
    upgradeReadGameTheoryBookTriggers,
    upgradeReadAGameDevelopmentBookTriggers,
    upgradeLearnJavascriptTriggers
  ];

  return triggerPacksToAdd;
}

// HEY... TRIGGERS can show/hide upgrade button sections. 

export function initTriggers() {
  let triggers = triggersDb;

  // Add all the triggers for updating the descriptions of research items
  

  // Add all the trigger pack triggers to the triggers db
  getResearchUpgadeUpdates().forEach(function(triggerpack){
    triggerpack.forEach( function(trigger) {
      triggersDb.push(trigger);
    });
  });


  (window as any).triggers = triggers;
}

export function updateTriggers(i: i.Inventory) {
  (window as any).triggers.forEach((t: Trigger) => {
    if (!t.hasFired && t.condition(i)) {
      t.hasFired = true;
      t.effect(i);
    }
  });
}

/*

  public onUpdate(g: Game) {
    // Loop through all triggers where triggered == false.
    // For each, if condition is true, set triggered = true and call effect(g)
    this.triggers.forEach((trigger) => {
      if (!trigger.hasFired) {
        if (trigger.condition(g)) {
          trigger.hasFired = true;
          trigger.effect(g);
        }
      }
    });
  }
}
*/
