# Project PMOS — Women's Everyday Wellness Companion 🌸

> **Hackathon Prototype**  
> An all-in-one, elegant, and medically responsible wellness web application designed to support women's daily physical, nutritional, and emotional health journey.

---

## 🌟 Core Highlights & Architecture

1. **Daily Overview & Plan (Dashboard)**: Answers the single most important question: *"What should I do today?"* Includes real-time progress rings, consistency streaks, dynamic daily movement, meal highlights, self-care cards, and interactive mood check-ins.
2. **Progressive Routines (Yoga & Exercise)**: **Exclusive progressive day-unlocking architecture** (Day 1 $\rightarrow$ Day 2 $\rightarrow$ Day 3 upon 100% completion of preceding day's exercises). Includes interactive exercise timers, pose instructions, target muscle guides, and safety tips.
3. **Nourishing Indian Nutrition Hub**: Practical, authentic Indian recipes categorized into Breakfast, Lunch, Evening Refreshers, Dinner, and a guilt-free **Mindful Comfort / Treats** section. Filter by Vegetarian, Eggetarian, and Non-Vegetarian.
4. **Personal Care Sanctuary (No Day Locks)**:
   - **Skin Care**: 2-step assessment generating tailored AM & PM barrier routines, ingredient guides, and weekly rituals.
   - **Hair Care**: 2-step assessment generating customized Wash Day and Non-Wash Day schedules with scalp massage guides.
   - **Mood & Mind**: Instant emotional check-in with **Interactive 4-7-8 Breathing Circle**, 5-minute fresh air walk timer, heart micro-journal prompts, and 7-day mood trend visualization.
   - **Period Tracker**: Estimated cycle phase (Menstrual, Follicular, Ovulatory, Luteal), cycle day tracker, next period countdown, symptom logger, and soothing Ayurvedic herbal remedies.
5. **Medication & Supplement Tracker**: Personal habit checklist with daily adherence percentages and medical safety guidance.
6. **Private Progress & Photo Vault**: Consistency metrics and browser-local Before vs. Current progress photo uploads (100% private on local device).
7. **Hackathon Demo Controls**: 1-click controls to restart onboarding, unlock all routine days for jury review, or reset default 4-day streak state.

---

## 🛠️ Tech Stack

- **Frontend Framework**: HTML, CSS, Vanilla Javascript
- **Styling**: Tailwind CSS (custom wellness tokens: warm blush, soft mauve, lavender, peach, warm cream, espresso text)
- **Icons**: Lucide React
- **Storage**: `localStorage` with unified state serializer and seed defaults

---

## 🚀 How to Run the Project Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 🎯 3–5 Minute Hackathon Jury Demo Guide

1. **Welcome & Onboarding**: Tap **Settings & Demo $\rightarrow$ Restart Onboarding** to showcase the 3-screen onboarding (focus selection & dietary preferences).
2. **Dashboard**: Show Today's Progress card (3 of 4 completed), dynamic 75% progress ring, and streak counter.
3. **Progressive Movement**:
   - Go to **Routines $\rightarrow$ Yoga Track**.
   - Note Day 1 is completed, Day 2 is unlocked, and Day 3 is locked.
   - Launch Day 2 workout player, start the interactive timer, complete the poses, and observe the celebratory **"🎉 Day 3 Unlocked"** modal!
4. **Authentic Nutrition**: Open **Nutrition**, filter by *Vegetarian* or *Breakfast*, open **Moong Dal Chilla**, check off ingredients, and tap **Add to Today's Plan**.
5. **Personal Care**:
   - Open **Skin Care** / **Hair Care** to demonstrate the personalized routine generator.
   - Open **Mood & Mind** to run the animated **4-7-8 Breathing Guide**.
   - Open **Period Tracker** to view the cycle phase insight and log symptoms.
6. **Progress & Photos**: Tap **My Progress** to demonstrate the Before vs. Current local photo comparison.

---

## ⚖️ Medical Responsibility & Safety Note

Project PMOS is a lifestyle and wellness companion prototype. It does not provide medical diagnoses, treatment plans, or clinical prescriptions. All guidance is formulated as general wellness support with explicit recommendations to consult licensed healthcare professionals for medical or hormonal concerns.
