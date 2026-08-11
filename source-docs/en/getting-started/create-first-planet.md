# Create Your First Planet Asset

A Planet Asset is the central Asset that defines a planet in PlanetX.

It stores the planet's size and coordinate reference. Sections, Proxy Bake results, and planet visuals created later are all associated with this Asset.

## Creating a Planet Asset

Choose **Planet Asset** from **Content Browser > Add > Miscellaneous**.

The creation dialog asks for three initial values:

- Planet ID
- Planet Radius
- Coordinate Convention

If this is your first time using PlanetX, you can leave Coordinate Convention at its default and create the Asset after confirming only the **Planet ID and Planet Radius**.

---

## Planet ID

The **Planet ID** is the unique name PlanetX uses to distinguish this planet.

For example, Earth and Mars could use the following IDs:

```text
Earth
Mars
```

Choose an ID that does not duplicate another Planet Asset in the project.

We recommend treating it as a **stable identifier** that remains unchanged throughout development, rather than as a filename or display label.

Good examples include:

```text
Earth
Mars
Moon
MainPlanet
```

Avoid names that are likely to change as work progresses:

```text
TestPlanet
NewPlanet
Planet_Final_Final2
```

> When the same planet is used in multiple Levels, the normal approach is to **reuse the same Planet Asset**, not create another Asset for each Level.

Advanced setups can use separate Planet Bindings to distinguish different runtime instances of the same planet across Worlds.

You do not need to configure Planet Bindings while creating your first Planet Asset.

---

## Planet Radius

**Planet Radius** is the distance from the center of the planet to its base surface.

The Planet Asset creation dialog accepts this value in **kilometers**.

For the first Planet used by the Same World Quick Start, enter:

```text
Planet Radius
    100 km
```

PlanetX uses this value to calculate:

- The planet's overall size
- Section placement on the planet surface
- Curved transformation of Section Proxies
- Planet visual generation
- Coordinate conversion between Orbit and Ground

Planet Radius therefore controls much more than the visible size of a planet Mesh.

We recommend deciding on the intended planet size **before production work begins**.

> Planet Radius is an important reference for Sections and Proxy Bakes.
>
> After Proxy Bake and planet authoring have begun, avoid changing it arbitrarily. If you need a planet of a different size, creating a new Planet Asset is usually safer.

---

## Coordinate Convention

**Coordinate Convention** defines how PlanetX interprets the planet's north and longitude directions in Unreal Engine World space.

In practical terms, it answers the following questions:

```text
Which direction is the planet's north pole?
Which direction is longitude 0°?
Which direction is east on the planet?
```

For your first PlanetX project, we recommend keeping the **default Coordinate Convention**.

Most PlanetX workflows do not require this setting to be changed.

Change it only when an existing project already follows a specific World-axis convention or when PlanetX must interoperate with another coordinate system.

> Changing Coordinate Convention changes the reference used by Section placement and coordinate conversion.
>
> Unless there is a specific reason, avoid changing it after production has begun.

---

## Completing Asset creation

After reviewing the settings, create the Planet Asset.

For an initial test, you might use:

```text
Planet ID
    FirstPlanet

Planet Radius
    100 km

Coordinate Convention
    Default
```

The new Planet Asset appears in the Content Browser after creation.

Double-click it to open the **Planet Asset Editor**.

---

## Reviewing the Planet Asset Editor

The Planet Asset Editor is the central editor for authoring a PlanetX planet and reviewing its state.

It provides five dockable tabs with these exact UI names. The default layout opens **Preview** in the main area and **Configuration** on the right. If another tab is closed, reopen it from **Window > Planet Asset**.

### Overview

This tab shows the current Asset's basic state and provides access to its main workflows.

When opening an Asset for the first time, begin here to review its overall status.

### Sections

This tab manages **Sections**, the Ground regions connected to the planet.

It is normal for a newly created Planet Asset to have no Sections.

The first Proxy Bake creates a Section for the Ground Level and associates it with the Planet Asset.

### Configuration

This tab contains additional authoring and behavior settings for the planet.

You can keep most values at their defaults during the initial Quick Start workflow.

### Preview

This tab displays Section Proxies together with the rest of the planet surface and is used to author the planet's visuals.

You will use it in earnest after completing Proxy Bake.

### Diagnostics

This tab checks the Planet Asset, its Sections, Proxy Bake results, and related settings for problems.

It is a useful first stop whenever something does not behave as expected.

---

## What should I do first?

You do not need to change every advanced setting immediately after creating the Asset.

For now, confirm these three items:

1. **The Planet ID does not duplicate another Planet Asset.**
2. **The Planet Radius matches the intended planet size.**
3. Unless your project requires a special coordinate rule, **Coordinate Convention remains at its default**.

Save the Planet Asset to complete the initial setup.

**You do not need to add a Section manually.**

In the next step, run the first **Proxy Bake** against a Ground Level. PlanetX will create the required Section and connection data.

> After creating the Planet Asset, follow [Start Here — Same World Quick Start](?lang=en&doc=quick-start-same-world) to connect your first Ground Level to the planet.
