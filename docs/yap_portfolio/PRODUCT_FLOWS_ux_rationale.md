# yap. Portfolio — PRODUCT FLOWS: UX Rationale Captions

> Purpose: add an explicit UX lens to each of the 4 interactive demos in the PRODUCT FLOWS section,
> so each flow reads as a design-decision story (not just a feature demo). This rebalances the
> "Full-stack Product Engineer" tone toward "designer who builds" for UX Designer role applications.
>
> How to use: KEEP the existing interactive demo + the one-line principle headline. ADD the
> 3-line "User problem -> Design decision -> Why this way" caption beneath each. Keep it tight —
> the demo is the star; this text frames it.

---

## 0.1 · Anonymous entry, in one step

**Principle (keep):** *Joining should feel as light as opening a link.*

- **User problem** — A signup form makes people leave before the conversation even starts.
- **Design decision** — A shared link opens directly into a room with the composer ready: no login, nickname, or profile.
- **Why this way** — Friction belongs only where the conversation needs it (optional passcodes), never at the front door. Entry should feel as light as opening a link.

---

## 0.2 · Channel owner controls

**Principle (keep):** *Anonymous does not mean chaotic.*

- **User problem** — Anonymity invites participation, but without controls it also invites chaos, and owners feel they can't keep a room safe.
- **Design decision** — Passcode, chat freeze, and word filters change the room instantly, without the owner leaving the conversation.
- **Why this way** — Moderation authority should stay explicit and immediate, but never widen visibility or access beyond what the owner already has. Control, not surveillance.

---

## 0.3 · Private messages

**Principle (keep):** *Private messages have a visible boundary.*

- **User problem** — In an anonymous space, "wait, who can see this?" is the fear that quietly breaks trust.
- **Design decision** — The sender and the owner see the same private thread; other visitors continue to see only public messages, and the boundary is shown, not assumed.
- **Why this way** — Privacy has to be a *visible* boundary, not a hidden rule. People share honestly only when they can see exactly who is on the other side.

---

## 0.4 · Temporary live sessions

**Principle (keep):** *Live is intentionally temporary.*

- **User problem** — The weight of a permanent record discourages the light, in-the-moment exchanges people actually want.
- **Design decision** — A host opens a separate live session; its messages and reactions disappear when it ends, while the normal room stays intact.
- **Why this way** — Making impermanence an explicit, designed state (not an accident) gives people permission to be casual without worrying about a lasting record.

---

## Notes on using these

- **Format per flow:** interactive demo (keep) + principle headline (keep) + 3-line caption (add). Three lines max — resist expanding.
- **Keep engineering detail in SYSTEM DESIGN.** In PRODUCT FLOWS, answer "why does this experience feel this way," not "how is it built." Delegate implementation ("commit-first," Durable Objects, etc.) to the SYSTEM DESIGN section below.
- **The captions turn each feature into a design-decision story** — the "user problem -> decision -> rationale" pattern a Designer reviewer scans for.
- **Consistency:** the principle headlines already on the page ("Anonymous does not mean chaotic," etc.) become the natural headline for each caption — no need to rewrite them.
