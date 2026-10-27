# Lager-Rundgang

A short browser learning game for occupational safety training (Arbeitsschutz-Unterweisung) in a warehouse. Learners follow the yellow floor marking through six stations. At each station they meet a real situation from warehouse work and choose what they would do. A guide avatar, warehouse manager Jana, explains every answer, including the wrong ones, and reads it aloud.

**Play it:** https://sayamrina.github.io/lager-rundgang/

## Learning design

- **Scenario instead of fact quiz.** Each question starts with a situation ("A pallet is half on the walkway...") and asks for an action, so learners practise decisions, not definitions.
- **Feedback on every option.** Wrong answers are explained, disabled, and the learner tries again. The explanation names the rule behind it (ASR A1.8, ASR A2.2, TRBS 2121-2, DGUV Vorschrift 68, CLP pictograms).
- **Spatial navigation.** The floor plan shows where the learner is, which stations are done and what comes next.
- **Review at the end.** The result screen lists only the stations that were not solved at the first attempt, together with the correct behaviour.

## Accessibility and UX

- Keyboard operable; focus moves to each new station heading.
- Voice output uses the browser's speech synthesis (German voice) and can be switched off; the text is always visible in the speech bubble.
- Respects reduced motion, works on phones (390 px) and in dark mode.

## Tech

Plain HTML, CSS and JavaScript, no build step and no tracking. The station content is a single data array in `game.js`, so new stations or topics can be added without touching the game logic. Avatar and illustrations are inline SVG.

Run locally:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Note

The content is a learning prototype and does not replace a company-specific safety briefing.

This app was built by Amrina, with AI as a supporting tool for coding.

Portfolio: https://sayamrina.github.io/
