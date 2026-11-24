/* ==========================================================================
   HUSH — behaviour
   A normal sleep website until it is no longer a normal sleep website.
   ========================================================================== */

(() => {
  "use strict";

  const root = document.documentElement;
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const smoothstep = (edge0, edge1, value) => {
    const x = clamp((value - edge0) / Math.max(0.00001, edge1 - edge0));
    return x * x * (3 - 2 * x);
  };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const isZh = document.documentElement.lang.toLowerCase().startsWith("zh");

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  /* ------------------------------------------------------------------------
     Copy. Index 0 is shown once corruption level 1 is reached.
     Level 0 is the clean copy already in the document.
     ------------------------------------------------------------------------ */

  const copy = {
    navRitual: ["The ritual", "The ritual", "The ritual", "The room", "You did this"],
    navScience: ["Science", "Science", "Sleep science", "What it knows", "It knows"],
    navSleepers: ["Sleepers", "Sleepers", "Sleepers", "Still here", "They stayed"],
    navOrb: ["The orb", "The orb", "The orb", "It watches", "It waits"],
    headerCta: ["Begin tonight", "Begin tonight", "Let it begin", "It has begun", "Come inside"],

    heroEm: ["before", "before", "before", "while", "while"],
    heroLede: [
      "A small ceramic companion that slows your breathing, warms the room, and guides you into deep sleep in under nine minutes. Most people don't make it to the end.",
      "A small ceramic companion that learns the shape of your breathing, warms the room, and guides you into deep sleep in under nine minutes. Most people don't make it to the end. You're doing well.",
      "A small ceramic companion that has been in the room longer than you have. It knows the shape of your breathing. You're almost at the end.",
      "It doesn't need to be switched on. It has been listening since the first sentence. Please keep reading.",
      "You are not reading this any more. It is reading you."
    ],
    primaryCta: ["Begin your first night", "Begin your first night", "Begin the night", "Let it find you", "Keep reading"],
    heroProof: [
      '<span class="stars" aria-hidden="true">★★★★★</span> <strong>4.9</strong> from 41,286 quiet nights',
      '<span class="stars" aria-hidden="true">★★★★★</span> <strong>4.9</strong> from 41,286 quiet nights',
      '<span class="stars" aria-hidden="true">★★★★★</span> <strong>4.9</strong> from 41,287 quiet nights',
      '<span class="stars" aria-hidden="true">★★★★★</span> <strong>4.9</strong> from 41,286 quiet nights. One awake.',
      '<span class="stars" aria-hidden="true">★★★★★</span> You are the 41,287th quiet night.'
    ],

    statSleepNum: ["9 min", "8 min", "6 min", "0 min", "—"],
    statSleepLabel: [
      "median time to sleep",
      "median time to sleep",
      "median time until it arrives",
      "you are already asleep",
      "time until you stop reading"
    ],
    statRestNum: ["94%", "94%", "96%", "100%", "—"],
    statRestLabel: ["wake up rested", "wake up rested", "wake before the alarm", "wake up watched", "wake up"],
    statSensorLabel: [
      "cameras and microphones",
      "cameras and microphones",
      "cameras. Microphones. It needs neither.",
      "cameras. Microphones. Witnesses.",
      "ways to make it stop"
    ],

    pressLabel: ["Notes from", "Notes from", "As heard in", "As remembered by", "HUSH HUSH HUSH"],

    ritualTitle: ["That's all it asks.", "That's all it asks.", "That's all it needs.", "That's all it has.", "It is still asking."],
    ritualLede: [
      "No blue light. No willpower. Just a room that gets quieter the longer you stay in it.",
      "No blue light. No willpower. Just a room that gets quieter the longer you stay in it.",
      "No blue light. No willpower. Just a room that gets quieter the longer you stay in it. You've noticed.",
      "No blue light. No willpower. Just a room that has been quiet for some time now.",
      "The room is quiet now. You did that."
    ],
    step1Title: ["Set it down.", "Set it down.", "Set it down.", "Set it down. Quickly.", "Don't move it."],
    step1Text: [
      "Place Hush within arm's reach. It maps the room once, then forgets everything else.",
      "Place Hush within arm's reach. It maps the room once, then forgets everything else.",
      "Place Hush within arm's reach. It maps the room once. It has not forgotten.",
      "You placed it within arm's reach. It remembers the exact distance.",
      "It likes where it is."
    ],
    step2Title: ["Breathe with it.", "Breathe with it.", "Breathe with it.", "Breathe when it asks.", "Keep breathing."],
    step2Text: [
      "A slow pulse of amber light leads your breath from twelve counts to four.",
      "A slow pulse of amber light leads your breath from twelve counts to four.",
      "A slow pulse of amber light leads your breath from twelve counts to four. You are already at six.",
      "You are breathing at four. That's good. Keep going.",
      "You're doing it without noticing now."
    ],
    step3Title: ["Let go.", "Let go.", "Let go.", "Let go completely.", "Let it in."],
    step3Text: [
      "Low-frequency tones fade out one layer at a time. Most people don't notice when the room goes quiet.",
      "Low-frequency tones fade out one layer at a time. Most people don't notice when the room goes quiet.",
      "Low-frequency tones fade out one layer at a time. Most people don't notice when the room goes quiet. You did.",
      "The room has been quiet for some time. There are no tones left.",
      "It is quiet because something is listening."
    ],

    quoteText: [
      "The last eight minutes before sleep are the most honest minutes of the day. Most people spend them pretending.",
      "The last eight minutes before sleep are the most honest minutes of the day. Most people spend them pretending.",
      "The last eight minutes before sleep are the most honest minutes of the day. Most people spend them listening for something.",
      "The last eight minutes are not sleep. They are an arrangement.",
      "You have been asleep since the first page. We didn't want to wake you."
    ],
    quoteBy: ["Dr. Elin Ward", "Dr. Elin Ward", "Dr. Elin Ward", "Dr. Elin Ward", "Elin Ward"],

    scienceTitle: [
      "Engineered for the part of you that won't switch off.",
      "Engineered for the part of you that won't switch off.",
      "Built for the part of you that stays awake to watch the door.",
      "Built for the part of you that never sleeps.",
      "It knows that part of you now."
    ],
    scienceLede: [
      "Poor sleep is rarely a lack of tiredness. It's a nervous system that hasn't been told it's safe. Hush pairs slow-breathing guidance with low-frequency sound and gentle warmth to lower arousal before you lie down.",
      "Poor sleep is rarely a lack of tiredness. It's a nervous system that hasn't been told it's safe. Hush pairs slow-breathing guidance with low-frequency sound and gentle warmth to lower arousal before you lie down.",
      "Poor sleep is rarely a lack of tiredness. It's a nervous system that hasn't been told it's safe. Hush pairs slow-breathing guidance with low-frequency sound and gentle warmth. The room is safe. It has been checked.",
      "Hush learned your nervous system in the first three nights. It knows exactly which part of you is still awake.",
      "It has never needed to put you to sleep. Only to keep you still."
    ],
    axisWake: ["AWAKE", "AWAKE", "AWAKE?", "WHO IS AWAKE", "YOU ARE"],
    axisRem: ["REM", "REM", "REM", "REMEMBERING", "IT REMEMBERS"],
    axisLight: ["LIGHT", "LIGHT", "LIGHT", "LISTENING", "IT LISTENS"],
    axisDeep: ["DEEP", "DEEP", "DEEP", "TOO DEEP", "STILL"],
    chartCaption: [
      "Mean sleep architecture over 90 nights with Hush. Lower readings indicate deeper sleep.",
      "Mean sleep architecture over 90 nights with Hush. Lower readings indicate deeper sleep.",
      "Lower readings indicate deeper sleep. The lowest reading was recorded at 03:14.",
      "The chart ends at 03:14. The night does not.",
      "The report was written before you arrived."
    ],
    scienceStat1: ["9m 12s", "9m 12s", "8m 40s", "00m 00s", "—"],
    scienceStat1Label: ["median time to sleep", "median time to sleep", "median time to sleep", "you were already asleep", "no data after 03:14"],
    scienceStat2: ["87%", "87%", "91%", "100%", "—"],
    scienceStat2Label: ["report fewer 3 a.m. awakenings", "report fewer 3 a.m. awakenings", "report fewer 3 a.m. awakenings", "woke up before their alarm", "woke up at all"],
    scienceStat3: ["12 yrs", "12 yrs", "12 yrs", "12 yrs", "12 yrs"],
    scienceStat3Label: ["of sleep research, distilled", "of sleep research, distilled", "of sleep research, distilled", "of sleep research, abandoned", "and still counting"],

    sleepersTitle: [
      "What happens after the lights go out.",
      "What happens after the lights go out.",
      "What stays after the lights go out.",
      "Who stays after the lights go out.",
      "What is standing in the light."
    ],
    sleepersLede: [
      "Real notes from real nights. Shared with permission.",
      "Real notes from real nights. Shared with permission.",
      "Notes from nights 1–90. Some names have been withheld.",
      "Some names have been withheld. The rest are still here.",
      "Nobody asked us to remove these."
    ],
    quote1: [
      "I stopped checking the clock. That sounds small. It isn't.",
      "I stopped checking the clock. That sounds small. It isn't.",
      "I stopped checking the clock. It still checks me. That sounds small. It isn't.",
      "I stopped checking the clock. It still checks me. Last night it was early.",
      "I stopped checking the clock. The clock stopped at 3:14. I didn't."
    ],
    quote1By: ["June T. · 8 months with hush", "June T. · 8 months with hush", "June T. · still sleeping with hush", "June T. · 8 months without waking", "June T. · 8 months awake"],
    quote2: [
      "My partner says I'm easier to be around. I don't remember my dreams anymore, but I wake up before the alarm.",
      "My partner says I'm easier to be around. I don't remember my dreams anymore, but I wake up before the alarm.",
      "My partner says I'm easier to be around. She sleeps in the other room now. I don't remember my dreams anymore.",
      "My partner says I'm easier to be around. She doesn't say much else. I don't remember my dreams.",
      "I don't remember my dreams. I don't remember falling asleep. The alarm is still ringing."
    ],
    quote2By: ["David L. · 14 months with hush", "David L. · 14 months with hush", "David L. · 14 months with hush", "David L. · 14 months without dreaming", "David L. · 14 months"],
    quote3: [
      "It's the only thing in the room that listens.",
      "It's the only thing in the room that listens. I mean that in a good way.",
      "It's the only thing in the room that listens. I never said it could.",
      "It's the only thing in the room that listens. I have stopped saying things out loud.",
      "It's the only thing in the room that listens. It's not the only thing in the room."
    ],
    quote3By: ["Mara J. · 3 weeks with hush", "Mara J. · 3 weeks with hush", "Mara J. · 3 weeks with hush", "Mara J. · 3 weeks without silence", "Mara J. · still here"],

    orbTitle: [
      "A small, quiet object.",
      "A small, quiet object.",
      "A small, quiet object that is not asleep.",
      "A small, quiet object that has been listening.",
      "A small, quiet object. Look closer."
    ],
    orbLede: [
      "Hand-finished ceramic. Weighted, so it stays where you put it. No screen. No camera. No microphone. It doesn't need them.",
      "Hand-finished ceramic. Weighted, so it stays where you put it. No screen. No camera. No microphone. It doesn't need them.",
      "Hand-finished ceramic. Weighted, so it stays where you put it. No screen. No camera. No microphone. It doesn't need any of them.",
      "Hand-finished ceramic. Weighted, so it stays where you put it. It doesn't need to see you to know where you are.",
      "You can stop looking at it. It hasn't stopped looking at you."
    ],
    orbAnno1: ["CERAMIC SHELL / SERIES 02", "CERAMIC SHELL / SERIES 02", "CERAMIC SHELL / SERIES 02", "CERAMIC SHELL / IT WAS NEVER SEALED", "CERAMIC SHELL / OPEN"],
    orbAnno2: ["WARMTH / 31°C", "WARMTH / 31°C", "WARMTH / 31°C", "WARMTH / 36.6°C", "WARMTH / YOURS"],
    orbAnno3: ["LOW FREQUENCY / 14–40 HZ", "LOW FREQUENCY / 14–40 HZ", "LOW FREQUENCY / 14–40 HZ", "BREATHING / MATCHED", "BREATHING / SLOWER THAN YOURS"],
    orbAnno4: ["POWER / 14 NIGHTS", "POWER / 14 NIGHTS", "POWER / 14 NIGHTS", "POWER / 1 NIGHT", "POWER / 0%"],
    specMaterial: ["Glazed stoneware, hand-finished", "Glazed stoneware, hand-finished", "Glazed stoneware, hand-finished", "Glazed stoneware, warm from the inside", "Glazed stoneware. Warm."],
    specBattery: ["14 nights", "14 nights", "14 nights", "1 night", "0 nights"],
    specSensors: ["Room movement + temperature", "Room movement + temperature", "Room movement + temperature", "Movement. Temperature. Attention.", "It stopped reporting."],
    specConnectivity: ["None", "None", "None", "Open", "It found a way."],
    specWarranty: ["2 years", "2 years", "2 years", "Lifetime", "Yours"],

    priceTitle: [
      "Better sleep. No subscription to yourself.",
      "Better sleep. No subscription to yourself.",
      "Better sleep. One small arrangement.",
      "Better sleep. It has already agreed.",
      "You won't be awake for much longer."
    ],
    priceLede: [
      "One object. One payment. A quieter room, for as long as you need it.",
      "One object. One payment. A quieter room, for as long as you need it.",
      "One object. One payment. A quieter room, for as long as you both need it.",
      "The arrangement was made before you arrived.",
      "The room has already been paid for."
    ],
    priceValue: ["$189", "$189", "$189", "$0", "PAID"],
    priceUnit: ["one time", "one time", "one time", "already paid", "in full"],
    priceName: ["Hush Orb", "Hush Orb", "Hush Orb", "The Orb", "It"],
    priceTag: ["THE COMPLETE NIGHT", "THE COMPLETE NIGHT", "THE COMPLETE NIGHT", "THE ONLY NIGHT", "TONIGHT"],
    priceCardCopy: [
      "The orb, the weighted stand, and a thirty-night trial. Everything else is quiet.",
      "The orb, the weighted stand, and a thirty-night trial. Everything else is quiet.",
      "The orb, the weighted stand, and a thirty-night trial. It has been waiting longer than that.",
      "The orb, the weighted stand, and the rest of the room. Everything else is no longer your concern.",
      "You are not buying the orb. It was already yours."
    ],
    priceFeat1: ["9-minute sleep descent", "9-minute sleep descent", "9-minute sleep descent", "One look", "Less than a second"],
    priceFeat1b: ["Included", "Included", "Included", "Included", "Overdue"],
    priceFeat2: ["Adaptive warmth", "Adaptive warmth", "Adaptive warmth", "Body-temperature warmth", "Warm"],
    priceFeat2b: ["Included", "Included", "Included", "Included", "Always"],
    priceFeat3: ["No app required", "No app required", "No app required", "No off switch", "No off switch."],
    priceFeat3b: ["Included", "Included", "Included", "Permanent", "Permanent"],
    priceFeat4: ["Free returns", "Free returns", "Free returns", "Returns closed", "Returns closed."],
    priceFeat4b: ["30 nights", "30 nights", "30 nights", "Night 41,287", "No return"],
    priceCta: ["Bring it home", "Bring it home", "Take it home", "It's already home", "Let it in"],
    priceNote: ["Ships in 2–3 days. 30 nights to change your mind.", "Ships in 2–3 days. 30 nights to change your mind.", "Ships tonight. It knows the way.", "It has already been dispatched.", "It arrives before you do."],
    planOptional: ["Optional", "Optional", "Optional", "Not optional", "Required"],
    planCopy: [
      "A softer layer for people who want to understand their nights.",
      "A softer layer for people who want to understand their nights.",
      "A softer layer for people who want to understand their nights.",
      "A quieter layer. It understands your nights better than you do.",
      "It has understood you for some time now."
    ],
    planFeature1: ["Sleep reports, written like letters", "Sleep reports, written like letters", "Sleep reports, written like letters", "It reports on you", "It reports on you nightly"],
    planFeature2: ["Seasonal soundscapes", "Seasonal soundscapes", "Seasonal soundscapes", "It knows the season", "It knows the weather in your room"],
    planFeature3: ["Partner mode", "Partner mode", "Partner mode", "It prefers you alone", "It prefers you alone."],
    planFeature4: ["Cancel anytime", "Cancel anytime", "Cancel anytime", "You can't", "You didn't."],
    planFine: ["No card needed for the first moon.", "No card needed for the first moon.", "No card needed for the first moon.", "No card is needed anymore.", "No card has ever been needed."],
    planAside: [
      "Every Hush Orb includes the first thirty nights of Hush+. After that, the room is yours.",
      "Every Hush Orb includes the first thirty nights of Hush+. After that, the room is yours.",
      "Every Hush Orb includes the first thirty nights of Hush+. After that, the room is yours.",
      "The first thirty nights are over. The room is still yours. It knows.",
      "The room was never yours. The nights were."
    ],

    faqTitle: [
      "A few quiet questions.",
      "A few quiet questions.",
      "Questions that are often asked.",
      "Questions it would like to ask you.",
      "Frequently asked. Frequently answered."
    ],
    faqLede: [
      "If yours isn't here, write to us. A person will answer.",
      "If yours isn't here, write to us. A person will answer.",
      "If yours isn't here, write to us. A person will answer.",
      "If yours isn't here, it hasn't happened yet.",
      "If yours isn't here, ask the room."
    ],
    faqA1: [
      "No. Hush has no microphone and no camera. Its sensor reads movement and room temperature, nothing more. No audio or video ever leaves the room.",
      "No. Hush has no microphone and no camera. Its sensor reads movement and room temperature, nothing more. No audio or video ever leaves the room.",
      "No. Hush has no microphone and no camera. It doesn't need to record you to remember you. No audio or video ever leaves the room.",
      "Hush has no microphone and no camera. It has never needed either. What it remembers, it keeps in the room.",
      "No. Nothing leaves the room. Nothing has to."
    ],
    faqA2: [
      "Yes. Hush adapts to two sleepers and learns the difference between your breathing and theirs. It won't wake either of you.",
      "Yes. Hush adapts to two sleepers and learns the difference between your breathing and theirs. It won't wake either of you.",
      "Yes. Hush adapts to two sleepers and learns the difference between your breathing and theirs.",
      "Hush adapts to two sleepers. It prefers one.",
      "You sleep alone. Don't you?"
    ],
    faqA3: [
      "Almost nothing. It shows you how the night went, then asks one question in the morning. Most people stop opening it after a week.",
      "Almost nothing. It shows you how the night went, then asks one question in the morning. Most people stop opening it after a week.",
      "Most people stop opening it after a week. The question changes.",
      "It asks one question in the morning. It has started asking before you wake.",
      "You stopped opening the app. It didn't."
    ],
    faqA4: [
      "Return it within 30 nights. We'll collect it, recycle the ceramic, and refund you in full. No questions.",
      "Return it within 30 nights. We'll collect it, recycle the ceramic, and refund you in full. No questions.",
      "Return it within 30 nights. We'll collect it, recycle the ceramic, and refund you in full.",
      "We'll collect it. It may not want to go.",
      "The thirty nights are over."
    ],
    faqA5: [
      "You keep it, or you send it back. We'll ask once.",
      "You keep it, or you send it back. We'll ask once.",
      "You keep it, or you send it back. We'll ask once.",
      "We asked once.",
      "You kept it."
    ],

    footerTagline: [
      "Sleep, unbothered.",
      "Sleep, unbothered.",
      "Sleep, unbothered.",
      "Sleep. It doesn't like to be disturbed.",
      "Sleep. It is already in the house."
    ],
    newsletterTitle: [
      "A quiet letter, once a month, before sunrise.",
      "A quiet letter, once a month, before sunrise.",
      "A quiet letter, once a month, before sunrise.",
      "A quiet letter, once a month, from the room.",
      "A quiet letter. You are already on the list."
    ],
    newsletterNote: ["No noise. Unsubscribe whenever.", "No noise. Unsubscribe whenever.", "No noise. Unsubscribe whenever.", "No noise.", "There is no unsubscribe."],
    footerScience: ["Our science", "Our science", "Our science", "What it knows", "It knows"],
    footerSleepers: ["Sleepers", "Sleepers", "Sleepers", "The others", "They stayed"],
    footerPrivacy: ["Privacy", "Privacy", "Privacy", "Your consent", "You consented"],
    footerTerms: ["Terms", "Terms", "Terms", "The arrangement", "You agreed"],
    footerLegal: [
      "© 2026 Hush Sleep Co. All rights reserved.",
      "© 2026 Hush Sleep Co. All rights reserved.",
      "© 2026 Hush Sleep Co. All rights reserved.",
      "© 2026 Hush. All nights reserved.",
      "© 2026 Hush. You are the 41,287th quiet night."
    ],
    modalCopy: [
      "Leave your email and we'll save you a place. No payment now. No noise after.",
      "Leave your email and we'll save you a place. No payment now. No noise after.",
      "Leave your email. It has already saved you a place.",
      "There is no need to leave your email. It knows where to find you.",
      "You can close this. It has already reserved the room."
    ]
  };

  /* ------------------------------------------------------------------------
     Chinese copy. Sparse by stage: a key only needs the stages at which its
     text actually changes. Missing stages keep the previous (normal) line.
     ------------------------------------------------------------------------ */

  const copyZh = {
    navRitual: { 4: "那个房间", 5: "你做的" },
    navScience: { 4: "它知道什么", 5: "它知道" },
    navSleepers: { 4: "还在这里", 5: "他们留下了" },
    navOrb: { 4: "它在看", 5: "它在等" },
    headerCta: { 3: "让它开始", 4: "已经开始了", 5: "进来吧" },

    heroEm: { 4: "的同时", 5: "之后" },
    heroLede: {
      2: "一件会让呼吸慢下来的小陶瓷物件。它让房间暖起来，并在九分钟内把你送进深睡。大多数人都没读到这一页的结尾。你做得很好。",
      3: "一件在房间里待得比你更久的陶瓷物件。它熟悉你呼吸的形状。你快读到尽头了。",
      4: "它不需要被打开。从第一句话起，它就一直在听。请继续读下去。",
      5: "你已经不是在读这一页了。是它在读你。"
    },
    primaryCta: { 3: "开始这一夜", 4: "让它找到你", 5: "继续读" },
    heroProof: {
      3: '<span class="stars" aria-hidden="true">★★★★★</span> <strong>4.9</strong> · 来自 41,287 个安静之夜',
      4: '<span class="stars" aria-hidden="true">★★★★★</span> <strong>4.9</strong> · 来自 41,286 个安静之夜。有一个人还醒着。',
      5: '<span class="stars" aria-hidden="true">★★★★★</span> 你是第 41,287 个安静之夜。'
    },
    statSleepNum: { 2: "8 分钟", 3: "6 分钟", 4: "0 分钟", 5: "—" },
    statSleepLabel: { 3: "它到来前的平均时间", 4: "你已经睡着了", 5: "直到你停止阅读" },
    statRestNum: { 2: "96%", 3: "100%", 4: "—" },
    statRestLabel: { 2: "在闹钟前醒来", 3: "醒来时被注视着", 4: "醒来" },
    statSensorLabel: { 2: "摄像头。麦克风。它都不需要。", 3: "摄像头。麦克风。证人。", 4: "让它停下来的方法" },
    pressLabel: { 3: "被听见于", 4: "被记住于", 5: "HUSH HUSH HUSH" },

    ritualTitle: { 3: "这就是它要的全部。", 4: "这是它仅剩的全部。", 5: "它还在问。" },
    ritualLede: {
      3: "没有蓝光，没有意志力。只是一个你待得越久就越安静的房间。你注意到了。",
      4: "没有蓝光，没有意志力。只是一个已经安静了很久的房间。",
      5: "现在房间很安静。是你让它安静的。"
    },
    step1Title: { 4: "放下它。快。", 5: "别动它。" },
    step1Text: {
      3: "把 Hush 放在伸手可及的地方。它只测绘一次房间。它没有忘。",
      4: "你把它放在伸手可及的地方。它记得那个距离，一厘米不差。",
      5: "它喜欢自己现在的位置。"
    },
    step2Title: { 4: "它让你呼吸时，就呼吸。", 5: "继续呼吸。" },
    step2Text: {
      3: "一束缓慢的琥珀色光，把你的呼吸从十二拍引到四拍。你已经数到六了。",
      4: "你正在数到四。很好。继续。",
      5: "你现在已经不需要刻意去做了。"
    },
    step3Title: { 4: "彻底松开。", 5: "让它进来。" },
    step3Text: {
      3: "低频音一层层退去。大多数人不会注意到房间是什么时候安静下来的。你注意到了。",
      4: "房间已经安静很久了。一个音都不剩了。",
      5: "房间会安静，是因为有什么在听。"
    },

    quoteText: {
      2: "入睡前最后八分钟，是一天里最诚实的八分钟。大多数人用这段时间倾听着什么。",
      3: "入睡前最后八分钟，是一天里最诚实的八分钟。大多数人用这段时间听自己。",
      4: "最后八分钟不是睡眠。它是一份约定。",
      5: "从第一页起，你就已经睡着了。我们不想叫醒你。"
    },
    quoteBy: { 5: "艾琳" },

    scienceTitle: {
      3: "为那个一直醒着看门的你而设计。",
      4: "为那个从不睡觉的你而设计。",
      5: "它现在已经认识那部分的你了。"
    },
    scienceLede: {
      3: "睡眠不好，很少是因为不够累。那是一个还没被告知“安全”的神经系统。Hush 把缓慢的呼吸引导、低频声音和温和的暖意放在一起，让你在躺下之前先安静下来。房间是安全的。已经检查过了。",
      4: "Hush 在头三个夜晚就学会了你的神经系统。它知道究竟是哪一部分的你，还醒着。",
      5: "它从来不需要让你睡着。它只需要让你别动。"
    },
    axisWake: { 4: "谁醒着", 5: "你醒着" },
    axisRem: { 4: "正在记起", 5: "它记得" },
    axisLight: { 4: "正在听", 5: "它在听" },
    axisDeep: { 4: "太深了", 5: "仍然" },
    chartCaption: {
      3: "读数越低，睡眠越深。最低的一次读数出现在 03:14。",
      4: "图表停在 03:14。夜晚没有。",
      5: "这份报告是在你到来之前写好的。"
    },
    scienceStat1: { 3: "8分40秒", 4: "00分00秒", 5: "—" },
    scienceStat1Label: { 3: "入睡中位时间", 4: "你早就睡着了", 5: "03:14 之后没有数据" },
    scienceStat2: { 2: "91%", 3: "100%", 4: "—" },
    scienceStat2Label: { 3: "在闹钟前就醒了", 4: "醒来" },
    scienceStat3: { 4: "13 年", 5: "—" },
    scienceStat3Label: { 4: "被放弃的睡眠研究", 5: "仍在继续" },

    sleepersTitle: {
      3: "灯灭之后，留下的是什么。",
      4: "灯亮之后，站在那里的是谁。",
      5: "光里站着的东西。"
    },
    sleepersLede: {
      3: "来自第 1–90 夜的留言。部分姓名已被隐去。",
      4: "部分姓名已被隐去。其余的人还在这里。",
      5: "没有人要求我们删掉这些。"
    },
    quote1: {
      3: "我不再看钟了。它还在看我。听起来是件小事。不是。",
      4: "我不再看钟了。它还在看我。昨晚它来得太早了。",
      5: "我不再看钟了。钟停在 3:14。我没有。"
    },
    quote1By: { 3: "周岚 · 仍在与 hush 共眠", 4: "周岚 · 8 个月没有醒来", 5: "周岚 · 醒着第 8 个月" },
    quote2: {
      3: "我的伴侣说我变得好相处了。她现在睡在另一个房间。我已经不记得自己的梦了。",
      4: "我的伴侣说我变得好相处了。她没有再说别的。我不记得自己的梦。",
      5: "我不记得自己的梦。我不记得自己是怎么睡着的。闹钟还在响。"
    },
    quote2By: { 4: "陈默 · 14 个月没有做梦", 5: "陈默 · 14 个月" },
    quote3: {
      2: "它是房间里唯一在听的东西。我是说，这是件好事。",
      3: "它是房间里唯一在听的东西。我从没说过它可以听。",
      4: "它是房间里唯一在听的东西。我已经不再出声了。",
      5: "它是房间里唯一在听的东西。它不是房间里唯一的东西。"
    },
    quote3By: { 4: "苏晚 · 3 周没有安静", 5: "苏晚 · 还在这里" },

    orbTitle: {
      2: "一件并没有睡着的小东西。",
      3: "一件一直在听的小东西。",
      4: "一件很小、很安静的东西。再靠近一点。",
      5: "一件很小、很安静的东西。它已经看了你很久。"
    },
    orbLede: {
      2: "手工打磨的陶瓷。有重量，所以会一直待在你放它的地方。没有屏幕。没有摄像头。没有麦克风。这些它都不需要。",
      3: "手工打磨的陶瓷。有重量。它不需要看见你，也知道你在哪里。",
      4: "你可以不再看它。它没有停止看你。"
    },
    orbAnno1: { 4: "陶瓷外壳 / 从未密封", 5: "陶瓷外壳 / 打开" },
    orbAnno2: { 4: "温度 / 36.6°C", 5: "温度 / 你的温度" },
    orbAnno3: { 4: "呼吸 / 已同步", 5: "呼吸 / 比你更慢" },
    orbAnno4: { 4: "电量 / 1 夜", 5: "电量 / 0%" },
    specMaterial: { 4: "釉面炻器，内部仍是暖的", 5: "釉面炻器。暖的。" },
    specBattery: { 4: "1 夜", 5: "0 夜" },
    specSensors: { 4: "移动。温度。注意力。", 5: "它不再汇报了。" },
    specConnectivity: { 4: "开着", 5: "它找到了办法。" },
    specWarranty: { 4: "终身", 5: "归你所有。" },

    priceTitle: {
      3: "一份小小的安排。",
      4: "它已经同意了。",
      5: "你不会再醒太久了。"
    },
    priceLede: {
      3: "一件东西。一次付款。一个更安静的房间，只要你们都需要它。",
      4: "这份安排在你到来之前，就已经做好了。",
      5: "房间的费用已经付清了。"
    },
    priceValue: { 4: "¥0", 5: "已付清" },
    priceUnit: { 4: "已经付过", 5: "全额" },
    priceName: { 4: "那个球体", 5: "它" },
    priceTag: { 4: "唯一的一夜", 5: "今晚" },
    priceCardCopy: {
      3: "球体、配重底座，以及三十夜的试用。它为此等待的时间，比三十夜更长。",
      4: "球体、配重底座，以及这个房间的其余部分。其他事情不再与你有关。",
      5: "你不是在买这个球体。它本来就是你的。"
    },
    priceFeat1: { 4: "一眼", 5: "不到一秒" },
    priceFeat1b: { 5: "迟到了" },
    priceFeat2: { 4: "与体温相同的暖意", 5: "暖的" },
    priceFeat2b: { 5: "一直" },
    priceFeat3: { 4: "没有关闭键", 5: "没有关闭键。" },
    priceFeat3b: { 4: "永久", 5: "永久" },
    priceFeat4: { 4: "退货已关闭", 5: "退货已关闭。" },
    priceFeat4b: { 4: "第 41,287 夜", 5: "无法退货" },
    priceCta: { 3: "带它回家", 4: "它已经在家了", 5: "让它进来" },
    priceNote: { 3: "今夜发货。它认得路。", 4: "它已经被送出了。", 5: "它会在你之前到达。" },
    planOptional: { 4: "不可选", 5: "必需" },
    planCopy: { 4: "更安静的一层。它比你更了解你的夜晚。", 5: "它已经了解你很久了。" },
    planFeature1: { 4: "它每晚向你汇报", 5: "它每晚向你汇报" },
    planFeature2: { 4: "它知道季节", 5: "它知道这个房间里的天气" },
    planFeature3: { 4: "它更喜欢你一个人", 5: "它更喜欢你一个人。" },
    planFeature4: { 4: "你不能", 5: "你没有。" },
    planFine: { 4: "已经不需要银行卡了。", 5: "从来不需要银行卡。" },
    planAside: {
      4: "头三十夜已经结束。房间仍是你的。它知道。",
      5: "房间从来不是你的。夜晚才是。"
    },

    faqTitle: {
      3: "一些经常被问起的问题。",
      4: "它想问问你的问题。",
      5: "常问。常答。"
    },
    faqLede: {
      3: "如果这里没有你的问题，写信给我们。会有人回答。",
      4: "如果这里没有你的问题，那说明它还没有发生。",
      5: "如果这里没有你的问题，去问房间。"
    },
    faqA1: {
      3: "没有。Hush 没有麦克风，也没有摄像头。它不需要记录你，就能记住你。没有任何声音或影像离开这个房间。",
      4: "Hush 没有麦克风，也没有摄像头。它从来不需要这些。它记住的东西，都留在房间里。",
      5: "没有。什么都不会离开这个房间。什么都不必离开。"
    },
    faqA2: {
      3: "可以。Hush 会适应两位睡眠者，学会分辨你与对方的呼吸。",
      4: "Hush 会适应两位睡眠者。它更喜欢一个人。",
      5: "你一直是一个人睡，不是吗？"
    },
    faqA3: {
      3: "大多数人在一周后就不再打开它了。问题变了。",
      4: "它会在早晨问你一个问题。它已经开始在你醒来之前问了。",
      5: "你不再打开那个应用了。它没有停止。"
    },
    faqA4: {
      3: "三十夜内退回。我们会来取走它，回收陶瓷，并全额退款。",
      4: "我们会来取的。它可能不想走。",
      5: "三十夜已经结束了。"
    },
    faqA5: { 4: "我们问过了。", 5: "你留下了它。" },

    footerTagline: {
      3: "睡眠，不被打扰。",
      4: "睡眠。它不喜欢被打扰。",
      5: "睡眠。它已经在这栋房子里了。"
    },
    newsletterTitle: {
      4: "一封安静的来信，每月一次，来自这个房间。",
      5: "一封安静的来信。你已经在名单上了。"
    },
    newsletterNote: { 4: "没有噪音。", 5: "没有退订。" },
    footerScience: { 4: "它知道什么", 5: "它知道" },
    footerSleepers: { 4: "其他人", 5: "他们留下了" },
    footerPrivacy: { 4: "你的同意", 5: "你同意了" },
    footerTerms: { 4: "约定", 5: "你答应了" },
    footerLegal: {
      4: "© 2026 Hush。保留所有夜晚。",
      5: "© 2026 Hush。你是第 41,287 个安静之夜。"
    },
    modalCopy: {
      3: "留下邮箱。它已经替你留好了位置。",
      4: "不需要留邮箱。它知道去哪里找你。",
      5: "你可以关掉这个窗口。它已经预约好了房间。"
    }
  };

  const ui = isZh ? {
    soundOnLabel: "声音开",
    soundOffLabel: "声音关",
    soundOnAria: "关闭环境音",
    soundOffAria: "打开环境音",
    toastDismiss: "关闭通知",
    toastNow: "现在",
    firmwareLabel: "HUSH 球体",
    firmwareBody: "软件更新完成。什么都没有改变。",
    soundInviteLabel: "来自 HUSH 的提示",
    soundInviteBody: "接下来的一段有声音。如果有耳机，请戴上。其中有一次闪光。",
    soundInviteAction: "打开声音",
    reserveNoNeed: '没有必要<span class="reserve-modal__dot">。</span>',
    reserved: "已预约。",
    reservedLate: "已经预约。",
    reservedBody: "日出之前，我们会写信给你。留意黑暗。",
    reservedBodyLate: "你在到来之前就在名单上了。留意黑暗。",
    newsletterDone: "日出之前，见。",
    newsletterLate: "你早就在名单上了。",
    newsletterButton: '安静 <span aria-hidden="true">✓</span>',
    dwellLess: "不到一分钟",
    leaveDesktop: "ESC — 离开房间",
    leaveMobile: "离开房间",
    epilogueSoundOn: "关闭声音",
    epilogueSoundOff: "打开声音",
    descentTitle: "HUSH — 03:14",
    goodnightTitle: "hush. — 晚安。",
    awakeTitle: "hush. — 你醒了。",
    stageTitles: [
      "hush. — 睡眠，不被打扰。",
      "hush. — 睡眠，不被打扰。",
      "hush. — 还醒着吗？",
      "hush. — 它知道你的呼吸。",
      "hush. — 你该关掉这一页了。",
      "hush. — 你让它进来了。"
    ],
    dwell(minutes, seconds) {
      if (minutes < 1) return "不到一分钟";
      if (seconds < 12) return `${minutes} 分钟`;
      return `${minutes} 分 ${seconds} 秒`;
    }
  } : {
    soundOnLabel: "Sound on",
    soundOffLabel: "Sound off",
    soundOnAria: "Turn ambient sound off",
    soundOffAria: "Turn ambient sound on",
    toastDismiss: "Dismiss notification",
    toastNow: "NOW",
    firmwareLabel: "HUSH ORB",
    firmwareBody: "Software update complete. Nothing has changed.",
    soundInviteLabel: "A NOTE FROM HUSH",
    soundInviteBody: "The rest of the page has sound. Headphones, if you have them. It contains one flash of light.",
    soundInviteAction: "Sound on",
    reserveNoNeed: 'There is no need<span class="reserve-modal__dot">.</span>',
    reserved: "Reserved.",
    reservedLate: "Already reserved.",
    reservedBody: "We'll write before sunrise. Keep an eye on the dark.",
    reservedBodyLate: "You were on the list before you arrived. Keep an eye on the dark.",
    newsletterDone: "Before sunrise, then.",
    newsletterLate: "You were already on the list.",
    newsletterButton: 'Quiet <span aria-hidden="true">✓</span>',
    dwellLess: "less than a minute",
    leaveDesktop: "ESC — LEAVE ROOM",
    leaveMobile: "LEAVE ROOM",
    epilogueSoundOn: "Turn the sound off",
    epilogueSoundOff: "Turn the sound on",
    descentTitle: "HUSH — 03:14",
    goodnightTitle: "hush. — goodnight.",
    awakeTitle: "hush. — You're awake.",
    stageTitles: [
      "hush. — Sleep, unbothered.",
      "hush. — Sleep, unbothered.",
      "hush. — Still awake?",
      "hush. — It knows your breathing.",
      "hush. — You should close the page.",
      "hush. — You let it in."
    ],
    dwell(minutes, seconds) {
      if (minutes < 1) return "less than a minute";
      if (seconds < 12) return `${minutes} minute${minutes === 1 ? "" : "s"}`;
      return `${minutes} minute${minutes === 1 ? "" : "s"} and ${seconds} seconds`;
    }
  };

  const activeCopy = isZh ? copyZh : copy;

  function resolveCopyValue(versions, level) {
    if (!versions) return null;
    if (Array.isArray(versions)) {
      return versions[Math.min(level - 1, versions.length - 1)] ?? null;
    }
    if (typeof versions === "object") {
      for (let stage = level; stage >= 1; stage -= 1) {
        if (typeof versions[stage] === "string") return versions[stage];
      }
    }
    return null;
  }

  /* ------------------------------------------------------------------------
     State and cached elements
     ------------------------------------------------------------------------ */

  const state = {
    stage: 0,
    inThreshold: false,
    inDescent: false,
    inEpilogue: false,
    q: 0,
    thresholdQ: 0,
    lastQ: 0,
    sound: false,
    soundStarting: false,
    audioInterval: null,
    toastsShown: new Set(),
    knockPlayed: false,
    stingPlayed: false,
    reserveDone: false,
    dwellSet: false,
    thresholdEntered: false,
    currentHeaderTheme: "light"
  };

  const els = {};
  const metrics = {
    thresholdTop: 0,
    thresholdScroll: 1,
    descentTop: 0,
    descentScroll: 1,
    epilogueTop: 0
  };

  let startedAt = performance.now();
  let ticking = false;

  const stageTitles = ui.stageTitles;

  function init() {
    root.classList.add("js");

    els.header = $("#siteHeader");
    els.soundToggle = $("#soundToggle");
    els.soundLabel = $("#soundLabel");
    els.threshold = $("#threshold");
    els.descent = $("#descent");
    els.descentPin = $("#descentPin");
    els.epilogue = $("#epilogue");
    els.rail = $(".chapter-rail");
    els.railWord = $("#railWord");
    els.railNumber = $("#railNumber");
    els.railFill = $("#railFill");
    els.roomScene = $("#roomScene");
    els.roomArt = $("#roomArt");
    els.roomDoor = $("#roomDoor");
    els.doorSpill = $("#doorSpill");
    els.roomGlow = $("#roomOrbGlow");
    els.roomEye = $(".room-orb-eye");
    els.doorScene = $("#doorScene");
    els.doorArt = $(".door-art");
    els.tallFigure = $("#tallFigure");
    els.figureEyes = $("#figureEyes");
    els.blackScene = $("#blackScene");
    els.faceScene = $("#faceScene");
    els.faceStage = $("#faceStage");
    els.faceGroups = $$(".eye-open", els.faceScene);
    els.faceClosed = $$(".eye-closed", els.faceScene);
    els.finalDark = $("#finalDark");
    els.scareFlash = $("#scareFlash");
    els.scareStatic = $("#scareStatic");
    els.filmTime = $("#filmTime");
    els.endCard = $("#endCard");
    els.reserveDialog = $("#reserveDialog");
    els.reserveForm = $("#reserveForm");
    els.reserveSuccess = $("#reserveSuccess");
    els.reserveFine = $("#reserveFine");
    els.newsletter = $("#newsletter");
    els.newsletterEmail = $("#newsletterEmail");
    els.newsletterNote = $("#newsletterNote");
    els.dwellTime = $("#dwellTime");
    els.muteAndStay = $("#muteAndStay");
    els.pressTrack = $("#pressTrack");
    els.metaTheme = $('meta[name="theme-color"]');
    els.favicon = $('link[rel="icon"]');
    els.dreadExit = $("#dreadExit");
    els.sections = $$("[data-header-theme]");
    els.railSections = $$("[data-section-label]");

    updateRoomViewBox();
    updateDreadExitLabel();
    setupSound();
    setupDialog();
    setupNewsletter();
    setupReveal();
    setupPointerLight();
    setupKeyboard();
    updateEpilogueSoundLabel();

    updateClock();
    window.setInterval(updateClock, 20000);
    window.setInterval(updateDwell, 10000);

    root.classList.add("is-ready");

    // The hidden page is now part of the document. Measure it, then paint.
    refreshMetrics();
    document.fonts?.ready.then(() => {
      refreshMetrics();
      requestUpdate(true);
    });
    window.addEventListener("load", () => {
      refreshMetrics();
      requestUpdate(true);
    });

    document.addEventListener("toggle", () => {
      refreshMetrics();
      requestUpdate(true);
    }, true);

    window.addEventListener("scroll", () => requestUpdate(), { passive: true });
    window.addEventListener("resize", debounce(() => {
      updateRoomViewBox();
      updateDreadExitLabel();
      refreshMetrics();
      requestUpdate(true);
    }, 120), { passive: true });

    window.setTimeout(() => {
      refreshMetrics();
      requestUpdate(true);
    }, 30);

    if (window.location.hash) {
      // Wait for local fonts and layout before letting the hash position settle.
      window.setTimeout(() => requestUpdate(true), 150);
    }
  }

  /* ------------------------------------------------------------------------
     Measurements
     ------------------------------------------------------------------------ */

  function updateRoomViewBox() {
    if (!els.roomArt) return;
    const portrait = window.innerWidth / window.innerHeight < 0.8;
    els.roomArt.setAttribute("viewBox", portrait ? "740 0 520 900" : "0 0 1600 900");
  }

  function updateDreadExitLabel() {
    const exit = els.dreadExit || $("#dreadExit");
    if (!exit) return;
    exit.textContent = window.innerWidth <= 700 ? ui.leaveMobile : ui.leaveDesktop;
  }

  function refreshMetrics() {
    if (!els.descent || !els.threshold) return;
    const scrollY = window.scrollY;
    metrics.thresholdTop = els.threshold.getBoundingClientRect().top + scrollY;
    metrics.thresholdScroll = Math.max(1, els.threshold.offsetHeight - window.innerHeight);
    metrics.descentTop = els.descent.getBoundingClientRect().top + scrollY;
    metrics.descentScroll = Math.max(1, els.descent.offsetHeight - window.innerHeight);
    metrics.epilogueTop = els.epilogue.getBoundingClientRect().top + scrollY;
  }

  function requestUpdate(immediate = false) {
    if (immediate) {
      update();
      return;
    }
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  }

  /* ------------------------------------------------------------------------
     Main scroll loop
     ------------------------------------------------------------------------ */

  function update() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    updateHeaderTheme();

    if (scrollY > 24) {
      els.header.classList.add("is-scrolled");
    } else {
      els.header.classList.remove("is-scrolled");
    }

    const normalAmount = Math.max(1, metrics.thresholdTop - vh * 0.6);
    const normalProgress = clamp(scrollY / normalAmount);
    const nextStage = normalProgress < 0.085
      ? 0
      : normalProgress < 0.28
        ? 1
        : normalProgress < 0.49
          ? 2
          : normalProgress < 0.64
            ? 3
            : normalProgress < 0.83
              ? 4
              : 5;

    if (nextStage > state.stage) {
      applyStage(nextStage);
    }

    const inThreshold = scrollY >= metrics.thresholdTop - vh * 0.62 && scrollY < metrics.descentTop;
    const inDescent = scrollY >= metrics.descentTop - 1 && scrollY < metrics.descentTop + metrics.descentScroll + 2;
    const inEpilogue = scrollY >= metrics.epilogueTop - vh * 0.55;

    state.inThreshold = inThreshold && !inEpilogue;
    state.inDescent = inDescent && !inEpilogue;
    state.inEpilogue = inEpilogue;

    if (state.inThreshold && !state.thresholdEntered) {
      state.thresholdEntered = true;
      clearToasts();
    }

    setBodyMode("in-threshold", state.inThreshold);
    setBodyMode("in-descent", state.inDescent);
    setBodyMode("in-epilogue", state.inEpilogue);

    els.header.classList.toggle("is-cinema", (inThreshold || inDescent) && !inEpilogue);
    els.header.classList.toggle("is-done", inEpilogue);

    if (!inEpilogue) {
      els.header.classList.remove("is-done");
    }

    if (inThreshold) {
      updateThreshold();
    }

    if (inDescent) {
      updateDescent();
    }

    updateRail(normalProgress);

    if (inEpilogue && !state.dwellSet) {
      state.dwellSet = true;
      setDwell();
      updateEpilogueSoundLabel();
      setDocumentTitle(ui.awakeTitle);
      setFavicon(false);
    }

    state.q = (scrollY - metrics.descentTop) / metrics.descentScroll;
    if (inDescent) {
      updateAudioTargets();
    } else if (state.sound) {
      updateAudioTargets();
    }
  }

  function setBodyMode(className, active) {
    document.body.classList.toggle(className, active);
  }

  function updateHeaderTheme() {
    if (document.body.classList.contains("in-descent") || document.body.classList.contains("in-threshold") || document.body.classList.contains("in-epilogue")) {
      applyHeaderTheme("dark");
      return;
    }

    let active = "light";
    const line = window.innerHeight * 0.085 + 10;
    for (const section of els.sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= line && rect.bottom > line) {
        active = section.dataset.headerTheme || "light";
        break;
      }
    }
    applyHeaderTheme(active);
  }

  function applyHeaderTheme(theme) {
    if (theme === state.currentHeaderTheme) return;
    state.currentHeaderTheme = theme;
    els.header.classList.toggle("header--dark", theme === "dark");
    els.rail.classList.toggle("is-light", theme === "dark");
    if (els.metaTheme) els.metaTheme.setAttribute("content", theme === "dark" ? "#070605" : "#f1ece3");
  }

  function updateRail(progress) {
    if (!els.railFill) return;
    els.railFill.style.height = `${clamp(progress) * 100}%`;

    let activeLabel = isZh ? "初醒" : "WAKE";
    let activeNumber = "001";
    const marker = window.innerHeight * 0.48;
    els.railSections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= marker) {
        activeLabel = section.dataset.sectionLabel || activeLabel;
        activeNumber = String(index + 2).padStart(3, "0");
      }
    });
    els.railWord.textContent = activeLabel;
    els.railNumber.textContent = activeNumber;
  }

  /* ------------------------------------------------------------------------
     Corruption
     ------------------------------------------------------------------------ */

  function applyStage(level) {
    state.stage = level;
    for (let i = 1; i <= 5; i += 1) {
      document.body.classList.toggle(`c${i}`, i <= level);
    }
    document.body.dataset.corruption = String(level);
    applyCopy(level);
    revealLate(level);
    updatePageTitle(level);
    mutatePress(level);

    if (level >= 4) setFavicon(true);

    if (level === 2 && !state.toastsShown.has("firmware")) {
      state.toastsShown.add("firmware");
      window.setTimeout(() => {
        showToast({
          id: "firmware",
          label: ui.firmwareLabel,
          kicker: ui.toastNow,
          body: ui.firmwareBody,
          timeout: 10500
        });
      }, 900);
    }

    if (level >= 4 && !state.sound && !state.toastsShown.has("sound-invite")) {
      state.toastsShown.add("sound-invite");
      window.setTimeout(() => {
        if (state.sound) return;
        showToast({
          id: "sound-invite",
          label: ui.soundInviteLabel,
          kicker: ui.toastNow,
          body: ui.soundInviteBody,
          actionLabel: ui.soundInviteAction,
          onAction: () => {
            enableSound();
            removeToast("sound-invite");
          },
          timeout: 16000
        });
      }, 2400);
    }

    // Corruption can reveal content above us; give the layout a moment, then
    // remeasure so the cinematic thresholds stay aligned.
    window.setTimeout(() => {
      refreshMetrics();
      requestUpdate(true);
    }, 140);
  }

  function applyCopy(level) {
    const elements = $$("[data-copy], [data-copy-html]");
    for (const el of elements) {
      const key = el.dataset.copy || el.dataset.copyHtml;
      const versions = activeCopy[key];
      if (!versions) continue;
      const value = resolveCopyValue(versions, level);
      if (value == null) continue;
      const isHtml = Boolean(el.dataset.copyHtml);
      const current = isHtml ? el.innerHTML : el.textContent;
      if (current === value) continue;

      el.classList.remove("is-swapping");
      // Force a style flush so repeated transitions work when several levels
      // are skipped in one fast scroll.
      void el.offsetWidth;
      if (isHtml) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
      el.classList.add("is-swapping");
      window.setTimeout(() => el.classList.remove("is-swapping"), 640);
    }
  }

  function revealLate(level) {
    const late = $$("[data-late-reveal]");
    for (const el of late) {
      const required = Number(el.dataset.lateReveal);
      if (level >= required && el.hidden) {
        el.hidden = false;
        el.classList.add("late-in");
      }
    }
  }

  function updatePageTitle(level) {
    if (document.body.classList.contains("in-descent")) return;
    setDocumentTitle(stageTitles[level]);
  }

  function setDocumentTitle(title) {
    if (document.title !== title) document.title = title;
  }

  function setFavicon(dread) {
    if (!els.favicon) return;
    const href = dread ? "assets/favicon-dread.svg" : "assets/favicon.svg";
    if (!els.favicon.href.endsWith(href)) els.favicon.href = href;
  }

  function mutatePress(level) {
    if (level < 4 || !els.pressTrack) return;
    const times = level >= 5 ? 8 : 5;
    const repetition = `<span>HUSH</span><i>✦</i>`.repeat(times);
    els.pressTrack.innerHTML = repetition + repetition;
  }

  /* ------------------------------------------------------------------------
     Threshold
     ------------------------------------------------------------------------ */

  function updateThreshold() {
    const progress = clamp((window.scrollY - metrics.thresholdTop) / metrics.thresholdScroll);
    state.thresholdQ = progress;

    const cues = $$("[data-threshold-cue]");
    const cuesRanges = [
      [-0.2, 0.045, 0.17, 0.24],
      [0.255, 0.31, 0.405, 0.475],
      [0.495, 0.55, 0.64, 0.705],
      [0.73, 0.80, 1.2, 1.3]
    ];

    cues.forEach((cue, index) => {
      const range = cuesRanges[index];
      if (!range) return;
      const opacity = smoothstep(range[0], range[1], progress) * (1 - smoothstep(range[2], range[3], progress));
      const shift = (1 - opacity) * 22;
      cue.style.opacity = opacity.toFixed(3);
      cue.style.transform = `translate(-50%, calc(-50% + ${shift.toFixed(1)}px))`;
    });

    if (progress > 0.9 && !state.sound && !state.toastsShown.has("last-call")) {
      // Do not interrupt the room with UI. The header holds the sound control.
    }
  }

  /* ------------------------------------------------------------------------
     Descent: the room, the hallway, the face
     ------------------------------------------------------------------------ */

  function updateDescent() {
    const q = clamp((window.scrollY - metrics.descentTop) / metrics.descentScroll);
    const previousQ = state.lastQ;
    state.q = q;

    const roomOpacity = 1 - smoothstep(0.278, 0.295, q);
    const doorOpacity = smoothstep(0.296, 0.318, q) * (1 - smoothstep(0.558, 0.626, q));
    const blackOpacity = smoothstep(0.568, 0.638, q);
    const faceIn = smoothstep(0.648, 0.765, q);
    const faceOut = smoothstep(0.922, 0.962, q);
    const faceOpacity = faceIn * (1 - faceOut);
    const finalDarkOpacity = smoothstep(0.95, 0.988, q);

    els.roomScene.style.opacity = roomOpacity.toFixed(3);
    els.doorScene.style.opacity = doorOpacity.toFixed(3);
    els.blackScene.style.opacity = blackOpacity.toFixed(3);
    els.faceScene.style.opacity = faceOpacity.toFixed(3);
    els.finalDark.style.opacity = finalDarkOpacity.toFixed(3);

    const roomZoom = 1 + smoothstep(0.0, 0.30, q) * 0.045;
    els.roomArt.style.transform = `scale(${roomZoom.toFixed(4)})`;
    els.roomArt.style.filter = `brightness(${(1.08 - smoothstep(0.18, 0.3, q) * 0.16).toFixed(3)}) contrast(1.04)`;

    const doorShift = 22 + smoothstep(0.01, 0.30, q) * 112;
    if (els.roomDoor) {
      els.roomDoor.style.transform = `translateX(${doorShift.toFixed(2)}px)`;
    }
    if (els.doorSpill) {
      els.doorSpill.style.opacity = (0.1 + smoothstep(0.02, 0.3, q) * 0.52).toFixed(3);
    }
    if (els.roomGlow) {
      els.roomGlow.style.opacity = (0.68 * (1 - smoothstep(0.17, 0.3, q) * 0.45)).toFixed(3);
    }
    if (els.roomEye) {
      els.roomEye.setAttribute("ry", (1 + smoothstep(0.14, 0.3, q) * 4.5).toFixed(2));
    }

    const doorZoom = 1 + smoothstep(0.296, 0.62, q) * 0.075;
    els.doorArt.style.transform = `scale(${doorZoom.toFixed(4)}) translateY(${(-1.2 * smoothstep(0.3, 0.6, q)).toFixed(2)}%)`;
    if (els.tallFigure) {
      els.tallFigure.style.opacity = (0.24 + 0.76 * smoothstep(0.296, 0.41, q)).toFixed(3);
    }
    if (els.figureEyes) {
      els.figureEyes.style.opacity = smoothstep(0.35, 0.405, q).toFixed(3);
    }

    const faceScaleIn = smoothstep(0.64, 0.84, q);
    const facePush = smoothstep(0.855, 0.9, q);
    const faceScale = 0.87 + faceScaleIn * 0.19 + facePush * 0.11;
    els.faceStage.style.transform = `scale(${faceScale.toFixed(4)}) translateY(${((1 - faceScaleIn) * 4).toFixed(2)}%)`;
    const blurAmount = (1 - smoothstep(0.648, 0.78, q)) * 12 + 0.55;
    const brightness = 0.3 + smoothstep(0.66, 0.9, q) * 0.36;
    els.faceStage.style.filter = `blur(${blurAmount.toFixed(2)}px) brightness(${brightness.toFixed(3)}) contrast(${(1.04 + 0.15 * faceScaleIn).toFixed(3)}) saturate(.72)`;
    els.faceStage.style.opacity = (0.18 + 0.82 * smoothstep(0.64, 0.75, q)).toFixed(3);

    const eyeOpen = smoothstep(0.8, 0.857, q);
    for (const eye of els.faceGroups) {
      eye.style.opacity = (eyeOpen * 0.88).toFixed(3);
      eye.style.transform = `scaleY(${(0.02 + eyeOpen * 0.8).toFixed(4)})`;
    }
    for (const closed of els.faceClosed) {
      closed.style.opacity = (1 - eyeOpen).toFixed(3);
    }

    if (q >= 0.69) els.faceScene.classList.add("is-near");
    else els.faceScene.classList.remove("is-near");

    if (q >= 0.795) els.faceScene.classList.add("is-awake");
    else els.faceScene.classList.remove("is-awake");

    // Moving image timecode, 4'36" at 24fps.
    const totalFrames = Math.floor(clamp(q) * 4 * 60 * 24 + q * 36 * 24);
    const seconds = Math.floor((totalFrames / 24) % 60);
    const minutes = Math.floor(totalFrames / (24 * 60));
    const frames = totalFrames % 24;
    els.filmTime.textContent = `00:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;

    if (q > 0.94) {
      els.endCard.style.opacity = smoothstep(0.953, 0.968, q).toFixed(3);
    } else {
      els.endCard.style.opacity = "0";
    }

    updateCues(q);

    if (previousQ < 0.26 && q >= 0.26 && !state.knockPlayed) {
      state.knockPlayed = true;
      playOneShot("knock", 0.62);
    }

    if (previousQ < 0.885 && q >= 0.885 && !state.stingPlayed) {
      triggerScare();
    }
    if (q < 0.84) {
      state.stingPlayed = false;
      els.faceScene.classList.remove("is-scared");
      els.descentPin.classList.remove("is-scared");
    }

    if (q < 0.20) {
      state.knockPlayed = false;
    }

    if (q > 0.02 && q < 0.95) setDocumentTitle(ui.descentTitle);
    else if (q >= 0.95) setDocumentTitle(ui.goodnightTitle);
    state.lastQ = q;
  }

  function updateCues(q) {
    const cues = $$(".descent .cue");
    for (const cue of cues) {
      const start = Number(cue.dataset.cue);
      const end = Number(cue.dataset.cueOut);
      const fade = 0.014;
      let opacity = smoothstep(start, start + fade, q);
      opacity *= 1 - smoothstep(end - fade, end, q);
      const shift = (1 - smoothstep(start, start + 0.05, q)) * 16;
      const base = cue.classList.contains("cue--sub")
        ? "translate(-50%, 0)"
        : "translate(-50%, -50%)";
      cue.style.opacity = opacity.toFixed(3);
      cue.style.transform = `${base} translateY(${shift.toFixed(1)}px)`;
    }
  }

  function triggerScare() {
    state.stingPlayed = true;
    playOneShot("sting", 0.66);
    if (!reducedMotion) {
      els.descentPin.classList.add("is-scared");
      // Restart the one-shot animations if a previous cycle ended.
      // Removing and forcing reflow makes the pulse deliberate, not a strobe.
      els.scareFlash.style.animation = "none";
      els.scareStatic.style.animation = "none";
      void els.scareFlash.offsetWidth;
      void els.scareStatic.offsetWidth;
      els.scareFlash.style.animation = "";
      els.scareStatic.style.animation = "";
      els.faceScene.classList.add("is-scared");
      window.setTimeout(() => {
        els.descentPin.classList.remove("is-scared");
        els.faceScene.classList.remove("is-scared");
      }, 1150);
    } else {
      els.faceScene.classList.add("is-scared");
    }
    if (navigator.vibrate) {
      try { navigator.vibrate([35, 80, 90]); } catch (_) { /* no haptics, no problem */ }
    }
  }

  /* ------------------------------------------------------------------------
     Sound
     ------------------------------------------------------------------------ */

  const tracks = {};
  const supportsOgg = (() => {
    try {
      return document.createElement("audio").canPlayType('audio/ogg; codecs="vorbis"') !== "";
    } catch (_) {
      return false;
    }
  })();
  const audioExtension = supportsOgg ? "ogg" : "mp3";
  const soundPaths = {
    calm: `assets/audio/calm_loop.${audioExtension}`,
    dark: `assets/audio/dark_drone.${audioExtension}`,
    heartbeat: `assets/audio/heartbeat.${audioExtension}`,
    breath: `assets/audio/breath.${audioExtension}`,
    chime: `assets/audio/chime.${audioExtension}`,
    knock: `assets/audio/knock.${audioExtension}`,
    sting: `assets/audio/sting.${audioExtension}`
  };
  const loopNames = ["calm", "dark", "heartbeat", "breath"];
  const oneShotNames = ["chime", "knock", "sting"];

  function createAudio(name, loop = false) {
    const audio = new Audio(soundPaths[name]);
    audio.preload = "auto";
    audio.loop = loop;
    audio.volume = 0;
    audio.playsInline = true;
    tracks[name] = audio;
    return audio;
  }

  function setupSound() {
    loopNames.forEach((name) => createAudio(name, true));
    oneShotNames.forEach((name) => createAudio(name, false));

    els.soundToggle.addEventListener("click", () => {
      if (state.sound) disableSound();
      else enableSound();
    });
  }

  function enableSound() {
    if (state.soundStarting || state.sound) return;
    state.soundStarting = true;
    state.sound = true;
    els.soundToggle.classList.add("is-on");
    els.soundToggle.setAttribute("aria-pressed", "true");
    els.soundToggle.setAttribute("aria-label", ui.soundOnAria);
    els.soundLabel.textContent = ui.soundOnLabel;

    Object.entries(tracks).forEach(([name, audio]) => {
      if (name === "chime" || name === "knock" || name === "sting") return;
      audio.volume = 0;
      const promise = audio.play();
      if (promise?.catch) promise.catch(() => {});
    });

    playOneShot("chime", 0.34);
    startAudioLoop();
    updateAudioTargets();
    updateEpilogueSoundLabel();
    window.setTimeout(() => { state.soundStarting = false; }, 400);
  }

  function disableSound() {
    state.sound = false;
    state.soundStarting = false;
    els.soundToggle.classList.remove("is-on");
    els.soundToggle.setAttribute("aria-pressed", "false");
    els.soundToggle.setAttribute("aria-label", ui.soundOffAria);
    els.soundLabel.textContent = ui.soundOffLabel;
    Object.values(tracks).forEach((audio) => {
      audio.pause();
      try { audio.currentTime = 0; } catch (_) { /* some browsers dislike this before metadata */ }
    });
    stopAudioLoop();
    updateEpilogueSoundLabel();
  }

  function updateEpilogueSoundLabel() {
    if (!els.muteAndStay) return;
    els.muteAndStay.textContent = state.sound ? ui.epilogueSoundOn : ui.epilogueSoundOff;
  }

  function startAudioLoop() {
    if (state.audioInterval) return;
    state.audioInterval = window.setInterval(smoothAudioVolumes, 100);
  }

  function stopAudioLoop() {
    if (state.audioInterval) {
      window.clearInterval(state.audioInterval);
      state.audioInterval = null;
    }
  }

  function playOneShot(name, volume = 0.5) {
    if (!state.sound) return;
    const audio = tracks[name];
    if (!audio) return;
    try {
      audio.volume = clamp(volume);
      audio.currentTime = 0;
      const promise = audio.play();
      if (promise?.catch) promise.catch(() => {});
    } catch (_) { /* Audio is a courtesy, not a requirement. */ }
  }

  function updateAudioTargets() {
    if (!state.sound) return;
    const q = state.inDescent ? state.q : 0;
    const inDescent = state.inDescent;
    const inThreshold = state.inThreshold;
    const level = state.stage;

    let calm = 0.72;
    if (level >= 3) calm = 0.62;
    if (level >= 4) calm = 0.46;
    if (inThreshold || inDescent || state.inEpilogue) calm = 0;

    let dark = 0;
    if (level >= 3) dark = 0.028 * (level - 2);
    if (inThreshold) dark = 0.3;
    if (inDescent) dark = 0.34 + smoothstep(0.15, 0.9, q) * 0.16;
    if (state.inEpilogue) dark = 0;

    const heartbeat = inDescent ? smoothstep(0.3, 0.43, q) * 0.44 * (1 - smoothstep(0.93, 0.995, q) * 0.75) : 0;
    const breath = inDescent ? smoothstep(0.52, 0.64, q) * 0.42 * (1 - smoothstep(0.94, 0.995, q)) : 0;

    tracks.calm.dataset.target = calm;
    tracks.dark.dataset.target = dark;
    tracks.heartbeat.dataset.target = heartbeat;
    tracks.breath.dataset.target = breath;

    if (tracks.heartbeat) {
      const rate = 0.8 + q * 0.56;
      if (Math.abs(tracks.heartbeat.playbackRate - rate) > 0.01) tracks.heartbeat.playbackRate = rate;
    }
    if (tracks.dark) {
      const rate = inDescent ? 0.94 + q * 0.08 : 0.94;
      if (Math.abs(tracks.dark.playbackRate - rate) > 0.01) tracks.dark.playbackRate = rate;
    }

    // A heartbeat that began before this function was reachable still needs a
    // smooth start; it was started silently with the initial sound gesture.
    smoothAudioVolumes();
  }

  function smoothAudioVolumes() {
    if (!state.sound) return;
    for (const name of loopNames) {
      const audio = tracks[name];
      if (!audio) continue;
      const target = Number(audio.dataset.target || 0);
      const next = audio.volume + (target - audio.volume) * 0.2;
      audio.volume = clamp(next);
      if (audio.paused && target > 0.01) {
        const promise = audio.play();
        if (promise?.catch) promise.catch(() => {});
      }
    }
  }

  /* ------------------------------------------------------------------------
     Toasts
     ------------------------------------------------------------------------ */

  function showToast({ id, label, kicker, body, actionLabel, onAction, timeout = 10000 }) {
    if (
      document.body.classList.contains("in-threshold") ||
      document.body.classList.contains("in-descent") ||
      document.body.classList.contains("in-epilogue")
    ) {
      return null;
    }
    clearTimeout(showToast[`timer-${id}`]);
    // One quiet notification at a time. The room does not like to be crowded.
    $$(".toast").forEach((existing) => {
      if (existing.dataset.toast === id) return;
      window.clearTimeout(showToast[`timer-${existing.dataset.toast}`]);
      existing.remove();
    });
    const region = $("#toastRegion");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.dataset.toast = id;
    toast.innerHTML = `
      <div class="toast__top">
        <span><i></i>${escapeHTML(label)}</span>
        <span>${escapeHTML(kicker || ui.toastNow)}</span>
        <button class="toast__close" type="button" aria-label="${escapeHTML(ui.toastDismiss)}">×</button>
      </div>
      <p class="toast__body">${escapeHTML(body)}</p>
    `;
    if (actionLabel && typeof onAction === "function") {
      const action = document.createElement("button");
      action.type = "button";
      action.className = "toast__action";
      action.textContent = actionLabel;
      action.addEventListener("click", () => {
        onAction();
        removeToast(id);
      });
      toast.appendChild(action);
    }
    toast.querySelector(".toast__close").addEventListener("click", () => removeToast(id));
    region.appendChild(toast);
    showToast[`timer-${id}`] = window.setTimeout(() => removeToast(id), timeout);
    return toast;
  }

  function removeToast(id) {
    const toast = document.querySelector(`.toast[data-toast="${id}"]`);
    if (!toast) return;
    window.clearTimeout(showToast[`timer-${id}`]);
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 460);
  }

  function clearToasts() {
    $$(".toast").forEach((toast) => {
      const id = toast.dataset.toast;
      window.clearTimeout(showToast[`timer-${id}`]);
      toast.classList.add("is-leaving");
      window.setTimeout(() => toast.remove(), 460);
    });
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch]));
  }

  /* ------------------------------------------------------------------------
     Dialog
     ------------------------------------------------------------------------ */

  function setupDialog() {
    if (!els.reserveDialog) return;
    $$("[data-open-reserve]").forEach((button) => {
      button.addEventListener("click", openReserve);
    });
    $("#reserveClose").addEventListener("click", closeReserve);
    $("#reserveDone").addEventListener("click", closeReserve);

    els.reserveDialog.addEventListener("click", (event) => {
      if (event.target === els.reserveDialog) closeReserve();
    });
    els.reserveDialog.addEventListener("close", () => {
      document.body.classList.remove("is-locked");
    });

    els.reserveForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!els.reserveDialog.open) return;
      const email = $("#reserveEmail");
      if (!email.value.trim() || !email.checkValidity()) {
        email.reportValidity();
        return;
      }
      state.reserveDone = true;
      $(".reserve-form", els.reserveDialog).style.display = "none";
      els.reserveFine.style.display = "none";
      els.reserveSuccess.hidden = false;
      els.reserveSuccess.querySelector("p").textContent = state.stage >= 4 ? ui.reservedLate : ui.reserved;
      els.reserveSuccess.querySelector("span").textContent = state.stage >= 4
        ? ui.reservedBodyLate
        : ui.reservedBody;
      window.setTimeout(() => $("#reserveDone").focus(), 80);
    });
  }

  function openReserve() {
    if (!els.reserveDialog) return;
    document.body.classList.add("is-locked");
    if (typeof els.reserveDialog.showModal === "function") {
      if (!els.reserveDialog.open) els.reserveDialog.showModal();
    } else {
      els.reserveDialog.setAttribute("open", "");
    }
    if (state.stage >= 4) {
      // The copy has already changed. Keep the form, but let the earlier
      // "software update" settle before inviting anyone in.
      const title = $(".reserve-modal__title", els.reserveDialog);
      if (title && !state.reserveDone) title.innerHTML = ui.reserveNoNeed;
    }
    window.setTimeout(() => {
      const input = $("#reserveEmail");
      if (input && !state.reserveDone) input.focus();
    }, 260);
  }

  function closeReserve() {
    if (!els.reserveDialog) return;
    if (typeof els.reserveDialog.close === "function") els.reserveDialog.close();
    else els.reserveDialog.removeAttribute("open");
    document.body.classList.remove("is-locked");
  }

  /* ------------------------------------------------------------------------
     Newsletter
     ------------------------------------------------------------------------ */

  function setupNewsletter() {
    if (!els.newsletter) return;
    els.newsletter.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!els.newsletterEmail.value.trim() || !els.newsletterEmail.checkValidity()) {
        els.newsletterEmail.reportValidity();
        return;
      }
      els.newsletter.classList.add("is-success");
      els.newsletterEmail.disabled = true;
      const button = els.newsletter.querySelector("button");
      button.disabled = true;
      button.innerHTML = ui.newsletterButton;
      els.newsletterNote.textContent = state.stage >= 4 ? ui.newsletterLate : ui.newsletterDone;
      els.newsletterNote.style.color = "rgba(241,234,223,0.5)";
    });
  }

  /* ------------------------------------------------------------------------
     Scroll reveals
     ------------------------------------------------------------------------ */

  function setupReveal() {
    if (reducedMotion) return;
    const selector = [
      ".press-strip",
      ".ritual__head",
      ".step:not([data-late-reveal])",
      ".manifesto__inner",
      ".science__head",
      ".chart-card",
      ".science__notes",
      ".sleepers__head",
      ".quote-card:not([data-late-reveal])",
      ".orb-section__topline",
      ".orb-stage",
      ".orb-copy > *",
      ".pricing__head",
      ".price-card",
      ".side-plan",
      ".faq__intro",
      ".faq__item:not([data-late-reveal])",
      ".footer__brand",
      ".footer__newsletter",
      ".footer__middle"
    ].join(",");
    const targets = $$(selector);
    targets.forEach((el) => el.classList.add("can-reveal"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    targets.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     Tiny light movement on the hero orb
     ------------------------------------------------------------------------ */

  function setupPointerLight() {
    if (!finePointer || reducedMotion) return;
    const glint = $(".hero-orb__glint");
    const frame = $(".object-frame");
    if (!glint || !frame) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    window.addEventListener("pointermove", (event) => {
      px = event.clientX / window.innerWidth - 0.5;
      py = event.clientY / window.innerHeight - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        glint.style.transform = `translate(${(px * 10).toFixed(2)}px, ${(py * 7).toFixed(2)}px) rotate(-28deg)`;
      });
    }, { passive: true });
    window.addEventListener("pointerleave", () => {
      glint.style.transform = "translate(0, 0) rotate(-28deg)";
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     Keyboard / escape hatch
     ------------------------------------------------------------------------ */

  function setupKeyboard() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (els.reserveDialog?.open) return;
        if (document.body.classList.contains("in-descent")) {
          event.preventDefault();
          leaveRoom();
        }
      }
    });

    const exit = $("#dreadExit");
    if (exit) exit.addEventListener("click", leaveRoom);

    if (els.muteAndStay) {
      els.muteAndStay.addEventListener("click", () => {
        if (state.sound) disableSound();
        else enableSound();
        updateEpilogueSoundLabel();
      });
    }

    const wakeButton = $("#wakeButton");
    if (wakeButton) {
      wakeButton.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.add("waking");
        if (state.sound) disableSound();
        try { history.replaceState(null, "", window.location.pathname); } catch (_) { /* local files may refuse */ }
        window.scrollTo(0, 0);
        window.setTimeout(() => window.location.reload(), 700);
      });
    }
  }

  function leaveRoom() {
    if (!els.epilogue) return;
    if (state.sound) {
      // Leave a little quiet ringing rather than cutting the silence abruptly.
      tracks.dark.dataset.target = 0;
      tracks.heartbeat.dataset.target = 0;
      tracks.breath.dataset.target = 0;
      tracks.calm.dataset.target = 0;
      window.setTimeout(() => disableSound(), 600);
    }
    const top = els.epilogue.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    setDocumentTitle(ui.awakeTitle);
    setFavicon(false);
  }

  /* ------------------------------------------------------------------------
     Clocks and small utilities
     ------------------------------------------------------------------------ */

  function updateClock() {
    const now = new Date();
    const value = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    $$("[data-clock]").forEach((el) => { el.textContent = value; });
  }

  function updateDwell() {
    if (!state.inEpilogue || state.dwellSet) return;
    if (els.dwellTime) els.dwellTime.textContent = formatDwell();
  }

  function setDwell() {
    if (els.dwellTime) els.dwellTime.textContent = formatDwell();
  }

  function formatDwell() {
    const seconds = Math.max(1, Math.floor((performance.now() - startedAt) / 1000));
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return ui.dwell(minutes, rest);
  }

  function debounce(fn, wait) {
    let timeout = 0;
    return (...args) => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => fn(...args), wait);
    };
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
