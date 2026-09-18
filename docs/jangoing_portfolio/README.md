# Jangoing portfolio thumbnail handoff

Copy these two files into the portfolio project:

- `JangoingThumbnailScreen.tsx`
- `JangoingThumbnailScreen.module.css`

The component has no external image or icon dependency. Render it inside the
portfolio's existing device mockup:

```tsx
import JangoingThumbnailScreen from "./JangoingThumbnailScreen";

<DeviceMockup>
  <JangoingThumbnailScreen />
</DeviceMockup>
```

The immediate parent must have an explicit width and height. The component fills
that area with `width: 100%` and `height: 100%`. It intentionally does not include
a device frame, notch, outer shadow, rotation, or background pattern.

The design is derived from the current production Jangoing Inventory and Quick
Update UI. It uses the production pink `#ff2d55`, green `#1f6b45`, iOS gray
surfaces, compact review rows, and the five-tab navigation.
