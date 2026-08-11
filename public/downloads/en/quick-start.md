# Start Here — Same World Quick Start

This is the official first-use and product-review path. It starts from Unreal Engine's built-in **Open World** Level template, saves that Level as `GroundLevel`, connects it to PlanetX as a **Same World Section**, and verifies the runtime transition into the actual Ground content.

When finished, you will have:

- One Planet Asset
- One Same World Section connected to `GroundLevel`
- A baked Section Proxy
- A runtime planet visual
- A PlanetX Planet Actor
- An Environment Manager
- A Transition Endpoint
- A Player Actor that participates in the Orbit ↔ Ground transition

> This guide covers **Same World** only.
> For an **External Level** setup in which Orbit and Ground use different Levels, see [Advanced Guide — Multi-Level Handoff](/docs/en/quick-start-level-handoff) after this workflow succeeds.

## Before you begin

Please prepare:

- An Unreal Engine 5.8 project with PlanetX installed and enabled
- A Level created from Unreal Engine's built-in **Open World** template and saved as `GroundLevel`
- Visual content supported by Proxy Bake, such as Landscapes or Static Meshes, in that Ground Level
- A Pawn or Character placed in the Ground Level and configured with **Auto Possess Player 0** for this tutorial
- An active Camera Component used by that Pawn or Character

Use these exact values for the reproducible path:

| Setting | Value |
| --- | --- |
| Ground Level | `GroundLevel`, created from the **Open World** template |
| Planet ID | `FirstPlanet` |
| Planet Radius | `100 km` |
| Planet Asset | `PA_FirstPlanet` |

Save `GroundLevel` before you begin. Proxy Bake must use a saved Level rather than an `Untitled` or `/Temp` Level.

If PIE or Simulate is running, stop it first. Proxy Bake works from Editor Ground sources and must not run during PIE.

---

## 1. Prepare a Planet Asset

Choose **Content Browser > Add > Miscellaneous > Planet Asset**. For this guide, use Planet ID `FirstPlanet`, Planet Radius `100 km`, the default Coordinate Convention, and save the Asset as `PA_FirstPlanet`. See [Create Your First Planet Asset](/docs/en/create-first-planet) only if you need the setting concepts explained in more detail.

![Content Browser Add menu showing Add, Miscellaneous, and Planet Asset](/images/docs/qs-02-create-planet-asset-menu.png)

**You do not need to create a Section manually yet.**

The first Proxy Bake automatically creates the required Section and Level Pair for the current Ground Level.

---

## 2. Open Proxy Bake from the Ground Level

Choose **File > New Level**, select Unreal Engine's built-in **Open World** template, and save it immediately as `GroundLevel`.

The Open World template supplies a World Partition Landscape and is the reproducible Ground source used by this Quick Start. After this workflow succeeds, you can repeat it with your own gameplay Level.

Before opening Proxy Bake, confirm that the Level tab shows `GroundLevel` rather than `Untitled` and save once more.

For a first Bake, use the Unreal Editor **Tools** menu, find the **PlanetX** section, and select **Proxy Bake Editor**. This is the canonical first-use path.

![PlanetX Proxy Bake Editor command in the Unreal Editor Tools menu](/images/docs/qs-05-open-proxy-bake.png)

Opening Proxy Bake from Planet Asset Editor > Sections is the existing-Section workflow and should be used only after a Section has already been created.

Start in **Basic** mode at the top of Proxy Bake Editor. This Quick Start does not require changes to Advanced settings.

### Select the Target Planet Asset

Under **1 Target Planet Asset**, select the Planet Asset created in the previous step.

It may already be assigned if you opened Proxy Bake from Planet Asset Editor. Confirm that the correct Asset is selected.

### Set Runtime Role to Same World

Expand **2 Runtime Role** and choose the following **Presentation** value:

```text
Same World
```

Same World means that the Planet and actual Ground content coexist in one World.

The currently open Ground Level automatically becomes the **Ground World**, so no separate Planet World is required. Confirm that **Ground World** shows the Level you are editing.

### Choose the Source Scope

Under **3 Source Scope**, choose which Actors Proxy Bake should scan.

For a typical single-Level first test, we recommend:

```text
Source Scope
└─ Current Level
```

The available options are:

- **Selected Actors**

  Bakes only the currently selected Actors.

- **Current Level**

  Uses Actors in the current Persistent Level. This is a good choice for an initial test.

- **Loaded Levels**

  Includes Streaming Levels and Level Instances currently loaded alongside the Level.

