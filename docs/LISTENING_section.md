# yap. Portfolio — "LISTENING" Section

> Placement: new standalone beat between SYSTEM DESIGN and TAKEAWAYS in the yap. case study.
> Purpose: adds a UX-research / validation beat to a case study that is otherwise build- and engineering-heavy.

---

## LISTENING

### Listening to real users, then shipping

> yap. includes an in-product feedback prompt triggered on each user's 10th visit — a point where someone has enough experience with the product to give grounded, specific input rather than first-impression noise. I've treated that channel as a continuous feedback-to-iteration loop: reviewing what returning users report, identifying recurring themes, and shipping updates directly in response. Rather than guessing at improvements, I let real usage steer the roadmap.

**How I know the product works — and where I look to improve it:**

**01 · Product signals**
400+ active users and roughly 6,517 messages in a single production week (433 active senders) show the core loop holds at real scale — the entry-to-message path doesn't break under real traffic.

**02 · In-product feedback**
A feedback prompt fires on a user's 10th visit — chosen deliberately, so input comes from people with real lived context rather than a first-impression reaction. I've shipped updates directly from what these returning users report.

**03 · Observed testing**
Because usage data and returning-user feedback both miss the people who leave early, I ran task-based usability testing on the entry and private-message flows to catch where *fresh* users hit friction in real time. *(Add once you run it — this is the piece that completes the picture.)*

---

### What users told me → what I shipped

**Experience refinements**

| User feedback (10th-visit prompt) | What I changed |
|---|---|
| New messages pulled me back down while I was scrolling up to read earlier messages | Added a **scroll-pause** that holds position until the user returns to the bottom |
| The interface felt visually tiring — colors were hard on the eyes | Shifted to a **softer, lower-strain color palette** |
| Text felt a bit large | Refined the **type scale** for calmer reading |
| Messages felt cramped together | **Opened up the spacing** between messages |

**Also shipped from feedback**

| User feedback (10th-visit prompt) | What I changed |
|---|---|
| Messages posted twice on send | Fixed a **duplicate-send bug** in the message path |
| Wanted to know about activity while away | Built **push notifications** (Important-only / All modes) |

**What this reflects:** usage data tells me *what* happens, feedback tells me *what returning users want*, and observed testing tells me *where new users struggle*. Reading all three together — and knowing the limits of each — is how I decide what to build next.

---

## Notes on using this

- **Placement:** new standalone beat **between SYSTEM DESIGN and TAKEAWAYS** — it's the bridge from "I built it" into "here's what I learned."
- **Two-table split is deliberate:** experience refinements (scroll, color, type, spacing) lead because they show design thinking; the bug fix and feature request sit in a second table. Splitting them signals you can tell a UX refinement, a bug, and a feature request apart — itself a maturity signal.
- **Keep feedback in the user's voice** (paraphrased naturally) rather than polished designer-speak — it reads as authentic.
- **Signal 03 is optional-until-real.** If you haven't run the usability test yet, either omit line 03 or phrase it as planned — do NOT claim it as done before it is.
- **Only include the notification row as "shipped" if it's actually live.** (Project docs suggest push notifications are implemented.)
- **Tone check:** the section shows you know each method's limits (survivorship in signals + feedback, freshness gap that testing fills). That self-awareness reads as UX maturity to a Designer reviewer.

## Placeholders / verify before publishing
- Confirm the exact scroll-pause wording matches what actually shipped (your SYSTEM DESIGN section already mentions "anchor-based scroll correction" — keep them consistent).
- Signal 03 — only after you actually run the usability test.
- Confirm push notifications are live before listing as shipped.
