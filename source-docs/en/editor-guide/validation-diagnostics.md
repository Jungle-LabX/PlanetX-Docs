# Validation and Diagnostics

PlanetX validation reports more than an error string. A finding carries severity, impact, blocking scope, automatic-fix eligibility, and a resolution action.

## Quick and Full Validate

Quick Validate checks the asset structure and immediately available contracts. Full Validate also inspects Worlds, Proxy Bake links, Runtime Preview, and generated output, and writes structured logs.

Primary Diagnostics actions are:

- Quick Validate
- Full Validate
- Review Sections
- Open Proxy Bake
- Show Section
- Open Details

## Validate palette

The Validate palette in PlanetX Mode checks the current World and connected assets together. **Fix All Safe** changes only warnings whose result is deterministic and needs no additional choice. Destructive actions and findings requiring a user decision are never auto-fixed.

## Common findings

- Missing or duplicate Planet and Section IDs
- Invalid radius or coordinate convention
- Wrong World-package relationship for Same World or External Level
- Missing GroundSyncMapping or TransitionPolicy
- Stale Proxy Bake, Generated Visual, or Generated Material
- Source materials changed since bake
- Unresolved Reference Planet or Section
- World Partition runtime-load policy mismatch

## Logs and support evidence

Full Validate writes stable Surface/Operation/Subject records through `LogPlanetXValidation`. For visual authoring issues, use `PlanetX.VisualEdit.Dump`; for proxy presentation, use `PlanetX.ProxyStats.Dump`.