- **Reviewed Set**

  Reuses a previously reviewed source list. This is useful for repeated authoring passes and is not required for a first test.

Unless your project requires otherwise, leave **Source Representation** at its default.

When World Partition HLODs are ready, **Prefer HLOD** uses a valid HLOD first and falls back to the source Actor when necessary.

### Choose Bake Quality

Under **BAKE QUALITY** at the top of Proxy Bake Editor, we recommend:

```text
High (Recommended)
```

Medium or Low can shorten an early test, but use High when reviewing the final result.

---

## 3. Scan the Ground sources

After configuring the Bake, select **Scan Sources** or press `F5`.

```text
Scan Sources
```

The scan examines the Ground Level using the current settings and builds the source list and Bake Plan.

> If PlanetX Mode is open, change Preview View to **Level** before scanning.
>
> **Planet** and **Compare** are preview states for inspecting the planet representation and cannot be used as the source-selection state for a Ground Proxy Bake.

When scanning completes, inspect the discovered sources under **Source Review**.

Supported content such as Static Meshes, Landscapes, ISM/HISM, and Foliage is normally assigned an appropriate role automatically.

### What to check in Source Review

You do not need to edit every item for a first pass. Check only whether:

- An Actor you intended to use is missing
- A source requires `Manual Review`
- A source is marked `Unsupported`
- No source is selected for the Bake

Continue when the status line is green and shows `SUCCESS`, at least one intended source is enabled, `Unsupported` and `Manual Review` are both `0`, and **BAKE IN EDITOR** is enabled.

![Successful GroundLevel source scan with PA_FirstPlanet, no unsupported or manual-review sources, and Bake in Editor enabled](/images/docs/qs-07-scan-success.png)

Generated Section identifiers include a unique suffix. The example uses `GroundLevel_143C3E3D`; your suffix can differ.

If an unsupported source appears, exclude it or correct the issue and scan again.

If you manually changed a source's **Use** or **Role**, select:

```text
Apply Source Changes
```

The Bake button remains unavailable until those changes are applied. If you did not change any source, no additional apply step is required.

### When using World Partition

A World Partition Level may show automatic sizing in the Output Plan.

For a first pass, keep **Automatic World Partition Output Sizing** enabled. PlanetX calculates the required output partition layout from the scan results.

---

## 4. Bake the Section Proxy

After reviewing the sources, select **BAKE IN EDITOR** or press `Ctrl+B`.

```text
BAKE IN EDITOR
```

The Bake collects Ground geometry and generates the Section Proxy and runtime data used from Orbit.

For the first Bake of a Planet Asset, **PlanetX automatically creates a Section for the current Ground Level and associates it with the Planet Asset.**

Wait for the Bake to finish.

### Review the Bake result

A successful Bake displays a success result. If some sources were excluded, the Bake may still succeed with warnings.

Review all warnings and omissions to make sure no intended Ground content is missing.

If necessary, select **Open Results** or press `Ctrl+Shift+O` to inspect the generated Bake result in the Content Browser.

> When an up-to-date result already exists, the button may read **REBUILD IN EDITOR**.
> This forces the current result to be generated again.

---

## 5. Review the generated Section

Return to Planet Asset Editor and open **Sections**.

After the first successful Proxy Bake, one new entry should appear. For this Quick Start, confirm the following state:

| Item | Expected state |
| --- | --- |
| Runtime Role | `Same World` |
| Ground World | `GroundLevel` |
| Bake | `Linked` |
| Transition | `Ready` |

Select the Section to review its connected Ground World and Generated Resource state.

A Same World Section acts as a **fixed anchor** between the Ground Level and the planet reference frame. You normally do not need to change the default Section's Latitude, Longitude, Surface Yaw, or Scale.

If needed, adjust **Altitude** only to correct a vertical offset between the Ground and planet surface.

---

## 6. Build the planet visuals

Open **Preview** in Planet Asset Editor and begin in **Basic** mode.

The Preview displays the baked Section Proxy together with the rest of the planet surface.

### Assign a Completion Material

Assign a **Completion Material** to render regions of the planet that do not contain a Section:

```text
Preview
└─ Basic
   └─ Planet
      └─ Completion Material
```

For this tutorial, enable **Show Plugin Content** and select the included `MI_PlanetX_Earth` Material Instance:

```text
/PlanetX/PlanetX/Materials/Samples/PlanetSurface/MI_PlanetX_Earth
```

