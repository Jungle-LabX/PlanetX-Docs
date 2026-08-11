# Sections and Level Pairs

A Section combines a geographic surface region, local frame, visual proxy, and transition boundary. A Level Pair defines the worlds in which that Section is presented.

## Section placement

`FPlanetXSectionPlacement` determines surface location, tangent orientation, size, and placement transform. A Same World Section selected as the canonical north-pole anchor can restrict automatic placement. The editor validates visual, coordinate-containment, and transition rectangles through one bounds contract.

An explicit Section ID lets saved data, captures, and Sequencer resolve the same frame. Automatic Section resolution uses the current Planet Local position and asset array order, so it is intended for editing and one-off queries rather than persistent identity.

## Runtime role

- **Same World** requires Orbit and Ground to use the same World package.
- **External Level / Level Handoff** requires distinct Orbit and Ground worlds plus a Runtime Preview World.

A Level Handoff Section needs a valid GroundSyncMapping and TransitionPolicy. Successful Proxy Bake publication refreshes the SourceRef, BakeData, mapping, preview, and transition-resource links.

## Ground proxy visibility

Per-Section Ground proxy visibility determines whether source actors or proxies are shown in Orbit, Ground, and transition states. PlanetX Mode's Planet, Compare, and Level views only compare editor presentation; they do not change the runtime contract.

## Validation checklist

1. Are Section ID and Level Pair ID non-empty?
2. Do the runtime role and World packages agree?
3. Is GroundSyncMapping valid?
4. Are Proxy Bake and generated visuals current?
5. Is the transition rectangle inside the containment bounds?
