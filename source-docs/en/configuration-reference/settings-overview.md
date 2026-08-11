# Configuration Reference Guide

This category documents the settings that users can adjust in the current PlanetX codebase, grouped by their owning object and editor workflow. Names correspond to labels in Unreal Editor's Details panels or to their C++ property names. A default is the code default for a newly created object.

## Where each setting belongs

| Document | Location | Main subjects |
| --- | --- | --- |
| [Planet Asset and Visual Settings](?lang=en&doc=planet-visual-settings) | Planet Asset Editor, Surface Preset | Planet creation contract, Completion, Padding, Sections, Level Pairs, Preview, and Build |
| [Proxy Bake Settings](?lang=en&doc=proxy-bake-settings) | PlanetX Proxy Bake Editor | Target Asset, Runtime Role, Source Scope, quality, output partitions, and execution memory |
| [Runtime Actor and Component Settings](?lang=en&doc=runtime-component-settings) | Actor and Component Details | Planet, Coordinate, Movement, Viewpoint, Travel Receiver, and Transition Endpoint |
| [Proxy, Morph, and Preview Settings](?lang=en&doc=proxy-transition-settings) | Planet Proxy, Transition Morph, Runtime Preview | Presentation layers, surface correction, morph rendering, and runtime budget overrides |
| [Environment Settings](?lang=en&doc=environment-settings) | Planet Asset Environment, Environment Manager | Atmosphere, clouds, sun, post process, space background, and level bindings |
| [Project and Performance Settings](?lang=en&doc=project-settings) | Project Settings > Plugins | Runtime budget policy and lens-flare quality |

## Settings versus generated data

PlanetX reflected structures include user choices as well as bake output, runtime captures, query inputs, and diagnostic records.

- **User settings** are documented here with their defaults, units, and effects.
- **Conditional settings** are used only when a preceding toggle or mode enables them. Check the stated condition in each table.
- **Generated data** is written by Proxy Bake or Visual Build. It should not be edited manually even when it is visible in Details.
- **Request and result structures** are values supplied to individual function calls, not persistent project settings. Their fields are covered by the [Public API Reference](?lang=en&doc=api-overview).

## Before changing defaults

1. Planet ID, Radius, and Coordinate Convention are creation-time Planet Asset contracts; they are not ordinary settings to revise on an existing Asset.
2. Proxy Bake Quality and Runtime Budget are independent. Quality can change generated output; changing Runtime Budget does not rebuild an existing bake.
3. When an Override toggle is off, the Component uses its Project Settings or Planet Asset source.
4. After changing Proxy Bake, Section placement, or visual settings, check the displayed stale state and rerun Bake or Apply & Build when required.
5. Before packaging, run Full Validate on the Planet Asset and Validate for the current World.

## Public code baseline

This reference is based on the public headers shipped with PlanetX 1.0 under:

```text
Source/PlanetX/Public/PlanetX
```

A type appearing in a public header is not, by itself, a general user setting. This reference covers editor-adjustable values, project configuration, and public operation options; pipeline-generated payloads and captures are identified separately.