For the first pass, leave Terrain Height, Terrain Frequency, Padding Width, and similar settings at their defaults. Confirm only that:

- The full planet is visible
- The baked Section Proxy appears on the surface
- There are no severe gaps or inverted geometry around the Proxy

![Preview settings with MI_PlanetX_Earth assigned and Apply and Build available](/images/docs/qs-10-preview-settings.png)

The `10000` value in the Preview toolbar is the viewport camera speed, not the Planet Radius.

### Generate the runtime visual

If the Preview looks correct, select the following button under **Planet Visual Build**:

```text
Apply & Build
```

`Apply & Build` applies the Preview settings to the Planet Asset and generates the required Padding Materials and runtime planet visual Assets.

Wait for the operation to complete. A successful build displays:

```text
Planet Visual Build completed successfully.
```

> **If Apply & Build is disabled**
>
> Review the errors shown in Preview first.
>
> An out-of-date Proxy Bake or a Padding generation failure can block the build. If the Ground geometry changed, run Proxy Bake again, refresh Preview, and retry.

Save the Planet Asset after the build completes.

---

## 7. Place PlanetX Planet in the Ground Level

Return to the Ground Level and search Place Actors for:

```text
PlanetX Planet
```

Place one **PlanetX Planet** Actor in the Level.

Select it, find **Planet Component** in Details, and assign the Planet Asset you created to **Planet Asset**.

![PlanetX Planet Actor Details with PA_FirstPlanet assigned and Auto Register Runtime enabled](/images/docs/qs-12-planet-actor-details.png)

Keep the following default enabled:

```text
Auto Register Runtime
    Enabled
```

For this single-Planet setup, you do not need to assign a separate Planet Binding ID.

---

## 8. Align the Planet Actor to the Ground Level

In the upper-left Modes selector of Level Editor, choose **PlanetX Mode**. Three Preview Views appear at the top:

- **Planet**
- **Compare**
- **Level**

Choose **Level** first:

```text
Preview View
└─ Level
```

Level View hides the Planet Proxy and displays the original Ground Level.

### Confirm the active Planet

In the **Scene** area of PlanetX Mode, confirm that the Planet Actor you just placed is selected as the active Planet.

If the Level contains more than one Planet, select the intended Actor explicitly.

### Run Same World Align

Select the **transform-shaped Align icon** on the right side of the Scene area.

Align positions the Planet Actor against the reference point of the current Same World Ground Level.

Same World uses the Ground Level as the Section at the planet's north-pole reference, so you do not need to calculate the Planet Actor location manually.

Align corrects the location required for the Ground and planet surface to meet without arbitrarily changing the Actor's rotation or scale.

### Verify alignment in Compare

After aligning, switch Preview View to **Compare**:

```text
Compare
```

Compare displays both:

- The actual Ground Level
- The baked Planet Section Proxy

Confirm that they overlap at the same location.

If there is a large offset, review the following before continuing:

- The correct Planet Asset is assigned to the Planet Actor
- Proxy Bake used the current Ground Level
- The Same World Section's Bake state is `Linked`
- Section Altitude was not changed unintentionally

After verifying the overlap, switch to **Planet** View to inspect the representation seen from Orbit.

---

## 9. Add an Environment Manager

PlanetX uses one **Environment Manager** for each Planet.

Until an Environment Manager is added and connected, the planet can appear dark because PlanetX has not applied the atmosphere, cloud, and space-background environment to that Level yet. Treat that dark view as an incomplete setup rather than a material failure.

Open the **Environment** Palette in PlanetX Mode, or press `Alt+5`.

If no Environment Manager is assigned, the Palette displays:

```text
Environment Manager is not assigned to this Planet.
```

Select:

```text
Add Manager
```

PlanetX creates a `PlanetXEnvironmentManager` associated with the active Planet.

You do not need a Level Override for the first test. The Environment settings authored in the Planet Asset are used by default.

Save `GroundLevel` immediately after adding the Manager. If the atmosphere or clouds look incorrect, save the Level first and then check the Planet view again. Saving persists the Manager and its Level bindings before the environment is evaluated again.

After creation, select **Validate** and confirm that the Manager is connected to the current Planet.

> PlanetX uses an Environment Manager as part of each Planet's runtime infrastructure even when some environment features are disabled. We recommend creating one in this Quick Start.

---

## 10. Add a Transition Endpoint

Open the **Transition** Palette in PlanetX Mode, or press `Alt+4`.

If the current Level has no Endpoint, the Palette displays:

