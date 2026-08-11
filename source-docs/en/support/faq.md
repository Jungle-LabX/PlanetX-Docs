# Frequently Asked Questions

Quick answers to common PlanetX product, editor, runtime, and documentation questions.

## Is PlanetX a runtime planet generator?

PlanetX connects an authored Unreal Engine Level to a curved planet surface and a baked proxy representation. It does not replace the original Ground gameplay content or generate a complete Game World at runtime.

## Does PlanetX own the complete Level Handoff travel flow?

No. PlanetX prepares and restores the Level Handoff state. Game code remains responsible for `OpenLevel`, destination Pawn creation and possession, and the destination `GameMode` policy.

## What is the difference between Ground, Transition, and Orbit?

- **Ground** uses the original gameplay content and its full detail.
- **Transition** links Section state, runtime context, Actor pose, and travel state while the representation changes.
- **Orbit** presents the planet and its baked Section Proxy content at distance.

## When should I use Same World or External Level?

Use **Same World** when both representations can coexist in one World and your game can coordinate visibility and state locally. Use **External Level** when the Ground experience lives in another World and requires a Travel Ticket and restoration flow.

## Why do I need Scan Sources before Bake?

`Scan Sources` rebuilds Source Review and Output Plan. After changing a source's Use or Role, select **Apply Source Changes** before Bake so the reviewed source decisions are applied to the plan.

## Does PlanetX support World Partition?

PlanetX provides World Partition-aware options, including validated-HLOD preference and automatic output sizing. The World Partition, Data Layer, and spatial-loading policy must still be verified for each project.

## Which Unreal Engine versions are supported?

PlanetX 1.0 targets Unreal Engine 5.8 and Win64, and requires GeometryProcessing and PCG. Review [Compatibility and Limitations](/docs/en/compatibility-limitations) before integrating it into a project.

## What should I include in a problem report?

Check [Known Issues](/known-issues), [Setup and Configuration](/docs/en/setup-configuration), [Proxy Bake Issues](/docs/en/proxy-bake-troubleshooting), and [Runtime and Travel Issues](/docs/en/runtime-travel-troubleshooting) first. Include the PlanetX version, Unreal Engine version, exact reproduction steps, relevant settings, and the complete error or diagnostic output.