```text
No Transition Endpoint for this Level.
```

Select:

```text
Add Endpoint
```

PlanetX creates a Transition Endpoint for the active Planet and Same World Section. It automatically associates:

- The current Planet
- The current Section
- The current Level Pair
- The Environment Manager created in the previous step

You do not need to enter these IDs manually for the Quick Start.

### Verify the transition region

The Endpoint sizes its Transition Cylinder from the Section bounds. Keep the default enabled:

```text
Auto Size Transition Cylinder to Section Bounds
    Enabled
```

A debug cylinder in the viewport shows the transition region.

PlanetX uses this region to determine whether the player is in Orbit, Transition, or Ground. You do not need to position or resize the Endpoint manually for the first test.

Save the Level.

---

## 11. Connect the Player Actor to PlanetX

Next, configure the Pawn or Character that will move through the transition.

Modify the **Actor currently used as the PlayerController's View Target**. For this tutorial, use the Pawn or Character instance placed in the Ground Level with **Auto Possess Player 0**.

Open that Actor's Blueprint.

### Add a Coordinate Component

Add **PlanetX Coordinate Component** in the Components panel.

Compile the Blueprint after adding the Component, then return to the Ground Level and select the **placed Player Actor instance**. In that instance's Component Details, configure **PlanetX Reference**:

- Set **Reference Planet Actor** to the **PlanetX Planet** instance placed in this Level.
- Set **Reference Section Id** to the Same World Section created by Proxy Bake.

For an initial test, explicitly selecting the Section is preferable to automatic discovery.

![BP_Player with PlanetX Coordinate and Viewpoint components referencing PlanetXPlanetActor and the GroundLevel Section](/images/docs/qs-13-player-components.png)

When PIE starts, confirm that the possessed Pawn is the same Actor configured here. If the World Outliner creates and possesses a separate `DefaultPawn0`, configure that actual Pawn or change the GameMode's Default Pawn Class instead of assuming the placed `BP_Player` is controlled.

> Do not try to assign a specific Level Actor from the Blueprint class defaults. A Blueprint class cannot hold a reference to an Actor instance in a particular Level. Projects that spawn the Pawn through GameMode must resolve and assign the Planet reference after spawn; see [Runtime Integration](/docs/en/runtime-integration).

The final relationship should be:

```text
Player Actor
└─ PlanetX Coordinate Component
   ├─ Reference Planet Actor → Placed PlanetX Planet
   └─ Reference Section Id   → Same World Section created by the Bake
```

When `Reference Planet Actor` is set, Planet ID is resolved from that Actor's Planet Asset.

### Add a Viewpoint Component

Add **PlanetX Viewpoint Component** to the same Actor and keep these defaults:

```text
Auto Register Runtime
    Enabled

Can Drive Transition State
    Enabled
```

Make sure the Actor has **at least one active Camera Component**.

During PIE, PlanetX evaluates Orbit, Transition, and Ground from the actual PlayerController View Target and its active Camera. If the PlayerController uses another Actor as its View Target, add the PlanetX Viewpoint Component to that Actor instead.

> **Important**
>
> A Coordinate Component by itself is not enough to evaluate transition state from the player's camera. The View Target also requires a Viewpoint Component.

### Add a Movement Component only when needed

If the project already uses Character Movement or a custom movement system, **PlanetX Movement Component is not mandatory**.

Add it when you need features such as:

- Gravity toward the planet center
- Movement input in Surface Frame space
- Alignment to the planet surface Up direction
- PlanetX Movement Handoff

For a basic Orbit ↔ Ground transition test, you can keep the project's existing movement Component.

---

## 12. Enable automatic Same World entry

Configure PlanetX to move the player automatically between Orbit and Ground coordinates when crossing the transition region.

In the Player Actor Blueprint's **Event BeginPlay**, call these functions on the PlanetX Coordinate Component:

```text
Event BeginPlay
    │
    ├─ Set Automatic Same World Entry Enabled
    │      Enabled = true
    │
    └─ Set Automatic Same World Return Enabled
           Enabled = true
```

Both functions belong to **PlanetX Coordinate Component**.

The first moves the player from Orbit coordinates to the actual Ground coordinates when entering the Ground region. The second returns the player from Ground to Orbit coordinates when leaving it.

Keep the default Return Pose and Movement Continuity policies for this Quick Start. By default, the movement performed on Ground continues into the Orbit pose, and movement state is converted between coordinate frames when necessary.

Compile and save the Blueprint.

---

## 13. Check the starting position

To verify the Orbit → Ground transition, the player must not start inside the Ground region.

Inspect the Transition Endpoint's debug cylinder and place the player start **outside the Ground transition region**.

The exact distance depends on the Section size. What matters is that the player or camera can move through:

```text
Orbit
  ↓
Transition
  ↓
Ground
```

Moving in the opposite direction should produce:

```text
Ground
  ↓
Transition
  ↓
Orbit
```

If the existing Character supports only ground movement and cannot approach from Orbit, use a test Pawn or another movement method that can fly.

PlanetX does not replace the project's Pawn movement implementation.

---

## 14. Validate before running

Select **Save All** after completing the setup.

Open the Planet Asset and run the following under **Diagnostics**:

```text
Full Validate
```

You can also inspect the current World through the **Validate** Palette in PlanetX Mode by pressing `Alt+6`.

For this Quick Start, the following conditions should have no errors:

- A Planet Actor exists and has the Planet Asset assigned
- The Same World Section and Level Pair are valid
- Proxy BakeData is connected
- A runtime Proxy exists
- Exactly one Transition Endpoint exists
- Exactly one Environment Manager exists
- Same World alignment between Planet and Ground is correct

![PlanetX Mode Validate palette showing zero errors and zero warnings](/images/docs/qs-14-diagnostics-ready.png)

Informational findings may remain. The first-pass gate is `Errors 0` and `Warnings 0`.

Resolve Validation Errors before starting PIE. PlanetX may block PIE for certain critical configuration errors.

---

## 15. Verify the Orbit ↔ Ground transition in PIE

Select **Play** to start PIE.

Open the **Runtime** Palette in PlanetX Mode, or press `Alt+2`. It shows the current Planet registration and transition state.

Move the player toward the Ground and observe the transition. A correct setup progresses through:

```text
Orbit
→ Transition
→ Ground
```

Upon reaching Ground, PlanetX connects the player state to the actual Ground position for the Same World Section.

Moving away from Ground should return through:

```text
Ground
→ Transition
→ Orbit
```

During the transition, confirm that:

- The Section Proxy and actual Ground do not have a large offset
- The player does not jump to an unrelated location
- Camera orientation remains correct
- Existing gameplay works after entering Ground
- Movement continues naturally when returning to Orbit

The following example shows `GroundLevel` running in PIE with the completed planet visual. This image confirms the rendered PIE result; use the **Runtime** Palette described above to verify the actual Orbit, Transition, and Ground state sequence.

![GroundLevel running in PIE with the completed PlanetX planet, Environment Manager, Transition Endpoint, and player actors](/images/docs/qs-15-pie-result.png)

The yellow Placement prompt in this example only indicates that no Actor is selected for placement editing; it is not a Validation Error.

---

## If the transition does not work

Review these items in order:

1. Confirm that the correct Planet Asset is assigned to **PlanetX Planet**.
2. Confirm that you ran Align in PlanetX Mode.
3. Confirm that exactly one **Environment Manager** exists.
4. Confirm that exactly one **Transition Endpoint** exists.
5. Confirm the Player Actor's Coordinate Component has the correct **Reference Planet Actor** and **Reference Section Id**.
6. Confirm that the actual PlayerController View Target has a **PlanetX Viewpoint Component**.
7. Confirm that the View Target has an active **Camera Component**.
8. Confirm that **Automatic Same World Entry** and **Automatic Same World Return** are enabled in Blueprint.
9. If the Proxy Bake is stale, run **Scan Sources → Bake** again.
10. If the visuals are stale, run **Apply & Build** again from **Planet Asset Editor > Preview**.
11. Finally, inspect the remaining errors under **Full Validate**.

If the issue continues, see [Diagnostic Tools](/docs/en/diagnostic-tools) and [Runtime Travel Troubleshooting](/docs/en/runtime-travel-troubleshooting).

---

## Complete

If the transition works, you have completed the basic PlanetX authoring flow:

```text
Planet Asset
    ↓
Ground Level
    ↓
Proxy Bake
    ↓
Same World Section
    ↓
Planet Visual Build
    ↓
PlanetX Planet + Align
    ↓
Environment Manager
    ↓
Transition Endpoint
    ↓
Player Coordinate + Viewpoint
    ↓
Orbit ↔ Ground
```

You can now refine the surface and environment in **Planet Asset Editor > Preview**, add more Sections, or configure the External Level workflow to connect separate Levels.
