# PlanetX Official Documentation

Version 1.0 · Last reviewed 2026-08-11

## Welcome to the PlanetX Documentation!

![PlanetX overview](/images/docs/overview-introduction-0.png)

Thank you for downloading PlanetX.

This documentation introduces the complete PlanetX workflow, from installation and planet creation to connecting a Ground Level, baking a Proxy, authoring visuals, and transitioning between Orbit and Ground.

If this is your first time using PlanetX, begin with [Start Here — Same World Quick Start](/docs/en/quick-start-same-world). It is the canonical first-use path.

### What is PlanetX?

PlanetX is an **Unreal Engine plugin that helps you use an existing Unreal Engine Level as part of a planet's surface**.

You can register a Landscape and Level created through your usual workflow as a particular region of a planet. From a distance, that region appears as part of a complete planet; as the player approaches, PlanetX connects it to the actual Ground Level where gameplay takes place.

This lets you create a continuous experience between **a planet viewed from space and gameplay on its surface** without substantially changing how you build Levels.

### What problem does it solve?

Standard Unreal Engine Levels and Landscapes are primarily authored in flat space. A game in which the player views a planet from space and travels all the way to its surface would otherwise need separate implementations for the distant planet, the real Ground Level, coordinate conversion, and the transition between them.

PlanetX lets you keep your existing Ground Level and associate it with a **Section** on the planet. In Orbit, the player sees an efficient Proxy and the planet surface. As the player approaches, that representation can transition naturally into the actual Ground content.

### Basic workflow

1. **Create a Planet Asset**

   Choose the planet's size and initial settings.

2. **Register a Ground Level**

   Register the region of an existing Unreal Engine Level that will become part of the planet surface as a Section.

3. **Bake the Section Proxy**

   Convert the Ground Level into a Proxy suitable for viewing from Orbit.

4. **Author the planet visuals**

   Use **Planet Asset Editor > Preview** to adjust the Section placement, planet surface, materials, and related visuals.

5. **Place the Planet Actor**

   Place the completed Planet Asset in a Level to display the planet.

6. **Verify the Orbit ↔ Ground transition**

   Move the player or camera and test the transition between the Orbit representation and the actual Ground Level.

> **Tip**
> You do not need to understand every PlanetX feature at once.
> Begin with the basic flow: create one Planet Asset and connect one Ground Level to it.

Next, you can [install PlanetX](/docs/en/installation) or proceed directly to [Start Here — Same World Quick Start](/docs/en/quick-start-same-world).

## Key Features

PlanetX provides authoring and runtime features that connect existing Unreal Engine Levels to a planet and create a continuous experience from the Orbit representation to actual Ground gameplay.

### Planet coordinates and surface frames

![Planet coordinates and surface frames](/images/docs/overview-key-features-0.png)

PlanetX provides a coordinate system that calculates positions and directions relative to the planet's center and surface.

This makes it possible to determine a consistent surface-up direction and movement orientation anywhere on the planet, and to convert between standard Unreal Engine World coordinates and planet coordinates.

Sections, Ground connections, player movement, and Orbit ↔ Ground transitions all use this coordinate system as a shared frame of reference.

### Sections and Ground connections

A **Section** associates existing Ground content with a particular region of a planet's surface.

You can place multiple Sections on one planet, and each Section can be connected to the Ground Level used for actual gameplay.

PlanetX supports two transition models to accommodate different project structures.

- **Same World**

  Orbit and Ground content coexist in one World, and PlanetX changes their representation while the player moves.

- **Level Handoff**

  Orbit and Ground use separate Levels. During travel, PlanetX carries the player's position and movement state into the destination Level.

### Section Proxy Bake

![Section Proxy Bake](/images/docs/overview-key-features-1.png)

PlanetX can generate a **Section Proxy** so that an existing Ground Level remains recognizable from Orbit.

It analyzes the main visual elements that make up the Ground area—including Landscapes, Static Meshes, and Foliage—and bakes them into a representation suitable for distant viewing. The result is then associated with the corresponding Section on the planet.

This allows the region to remain visible on the planet in Orbit without keeping the complete Ground Level rendered at all times.

### Orbit ↔ Ground transitions

As a player or camera approaches the planet or moves away from its surface, PlanetX can transition between the **Orbit representation and the actual Ground content**.

During the transition, PlanetX uses the planet surface frame to carry the player's position, rotation, and movement state between the two representations.

This makes it possible to create one continuous travel experience without requiring a separate landing screen or a completely unrelated movement model.

### Planet visual authoring

![Planet visual authoring](/images/docs/overview-key-features-2.png)

PlanetX can author the rest of the planet surface so that regions without Section Proxies still form a visually complete planet.

The **Preview** tab in the Planet Asset Editor lets you edit and preview the following elements:

- Base planet surface
- Connections between Sections and the planet surface
- Surface materials
- Atmosphere and clouds
- Sun and lighting
- Space background and post-processing effects

The authored result can then be built as the final runtime planet visual.

### Environment transitions

![Environment transitions](/images/docs/overview-key-features-3.png)

Orbit and Ground may require different environment presentations.

PlanetX manages the planet's atmosphere, clouds, lighting, and related effects, and can apply the appropriate presentation while the player moves between Orbit and Ground.

### Validation and debugging

![Validation and debugging](/images/docs/overview-key-features-4.png)

PlanetX includes validation and debugging tools that make it easier to find missing data or incorrect settings while authoring a planet.

You can inspect the Planet Asset, Section-to-Ground connections, Proxy Bake results, planet visuals, and runtime transition state. When a problem occurs, these tools help identify which stage of the workflow requires attention.

## Compatibility and Limitations

Before using PlanetX, please review the supported Unreal Engine version and platforms, as well as the scope and limitations of Proxy Bake.

### Compatibility

| Item | Supported range |
| --- | --- |
| Plugin version | 1.0 |
| Unreal Engine | Unreal Engine 5.8 |
| Supported platforms | Windows 64-bit (Win64) |
| Required plugins | GeometryProcessing, PCG |
| Content included | Supported |

Planet authoring, Proxy Bake, the Planet Asset Editor **Preview** tab, and other authoring tools are used in Unreal Editor.
The packaged game uses the required Planet Assets together with the baked planet and Proxy data at runtime.

### Recommended system specifications

Because PlanetX runs on top of Unreal Engine Editor, we recommend a CPU and GPU that meet or exceed the **recommended specifications for Unreal Engine 5.8**.

Proxy Bake and the Planet Asset Editor **Preview** tab may hold geometry from large Levels and intermediate generated data in memory. We therefore recommend providing more system memory than a typical Unreal Engine project may require.

| Component | Minimum | Recommended |
| --- | --- | --- |
| CPU | Unreal Engine 5.8 recommended specification | Unreal Engine 5.8 recommended specification or better |
| GPU | Unreal Engine 5.8 recommended specification | Unreal Engine 5.8 recommended specification or better |
| System memory | **32 GB RAM** | **64 GB RAM or more** |

> **Memory notice**
> 32 GB is the minimum recommended capacity for PlanetX's primary Editor features.
> For Proxy Bakes of large Landscapes or Levels containing many Static Meshes or instances, or for high-detail planet visual authoring, we recommend **64 GB of memory or more**.

Actual memory requirements depend on the size and complexity of the source Level, the number of Proxy Bake sources, Landscape resolution, and visual settings.

### Proxy Bake support

Proxy Bake converts the visual appearance of a Ground Level into a Section Proxy suitable for use from Orbit.

The following Unreal Engine content types are supported directly:

- Static Mesh
- Instanced Static Mesh (ISM)
- Hierarchical Instanced Static Mesh (HISM)
- Foliage
- Landscape

PCG-generated Static Meshes or instances, Level Instances, Packed Level Actors, and HLODs may be processed conditionally when their inspectable content is composed of the supported types listed above.

Content that changes shape at runtime or requires a separate representation is not supported as a standard Proxy Bake source. Examples include:

- Spline Meshes
- Skeletal Meshes and Cloth
- Dynamic or Procedural Meshes
- Grooms
- Niagara and other effects
- Dynamic geometry such as Geometry Collections

When PlanetX encounters an unsupported visual element, it records the omission in the Bake results whenever possible rather than silently ignoring it.

If Proxy Bake finishes as **Completed With Warnings**, the Proxy itself was generated successfully, but some content may have been excluded. Please review the result and its warnings.

### Scope of runtime representations

The Proxy and Runtime Preview used in Orbit are **visual data for distant representation**, not copies of the actual Ground Level.

Runtime Preview therefore does not provide the following functionality:

- Duplication of Gameplay Actors from the Ground Level
- Collision
- Navigation
- Ground Actor ticking or gameplay logic

Actual gameplay runs in the original Ground content. PlanetX connects that content to the Orbit representation.

This remains true when using Level Handoff: the project continues to own its Level-loading policy, Pawn creation, and other game-specific travel flow.

### Proxy Bake size limits

For large Levels, Proxy Bake limits output size to avoid creating an excessively large single result.

- Intermediate data for an individual Proxy Bake processing chunk generally targets **128 MiB or less**.
- A warning is reported when an individual generated package exceeds **512 MiB**.
- An individual package that exceeds **1 GiB cannot be published**.

For complex, large-scale Levels, adjust Proxy detail and the Bake source scope as appropriate.

## Start Here — Same World Quick Start

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

### Before you begin

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

### 1. Prepare a Planet Asset

Choose **Content Browser > Add > Miscellaneous > Planet Asset**. For this guide, use Planet ID `FirstPlanet`, Planet Radius `100 km`, the default Coordinate Convention, and save the Asset as `PA_FirstPlanet`. See [Create Your First Planet Asset](/docs/en/create-first-planet) only if you need the setting concepts explained in more detail.

![Content Browser Add menu showing Add, Miscellaneous, and Planet Asset](/images/docs/qs-02-create-planet-asset-menu.png)

**You do not need to create a Section manually yet.**

The first Proxy Bake automatically creates the required Section and Level Pair for the current Ground Level.

---

### 2. Open Proxy Bake from the Ground Level

Choose **File > New Level**, select Unreal Engine's built-in **Open World** template, and save it immediately as `GroundLevel`.

The Open World template supplies a World Partition Landscape and is the reproducible Ground source used by this Quick Start. After this workflow succeeds, you can repeat it with your own gameplay Level.

Before opening Proxy Bake, confirm that the Level tab shows `GroundLevel` rather than `Untitled` and save once more.

For a first Bake, use the Unreal Editor **Tools** menu, find the **PlanetX** section, and select **Proxy Bake Editor**. This is the canonical first-use path.

![PlanetX Proxy Bake Editor command in the Unreal Editor Tools menu](/images/docs/qs-05-open-proxy-bake.png)

Opening Proxy Bake from Planet Asset Editor > Sections is the existing-Section workflow and should be used only after a Section has already been created.

Start in **Basic** mode at the top of Proxy Bake Editor. This Quick Start does not require changes to Advanced settings.

#### Select the Target Planet Asset

Under **1 Target Planet Asset**, select the Planet Asset created in the previous step.

It may already be assigned if you opened Proxy Bake from Planet Asset Editor. Confirm that the correct Asset is selected.

#### Set Runtime Role to Same World

Expand **2 Runtime Role** and choose the following **Presentation** value:

```text
Same World
```

Same World means that the Planet and actual Ground content coexist in one World.

The currently open Ground Level automatically becomes the **Ground World**, so no separate Planet World is required. Confirm that **Ground World** shows the Level you are editing.

#### Choose the Source Scope

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

#### Choose Bake Quality

Under **BAKE QUALITY** at the top of Proxy Bake Editor, we recommend:

```text
High (Recommended)
```

Medium or Low can shorten an early test, but use High when reviewing the final result.

---

### 3. Scan the Ground sources

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

#### What to check in Source Review

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

#### When using World Partition

A World Partition Level may show automatic sizing in the Output Plan.

For a first pass, keep **Automatic World Partition Output Sizing** enabled. PlanetX calculates the required output partition layout from the scan results.

---

### 4. Bake the Section Proxy

After reviewing the sources, select **BAKE IN EDITOR** or press `Ctrl+B`.

```text
BAKE IN EDITOR
```

The Bake collects Ground geometry and generates the Section Proxy and runtime data used from Orbit.

For the first Bake of a Planet Asset, **PlanetX automatically creates a Section for the current Ground Level and associates it with the Planet Asset.**

Wait for the Bake to finish.

#### Review the Bake result

A successful Bake displays a success result. If some sources were excluded, the Bake may still succeed with warnings.

Review all warnings and omissions to make sure no intended Ground content is missing.

If necessary, select **Open Results** or press `Ctrl+Shift+O` to inspect the generated Bake result in the Content Browser.

> When an up-to-date result already exists, the button may read **REBUILD IN EDITOR**.
> This forces the current result to be generated again.

---

### 5. Review the generated Section

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

### 6. Build the planet visuals

Open **Preview** in Planet Asset Editor and begin in **Basic** mode.

The Preview displays the baked Section Proxy together with the rest of the planet surface.

#### Assign a Completion Material

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

#### Generate the runtime visual

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

### 7. Place PlanetX Planet in the Ground Level

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

### 8. Align the Planet Actor to the Ground Level

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

#### Confirm the active Planet

In the **Scene** area of PlanetX Mode, confirm that the Planet Actor you just placed is selected as the active Planet.

If the Level contains more than one Planet, select the intended Actor explicitly.

#### Run Same World Align

Select the **transform-shaped Align icon** on the right side of the Scene area.

Align positions the Planet Actor against the reference point of the current Same World Ground Level.

Same World uses the Ground Level as the Section at the planet's north-pole reference, so you do not need to calculate the Planet Actor location manually.

Align corrects the location required for the Ground and planet surface to meet without arbitrarily changing the Actor's rotation or scale.

#### Verify alignment in Compare

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

### 9. Add an Environment Manager

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

### 10. Add a Transition Endpoint

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

#### Verify the transition region

The Endpoint sizes its Transition Cylinder from the Section bounds. Keep the default enabled:

```text
Auto Size Transition Cylinder to Section Bounds
    Enabled
```

A debug cylinder in the viewport shows the transition region.

PlanetX uses this region to determine whether the player is in Orbit, Transition, or Ground. You do not need to position or resize the Endpoint manually for the first test.

Save the Level.

---

### 11. Connect the Player Actor to PlanetX

Next, configure the Pawn or Character that will move through the transition.

Modify the **Actor currently used as the PlayerController's View Target**. For this tutorial, use the Pawn or Character instance placed in the Ground Level with **Auto Possess Player 0**.

Open that Actor's Blueprint.

#### Add a Coordinate Component

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

#### Add a Viewpoint Component

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

#### Add a Movement Component only when needed

If the project already uses Character Movement or a custom movement system, **PlanetX Movement Component is not mandatory**.

Add it when you need features such as:

- Gravity toward the planet center
- Movement input in Surface Frame space
- Alignment to the planet surface Up direction
- PlanetX Movement Handoff

For a basic Orbit ↔ Ground transition test, you can keep the project's existing movement Component.

---

### 12. Enable automatic Same World entry

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

### 13. Check the starting position

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

### 14. Validate before running

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

### 15. Verify the Orbit ↔ Ground transition in PIE

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

### If the transition does not work

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

### Complete

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

## Installation

PlanetX can be installed for Unreal Engine through Fab.

### Prerequisites

Before installing PlanetX, please confirm the following environment:

- Unreal Engine 5.8
- GeometryProcessing plugin
- PCG plugin

PlanetX is configured to enable the required Unreal Engine plugins alongside it.

> If you build PlanetX directly from source or use a source-built Unreal Engine, you may also need a C++ development environment and toolchain for the target platform.

### Installing from Fab

1. Open the **Epic Games Launcher**.
2. Go to **Unreal Engine > Library**.
3. Find PlanetX in your **Fab Library**.
4. Select **Install to Engine**.
5. Choose a supported Unreal Engine 5.8 installation.
6. After installation completes, launch Unreal Editor.

The Fab Library lists only the Unreal Engine versions supported by PlanetX as installation targets.

Open your project and confirm that PlanetX is enabled under **Edit > Plugins**. You may need to restart Unreal Editor the first time you enable it.

### Manual installation

If you need to install a separately supplied PlanetX package without Fab, place it directly in the project's `Plugins` directory.

1. Close Unreal Editor.
2. Copy the PlanetX directory to:

   ```text
   <Project>/Plugins/PlanetX
   ```

3. Reopen the project.
4. If necessary, regenerate the project files and build the project.
5. Confirm that PlanetX is enabled under **Edit > Plugins**.

Manual installation is intended for development builds or separately supplied packages. We recommend Fab for standard installation.

### Verifying the installation

After installation, confirm that the following items are available:

- **Planet Asset** appears under **Content Browser > Add > Miscellaneous**.
- **PlanetX Proxy Bake Editor** can be opened from the Editor menus.
- **PlanetX Mode** is available in the Editor.

If all three are available, PlanetX has been installed successfully.

### Showing Plugin Content

PlanetX includes several Unreal Engine Content Assets.

If you need to inspect them, enable **Show Plugin Content** in the Content Browser settings.

You do not normally need to modify PlanetX Plugin Content.

### Opening the documentation

The latest PlanetX documentation is available from the [online documentation site](https://jungle-labx.github.io/PlanetX-Docs/).

If an internet connection is unavailable, open the following file in the installed PlanetX plugin to use the offline documentation:

```text
PlanetX/Docs/index.html
```

After opening the documentation, begin with [Start Here — Same World Quick Start](/docs/en/quick-start-same-world). It is the canonical first-use path.

## Create Your First Planet Asset

A Planet Asset is the central Asset that defines a planet in PlanetX.

It stores the planet's size and coordinate reference. Sections, Proxy Bake results, and planet visuals created later are all associated with this Asset.

### Creating a Planet Asset

Choose **Planet Asset** from **Content Browser > Add > Miscellaneous**.

The creation dialog asks for three initial values:

- Planet ID
- Planet Radius
- Coordinate Convention

If this is your first time using PlanetX, you can leave Coordinate Convention at its default and create the Asset after confirming only the **Planet ID and Planet Radius**.

---

### Planet ID

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

### Planet Radius

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

### Coordinate Convention

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

### Completing Asset creation

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

### Reviewing the Planet Asset Editor

The Planet Asset Editor is the central editor for authoring a PlanetX planet and reviewing its state.

It provides five dockable tabs with these exact UI names. The default layout opens **Preview** in the main area and **Configuration** on the right. If another tab is closed, reopen it from **Window > Planet Asset**.

#### Overview

This tab shows the current Asset's basic state and provides access to its main workflows.

When opening an Asset for the first time, begin here to review its overall status.

#### Sections

This tab manages **Sections**, the Ground regions connected to the planet.

It is normal for a newly created Planet Asset to have no Sections.

The first Proxy Bake creates a Section for the Ground Level and associates it with the Planet Asset.

#### Configuration

This tab contains additional authoring and behavior settings for the planet.

You can keep most values at their defaults during the initial Quick Start workflow.

#### Preview

This tab displays Section Proxies together with the rest of the planet surface and is used to author the planet's visuals.

You will use it in earnest after completing Proxy Bake.

#### Diagnostics

This tab checks the Planet Asset, its Sections, Proxy Bake results, and related settings for problems.

It is a useful first stop whenever something does not behave as expected.

---

### What should I do first?

You do not need to change every advanced setting immediately after creating the Asset.

For now, confirm these three items:

1. **The Planet ID does not duplicate another Planet Asset.**
2. **The Planet Radius matches the intended planet size.**
3. Unless your project requires a special coordinate rule, **Coordinate Convention remains at its default**.

Save the Planet Asset to complete the initial setup.

**You do not need to add a Section manually.**

In the next step, run the first **Proxy Bake** against a Ground Level. PlanetX will create the required Section and connection data.

> After creating the Planet Asset, follow [Start Here — Same World Quick Start](/docs/en/quick-start-same-world) to connect your first Ground Level to the planet.

## Advanced Guide — Multi-Level Handoff

This guide configures the **Orbit World and Ground World as separate Levels** and uses PlanetX Level Handoff to carry the player's pose and movement state between them.

When finished, you will have:

- One Planet Asset
- One Orbit-only Level
- One Ground Level used for actual gameplay
- One Level Handoff Section
- A baked Section Proxy
- A baked Runtime Preview World
- A runtime planet visual
- A PlanetX Planet Actor in the Orbit World
- An Environment Manager
- An Orbit Transition Endpoint
- A Player Actor that travels Orbit → Ground → Orbit

> **Important**
>
> PlanetX does not open Levels on your behalf during Level Handoff.
>
> PlanetX captures the player's location, rotation, movement state, and destination before travel, then restores that state after the new World opens.
>
> Your project remains responsible for `Open Level`, Pawn creation, possession, GameMode policy, and the rest of the travel flow.

Before using this advanced workflow, complete [Start Here — Same World Quick Start](/docs/en/quick-start-same-world). This guide assumes that the basic Planet Asset, Proxy Bake, Visual Build, PlanetX Mode, and transition concepts are already familiar.

---

### Before you begin

Level Handoff requires two separate Levels. This guide uses the following example names:

```text
L_Orbit
L_Ground
```

#### L_Orbit

This Level displays the planet from space and lets the player approach it.

You will later place the following items in it:

```text
L_Orbit
├─ PlanetX Planet
├─ PlanetX Environment Manager
├─ PlanetX Transition Endpoint
└─ Orbit Player / SpaceShip
```

#### L_Ground

This is the existing Unreal Engine Level used for actual surface gameplay.

Build its Landscape, Static Meshes, Foliage, and Gameplay Actors through your normal Unreal Engine workflow.

```text
L_Ground
├─ Landscape
├─ Buildings
├─ Foliage
├─ Gameplay Actors
└─ Ground Player
```

> You do not need to rebuild a Ground Level in a PlanetX-specific format.
>
> An existing Ground Level from your project can be used as it is.

The two Levels must be **different, saved World Assets**:

```text
L_Orbit != L_Ground
```

Level Handoff does not allow Orbit World and Ground World to reference the same package.

### Phase checkpoints

This guide is intentionally detailed because Level Travel, Pawn lifetime, and possession remain game-owned. Treat the 34 steps as five phases and do not continue until the current phase passes.

| Phase | Steps | Required result before continuing |
| --- | --- | --- |
| A. Author the External Section | 1-10 | Section is Level Handoff, Bake is `Linked`, Runtime Preview is linked and renderable, Planet Visual Build succeeds |
| B. Prepare both Worlds | 11-16 | Orbit Planet is aligned; exactly one Environment Manager and Orbit Endpoint exist; Orbit and Ground Players have the required Components |
| C. Travel Orbit → Ground | 17-25 | Surface Query hits the intended Section; Begin Level Handoff succeeds; the exact Ticket survives travel; completion returns a valid Ground arrival and Journey ID |
| D. Return Ground → Orbit | 27-30 | Begin Return Level Handoff succeeds; the Return Ticket survives travel; applying it completes the Journey |
| E. Validate the complete flow | 31-34 | Runtime Preview becomes renderable, Full Validate has no Error, and the complete Orbit → Ground → Orbit test succeeds |

Step 26 is an optional Travel Receiver alternative. Choose either the explicit completion path in Steps 22-25 or the Travel Receiver path; do not combine both during the first test.

---

### 1. Prepare a Planet Asset

Create one Planet Asset by following [Create Your First Planet Asset](/docs/en/create-first-planet). Complete the following steps, then return here:

- Create the Planet Asset
- Set its Planet ID
- Set its Planet Radius
- Save the Planet Asset

**You do not need to create a Section manually yet.**

The first Proxy Bake from the Ground Level creates the required Section and Level Pair automatically.

---

### 2. Open the Ground Level

Open **L_Ground** first:

```text
L_Ground
```

Proxy Bake uses the currently open Ground Level as its source World. Take care not to Bake while `L_Orbit` is open by mistake.

The Ground Level must contain at least one supported Proxy Bake source, such as:

- Landscape
- Static Mesh
- Instanced Static Mesh
- Hierarchical Instanced Static Mesh
- Foliage

We recommend saving the Level before continuing. Stop PIE or Simulate if either is running.

---

### 3. Open Proxy Bake Editor

With `L_Ground` open, use the Unreal Editor **Tools** menu, find the **PlanetX** section, and select **Proxy Bake Editor**. Use this single path for the first External Section.

First, confirm **Target Planet Asset**:

```text
1 Target Planet Asset
└─ Planet Asset
```

Assign the Planet Asset created in the previous step. There is no existing Section to select before the first Bake.

---

### 4. Set Runtime Role to External Level

Expand **2 Runtime Role** in Proxy Bake Editor and set **Presentation** to:

```text
Presentation
└─ External Level
```

The UI calls this option `External Level`; the Planet Asset stores the Section using the **Level Handoff** runtime role.

External Level follows this structure:

```text
Orbit World
    ↓
PlanetX Runtime Preview
    ↓
The game performs World Travel
    ↓
Ground World
```

#### Confirm Ground World

**Ground World** automatically displays the currently open `L_Ground`:

```text
Ground World
    L_Ground
```

This is not a manually selected value. It is determined from the source World used by the current scan and Bake.

#### Assign Planet World

Selecting External Level reveals **Planet World**. Assign the Orbit Level:

```text
Planet World
    L_Orbit
```

The final setup should read:

```text
Presentation
    External Level

Ground World
    L_Ground

Planet World
    L_Orbit
```

> `Planet World` and `Ground World` must reference different Levels.
>
> If they reference the same Level, the Level Handoff contract is invalid and the Bake cannot proceed.

You do not need to change the Handoff Backend for this Quick Start.

The default contract is stored for an `Open Level` workflow, but the game Blueprint will perform the actual `Open Level` call later.

---

### 5. Choose the Source Scope

Expand **3 Source Scope**. For a typical first test, choose:

```text
Source Scope
└─ Current Level
```

The scopes are:

- **Selected Actors** — bakes only the currently selected Actors.
- **Current Level** — bakes Actors in the current Ground Level and is the simplest first test.
- **Loaded Levels** — also includes currently loaded Streaming Levels or Level Instances.
- **Reviewed Set** — reuses a previously reviewed source set.

Unless the project requires otherwise, choose this Bake Quality:

```text
High (Recommended)
```

---

### 6. Scan the Ground sources

Select **Scan Sources** or press `F5`:

```text
Scan Sources
```

PlanetX inspects the current Ground Level and discovers sources that can be converted into a Proxy.

#### Review Source Review

You do not need to edit every discovered item. Check whether:

- An Actor you intended to use was not discovered
- A source is marked `Manual Review`
- A source is marked `Unsupported`
- No source is included in the Bake
- An unintended Actor is included

Supported Landscapes, Static Meshes, ISM/HISM, and Foliage are normally classified automatically.

If you manually change a source's **Use** or **Role**, select:

```text
Apply Source Changes
```

No apply step is needed if you made no changes.

---

### 7. Run Proxy Bake

After Source Review, select **BAKE IN EDITOR** or press `Ctrl+B`:

```text
BAKE IN EDITOR
```

The Bake generates Ground geometry and the additional runtime data required by Level Handoff.

For the first Bake of a Planet Asset, PlanetX automatically creates:

```text
Planet Asset
├─ Section
├─ Level Pair
├─ Proxy Bake Data
└─ Runtime Preview World
```

#### What is Runtime Preview World?

An External Level setup does not load the complete `L_Ground` into Orbit World.

Proxy Bake instead creates a **Runtime Preview World containing only the visual representation**. It provides a Ground-like appearance as the player approaches the planet.

It is not a copy of the gameplay Level and does not reproduce:

- GameMode
- PlayerStart
- Pawn
- Controller
- Gameplay Actor logic
- Gameplay collision
- Navigation

The two Worlds have different responsibilities:

```text
Runtime Preview World
    = Visual representation during transition

L_Ground
    = Actual gameplay World
```

This distinction is essential when working with Level Handoff.

---

### 8. Review the Bake result

After the Bake completes, return to Planet Asset Editor and select the new Section under **Sections**.

Confirm approximately the following state:

| Item | Expected state |
| --- | --- |
| Runtime Role | `Level Handoff` |
| Ground World | `L_Ground` |
| Planet / Orbit World | `L_Orbit` |
| Bake | `Linked` |
| Runtime Preview | Connected |
| Transition | Available |

In Proxy Bake Editor, use **Open Results** or `Ctrl+Shift+O` to inspect the latest result in the Content Browser.

If a result already exists for the Section, the button may read:

```text
REBUILD IN EDITOR
```

This bakes the existing Section again from the current Ground sources.

---

### 9. Review the Section placement on the planet

Open **Preview** in Planet Asset Editor.

Unlike a Same World Section, a Level Handoff Section can be placed at any intended location on the planet surface. You can keep its automatically created placement for this first test.

Confirm that:

- The Section Proxy appears on the planet surface
- Its orientation is correct
- It does not overlap another Section
- There is no severe gap against the planet surface

Multiple Ground Levels can be connected to one Planet Asset as separate External Level Sections:

```text
Planet
├─ Section_A → Ground_A
├─ Section_B → Ground_B
└─ Section_C → Ground_C
```

This Quick Start uses one Section only.

---

### 10. Build the planet visuals

In **Planet Asset Editor > Preview**, assign the base surface **Completion Material**:

```text
Preview
└─ Basic
   └─ Planet
      └─ Completion Material
```

Leave Terrain, Padding, and other detailed settings at their defaults for the first pass. Confirm that:

- The entire planet surface renders correctly
- The baked Section appears on the planet
- There is no large empty region around the Section
- Geometry is not severely inverted

If the Preview looks correct, select:

```text
Apply & Build
```

PlanetX applies the Preview settings to the Planet Asset and generates the final runtime planet visual. Save the Planet Asset after a successful build.

---

### 11. Place the Planet Actor in Orbit World

Open **L_Orbit**:

```text
L_Orbit
```

Search Place Actors for `PlanetX Planet` and place one Actor in the Level.

Under **Planet Component**, configure:

```text
Planet Asset
    → The Planet Asset created earlier

Auto Register Runtime
    Enabled
```

A separate Planet Binding ID is not required for this single-Planet test.

---

### 12. Align the Planet Actor

Open **PlanetX Mode** and confirm that the newly placed Planet Actor is the Active Planet under Scene.

Even when a Planet Asset contains no Same World Section, PlanetX can derive the alignment anchor from the first valid External Section's Ground Sync Mapping. A planet that uses only Level Handoff therefore does not require an artificial Same World Section.

Run **Align** in PlanetX Mode.

Align applies the required positional correction without arbitrarily changing the Planet Actor's rotation or scale.

Afterward, Validate should no longer report:

```text
Planet Actor location is not aligned
to the canonical Section's baked Ground Sync Mapping.
```

> We recommend running Align for External Level setups as well.
>
> Edit the Section's location and orientation on the planet in **Planet Asset Editor > Preview**; use Align in PlanetX Mode for the Planet Actor's World placement.

---

### 13. Add an Environment Manager

Open the **Environment** Palette in PlanetX Mode. If the current Planet has no Manager, select:

```text
Environment
└─ Add Manager
```

PlanetX creates an Environment Manager associated with the active Planet.

The Manager is part of the Planet's runtime infrastructure even when individual atmosphere or cloud features are disabled. Keep exactly one Environment Manager for each Planet.

---

### 14. Add the Orbit Transition Endpoint

Open the **Transition** Palette. If the current Section has no Endpoint, it displays:

```text
No Transition Endpoint for this Level.
```

Select:

```text
Add Endpoint
```

Because `L_Orbit` is the Level Pair's Planet World, the Endpoint is created with:

```text
Endpoint Role
    Orbit
```

PlanetX also associates the correct Planet ID, Section ID, Level Pair ID, Planet Actor, Planet Asset, and Environment Manager.

#### Transition Cylinder

Keep the default enabled:

```text
Auto Size Transition Cylinder To Section Bounds
    Enabled
```

PlanetX derives the transition region from the Section bounds. Inspect it through the cylinder visualization in the viewport.

The player's Viewpoint moves through the following presentation states while approaching the Section:

```text
Orbit
   ↓
Transition
   ↓
Ground Presentation
```

For an External Level Section, **the baked Runtime Preview World** provides Ground Presentation. The actual `L_Ground` is entered later through an explicit Level Handoff call.

---

### 15. Connect the Orbit Player to PlanetX

Open the Pawn or Character Blueprint used in Orbit. This guide calls it:

```text
BP_OrbitPlayer
```

Add:

```text
BP_OrbitPlayer
├─ Camera Component
├─ PlanetX Coordinate Component
└─ PlanetX Viewpoint Component
```

#### Coordinate Component

Configure:

```text
Auto Register Runtime
    Enabled

Representation Domain
    Orbit

Reference Planet Actor
    → PlanetX Planet in L_Orbit

Reference Section Id
    → The Section baked earlier
```

For a Pawn placed in the Level, assign the Planet Actor directly in Details.

For a Pawn spawned at runtime, set the Planet Actor reference during BeginPlay and then call **Refresh Coordinate Snapshot**.

#### Viewpoint Component

Keep:

```text
Auto Register Runtime
    Enabled

Can Drive Transition State
    Enabled
```

Confirm that the PlayerController actually uses `BP_OrbitPlayer` as its View Target and that the View Target has an active Camera Component.

PlanetX uses this Viewpoint to evaluate Transition Alpha and Runtime Preview loading and visibility.

---

### 16. Prepare the Ground Player

Prepare the Pawn or Character used by `L_Ground`, for example:

```text
BP_GroundPlayer
```

**A Planet Actor is not required in Ground World solely to restore the Level Handoff pose.**

PlanetX can convert the Orbit Section coordinates into Ground World coordinates using the Ground Sync Mapping stored by Proxy Bake. The simplest setup is therefore:

```text
L_Ground
└─ BP_GroundPlayer
```

A separate Planet Actor may be required in Ground World if you also need:

- PlanetX Native Movement
- PlanetX radial gravity
- PlanetX Coordinate Query
- Ground-side PlanetX Environment
- A Ground Transition Endpoint

In that case, the Ground Planet Actor and Orbit Planet Actor remain **separate Actor instances in separate Worlds**.

---

### 17. Store travel data in GameInstance

`Open Level` destroys the previous World and its Actors. Do not keep a Level Handoff Ticket only in a Level Actor.

Store it somewhere that survives into the next World. A project **GameInstance** is the simplest option.

Add the following variables to your existing custom GameInstance, or create a Blueprint GameInstance such as:

```text
BP_PlanetXGameInstance
```

Variables:

```text
Pending PlanetX Ticket
    Type = PlanetX Level Handoff Ticket

Active PlanetX Journey Id
    Type = Guid

Has Pending PlanetX Ticket
    Type = Boolean
```

Assign the class under:

```text
Project Settings
└─ Maps & Modes
   └─ Game Instance Class
      └─ BP_PlanetXGameInstance
```

> PlanetX also stores its internal pending capture in a GameInstance-lifetime Subsystem.
>
> Keeping the Ticket explicitly lets the project select **the exact travel to complete**, even when more than one pending travel exists.

---

### 18. Query a landing point from Orbit

Create a landing input in `BP_OrbitPlayer`, for example:

```text
IA_Land
```

On its `Started` event, query the planet surface:

```text
IA_Land (Started)
    ↓
Get Game Instance Subsystem
    Class = PlanetXSubsystem
    ↓
Make PlanetXSurfaceQueryInput
    ↓
Query Surface At World Ray Detailed
```

#### Surface Query Input

Connect:

```text
Ray Origin World
    = Current Camera World Location

Ray Direction World
    = Current Camera Forward Vector

Max Distance Cm
    = A value large enough to find the intended landing point
```

When more than one Planet exists, expose the advanced pins and specify:

```text
Preferred Planet Id
Preferred Planet Binding Id
```

You can omit them for a simple single-Planet test.

#### Check the query result

Inspect the return status from `Query Surface At World Ray Detailed`:

```text
Switch on EPlanetXSurfaceQueryStatus
```

Continue only when:

```text
Status == Hit
```

Break the Surface Result and require:

```text
bCanEnterGround == true
```

The final flow is:

```text
Query Surface At World Ray Detailed
    ↓
Status == Hit?
    ↓ yes
Surface Result.bCanEnterGround?
    ↓ true
Prepare Level Handoff
```

A `Hit` with `bCanEnterGround == false` means the ray found the planet surface, but that location is not within a Section that permits Ground entry.

---

### 19. Prepare the Orbit → Ground Handoff

After a successful Surface Query, call this node on the same `PlanetXSubsystem`:

```text
Begin Level Handoff
```

Connect:

```text
Begin Level Handoff

Source Actor
    = Self

Surface Query
    = Surface Query Result from the previous step
```

On success, PlanetX captures:

- Planet, Section, and Level Pair
- Current Actor location
- Actor rotation relative to the Section
- Ground landing location
- Control Rotation
- Current velocity when available
- Location data required for the return to Orbit
- Target Ground World

**The Level has not changed yet.**

---

### 20. Store the Handoff Ticket

Branch on the **Return Value** from `Begin Level Handoff`:

```text
Begin Level Handoff
    ↓
Branch
```

If it is `false`, inspect `Out Result.Error` and do not open the Level.

If it is `true`, store the **complete Out Ticket** in the GameInstance:

```text
Get Game Instance
    ↓
Cast to BP_PlanetXGameInstance
    ↓
Set Pending PlanetX Ticket
    = Out Ticket

Set Has Pending PlanetX Ticket
    = true
```

Store the complete struct rather than copying only selected values. The Ticket includes both the travel identity and destination World.

---

### 21. Open the actual Ground Level

Break `Out Ticket` and read:

```text
Target World
```

For this Quick Start, it should reference:

```text
L_Ground
```

In the game Blueprint, call **Open Level (by Object Reference)** using the Ticket's Target World.

```text
IA_Land
    ↓
Surface Query
    ↓
Begin Level Handoff
    ↓
Success?
    ↓
Store Ticket in GameInstance
    ↓
Break PlanetX Level Handoff Ticket
    ↓
Target World
    ↓
Open Level
```

> PlanetX does not call `Open Level` because every project has its own Level Travel policy.
>
> A production project may use Seamless Travel or a custom travel system instead.

This Quick Start uses the standard Open Level workflow.

---

### 22. Spawn and possess the Ground Player first

Configure the project's GameMode to create the Ground Player when `L_Ground` opens. For example:

```text
Default Pawn Class
    BP_GroundPlayer
```

PlanetX does not perform:

```text
Spawn Pawn
Possess Pawn
Choose PlayerStart
Choose GameMode
```

`BP_GroundPlayer` should spawn and be controllable when you run the Ground Level without PlanetX.

> The Target Pawn needs a Controller when Control Rotation is restored.
>
> Complete the travel **after possession**, rather than merely after Pawn creation.

---

### 23. Apply the stored Ticket to the Ground Player

Apply the Ticket to `BP_GroundPlayer` after possession, such as from the Pawn's **Event Possessed**.

Read the Ticket from GameInstance:

```text
Event Possessed
    ↓
Get Game Instance
    ↓
Cast to BP_PlanetXGameInstance
    ↓
Has Pending PlanetX Ticket?
```

When `true`, obtain `PlanetXSubsystem` and call:

```text
Complete Level Handoff
```

Connect:

```text
Ticket
    = GameInstance.Pending PlanetX Ticket

Target Actor
    = Self

Apply Control Rotation
    = true
```

The complete flow is:

```text
Event Possessed
    ↓
Has Pending PlanetX Ticket?
    ↓ true
Complete Level Handoff
    Ticket       = Stored Ticket
    Target Actor = Self
```

On success, PlanetX applies the captured landing state to the current Ground Pawn.

---

### 24. Store the Ground arrival result

Check the Return Value from `Complete Level Handoff`.

On success, store **Out Result.JourneyId** in GameInstance:

```text
Complete Level Handoff
    ↓
Success?
    ↓ true
Break PlanetX Level Handoff Result
    ↓
Journey Id
    ↓
GameInstance.Active PlanetX Journey Id
```

Then set:

```text
Has Pending PlanetX Ticket
    = false
```

Orbit → Ground travel is now complete, and the internal Journey state is:

```text
Ground Active
```

Keep the `Journey Id`; it is required to return from Ground to Orbit.

---

### 25. Verify the Ground arrival pose

After a successful Handoff, the Ground Pawn should move away from its initial `PlayerStart` pose to the Ground location corresponding to the Section point chosen in Orbit.

PlanetX follows this relationship:

```text
Section Local position captured in Orbit
        ↓
Ground Sync Mapping
        ↓
World position in L_Ground
```

Confirm that:

- The Pawn arrives in the expected Ground region
- The Actor does not face an unrelated direction
- Camera orientation does not jump severely
- Velocity continues according to the intended policy
- Existing Ground gameplay works normally

This arrival-pose restoration works even when Ground World has no Planet Actor.

---

### 26. Simpler arrival option: Travel Receiver

If the current World is guaranteed to have **exactly one matching Pending Travel**, you may use:

```text
PlanetX Travel Receiver Component
```

Add it to the Ground Pawn and keep:

```text
Auto Resume Pending Travel
    Enabled

Apply Control Rotation
    Enabled
```

If PlanetX Runtime is not ready immediately after the World opens, Travel Receiver retries for a limited period. The default timeout is:

```text
15 seconds
```

Success invokes:

```text
On Travel Resumed
```

Final failure invokes:

```text
On Travel Resume Failed
```

Automatic selection is permitted only when exactly one Pending Travel matches the current World:

| Pending count | Behavior |
| ---: | --- |
| 0 | Treat as a normal spawn |
| 1 | Restore that travel |
| 2 or more | `AmbiguousPendingTravel` |

For multiple players or concurrent travel, use the explicit **Ticket + Complete Level Handoff** workflow described above.

> Do not use automatic Travel Receiver and manual `Resume Pending Travel` on the same Actor at the same time.

---

### 27. Prepare the Ground → Orbit return

Create a return input on the Ground Player, for example:

```text
IA_ReturnOrbit
```

Read the saved Journey ID from GameInstance:

```text
IA_ReturnOrbit (Started)
    ↓
Get Game Instance
    ↓
Cast to BP_PlanetXGameInstance
    ↓
Get Active PlanetX Journey Id
```

Call this `PlanetXSubsystem` node:

```text
Begin Return Level Handoff
```

Connect:

```text
Journey Id
    = Active PlanetX Journey Id

Source Actor
    = Self

Resume Alpha
    = 0
```

The default `Resume Alpha` of `0` is suitable for this Quick Start.

Success produces a new **Return Ticket**, which is distinct from the original Orbit → Ground Ticket:

```text
Orbit → Ground Ticket
    !=
Ground → Orbit Ticket
```

---

### 28. Store the Return Ticket and open Orbit World

After `Begin Return Level Handoff` succeeds, store the Return Ticket in the same GameInstance variable:

```text
Pending PlanetX Ticket
    = Return Ticket

Has Pending PlanetX Ticket
    = true
```

Its `Target World` should reference:

```text
L_Orbit
```

Use it to open the Level:

```text
Begin Return Level Handoff
    ↓
Success?
    ↓
Store Return Ticket
    ↓
Break Ticket
    ↓
Target World = L_Orbit
    ↓
Open Level
```

---

### 29. Apply the return state in Orbit World

When `L_Orbit` opens again, `BP_OrbitPlayer` must be spawned and possessed.

Read the Pending Ticket from GameInstance and call **Complete Level Handoff** in the same way used on Ground:

```text
BP_OrbitPlayer
Event Possessed
    ↓
GameInstance.Has Pending PlanetX Ticket?
    ↓ true
Complete Level Handoff
    Ticket       = GameInstance.Pending PlanetX Ticket
    Target Actor = Self
```

On success, clear:

```text
Has Pending PlanetX Ticket
    = false
```

The complete Journey should progress through:

```text
Orbit
    ↓
Pending Orbit To Ground
    ↓
Ground Active
    ↓
Pending Ground To Orbit
    ↓
Completed
```

---

### 30. If Orbit restoration runs before runtime registration

Immediately after Orbit World reopens, the Planet Actor may register with PlanetX Runtime at a slightly different time from Player creation.

A manual `Complete Level Handoff` call made too early can therefore fail temporarily.

For a single-player Quick Start, you may add **PlanetX Travel Receiver Component** to the Orbit Player:

```text
BP_OrbitPlayer
└─ PlanetX Travel Receiver Component
```

```text
Auto Resume Pending Travel
    Enabled

Apply Control Rotation
    Enabled
```

Travel Receiver retries for a limited time while waiting for Planet Runtime registration.

Do not also call manual `Complete Level Handoff` for the same arrival.

---

### 31. Verify Runtime Preview behavior

Before traveling to the actual Ground Level, approach the planet in Orbit.

As the Viewpoint enters the Transition Endpoint region, PlanetX loads the External Level Section's **Runtime Preview World** as required.

The intended visual sequence is:

```text
Far away
    Section Proxy

        ↓ approach

Transition
    Proxy / Morph / Runtime Preview transition

        ↓

Ground Presentation
    Runtime Preview World
```

The game has not yet traveled to `L_Ground`. The following processes are independent:

```text
[Visual transition]
Display Runtime Preview inside Orbit World

[Gameplay travel]
Begin Level Handoff
→ Game calls Open Level
→ L_Ground
```

Keeping them separate makes Level Handoff issues much easier to diagnose.

---

### 32. Validate before running

Return to Orbit World and open the **Validate** Palette in PlanetX Mode. You can also use Diagnostics in Planet Asset Editor.

For this Quick Start, the following conditions should have no errors:

- The correct Planet Asset is assigned to the Planet Actor
- The External Level Section is valid
- Orbit World and Ground World are different
- Ground Sync Mapping is valid
- Proxy Bake Data is connected
- Runtime Preview World is connected
- The Runtime Preview Bake revision is current
- Runtime Preview contains renderable content
- Exactly one Orbit Transition Endpoint exists for the Section
- Exactly one Environment Manager exists
- The Planet Actor is aligned to the canonical External Section mapping

Resolve Validation Errors before starting PIE.

---

### 33. Test the complete flow

Start PIE from `L_Orbit`.

#### Step 1: Verify Orbit

Confirm that:

- The planet renders correctly
- The Section Proxy is visible
- The Player can be controlled
- The Planet is registered with PlanetX Runtime

#### Step 2: Approach the planet

Move toward the Section and confirm:

```text
Orbit
→ Transition
→ Ground Presentation
```

Runtime Preview should appear when required.

#### Step 3: Use the landing input

Aim the camera at the Section and trigger `IA_Land`:

```text
Surface Query Hit
→ Begin Level Handoff succeeds
→ Store Ticket
→ Open L_Ground
```

#### Step 4: Arrive on Ground

After the Ground Player is spawned and possessed:

```text
Complete Level Handoff
→ Apply stored Ground pose
→ Journey = Ground Active
```

#### Step 5: Return to Orbit

Trigger `IA_ReturnOrbit`:

```text
Begin Return Level Handoff
→ Create Return Ticket
→ Open L_Orbit
→ Apply Return Ticket
→ Journey Completed
```

---

### 34. Inspect PlanetX Runtime Palette

During PIE, use the **Runtime** Palette in PlanetX Mode to inspect:

- Planet registration
- Current Transition State
- Transition Alpha
- Section Context
- Runtime Preview state
- Ground Presentation readiness

When diagnosing Level Handoff, distinguish between:

```text
Is this a Runtime Preview problem?
```

and:

```text
Is this an actual World Handoff problem?
```

If Runtime Preview works but the pose is wrong after `Open Level`, investigate Handoff.

If Preview does not appear while approaching the planet even without travel, investigate Transition and Preview configuration first.

---

### If Level Handoff does not work

Review these items in order:

1. Confirm Proxy Bake **Presentation** is External Level.
2. Confirm Ground World and Planet World are different Levels.
3. Confirm Planet World references the actual `L_Orbit`.
4. Run Proxy Bake again so the result is current.
5. Confirm Runtime Preview World is connected to the Section in the Planet Asset.
6. Confirm the correct Planet Asset is assigned to the Planet Actor in Orbit World.
7. Confirm you ran **Align** in PlanetX Mode.
8. Confirm exactly one **Orbit Transition Endpoint** exists for the Section.
9. Confirm exactly one Environment Manager exists.
10. Confirm the Player View Target has an active Camera and PlanetX Viewpoint Component.
11. Confirm Surface Query actually returns `Hit`.
12. Confirm `Surface Result.bCanEnterGround` is `true`.
13. Confirm `Begin Level Handoff` returns `true`.
14. On failure, inspect `Out Result.Error`.
15. Confirm the **complete Ticket** survives World Travel after `Begin Level Handoff`.
16. Confirm the Level opened by the game matches `Ticket.TargetWorld`.
17. Confirm Complete runs **after possession** of the Ground Pawn.
18. If multiple Pending Travels may exist, call `Complete Level Handoff` with the exact saved Ticket instead of `Resume Pending Travel`.
19. Confirm you stored the Ground arrival result's `JourneyId` before returning to Orbit.
20. Do not call `Return To Orbit Same World` for this workflow. External Level requires `Begin Return Level Handoff`.

---

### Common errors

| Error | Meaning / what to check |
| --- | --- |
| `InvalidSurfaceQuery` | Review the query result and Section state. |
| `InvalidLevelPair` | Review Level Handoff settings, Orbit/Ground Worlds, and Can Enter Ground. |
| `TargetWorldMismatch` | The game opened a Level other than the World required by the Ticket. |
| `TargetActorInvalid` | Handoff is being applied to the wrong Actor after arrival. |
| `TargetPlanetBindingNotFound` | The target Planet Actor is not registered yet during Orbit return, or its Binding is incorrect. |
| `ResolveFailed` | The saved coordinate state could not be resolved in the Target World. |
| `ApplyFailed` | Applying Actor Transform or Movement state failed. |
| `PendingTravelNotFound` | No Pending Travel targets the current World. |
| `AmbiguousPendingTravel` | More than one Pending Travel matches the current World. Use the exact Ticket. |
| `ActiveJourneyNotFound` | Ground arrival was not completed, or Journey Id is invalid. |
| `JourneyNotGroundActive` | Ground Handoff has not completed successfully. |
| `ArrivalTimedOut` | Travel Receiver could not restore the arrival state before its timeout. |

---

### If Ground World also needs PlanetX features

Basic Level Handoff does not require a Ground World Planet Actor solely to restore the Ground pose.

Additional setup may be necessary when Ground also uses:

- PlanetX Native Movement
- Gravity toward the planet center
- Surface Frame movement
- PlanetX Coordinate Query
- Ground environment transitions

Place a PlanetX Planet Actor in `L_Ground` and assign the same Planet Asset. Configure the Ground Player's Coordinate Component to reference the **Planet Actor in Ground World**.

> You cannot reuse the Orbit World Planet Actor reference in Ground World.
>
> Even when both Actors use the same Planet Asset, they are separate Actor instances in separate Worlds.

Gravity Settings belong to each Planet Component rather than the Planet Asset. Configure gravity independently on the Ground-side Planet Actor when using PlanetX gravity there.

This additional setup is not required for basic Level Handoff pose restoration.

---

### Complete

You have now configured the basic PlanetX Level Handoff workflow.

The authoring flow is:

```text
Planet Asset
    ↓
L_Ground
    ↓
Proxy Bake
    │
    ├─ Section
    ├─ Level Pair
    ├─ Section Proxy
    └─ Runtime Preview World
    ↓
Planet Visual Build
    ↓
L_Orbit
    ↓
PlanetX Planet
    ↓
Align
    ↓
Environment Manager
    ↓
Orbit Transition Endpoint
    ↓
Orbit Player + Viewpoint
```

Runtime travel is:

```text
L_Orbit
    ↓
Surface Query
    ↓
Begin Level Handoff
    ↓
Store Ticket
    ↓
Game calls Open Level
    ↓
L_Ground
    ↓
Spawn / Possess Ground Pawn
    ↓
Complete Level Handoff
    ↓
Ground Active
    ↓
Begin Return Level Handoff
    ↓
Store Return Ticket
    ↓
Game calls Open Level
    ↓
L_Orbit
    ↓
Apply Return Ticket
    ↓
Journey Completed
```

The visual transition shown while approaching Ground in Orbit World remains separate from World Travel:

```text
Section Proxy
    ↓
Transition
    ↓
Runtime Preview World
```

**Runtime Preview World is not the actual Ground gameplay Level.**

PlanetX connects the coordinates and state required between Orbit and Ground while leaving actual World Travel and Pawn lifetime under the existing Unreal Engine project's policy.

## Planet Assets and Identities

`UPlanetXPlanetAsset` is a Primary Data Asset connecting a planet's physical, coordinate, Section, Level Pair, Proxy Bake, generated-visual, and environment-authoring contracts.

### Three primary IDs

| ID | Purpose | Selection rule |
| --- | --- | --- |
| Planet ID | Project-wide identity of the planet contract | Unique among Planet Assets |
| Planet Binding ID | Distinguishes runtime instances sharing one Planet ID | Provide it when multiple Planet Actors exist |
| Section ID | Authoring and query region on the surface | Non-empty and unique within the asset |

Level Pair ID locates the Orbit/Ground/Runtime Preview world set associated with a Section. Journey ID and Capture ID identify one travel lifecycle.

### Contract owned by the asset

A Planet Asset stores Radius, Coordinate Convention, Sections, Level Pairs, Completion and Padding settings, Environment settings, Surface Preset, Proxy Bake links, and revision state. Generated payloads and materials are published by editor workflows and linked to the asset.

`IsProxyBakeStale`, `IsVisualBuildStale`, and `IsVisualPreviewStale` compare the current authoring revision with the most recent successful output. A stale result requests validation and regeneration; it is not an instruction to delete assets automatically.

### Multiple worlds and instances

The same Planet Asset can appear in Orbit and Ground worlds. If several Planet Actors with one Planet ID exist in a world, automatic selection can be ambiguous. Supply the Planet Binding ID exposed in advanced API inputs.

### Change policy

Changing an ID affects saved coordinates, Level Pairs, bake links, and travel routes. Treat it as a migration rather than a display-name edit, then run Full Validate and bake again.

## Sections and Level Pairs

A Section combines a geographic surface region, local frame, visual proxy, and transition boundary. A Level Pair defines the worlds in which that Section is presented.

### Section placement

`FPlanetXSectionPlacement` determines surface location, tangent orientation, size, and placement transform. A Same World Section selected as the canonical north-pole anchor can restrict automatic placement. The editor validates visual, coordinate-containment, and transition rectangles through one bounds contract.

An explicit Section ID lets saved data, captures, and Sequencer resolve the same frame. Automatic Section resolution uses the current Planet Local position and asset array order, so it is intended for editing and one-off queries rather than persistent identity.

### Runtime role

- **Same World** requires Orbit and Ground to use the same World package.
- **External Level / Level Handoff** requires distinct Orbit and Ground worlds plus a Runtime Preview World.

A Level Handoff Section needs a valid GroundSyncMapping and TransitionPolicy. Successful Proxy Bake publication refreshes the SourceRef, BakeData, mapping, preview, and transition-resource links.

### Ground proxy visibility

Per-Section Ground proxy visibility determines whether source actors or proxies are shown in Orbit, Ground, and transition states. PlanetX Mode's Planet, Compare, and Level views only compare editor presentation; they do not change the runtime contract.

### Validation checklist

1. Are Section ID and Level Pair ID non-empty?
2. Do the runtime role and World packages agree?
3. Is GroundSyncMapping valid?
4. Are Proxy Bake and generated visuals current?
5. Is the transition rectangle inside the containment bounds?

## Coordinate Model

PlanetX does not overload one World coordinate with every meaning. It uses explicit frames for distinct responsibilities.

### Coordinate spaces

| Coordinate | Meaning |
| --- | --- |
| World | Transform in the current Unreal World |
| Planet Local | 3D position relative to the Planet Actor origin |
| Canonical Geo | Latitude, Longitude, and AltitudeCm |
| Section Local | Tangent frame of a specific Section |
| Surface Frame | East, North, and Up basis |
| FPlanetXTransform | Canonical pose carrying Planet ID/Binding and rotation |

`FPlanetXCoordinateConvention` defines the North Pole and longitude axes. Geo altitude is measured in centimeters from Planet Radius.

### Coordinate Component authority

When `UPlanetXCoordinateComponent.CoordinateMode` is Unreal, the owner's World Transform is authoritative and the PlanetX snapshot is captured from it. In PlanetX mode, `FPlanetXTransform` is authoritative and Apply produces the World Transform. Capture and Apply are explicit operations.

Reference resolution prefers Reference Planet Actor, then Reference Planet ID. An explicit Section ID makes that Section frame authoritative.

### Vector conversion

Positions use point conversion; movement input uses vector conversion. With Surface Frame in `ConvertCoordinateVectorToWorld`, X/Y/Z represent East/North/Up. Surface movement can enable `bProjectToSurfaceTangent` to remove the Up component.

### Failure handling

Do not inspect only the boolean return value. Read `FPlanetXTransformResolveResult` or the detailed query status to distinguish invalid versions, unregistered planets, ambiguous bindings, unsupported planet scale, and invalid Sections.

## Representation and Runtime Load

PlanetX treats presentation ownership and World Partition loading as separate policies.

### Representation Domain

`EPlanetXRepresentationDomain` describes an actor's default presentation domain.

- Ground actors belong to the original Level presentation.
- Orbit actors appear in Planet/Compare editor views and Orbit/Transition runtime presentation.
- Global presentation actors can have separate visibility rules.

PlanetX Mode uses the domain in its Planet, Compare, and Level views when comparing source and proxy content.

### Actor Spatial Loading Policy

`EPlanetXActorSpatialLoadingPolicy` defines who owns the Actor's World Partition spatial-loading setting.

- `PlanetXManaged` keeps an Orbit actor non-spatial so it remains available to the orbit representation.
- `ActorManaged` leaves the Actor's Is Spatially Loaded setting under project control.

This policy does not configure Data Layer membership or Streaming Sources. Those systems remain project-owned.

### Applying the policy

Use `ShouldForceOwnerAlwaysLoaded` to inspect the effective result and `ApplySpatialLoadingPolicyToOwner` to apply it. The apply function can also run in the editor. Verify the resulting Actor, World Partition, and Data Layer configuration against project policy.

### Visibility versus residency

Hidden and unloaded are different states. Planet proxy visibility, Section proxy residency, and Runtime Preview residency are tracked separately. Use Runtime Monitor to inspect registration, realized component count, and renderability together.

## Transition Model

A PlanetX transition is a lifecycle connecting Section state, runtime context, actor pose, and travel state—not only a visual alpha.

### Participants

- `APlanetXTransitionEndpoint` defines the Section, endpoint role, cylinder settings, and participant policy.
- `UPlanetXViewpointComponent` supplies observation and transition-presentation context.
- `UPlanetXTransitionMorphComponent` presents flat/curved mesh interpolation.
- `UPlanetXPlanetProxyComponent` owns Section proxy presentation and residency.
- `UPlanetXSubsystem` exposes queries, captures, and Same World or Level Handoff operations.

`FPlanetXTransitionCylinderSettings` evaluates state and alpha from surface distance and altitude offset.

### Same World

The Orbit actor moves to a Ground pose within one World. Automatic entry applies only to actors whose Coordinate Component enables the Spatial Entry policy. Return policy can use the captured pose or the current Section-relative pose.

### Level Handoff

For different Worlds, `BeginLevelHandoff` or `PrepareTravel` creates a ticket. Game code remains responsible for `OpenLevel` and pawn policy. In the destination World, `ResumePendingTravel` or `CompleteLevelHandoff` with an exact ticket applies the pose.

An old ticket generation or multiple matching pending travels is rejected rather than guessed. Journey ID links the round trip, and completed journeys remain queryable for diagnostics.

### Movement continuity

Movement Handoff captures and reapplies linear and angular velocity in the intended coordinate frame. Inspect Consume, Cancel, and rollback results to prevent duplicate application.

## Planet Asset Editor

Double-click a Planet Asset to open its dedicated editor. The editor provides five dockable tabs for the asset contract.

### Tabs

| Tab | Purpose |
| --- | --- |
| Overview | Planet status and recommended next action |
| Sections | Search, filters, runtime role, and bake entry |
| Configuration | Planet structure and authoring settings |
| Preview | Basic and Advanced visual authoring |
| Diagnostics | Quick/Full validation and resolution actions |

The default layout opens **Preview** in the main area and **Configuration** on the right. **Overview**, **Sections**, and **Diagnostics** may be closed until a command opens them. If a tab is not visible, reopen it from **Window > Planet Asset**.

Configuration intentionally hides EnvironmentSettings. The single authoring surface for the environment profile is **Preview > Advanced > Environment**.

### Primary commands

- Open Preview: `Alt+P`
- Sections: `Alt+T`
- Open Proxy Bake: `Alt+B`
- Refresh: `F5`
- Validate: `Shift+F`
- Search Sections: `Ctrl+F`
- Focus selected Section: `F`
- Delete selected Section: `Delete`

Section filters include All, Same World, External Level, Needs Bake, Needs Transition, and Invalid. Changing runtime role must satisfy the required World and Proxy Bake contract.

### Deletion and preservation

Delete Selected Section removes the Section and Level Pair from the Planet Asset. It does not delete referenced source Worlds, Proxy BakeData, or Runtime Preview assets. Clean generated assets through a separate, reviewed operation.

### Recommended flow

For a new Planet Asset, open **Overview** when you need the status summary, then open Proxy Bake from the saved Ground Level. Do not create or select a Section first; the first successful Proxy Bake creates the Section and Level Pair. Return to **Sections** to verify `Linked` after the Bake, adjust visuals in **Preview**, and pass Full Validate in **Diagnostics**.

For an existing Planet Asset, open **Sections**, select the Section that needs work, and use its Proxy Bake entry. This is the only flow that begins by selecting a Section.

## PlanetX Mode

PlanetX Mode is a Level Editor mode that presents Planet Actors, Sections, participants, environment, and transitions in the current World.

### Palettes

| Shortcut | Palette | Purpose |
| --- | --- | --- |
| Alt+1 | Placement | Planet/Section placement and coordinate editing |
| Alt+2 | Runtime | PIE registration, residency, and state |
| Alt+3 | Cinematic | PlanetX Transform path authoring |
| Alt+4 | Transition | Endpoints and transition volumes |
| Alt+5 | Environment | World environment bindings |
| Alt+6 | Validate | World and asset validation |

`F5` Refresh Preview rebuilds the scene index and refreshes pre-PIE Completion and Padding preview.

### Preview views

- **Planet** shows the active planet proxy and hides source Level actors.
- **Compare** shows the planet proxy and source actors together.
- **Level** hides planet proxies and shows original Level actors.

These are editor visibility previews and do not change the saved runtime role.

### Scene Tree and selection

Scene Tree displays Planet, Section, Endpoint, Environment, and participant associations. It warns about duplicate Endpoints or Environment Managers and invalid Section placement or topology.

Before moving an actor with Placement tools, verify the Coordinate Component's Reference Planet/Section and representation domain. Use an explicit Section ID for persistent placement.

### PIE usage

In PIE, use Runtime to observe planet registration, Section state, Runtime Preview, and transition results. Do not run Proxy Bake operations that change the source World while PIE is active.

## Proxy Bake Editor

Proxy Bake Editor collects visual sources from a Ground World and publishes orbit proxies, partition payloads, Runtime Preview data, and transition resources.

### Choose the correct entry path

Use one of these paths according to the current Asset state.

| Situation | Entry path | Section selection |
| --- | --- | --- |
| First Section for a new Planet Asset | Open the saved Ground Level, then use **Tools > PlanetX section > Proxy Bake Editor** | No Section exists yet; Scan derives the target and the first successful Bake creates it |
| Rebuild an existing Section | Open Planet Asset Editor > **Sections**, select the Section, then choose **Open Proxy Bake** | The selected Section is the rebuild target |
| Diagnostics repair | Open Planet Asset Editor > **Diagnostics > Open Proxy Bake** | Use only after reviewing the reported finding |

First-time users should follow [Start Here — Same World Quick Start](/docs/en/quick-start-same-world) and use only the first row.

### First-Bake workflow

1. Open and save the Ground Level.
2. Open Proxy Bake Editor from the **Tools** menu's PlanetX section.
3. Select the target Planet Asset, set Presentation to **Same World**, and set Source Scope to **Current Level**.
4. Run **Scan Sources** (`F5`). Confirm at least one enabled source and `NEW OUTPUT`.
5. Review source roles, omissions, and Output Plan. Apply Source Changes if you edited Use or Role.
6. Run **BAKE IN EDITOR** (`Ctrl+B`). A successful result starts with `Bake complete.` and creates the Section and Level Pair automatically.

### Existing-Section workflow

1. Open Planet Asset Editor > **Sections**.
2. Select the Section to rebuild.
3. Choose **Open Proxy Bake**.
4. Run **Scan Sources** (`F5`) to refresh sources and the Bake plan.
5. Review changes and run **REBUILD IN EDITOR** or **BAKE IN EDITOR** as shown.

Use `Esc` to request cancellation and `Ctrl+Shift+O` to select results.

Operations that need to change the Source Level cannot start during PIE. While an external worker is active, do not open its Source World directly; request cancellation through the editor.

### Success checkpoints

| Stage | Required result |
| --- | --- |
| Scan | Header shows `SUCCESS`; enabled source count is greater than zero |
| Plan | No `SCAN OUT OF DATE` or `TARGET CONFLICT` |
| Bake | `Bake complete.` or reviewed `Bake complete with warnings` |
| Planet Asset > Sections | Bake is `Linked`; Transition is `Ready` or `Same World` |

### External Bake Monitor

Enable **Open Bake Monitor in browser** in the External Bake confirmation to open a local browser view of stages, progress, ETA, resource usage, warnings, and bounded log tails. The Monitor is an observer: if its service or browser cannot open, External Bake continues and its result is unchanged.

The loopback Monitor service is part of the `PlanetXEditor` module and runs inside the active Editor or direct Worker process. PlanetX does not install or launch a separate Monitor executable. The service accepts local connections only and authorizes its browser page with a per-session token. Do not share or publish the complete Monitor URL.

The direct Worker hosts the Monitor during an active External Bake. When the Worker exits, that service ends and an existing tab can disconnect. After Unreal Editor restarts, use **Open External Bake Monitor** to host the latest durable result again. The new service reconstructs state from the Job artifacts; the previous browser tab is not migrated automatically.

Closing the tab never cancels the Bake. Use **Cancel Bake** in the Monitor or the Editor cancellation action to request cancellation at a safe checkpoint. A cancellation request does not publish partial output.

### Supported sources

| Component | Handling |
| --- | --- |
| LandscapeComponent | Landscape pass |
| FoliageInstancedStaticMeshComponent | Foliage pass |
| HISM / ISM | Instances pass |
| StaticMeshComponent | RigidMesh pass |
| SplineMeshComponent | Deformation extraction unsupported; omission |

Discovery also checks saved PCG managed resources and HLOD validity. If HLOD validation is incomplete, original sources are used conservatively.

### Roles and tags

The editor exposes Auto, ProxyGeometry, LandscapeProxy, InstanceBatch, Discard, ManualReview, and Unsupported roles. Sources can be grouped by Actor, Folder, Data Layer, or Level/Level Instance.

The C++ tag API provides BakeSource, NoBake, Preview, and Generated tags. Use explicit exclusion as an intentional source policy, not as a way to conceal omissions.

### Result interpretation

Succeeded means publication completed without omissions. CompletedWithWarnings means publication succeeded but SourceOmissions require review. Packages over 512 MiB produce warnings; publication is rejected over 1 GiB.

## Validation and Diagnostics

PlanetX validation reports more than an error string. A finding carries severity, impact, blocking scope, automatic-fix eligibility, and a resolution action.

### Quick and Full Validate

Quick Validate checks the asset structure and immediately available contracts. Full Validate also inspects Worlds, Proxy Bake links, Runtime Preview, and generated output, and writes structured logs.

Primary Diagnostics actions are:

- Quick Validate
- Full Validate
- Review Sections
- Open Proxy Bake
- Show Section
- Open Details

### Validate palette

The Validate palette in PlanetX Mode checks the current World and connected assets together. **Fix All Safe** changes only warnings whose result is deterministic and needs no additional choice. Destructive actions and findings requiring a user decision are never auto-fixed.

### Common findings

- Missing or duplicate Planet and Section IDs
- Invalid radius or coordinate convention
- Wrong World-package relationship for Same World or External Level
- Missing GroundSyncMapping or TransitionPolicy
- Stale Proxy Bake, Generated Visual, or Generated Material
- Source materials changed since bake
- Unresolved Reference Planet or Section
- World Partition runtime-load policy mismatch

### Logs and support evidence

Full Validate writes stable Surface/Operation/Subject records through `LogPlanetXValidation`. For visual authoring issues, use `PlanetX.VisualEdit.Dump`; for proxy presentation, use `PlanetX.ProxyStats.Dump`.

## Runtime Integration

The public runtime facade is `UPlanetXSubsystem`, a Game Instance Subsystem. World-specific registries and services are implementation details; gameplay code uses the facade and public components.

### Planet registration

`APlanetXPlanetActor` includes Planet, Proxy, Transition Morph, Atmosphere, and Volumetric Cloud components. Assign a Planet Asset on the Planet Component and use `bAutoRegisterRuntime`, or call `RegisterToPlanetXRuntime`.

When several actors share one Planet ID, retain the Planet Binding ID and pass it to queries. Automatic resolution that assumes a single instance can become ambiguous.

### Participant actors

Add components as required:

- Coordinate for Planet/Section references, canonical pose, vector conversion, and Spatial Entry policy
- Movement for planet gravity, input/force/impulse, surface snap, and alignment
- Viewpoint for transition observation
- Travel Receiver for resuming pending travel after Level Handoff
- Transition Endpoint for Section entry/exit conditions and presentation

### Begin Play order

The Planet Actor must register before participants can resolve runtime context. If streaming can delay that order, use `RefreshRuntimeRegistration`, `RefreshRuntimeContext`, or the Travel Receiver retry policy.

### Before packaging

Check Full Validate, current Proxy Bake, current Generated Visual and Material output, Runtime Preview Worlds, and cooked asset bundles. A working editor preview does not prove that runtime payloads are cooked.

## Coordinates and Surface Queries

Coordinate APIs separate actor-pose conversion from planet-surface discovery. `UPlanetXSubsystem` is the Blueprint facade taking a World context; the Coordinate Component provides owner-bound conveniences.

### Transform capture and resolve

- `CapturePlanetXTransform` captures a World Transform as a canonical PlanetX pose.
- `CaptureActorPlanetXTransform` captures an actor transform.
- `ResolvePlanetXTransform` computes the current World Transform from a canonical pose.
- `ApplyPlanetXTransformToActor` resolves and applies it.
- `ResolveCoordinateFrame` resolves a Planet or Section frame into World space.

Inspect `FPlanetXTransformResolveResult` together with the boolean return. Planet ID, Binding, and Section ID must match the current World registry.

### Surface queries

`FPlanetXSurfaceQueryInput` contains ray origin, direction, and selection criteria. Prefer `QuerySurfaceAtWorldRayDetailed` for gameplay branches because it distinguishes InvalidInput and RuntimeUnavailable from a geometric miss.

Queries can also start from Geo coordinates or `FPlanetXTransform`. `FPlanetXSurfaceQueryResult` carries Planet, Section, hit position, normal, and coordinate information.

### Landing and Sections

`BuildLandingTransform` creates a surface-aligned landing pose. `GetSectionTransform`, `GetSectionDesc`, and `GetSectionRuntimeState` expose the Section contract and current state.

### Component vector API

The Coordinate Component exposes Surface Up/Down/East/North, tangent projection, and Surface/Planet/Section Local to World vector conversion. Do not confuse points with vectors, and choose tangent projection explicitly for surface input.

## Movement and Gravity

`UPlanetXMovementComponent` applies planet-relative movement using runtime context resolved by the Coordinate Component.

### Configuration

The Movement Component needs a valid UpdatedComponent. Verify the reference Coordinate Component and planet-gravity settings, then use `ValidateMovementConfiguration` for a specific error message.

`FPlanetXNativeMovementSettings` defines acceleration, deceleration, speed, and ballistic behavior. `FPlanetXGravitySettings` defines acceleration toward the planet center; Planet Component exposes `GetGravityAccelerationAtWorldLocation`.

### Input and physics

| Function | Purpose |
| --- | --- |
| AddPlanetXInputVector | Accumulate input in the selected frame |
| Set/GetPlanetXVelocity | Set or read World/Planet/Section/Surface velocity |
| AddPlanetXForce | Add force or acceleration change |
| AddPlanetXImpulse | Add impulse or velocity change |
| SnapToPlanetSurface | Correct altitude and surface position |
| AlignUpToPlanetSurface | Align actor Up with the surface normal |

Surface Frame input uses East/North/Up. Enable tangent projection for ground movement; define an explicit Up policy for jumping or flight.

### Runtime state

`GetMovementRuntimeState` contains current velocity, gravity, and resolve or failure state. The single and aggregate queries on the Game Instance facade are suitable for debug UI and telemetry.

### Handoff

When changing Worlds or Movement Components, use Movement Handoff instead of copying velocity directly. The frame-continuity policy interprets linear and angular velocity in the destination surface frame.

## Same World Travel

Same World travel moves an actor from Orbit to a Section's Ground pose, then returns it to Orbit when both presentations use one World package.

### Contract

The Level Pair must use the same package for OrbitWorld and GroundWorld. GroundSyncMapping, transition bounds, and the Surface Query must be valid. The traveling actor needs a resolvable Planet and Section context in the current World.

### Explicit calls

1. Obtain `FPlanetXSurfaceQueryResult` from a ray or Geo query.
2. Call `EnterGroundSameWorld(WorldContext, Actor, SurfaceQuery)`.
3. Run Ground gameplay.
4. Call `ReturnToOrbitSameWorld(WorldContext, Actor)`.

Entry creates a Journey and capture associated with the actor. Return selects that exact active Journey.

### Automatic Spatial Entry

The Coordinate Component can enable automatic Same World entry and return. Runtime evaluates the transition boundary for registered participants and applies the pose when the presentation is ready.

Return Pose Policy chooses between the captured Orbit pose and a pose reconstructed from the actor's current Ground Section-relative transform. Use the latter when Ground movement must carry back into the Orbit Section frame.

### Failure handling

The request fails when the Surface Query targets another Planet or Section or actor context is ambiguous. Automatic return can wait for Orbit presentation readiness. Inspect the Transition Journey and managed-actor state.

## Level Handoff Travel

Level Handoff transfers a PlanetX pose and Journey state between different World packages. Game code continues to own level loading and pawn creation policy.

### Recommended flow

`PrepareTravel` creates a ticket from the Source Actor, Surface Query, and an explicit `FPlanetXTravelRoute`.

```cpp
FPlanetXLevelHandoffTicket Ticket;
FPlanetXLevelHandoffResult Result;
const bool bPrepared = PlanetXSubsystem->PrepareTravel(
    WorldContext, SourceActor, SurfaceQuery, TargetRoute, Ticket, Result);
```

On success, game code travels to `Ticket.TargetWorld`. At arrival, use `ResumePendingTravel` only when exactly one pending ticket matches, or call `CompleteLevelHandoff` with the stored ticket.

### Round trip

The advanced flow is `BeginLevelHandoff` → `CompleteLevelHandoff` → `BeginReturnLevelHandoff(JourneyId)` → `CompleteLevelHandoff`. `PrepareTravel` can also use an explicit route for direct Ground-to-Orbit travel.

### Safety rules

- No matching pending travel reports PendingTravelNotFound.
- Multiple matches report AmbiguousPendingTravel.
- An older ticket generation reports StaleGeneration.
- A missing target Planet Binding can be retried by Travel Receiver within its timeout.
- The Ground mapping stored in the capture is authoritative for the Level Handoff Ground pose.

`ResumePendingTravel` never guesses the latest ticket. Projects allowing concurrent travel should keep Ticket or Journey identity in gameplay save state.

### Cancellation and diagnostics

Cancel unused tickets with `CancelLevelHandoff`. Log Capture, Journey, and Result error together, and use `GetActiveTransitionJourneys` to find leaked journeys.

## Runtime Preview and Budget

Runtime Preview is a gameplay-independent render host used to present an External Level Section's Ground content in Orbit or Transition worlds.

### Loading lifecycle

`APlanetXRuntimePreviewActor` can move through Idle, LoadingRoot, LoadingPayloads, LoadingResources, Realizing, WaitingForRender, Resident, and Failed residency states.

The Game Instance facade provides:

- LoadRuntimePreview
- SetRuntimePreviewVisible
- UnloadRuntimePreview
- GetRuntimePreviewStatus

When controlling an actor directly, use AssignPreviewBakeData, LoadPreviewFromBakeData, SetPreviewVisible, UnloadPreview, and the renderable and component-count queries.

### Presentation boundary

Runtime Preview realizes proxy Static Meshes and baked ISM/HISM/Foliage instance batches under one root. It intentionally excludes gameplay-actor duplication, collision, navigation, and tick-based behavior.

Loaded and Renderable are different. A Resident preview can still require render-resource readiness before presentation switches.

### Runtime Budget

**PlanetX Runtime** project settings select Follow Engine Scalability or a fixed profile. Proxy Bake Quality is immutable geometry quality for a published revision; Runtime Budget controls per-frame realization and residency work. They are independent.

### Observation

Use `Stat PlanetXMemory`, `Stat PlanetXResources`, `Stat PlanetXProxy`, and `Stat PlanetXRuntime` to inspect memory, resources, rendering, and runtime-service cost. Also review `PlanetX.MemoryBudgetMB` and automatic-material MID budget warnings.

## Environment Runtime

`APlanetXEnvironmentManager` connects a Planet Asset environment profile to Atmosphere, Cloud, Sun, Post Process, and Space Background bindings in the current World.

### Binding modes

PlanetX Managed mode controls required components from the PlanetX profile. Use Existing Level preserves existing SkyAtmosphere or Volumetric Cloud components, so the project must match them manually to the Planet Asset profile.

A managed Planet Actor supplies Radius and environment-authoring settings. Without an Existing Sun Light, the stored Sun direction remains usable but validation can report a warning.

### Initialization and transition

- `ValidateEnvironmentBinding` checks bindings and material/profile conditions.
- `CaptureEnvironmentStateFromBindings` captures current Level values.
- `ApplyEnvironmentState` applies the stored state.
- `ApplyInitialRuntimeSpace` establishes the initial Orbit or Ground presentation.
- `SetEnvironmentTransition(From, To, Alpha)` interpolates between spaces.

Orbit cloud and atmosphere render-quality and tracing overrides have matching Apply and Restore operations. Always restore overrides when returning ownership to the Level.

### Common warnings

- Missing existing cloud or atmosphere
- Mismatch between PlanetX and existing Ground cloud
- Missing MPC
- Non-positive Planet Radius or terminator softness
- Missing Sun or Cloud source for a cloud-shadow override
- Incorrect Space Background material domain, blend, shading, or Is Sky

Resolve binding validation before investigating presentation alpha.

## Preview Tab

The **Preview** tab in the Planet Asset Editor authors the planet visual contract in a dedicated preview World. **Basic** exposes frequent controls; **Advanced** exposes generation and environment details.

### Basic

The Planet, Sections, and Environment areas provide quick access to:

- Atmosphere enablement and radius-scaled or manual height
- Volumetric Clouds and layer height
- Sun and cloud shadows
- Post Process, convolution bloom, and lens flare
- Section selection and preview

### Advanced

Advanced contains Planet Completion, Section Proxy Padding, material build, and the complete Environment profile. Changes apply to a preview session, and a successful build links its revision to the Planet Asset.

### Preview rules

Preview is an authoring environment, not the runtime World. Runtime Preview follows a separate path that consumes published Proxy Bake payloads. Even when Preview looks correct, check stale status and Runtime Preview readiness in Diagnostics.

### Interaction and diagnostics

The viewport adjusts camera speed and framing for the planet radius. A failed Padding Material Preview reports the failed Section count; use `PlanetX.VisualEdit.Dump` for details.

Save before and after edits. When Section geometry or material sources change, review the stale state of both Completion/Padding and Proxy Bake.

## Completion and Padding

Completion generates planet surface not covered by Sections. Padding reinforces Section proxy boundaries so they connect naturally to the spherical presentation.

### Completion

Surface Completion settings control generated topology, cutouts, terrain noise, and surface materials. Generators are deterministic for identical input and validate polygons, boundaries, and mesh attributes.

Terrain Regions apply noise parameters to selected surface areas. Use Preview to ensure strong noise or an incorrect cutout does not intrude beneath a proxy.

### Padding

Proxy Padding selects Section boundary loops and creates connecting geometry through adaptive subdivision and projection. Transition strips and shared seams preserve position, normal, and material provenance across the boundary.

Performance budgets contain warning and hard thresholds for boundary edges, generated vertices, indices, compact bindings, and MID counts. A warning can still publish output, but requires runtime-cost review.

### Material build

Padding Material Build collects source material layouts and generates the necessary texture and material assets. Editor validation can detect changed source material state even when the asset path is unchanged. Rebuild before packaging.

### Failure checklist

- Valid Section bounds and boundary loops
- Current Proxy Bake revision and generated-visual geometry hash
- Source material layout and slot remap
- Projection tolerance and Planet Radius
- Performance-budget warnings

## Materials and Surface Presets

PlanetX distinguishes source Section materials, material identities published by Proxy Bake, and generated materials used by Completion and Padding.

### Surface Preset

`UPlanetXSurfacePreset` is a Primary Data Asset for reusable Completion and planet-surface styling. Assigning it as the Planet Asset's Active Surface Preset lets authoring settings reference that selection.

Use a preset to share materials, terrain or noise character, and visual parameters. It does not replace structural contracts such as Planet ID or Section geometry.

### Proxy materials

Planet Material Override on `UPlanetXPlanetProxyComponent` replaces the planet-sphere presentation. Section proxy materials must follow the canonical slots and remaps in BakeData. Reordering slots independently can break boundary and padding material provenance.

### Automatic Padding materials

The runtime binder checks generated-visual binding descriptors and Source Material identity before preparing MIDs. A mismatched geometry revision, slot, or texture set can produce an error material or warning.

### Recommendations

- Run Full Validate after changing a Source Material.
- Rebuild stale Generated Material before packaging.
- Preserve material-slot order across bake and visual build.
- Do not use sky materials as ground Proxy Bake sources.
- Limit dynamic materials to parameters that can be captured deterministically.

## Environment Authoring

Author the environment profile in **Planet Asset Editor > Preview > Advanced > Environment**. Atmosphere, Clouds, Sun, Post Process, and Space Background are stored in one `FPlanetXEnvironmentAuthoringSettings` contract.

### Atmosphere and Clouds

Atmosphere height can scale from Planet Radius or use a manual kilometer value. The profile exposes Rayleigh, Mie, absorption, aerial perspective, and ground albedo controls.

Clouds define layer bottom and height, lighting, atmosphere interaction, and shadow parameters. If an existing Level cloud does not match the PlanetX profile, Orbit and Ground presentation can diverge during transition.

### Sun and Post Process

The Sun profile defines atmosphere sunlight, cloud shadows, shadow extent, and quality. Post Process controls the planet profile, convolution bloom, and lens flare. PlanetX Rendering project settings also apply default lens-flare console variables.

### Space Background

A Space Background material should use the Surface domain, Opaque blend mode, Unlit shading, and Is Sky. When Planet Asset Defaults is the profile source, a managed Planet Actor and Planet Asset must be bound.

### Runtime binding

Connect the Planet Actor, Sun, Atmosphere, Volumetric Cloud, and MPC to `APlanetXEnvironmentManager`. Run ValidateEnvironmentBinding before using ApplyInitialRuntimeSpace or SetEnvironmentTransition.

## Configuration Reference Guide

This category documents the settings that users can adjust in the current PlanetX codebase, grouped by their owning object and editor workflow. Names correspond to labels in Unreal Editor's Details panels or to their C++ property names. A default is the code default for a newly created object.

### Where each setting belongs

| Document | Location | Main subjects |
| --- | --- | --- |
| [Planet Asset and Visual Settings](/docs/en/planet-visual-settings) | Planet Asset Editor, Surface Preset | Planet creation contract, Completion, Padding, Sections, Level Pairs, Preview, and Build |
| [Proxy Bake Settings](/docs/en/proxy-bake-settings) | PlanetX Proxy Bake Editor | Target Asset, Runtime Role, Source Scope, quality, output partitions, and execution memory |
| [Runtime Actor and Component Settings](/docs/en/runtime-component-settings) | Actor and Component Details | Planet, Coordinate, Movement, Viewpoint, Travel Receiver, and Transition Endpoint |
| [Proxy, Morph, and Preview Settings](/docs/en/proxy-transition-settings) | Planet Proxy, Transition Morph, Runtime Preview | Presentation layers, surface correction, morph rendering, and runtime budget overrides |
| [Environment Settings](/docs/en/environment-settings) | Planet Asset Environment, Environment Manager | Atmosphere, clouds, sun, post process, space background, and level bindings |
| [Project and Performance Settings](/docs/en/project-settings) | Project Settings > Plugins | Runtime budget policy and lens-flare quality |

### Settings versus generated data

PlanetX reflected structures include user choices as well as bake output, runtime captures, query inputs, and diagnostic records.

- **User settings** are documented here with their defaults, units, and effects.
- **Conditional settings** are used only when a preceding toggle or mode enables them. Check the stated condition in each table.
- **Generated data** is written by Proxy Bake or Visual Build. It should not be edited manually even when it is visible in Details.
- **Request and result structures** are values supplied to individual function calls, not persistent project settings. Their fields are covered by the [Public API Reference](/docs/en/api-overview).

### Before changing defaults

1. Planet ID, Radius, and Coordinate Convention are creation-time Planet Asset contracts; they are not ordinary settings to revise on an existing Asset.
2. Proxy Bake Quality and Runtime Budget are independent. Quality can change generated output; changing Runtime Budget does not rebuild an existing bake.
3. When an Override toggle is off, the Component uses its Project Settings or Planet Asset source.
4. After changing Proxy Bake, Section placement, or visual settings, check the displayed stale state and rerun Bake or Apply & Build when required.
5. Before packaging, run Full Validate on the Planet Asset and Validate for the current World.

### Public code baseline

This reference is based on the public headers shipped with PlanetX 1.0 under:

```text
Source/PlanetX/Public/PlanetX
```

A type appearing in a public header is not, by itself, a general user setting. This reference covers editor-adjustable values, project configuration, and public operation options; pipeline-generated payloads and captures are identified separately.

## Planet Asset and Visual Settings

Distances and sizes are in Unreal Units (centimeters) unless noted otherwise.

### Planet contract established at creation

| Setting | Meaning |
| --- | --- |
| Planet ID | The unique `FName` that identifies the planet across the project and at runtime. It is immutable after creation. |
| Radius | The planet radius. The creation UI may accept kilometers, but the Asset stores centimeters and requires at least 1 cm. Radius participates in the bake and visual-build contract and is not intended for direct changes after creation. |
| Coordinate Convention | Defines the North Pole and longitude axes, longitude direction, Source X/Y/Z mapping, and `UnrealUnitToCm`. The defaults are Up/Forward/Right, counterclockwise longitude, X=East, Y=North, Z=Up, and 1 uu=1 cm. It is immutable after creation. |

### Authoring Geometry Settings

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `DetailLevel` | `Medium` | Chooses the `Low`, `Medium`, `High`, or `Custom` preview-planet mesh tier. |
| `PreviewSegmentCount` | 64, 8–512 | Segment count for the procedural preview sphere. More segments improve the silhouette but increase preview cost. |
| `PreviewVertexBudget` | 10,000, 128–1,000,000 | Maximum vertex budget for preview generation. |
| `ProxyTextureResolution` | 2048, 256–8192 | Target texture resolution used by proxy and visual authoring. Consider both memory and build time. |
| `bUseCustomPreviewMesh` | false | Uses `CustomPreviewMesh` instead of the generated preview mesh. |
| `CustomPreviewMesh` | None | Static Mesh used while custom preview is enabled. |
| `LowPreviewMesh` | None | Explicit Static Mesh for the Low preview tier. |
| `MediumPreviewMesh` | None | Explicit Static Mesh for the Medium preview tier. |
| `HighPreviewMesh` | None | Explicit Static Mesh for the High preview tier. |

### Surface Completion Settings

These settings generate the portion of the planet not covered by Sections.

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `CompletionMeshDetailLevel` | 6, 0–7 | Detail level of the completion sphere. Higher values increase vertex count and build cost. |
| `CompletionNoiseSeed` | 1337 | Selects a reproducible terrain-noise layout. |
| `CompletionNoiseStrengthPercent` | 10%, 0–25 | Strength of surface-height variation relative to planet radius. |
| `CompletionNoiseScale` | 3.0, 0.001–25 | Controls the spatial frequency/scale of the noise. |
| `TerrainRegionProfiles` | 4 entries | Strength/sharpness pairs for noise regions. Use 1–8 entries. Defaults are `(0.20,1.25)`, `(0.45,2.00)`, `(0.70,3.25)`, and `(1.00,4.50)`. |
| `TerrainRegionProfiles[].Strength` | 0.5, 0–1 | Height influence of that region. |
| `TerrainRegionProfiles[].Sharpness` | 2.0, 0.5–8 | Concentration of the region boundary. |
| `CompletionMaterial` | None | Material applied to completion geometry. Inspect the Visual Build result to ensure that it joins Section materials as intended. |
| `BlendSharpness` | 1.0, 0.01–8 | Sharpness of the material blend between completion and adjacent surfaces. |

### Proxy Padding Settings

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `GeometryPaddingWidthCm` | 100,000, at least 0 | Width of the geometric bridge from a Section Proxy to completion. |
| `MaterialTransitionWidthRatio` | 0.1, 0–0.5 | Fraction of total padding width used for material transition. |
| `PaddingMaterialBakeResolution` | 2048, 256–2048 | Output resolution for Padding Material Bake. |
| `MaterialBakeBindings` | Empty | Generated Section-to-padding-material records written by Visual Build. Do not edit entries manually. |
| `PaddingSegmentCount` | 8, 1–128 | Number of geometry segments across the padding width. |
| `RingDistributionStrength` | 2.0, 1–4 | Controls how strongly padding rings are concentrated toward the boundary. |
| `HeightTransitionStrength` | 1.0, 0–4 | Strength of height correction between proxy and completion. |

#### Padding Performance Budget

Warning values produce warnings; Hard values stop an excessive build. Do not set a Hard value below its corresponding Warning value.

| Settings | Defaults | Measurement |
| --- | ---: | --- |
| `WarningBoundaryEdgeCount` / `HardBoundaryEdgeCount` | 10,000 / 100,000 | Extracted boundary edges |
| `WarningGeneratedVertexCount` / `HardGeneratedVertexCount` | 200,000 / 5,000,000 | Generated vertices |
| `WarningIndexCount` / `HardIndexCount` | 1,000,000 / 15,000,000 | Generated indices |
| `WarningCompactBindingCount` / `HardCompactBindingCount` | 64 / 256 | Compact material bindings |
| `WarningTotalMidCount` / `HardTotalMidCount` | 64 / 256 | Total intermediate rings/results |

### Transition Distance Settings

| Setting | Default | Purpose |
| --- | ---: | --- |
| `TransitionStartDistance` | 50,000 | Reference distance at which Ground/Proxy transition begins. |
| `ApproachStartDistance` | 75,000 | Reference distance at which approach begins; it is normally outside the transition distance. |
| `LandingSelectionDistance` | 30,000 | Distance used to choose a candidate landing Section. |
| `CameraBlendDistance` | 15,000 | Distance used for camera blending during transition presentation. |

All values must be non-negative. Actual runtime Section load and visibility alpha thresholds are owned by the Level Pair's `TransitionPolicy`.

### Preview and Build Settings

| Setting | Default | Purpose |
| --- | --- | --- |
| `bPreviewProxyRegion` | true | Shows the proxy region in Preview. |
| `bPreviewVisualBlendPadding` | true | Shows visual-blend padding. |
| `bPreviewGeometricPadding` | true | Shows geometric padding. |
| `bPreviewCompletionRegion` | true | Shows the completion region. |
| `bPreviewTransitionDistance` | true | Shows transition-distance visualization. |
| `bRealtimeMaterialPreview` | true | Refreshes material preview while settings change. |
| `PreviewDebugMode` | `FinalSurface` | Selects `FinalSurface`, `ProxyRegion`, `VisualPaddingRegion`, `GeometricPaddingRegion`, `CompletionRegion`, `BlendMask`, `LandingMask`, or `TransitionDistance`. |
| `FakeProxyRegion.ProxyUVMin` / `ProxyUVMax` | (0.35,0.35) / (0.65,0.65) | Test proxy UV rectangle used when no real Section is available. |
| `FakeProxyRegion.FakeProxyColor` | (0.1,0.6,0.2,1) | Color of the test proxy. |
| `FakeProxyRegion.FakeProxyHeightOffset` | 500 | Height offset of the test proxy. |
| `FakeProxyRegion.FakeCompletionHeightOffset` | 0 | Height offset of the test completion surface. |
| `AuthoringOutputFolder` | Empty | Output folder for generated Visual Build assets. When empty, the editor resolves a path from the target Asset. |
| `bAllowGeneratedAssetOverwrite` | false | Allows replacement of assets at the generated path. Enable it only after confirming the output target. |

### Section Settings

The Planet Asset Editor and Proxy Bake manage the Section list.

| Setting | Default | Purpose |
| --- | --- | --- |
| `SectionId` | None | Stable Section identifier within the planet. |
| `DisplayName` | Empty | Editor-facing name. Runtime identity uses `SectionId`. |
| `Placement.CenterGeo` | (0°,0°,0 cm) | Latitude, longitude, and altitude of the Section center. |
| `Placement.YawDeg` | 0° | Section rotation relative to its Surface Frame. |
| `Placement.Scale` | 1.0, greater than 0 | Uniform Section scale. |
| `Placement.LocalExtentCm` | (100,000,100,000) | Section-local X/Y half extent. |
| `Placement.bLockToSurface` | true | Locks the center to the planet-surface contract. |
| `SurfaceCorrectionSettings.Mode` | `Disabled` | Chooses `Disabled`, bake-vertex-derived `Automatic`, or direct-offset `Manual`. |
| `SurfaceClearanceCm` | 1.0, at least 0 | Additional outward clearance after Automatic moves the lowest baked vertex to the surface. |
| `ManualOffsetCm` | 0, at least 0 | Outward offset applied by Manual mode. |
| `LevelPairId` | None | Level Pair referenced by the Section. |
| `bEnabled` | true | A disabled Section is excluded from runtime presentation and travel targets. |

The Same World north-pole anchor contract locks latitude, longitude, yaw, and scale. Only Altitude remains available for Ground contact-height correction. `Bounds`, `RegionSet`, `SourceRef`, `ProxyBakeData`, rectangles, and hashes are Scan/Bake output and should not be edited manually.

### Level Pair and Transition Policy

| Setting | Default | Purpose |
| --- | --- | --- |
| `LevelPairId`, `PlanetId`, `SectionId` | None | Stable IDs joining the Pair. Let the editor and bake workflow keep them consistent. |
| `EntryMode` | `SameWorld` | Chooses same-World presentation or travel to a separate World through `LevelHandoff`. |
| `HandoffBackend` | `OpenLevel` | Records the `OpenLevel`, `SeamlessTravel`, or `PreparedMapChange` contract. PlanetX does not open the Level for you. |
| `PlanetSyncMode` | `None` | Planet Actor synchronization policy during travel. Change it only when the project explicitly requires synchronization. |
| `OrbitWorld` / `GroundWorld` | None | Same World requires the same package; Level Handoff requires two distinct, saved Worlds. |
| `bCanEnterGround` | true | Whether gameplay may enter Ground. |
| `bVisualOnly` | false | Treats the Pair as presentation-only rather than a gameplay entry target. |
| `TransitionPolicy.PreloadAlpha` | 0.0, 0–1 | Transition alpha at which Runtime Preview preload is requested. |
| `TransitionPolicy.VisibleAlpha` | 0.25, 0–1 | Alpha at which Preview becomes visible. |
| `TransitionPolicy.HideAlpha` | 0.15, 0–1 | Alpha at which Preview is hidden on return. Keep it below `VisibleAlpha` for hysteresis. |
| `TransitionPolicy.UnloadDelaySeconds` | 5 s, at least 0 | Delay before unloading a hidden Preview. |
| `TransitionPolicy.bKeepPreviewLoaded` | false | Keeps Runtime Preview resident while hidden. |
| `TransitionPolicy.GroundProxyVisibility` | `Hidden` | Chooses `Hidden`, `HorizonOnly`, or `FullProxy` for Planet/Section Proxy visibility while Ground is active. |

### Surface Preset

| Setting | Default | Purpose |
| --- | --- | --- |
| `PresetId` | None | Preset identifier. |
| `DisplayName` | Empty | Editor-facing name. |
| `PresetType` | `Custom` | Preset classification. |
| `CompletionSettings` | Structure defaults | The completion settings documented above. |
| `PaddingSettings` | Structure defaults | The padding settings documented above. |
| `BaseSurfaceMaterial` | None | Base surface material supplied by the preset. |
| `OptionalBiomeMask` | None | Optional biome-mask texture. |
| `OptionalHeightMask` | None | Optional height-mask texture. |

After assigning `ActiveSurfacePreset` to a Planet Asset, inspect the effective build input in Preview and run Apply & Build.

### Planet Asset setting-group names

In Details and the API, `AuthoringGeometrySettings`, `SurfaceCompletionSettings`, `ProxyPaddingSettings`, `TransitionDistanceSettings`, and `ShapeEditorSettings` own the corresponding groups above. `ProxyPaddingSettings.PerformanceBudget` owns the Padding Warning/Hard limits.

## Proxy Bake Settings

Basic/Advanced view state, Bake Quality, and the requested Source Representation are stored as editor-user settings.

### 1 Target Planet Asset

| Setting | Purpose |
| --- | --- |
| `Planet Asset` | Owns the generated Section and bake link. It supplies planet radius, output identity, projection context, and the final `ProxyBakeData` link. |

Changing the Planet Asset or Source World makes the existing Scan plan stale. Run **Scan Sources** again for the new target.

### 2 Runtime Role

| Setting | Default | Purpose |
| --- | --- | --- |
| `Presentation` | `Same World` | `Same World` keeps Planet and Ground in one World package and changes presentation. `External Level` is the UI name for code-level `LevelHandoff`; it uses a separate Ground World and a visual-only Runtime Preview World. |
| `Ground World` | Current Source World | Read-only value resolved from the World being scanned and baked. |
| `Planet World` | None | Shown only for External Level. Select the Orbit World that owns the destination Planet Actor on return from Ground. It must be a saved World distinct from Ground World. |

The default Level Handoff backend contract is `OpenLevel`. PlanetX captures and resumes state, but the game remains responsible for Open Level, Pawn creation, and possession.

### 3 Source Scope

| Setting | Default | Purpose |
| --- | --- | --- |
| `Selected Actors` |  | Scans only Actors currently selected in the Outliner or viewport. Appropriate for deliberate partial bakes. |
| `Current Level` | Selected | Scans Actors owned by the current persistent Level and excludes streaming Levels. |
| `Loaded Levels` |  | Scans the current Level, loaded streaming Levels, and Level Instances. |
| `Reviewed Set` |  | Reuses stable source membership explicitly reviewed in the current plan. Complete a Scan with another scope first. |
| `Source Representation: Prefer HLOD` | Selected | Prefers validated World Partition HLOD and falls back to original Actors when the source contract requires it. |
| `Source Representation: Original Actors` |  | Uses original Actors and Components only. This is useful for HLOD comparison or fidelity diagnosis. |
| `Include all tags` | Empty | Includes only sources whose Actor has every comma-separated tag. Empty means no include filter. |
| `Exclude any tag` | Empty | Excludes a source when its Actor has any listed tag. |

Contracts that require exact membership—Selected Actors, Reviewed Set, or tag filtering—may resolve an effective Original Actors policy even when Prefer HLOD was requested. Check the requested/effective summary in the UI.

### Source Review

| Field | Purpose |
| --- | --- |
| `Use` | Includes or excludes the source from the current bake. |
| `Role: Auto` | Uses the role selected by Scan classification. |
| `ProxyGeometry` | Builds ordinary geometry, such as Static Mesh content, into proxy meshes. |
| `LandscapeProxy` | Uses the Landscape-specific capture and material path. |
| `InstanceBatch` | Publishes repeated ISM/HISM/Foliage instances as batch output. |
| `Discard` | Intentionally omits the source from output. |
| `ManualReview` | Scan could not establish safety automatically. Review the reason, then repair or exclude it. |
| `Unsupported` | The current pipeline cannot publish the source safely. Leaving it enabled blocks Bake. |
| Group Scope | Applies review changes by Actor, Folder, Data Layer, or Level/Level Instance. |

After changing `Use` or `Role`, choose **Apply Source Changes** to rebuild the plan. Safety findings for WPO/displacement, private material dependencies, or unsupported deformation can be blocking decisions rather than informational warnings.

### Bake Quality

Quality is an immutable authoring preset recorded in the generated revision.

| Preset | Static Mesh triangle budget | Projection scale / max segments | Landscape spacing / resolution |
| --- | ---: | ---: | ---: |
| Low | 1× coarsest LOD | 4.0 / 8 | 800 cm / 17–129 |
| Medium | 2× coarsest LOD | 2.0 / 12 | 600 cm / 25–193 |
| High (Recommended) | 4× coarsest LOD | 1.0 / 16 | 400 cm / 33–257 |

High does not mean an unbounded source LOD. It selects the finest valid LOD within a multiple of the coarsest valid LOD's triangle count, keeping geometry growth bounded.

### Advanced Projection and Output Plan

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `Partition X`, `Partition Y` | Plan value, at least 1 cm | Output partition dimensions. They are disabled while World Partition auto-sizing is active. |
| `Planet Radius` | Target Asset value, read-only | Radius in centimeters used by AEQD projection, curvature classification, and subdivision. |
| `Source Grid` | false | Uses source Landscape vertex resolution instead of the low proxy grid. It can substantially increase output and processing cost. |
| `Surface Datum World Z: Auto` | On | Uses the minimum World Z of participating source bounds as altitude zero and the Ground Sync datum. |
| `Surface Datum World Z` | Plan value, cm | Manual world-space Z treated as altitude zero when Auto is off. Changing it requires plan recalculation. |
| `Auto-size World Partition Output` | true for WP | Derives PlanetX output-shard dimensions from source bounds and work density. It does not mirror World Partition cells one-to-one. |
| `Recalculate` |  | Recomputes the automatic grid from the latest Scan. |

Output path, Target Section, Bake ID, and Source/Partition/Geometry summaries are resolved results. If the target conflicts with an existing asset, the editor requires explicit overwrite or rebuild consent.

### Advanced Execution Budget

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `Auto Memory Budget` | true | Resolves a safe RAM budget from currently available physical memory. Recommended for ordinary work. |
| `Safe` | Selected | Keeps 4 GiB of physical memory unavailable to Proxy Bake. |
| `High Utilization` |  | Keeps only 1 GiB free. Select it explicitly for a dedicated bake run; commit and finalization guards remain active. |
| `Manual GiB` | Disabled under Auto, 0.5–1024 | Total manual memory budget used when Auto is off. |
| `Workers` | 0, 0–64 | Geometry worker limit. Zero lets the memory governor choose concurrency. |
| `Queued` | 8, 1–128 | Maximum number of bounded work packets waiting concurrently. |
| `GT Finalize` | 4, 1–32 | Maximum Game Thread publication/finalization backlog. |
| `Worker Geometry` | true | Runs value-only geometry on worker tasks while UObject reads and publication stay on the Game Thread. |

Higher values are not always faster. After Scan, review the top contributor and remediation text. For memory pressure, inspect Auto Memory Budget and the partition plan before increasing worker, queue, or finalization limits.

### Public advanced option: `FPlanetXProxyBakePartitionDesc`

This structure is the projection contract used by Transition Morph and public C++ paths. The ordinary editor workflow generates it from the target Asset and plan.

| Setting | Default | Purpose |
| --- | --- | --- |
| `PartitionOrigin` | (0,0,0) | Origin of the flat partition frame. |
| `PartitionEast` / `PartitionNorth` / `PartitionUp` | Forward / Right / Up | Orthogonal axes of the partition frame. |
| `PlanetRadius` | 100,000, at least 1 | Planet radius for curved projection. |
| `PartitionRadius` | 10,000, at least 1 | Valid radius of the partition. |
| `SphereLatitudeSegments` / `SphereLongitudeSegments` | 250 / 250, at least 3 | Fixed sphere-surface sampling resolution. |

### Public advanced option: `FPlanetXProxyBakeOptions`

The editor quality preset and source classifier resolve these values in the normal user workflow. Set them directly only in a tool that calls the public API.

| Setting | Default | Purpose |
| --- | --- | --- |
| `LODIndex` | 0, at least 0 | Explicit Static Mesh source LOD. Do not mix it with editor quality selection unintentionally. |
| `bSkipHiddenComponents` | true | Omits hidden Components. |
| `bWarnOnNonUniformScale` | true | Reports non-uniformly scaled sources. |
| `bSkipNoBakeTaggedActors` | true | Omits Actors carrying the PlanetX NoBake tag. |
| `bRequireBakeSourceTagForSingleLevel` | false | Requires the BakeSource tag even for a single-Level bake. |
| `bFailOnAeqdRangeExceeded` | true | Fails outside the safe AEQD projection range. Keeping the default avoids silently publishing distorted output. |
| `bClipTrianglesToPartitionRadius` | false | Clips triangles at the partition radius. Use only for output intentionally different from canonical ownership. |
| `LandscapeProxyMaterial` | None | Fallback when the source Landscape material cannot be used by a Static Mesh proxy. |
| `SubdivisionWorldStep` | 275 cm, at least 0 | Base world-space subdivision interval. |
| `AdaptiveSubdivisionMaxProjectedEdgeDeviationCm` | 5 cm, at least 0 | Allowed curved-projection edge deviation. |
| `MaxSubdivisionDivisionsPerTriangle` | 24, at least 1 | Subdivision limit for one source triangle. |
| `MaxOutputTrianglesPerBakeJob` | 5,000,000, at least 1 | Final triangle safety limit for one bake job. |

`FPlanetXProjectionResult`, material remaps, heightfields, mesh pages, partition output, and instance-batch structures are generated payloads. They are not user settings even where their properties are reflected.

## Runtime Actor and Component Settings

### Planet Component

`UPlanetXPlanetComponent` owns runtime registration and the planet's gravity model on `APlanetXPlanetActor`.

| Setting | Default | Purpose |
| --- | --- | --- |
| `PlanetAsset` | None | `UPlanetXPlanetAsset` represented by this Actor. It supplies runtime identity, Sections, coordinates, and visual contracts. |
| `PlanetBindingId` | None | Distinguishes multiple Actors with the same Planet ID in one World. Empty uses the owning Actor name. Assign a stable value when travel tickets must survive Actor renames. |
| `bAutoRegisterRuntime` | true | Registers with the runtime registry at Begin Play. If disabled, call the public registration API yourself. |
| `bRefreshRuntimeRegistrationOnTransformChange` | true | Refreshes the registered transform when the Planet Actor transform changes. |
| `GravitySettings.bEnabled` | true | Enables gravity queries for this planet. |
| `GravitySettings.Model` | `ConstantSurface` | `ConstantSurface` maintains surface acceleration; `InverseSquare` scales it by inverse square of distance from the center. |
| `SurfaceAccelerationCmPerSecondSquared` | 980 cm/s², at least 0 | Gravity acceleration at the planet surface. |
| `MaximumAccelerationCmPerSecondSquared` | 100,000 cm/s², at least 0 | Caps Inverse Square acceleration near the center. |

### Coordinate Component

`SpatialEntryPolicy` is the group containing the Same World automatic entry and return settings below.

| Setting | Default | Purpose |
| --- | --- | --- |
| `bAutoRegisterRuntime` | true | Automatically registers the owner as a PlanetX runtime participant. |
| `RepresentationDomain` | `Ground` | Default representation domain. `Ground` belongs to the source Level; `Orbit` appears in Planet/Compare and runtime Orbit/Transition presentation. |
| `ActorSpatialLoadingPolicy` | `PlanetXManaged` | `PlanetXManaged` keeps an Orbit Actor non-spatial/always loaded. `ActorManaged` leaves `Is Spatially Loaded` to the developer. This option does not manage Data Layers or Streaming Sources. |
| `ReferencePlanetActor` | None | Planet Actor used as the coordinate reference. It must own a valid Planet Asset and takes precedence over `ReferencePlanetId`. |
| `ReferencePlanetId` | None | ID used when no Planet Actor is assigned. Its options come from Planet Assets on Planet Components placed in the current World. |
| `ReferenceSectionId` | None | Enabled Section ID from the resolved Planet Asset. Specify it for reproducible save, capture, and Sequencer paths. |
| `bAutoResolveSectionFromWorld` | true | When Section ID is None, selects the first Section containing the current Planet-local position in Asset array order. This is an editor/convenience query, not a persistent identity. |
| `bSyncFromOwnerTransformInEditor` | true | Refreshes coordinate snapshots when the root transform changes in the editor. Authoritative runtime state belongs to the World Runtime Subsystem. |
| `TransformSource` | `WorldTransform` | `WorldTransform` captures the PlanetX pose from the owner. `PlanetXTransform` generates World Transform from the stored canonical pose. Switching the source does not silently overwrite both values. |

#### Spatial Entry Policy

| Setting | Default | Purpose |
| --- | --- | --- |
| `bAutomaticSameWorldEntryEnabled` | false | Automatically applies coordinate/Actor movement when entering a Same World Ground region from Orbit. |
| `bAutomaticSameWorldReturnEnabled` | false | Automatically returns to Orbit representation when leaving the Ground region. |
| `SameWorldReturnPosePolicy` | `PreserveCurrentLogicalPose` | Preserves movement completed on Ground. `RestoreEntryOrbitPose` restores the Orbit pose captured at entry. |
| `MovementContinuityPolicy` | `RebaseBetweenFrames` | Chooses `Reset`, `PreserveWorld`, velocity conversion with `RebaseBetweenFrames`, or `DoNotApply`. |

#### PlanetX Transform

These are authoritative inputs when `TransformSource=PlanetXTransform`.

| Setting | Default | Purpose |
| --- | --- | --- |
| `PlanetId` | None | Planet identity. |
| `PlanetBindingId` | None | Planet Actor binding in the current World. Runtime resolution requires a non-empty value. |
| `PlanetFixedPositionCm` | (0,0,0) | Position in planet-fixed coordinates. |
| `PlanetFixedRotation` | Identity | Normalized rotation quaternion in planet-fixed coordinates. |
| `Scale3D` | (1,1,1) | Finite Actor scale. |

### Movement Component

Add `UPlanetXMovementComponent` when using PlanetX native movement. It is not required when the project uses only its existing Character Movement.

`NativeMovementSettings` and `SurfaceAlignmentSettings` own the two setting groups documented below.

| Setting | Default | Purpose |
| --- | --- | --- |
| `CoordinateComponent` | None | Coordinate Component used as the reference. The owner may be searched when empty, but an explicit connection is less ambiguous. |
| `bApplyPlanetGravity` | true | Applies PlanetX gravity to movement. |
| `bApplyPlanetGravityInGround` | false | Also applies PlanetX gravity in Ground state. Avoid applying it on top of Character or physics gravity. |
| `GravityScale` | 1.0, at least 0 | Multiplier applied to the Planet Component's gravity acceleration. |
| `bAutoRegisterRuntime` | true | Registers with the runtime movement registry automatically. |

#### Native Movement Settings

| Setting | Default | Purpose |
| --- | --- | --- |
| `MassKg` | 1 kg, at least 0.001 | Mass used by force/acceleration calculations. |
| `MaximumSpeedCmPerSecond` | 1,200 cm/s | Maximum native movement speed. |
| `AccelerationCmPerSecondSquared` | 4,096 cm/s² | Acceleration while input is applied. |
| `DecelerationCmPerSecondSquared` | 4,096 cm/s² | Deceleration as input is released. |
| `bConstrainInputToSurface` | false | Removes the Surface Up component from input, constraining it to the tangent plane. |
| `bAlignUpToSurface` | true | Aligns Actor Up with planet Surface Up. |
| `bSweepInOrbit` | false | Uses collision sweep for Orbit movement. |
| `bSweepInGround` | true | Uses collision sweep for Ground movement. |
| `bMaintainSurfaceAltitude` | false | Maintains the requested surface altitude while moving. |
| `SurfaceAltitudeCm` | 0 cm | Surface altitude to maintain. |

#### Surface Alignment Settings

| Setting | Default | Purpose |
| --- | --- | --- |
| `bPreserveCurrentForward` | true | Projects the current Forward onto the tangent plane while aligning Up. |
| `FallbackForwardWorld` | World Forward | Fallback when the current Forward is parallel to Up. |
| `BlendTimeSeconds` | 0.25 s, at least 0 | Rotation blend time. Zero applies alignment immediately. |

For a public Surface Snap request, `TargetAltitudeCm` is the target surface altitude and `bSweep` controls collision sweep while moving there.

### Viewpoint Component

Place it on the Actor that is the actual PlayerController View Target and owns the active Camera.

| Setting | Default | Purpose |
| --- | --- | --- |
| `bAutoRegisterRuntime` | true | Registers with the Viewpoint registry automatically. |
| `bCanDriveTransitionState` | true | Allows this Viewpoint to drive Orbit/Transition/Ground evaluation. Disable it on observational Viewpoints when several are present. |
| `PresentationCompensationMode` | `Automatic` | `Automatic` resolves a suitable movable child, `Disabled` turns compensation off, and `ExplicitComponent` moves only the selected Component. Actor roots are never moved for compensation. |
| `TransitionPresentationComponent` | None | Movable child Scene Component that receives presentation compensation in Explicit mode. |

### Travel Receiver Component

These settings restore a pending capture on an Actor in the new World after Level Handoff.

| Setting | Default | Purpose |
| --- | --- | --- |
| `bAutoResumePendingTravel` | true | Automatically resumes pending travel after Begin Play. Disable it for a fully manual `ResumePendingTravel` flow. |
| `bApplyControlRotation` | true | Restores captured Controller rotation. Disable it when the project chooses arrival camera orientation independently. |
| `ArrivalRetryTimeoutSeconds` | 15 s, at least 0, UI maximum 30 | Bounded retry period while Planet Actor registration is deferred after OpenLevel. Zero disables delayed retries. |

### Transition Endpoint

Using Add Endpoint in PlanetX Mode is the safest way to populate IDs and Actor references.

| Setting | Default | Purpose |
| --- | --- | --- |
| `PlanetId`, `SectionId`, `LevelPairId` | None | Travel-contract identities shared by Orbit and Ground Endpoints. |
| `EndpointRole` | `Orbit` | Identifies this World-local Endpoint as the Orbit or Ground side. |
| `PlanetAsset` | None | Canonical source for Transition Policy. Required on Ground; Orbit can infer it from the Planet Actor. |
| `PlanetActor` | None | Planet Actor used by an Orbit Endpoint. |
| `EnvironmentManagerActor` | None | Manager that changes environment presentation with transition state. |
| `bAutoSizeTransitionCylinderToSectionBounds` | true | Derives the cylinder from Section landing/playable bounds. While enabled, it replaces manual cylinder dimensions. |
| `OuterRadiusCm` / `InnerRadiusCm` | 1,000,000 / 250,000, at least 1 | Radii of the outer transition and inner Ground boundaries. Inner should be smaller than Outer. |
| `bUseHeightLimit` | true | Includes cylinder height in state evaluation. |
| `OuterHalfHeightCm` / `InnerHalfHeightCm` | 1,000,000 / 250,000, at least 1 | Outer and inner half-heights while Height Limit is enabled. |
| `RuntimeAlphaUpdateThreshold` | 0.002, at least 0 | Sends a runtime update when alpha changes by at least this amount. Smaller values update more often. |
| `bDrawDebugTransitionCylinders` | true | Shows editor cylinder visualization. |
| `CylinderLineThickness` | 480, at least 1 | Debug line thickness. |
| `DebugCylinderSegments` | 96, 8–128 | Circumference segment count. |
| `DebugCylinderHeightRingCount` | 8, 0–12 | Additional rings along cylinder height. |
| `DebugCylinderRadialBandCount` | 3, 0–4 | Additional radial bands. |

### Movement Handoff call options

These are per-call public Capture/Apply options, not persistent Component Details settings.

| Setting | Default | Purpose |
| --- | --- | --- |
| `SourceCoordinateFrame` / `TargetCoordinateFrame` | None | Select a `Planet` or `Section` frame and its identity. |
| `SourceSpaceState` / `TargetSpaceState` | `None` | `Orbit`, `Transition`, or `Ground` before and after handoff. |
| `LifetimeSeconds` | 0 s | Snapshot lifetime. Zero can mean immediate expiry; provide a positive value appropriate to the call contract. |
| `ContinuityPolicy` | `RebaseBetweenFrames` | Determines how velocity and angular velocity move from source to target frame. |
| `bDeactivateSource` | true | Deactivates the source Movement Component after success. |
| `bActivateTarget` | true | Activates the target Movement Component. |
| `bUpdateComponentVelocity` | true | Writes converted velocity to the target Component. |
| `bConsumeOnSuccess` | true | Consumes the Snapshot so it cannot be applied again. |
| `bRequireSameActor` | true | Requires source and target Movement Components to belong to the same Actor. |

The class default for `UPlanetXSubsystem::MaxCaptureStackDepth` is 8. It is an advanced safeguard for nested transition captures, not an ordinary Project Settings entry.

## Proxy, Morph, and Preview Settings

Use runtime-budget overrides only for diagnostics or an explicit per-Actor requirement; ordinary content should follow Project Settings.

### Planet Proxy Component

#### Presentation and generation

| Setting | Default | Purpose |
| --- | --- | --- |
| `bShowPlanetProxy` | true | Shows the whole-planet proxy, including completion. |
| `PlanetSphereMeshOverride` | None | Advanced Static Mesh used instead of the generated planet visual. |
| `bReversePlanetSphereCulling` | false | Reverses sphere culling. Use it only for an asset whose winding/material contract requires the opposite direction. |
| `bShowSectionProxies` | true | Shows baked Section Proxy layers. |
| `bEnableRuntimeSurfaceCutout` | true | Cuts the planet surface under Section regions at runtime. |
| `bEnableRuntimeProxyPadding` | true | Generates/shows runtime proxy padding while Surface Cutout is enabled. |
| `bAutoRebuildSectionProxiesFromPlanetAsset` | true | Rebuilds proxy layers when Section or bake links change on the Planet Asset. |
| `bAutoRefreshOnRegister` | true | Refreshes presentation from Asset and runtime state when the Component registers. |
| `FallbackRadiusCm` | 100,000 cm, at least 1 | Radius used when a valid Planet Asset radius cannot be resolved. |

#### Section Proxy Layer Descriptor

The ordinary workflow generates these entries from the Planet Asset and bake output. Edit them only in an advanced manual construction path.

| Setting | Default | Purpose |
| --- | --- | --- |
| `SectionId` / `LayerId` | None | Stable identities of the owning Section and the layer. |
| `Mesh` / `Material` | None | Layer Static Mesh and optional Material override. |
| `RelativeTransform` | Identity | Layer transform relative to the Planet Proxy Component. |
| `bLayerVisible` | true | Controls visibility of the individual layer. |
| `bPartitionScoped` | false | Couples residency/culling of the layer to a bake partition. |
| `PartitionCoord` | (0,0) | Partition coordinate for a partition-scoped layer. |

#### Section Proxy Runtime Budget Override

When `bOverrideSectionProxyRuntimeBudget=false`, the Component uses the project Runtime Budget.

| Setting | Default | Purpose |
| --- | ---: | --- |
| `MaximumSectionProxyPayloadsPerRequest` | 8 | Child payload packages retained by one request. |
| `MaximumSectionProxyDependenciesPerRequest` | 64 | Mesh/material dependencies in one streamable batch. |
| `MaximumSectionProxyComponentsPerFrame` | 2 | New render Components created in one Game Thread frame. |
| `MaximumSectionProxyInstancesPerFrame` | 512 | Instance transforms validated and uploaded in one frame. |
| `MaximumSectionProxyCorrectionVerticesPerFrame` | 4,096 | Morph vertices inspected by Automatic Surface Correction in one frame. |
| `SectionProxyRealizationTimeBudgetMs` | 2.0 ms, at least 0.1 | Shared frame-time limit for correction scanning and Component/Instance realization. |

#### Surface Correction Override

| Setting | Default | Purpose |
| --- | --- | --- |
| `bOverrideSectionSurfaceCorrectionSettings` | false | Uses this Actor-wide override instead of per-Section Planet Asset settings. |
| `SectionSurfaceCorrectionMode` | `Disabled` | Chooses `Disabled`, lowest-bake-vertex `Automatic`, or fixed-offset `Manual`. |
| `SectionSurfaceClearanceCm` | 1 cm, at least 0 | Additional outward clearance in Automatic mode. |
| `ManualSectionSurfaceCorrectionCm` | 0 cm, at least 0 | Outward offset applied to all Section Proxies in Manual mode. |

#### Debug Overlay

`DebugOverlaySettings` owns the visualization values below.

| Setting | Default | Purpose |
| --- | --- | --- |
| `bShowSectionBounds` | false | Shows Section bounds. |
| `bShowSectionFrames` | false | Shows Section-local frame axes. |
| `FrameAxisLengthCm` | 1,000 cm, at least 1 | Length of displayed frame axes. |

### Transition Morph Component

#### Source and morph geometry

| Setting | Default | Purpose |
| --- | --- | --- |
| `ProxyBakeData` | None | Bake Data supplying flat/curved morph payload. A Transition Resource Set normally connects it. |
| `ProxyMeshOverride` | None | Advanced source mesh used instead of the Bake Data proxy mesh. |
| `SourceLODIndex` | 0, at least 0 | LOD read from the override/source mesh. |
| `bUseProxyMeshMaterials` | true | Uses material slots from the source proxy mesh. |
| `TransitionAlpha` | 0, 0–1 | Position along the morph. Runtime transition normally updates it. |
| `bAutoRebuildOnRegister` | true | Rebuilds render/morph representation on registration. |
| `bUseBakeDataPartitionDesc` | true | Uses the projection frame and radius stored in Bake Data. |
| `bOverridePlanetRadius` | false | Uses `PlanetRadiusOverride` instead of the bake/planet radius. Outside diagnostics, this can violate the authored contract. |
| `PlanetRadiusOverride` | 100,000 cm, at least 1 | Curvature radius while override is enabled. |
| `ManualPartitionDesc` | Structure defaults | Origin, East/North/Up axes, radii, and sphere segments used when Bake Data Partition is disabled. |
| `bUseProxyBoundsCenterAsPivot` | false | Uses source-proxy bounds center as morph pivot. |
| `bMoveComponentToPivotOnBuild` | false | Moves the Component itself to the resolved pivot during build. Keep it off when an external transform contract owns placement. |
| `bUseTangentPreservingCurvature` | true | Uses the curvature path that preserves tangent direction and shading continuity. |

#### GPU WPO Morph

| Setting | Default | Purpose |
| --- | --- | --- |
| `bUseGpuWpoMorph` | true | Prefers Material WPO-based GPU morphing. |
| `bPreferStaticMeshComponentForGpuMorph` | true | Prefers a StaticMesh Component on the GPU path. |
| `bFallbackToDynamicMeshWhenStaticGpuMorphInflates` | true | Falls back to Dynamic Mesh when rendered Static Mesh vertices exceed the permitted ratio. |
| `StaticGpuMorphMaxRenderVertexRatio` | 1.25, at least 1 | Maximum rendered-to-source vertex ratio for the Static GPU path. |
| `bBuildTransientStaticMeshForGpuMorph` | false | Builds a transient Static Mesh when no GPU asset is assigned. Consider runtime cost and lifetime. |
| `GpuMorphStaticMeshAsset` | None | Prebuilt Static Mesh for GPU morphing. |
| `GpuMorphMaterialOverride` | None | One GPU morph Material override for every slot. |
| `GpuMorphMaterialOverrides` | Empty | Per-slot GPU morph Material overrides; these are more specific than the single override. |
| `GpuMorphAlphaParameterName` | `PlanetXMorphAlpha` | Scalar Material parameter receiving Transition Alpha. It must match the Material exactly. |

#### GPU Render Pass Policy

These options affect only PlanetX-owned Transition Morph render Components.

| Setting | Default | Purpose |
| --- | --- | --- |
| `MorphShadowMode` | `FullMorphMesh` | Disables morph shadows or renders the complete morph representation into shadows. |
| `MorphRayTracingMode` | `EvaluateWpo` | Chooses `Disabled`, `StaticGeometry` without WPO, or the more expensive `EvaluateWpo`. |
| `MorphVelocityMode` | `Enabled` | Enables velocity output for accurate motion vectors and temporal effects. |
| `MorphDepthPassMode` | `Enabled` | Enables the depth pass for depth-effect compatibility. |

#### Morph performance and visibility

| Setting | Default | Purpose |
| --- | --- | --- |
| `MinimumAlphaChange` | 0.002, 0–1 | Skips a morph update when alpha changes by less than this amount. |
| `bUpdateNormalsDuringMorph` | false | Updates normals with positions on CPU/Dynamic paths. It may improve quality at additional cost. |
| `bUseFastPositionUpdates` | true | Uses position-only updates without rebuilding topology. |
| `bCollectRuntimeMorphDiagnostics` | false | Collects runtime morph diagnostics. Enable it only when needed during performance investigation. |
| `bOverrideTransitionRuntimeBudget` | false | Uses the following Transition-specific values instead of Project Runtime Budget. |
| `MaximumTransitionDependenciesPerRequest` | 64, 1–512 | Dependency limit for one Transition stream request. |
| `MaximumTransitionComponentsPerFrame` | 2, 1–64 | Transition render Components realized in one frame. |
| `TransitionRealizationTimeBudgetMs` | 2.0 ms, 0.1–10 | Game Thread time limit for Transition realization. |
| `bVisibleOnlyDuringTransition` | true | Shows the Morph Component only during Transition state. |
| `bTransitionActive` | false | Current transition-presentation state. Runtime normally owns it, though it is available for manual testing. |

### Runtime Preview Actor

External Level Proxy Bake creates this Actor in the Preview World. It is not a gameplay Actor, and the generation pipeline owns its `PreviewBakeData` link.

| Setting | Default | Purpose |
| --- | --- | --- |
| `PreviewBakeData` | None | Visual-only Bake Data loaded when the Preview World streams in. |
| `bOverrideRuntimeBudget` | false | Uses this Preview Actor's values instead of Project Runtime Budget. |
| `MaximumPayloadsPerRequest` | 8, at least 1 | Child payload limit for one request. |
| `MaximumDependenciesPerRequest` | 64, at least 1 | Dependency limit for one streamable batch. |
| `MaximumComponentsPerFrame` | 2, at least 1 | Component creation limit per frame. |
| `MaximumInstancesPerFrame` | 512, at least 1 | Instance realization limit per frame. |
| `RealizationTimeBudgetMs` | 2.0 ms, at least 0.1 | Frame-time limit for Preview realization. |

Do not duplicate GameMode, Pawn, Controller, gameplay Actor logic, navigation, or Ground gameplay collision into Runtime Preview. Those remain the responsibility of the actual Ground World.

## Environment Settings

`EnvironmentSettings` on the Planet Asset is a reusable planet-wide authoring profile. A Level's `PlanetX Environment Manager` applies that profile or supplies a Level-only override. Ratios are relative to the canonical Planet Radius; names ending in `Km` use kilometers.

### Planet Asset: Atmosphere Profile

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `bEnabled` | true | Enables the PlanetX-managed Sky Atmosphere profile. |
| `GroundAlbedo` | (0.4,0.4,0.4,1) | Linear ground reflectance used by multi-scattering. |
| `MultiScatteringFactor` | 1.0 | Atmosphere multi-scattering multiplier. |
| `bAutoScaleAtmosphereHeight` | true | Derives atmosphere-shell height from Planet Radius. |
| `AutoHeightRatio` | 0.01 | Planet Radius ratio used by automatic height. |
| `MinAutoHeightKm` / `MaxAutoHeightKm` | 6 / 100 km | Minimum and maximum automatically resolved height. |
| `HeightRatio` | 0.06 | Atmosphere-height/Planet-Radius ratio used when automatic height is disabled. |
| `bAutoScaleDensityProfile` | true | Adapts density falloff to the authored atmosphere shell. |
| `RayleighDensityHeightRatio` | 0.133333 | Rayleigh density falloff height as a shell ratio. |
| `MieDensityHeightRatio` | 0.02 | Mie density falloff height as a shell ratio. |
| `RayleighScatteringScale` | 0.0331 | Overall Rayleigh scattering intensity. |
| `RayleighScattering` | (0.175287,0.409607,1) | Rayleigh spectral color. |
| `RayleighExponentialDistributionKm` | 8 km | Altitude where Rayleigh density falls to approximately 40 percent. |
| `MieScatteringScale` | 0.003996 | Mie scattering intensity. |
| `MieScattering` | White | Mie scattering color. |
| `MieAbsorptionScale` | 0.000444 | Mie absorption intensity. |
| `MieAbsorption` | White | Mie absorption color. |
| `MieAnisotropy` | 0.8 | Mie forward-scattering bias. |
| `MieExponentialDistributionKm` | 1.2 km | Altitude where Mie scattering/absorption falls to approximately 40 percent. |
| `OtherAbsorptionScale` | 0.001881 | Strength of the ozone-like absorption layer. |
| `OtherAbsorption` | (0.345561,1,0.045189,1) | Spectral color of the additional absorption layer. |
| `SkyLuminanceFactor` | White | Art-direction multiplier for sky luminance. |
| `SkyAndAerialPerspectiveLuminanceFactor` | White | Luminance multiplier for sky and aerial perspective. |
| `AerialPerspectiveViewDistanceScale` | 1.0 | Distance scale for aerial perspective. |
| `HeightFogContribution` | 1.0 | Sky Atmosphere contribution to Height Fog. |
| `TransmittanceMinLightElevationAngle` | -90° | Minimum light elevation used by transmittance calculations. |

### Planet Asset: Cloud Profile

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `bEnabled` | true | Enables the PlanetX-managed Volumetric Cloud profile. |
| `BottomAltitudeRatio` | 0.005 | Cloud-bottom altitude divided by Planet Radius. |
| `LayerHeightRatio` | 0.01 | Cloud-layer thickness divided by Planet Radius. |
| `NightVisibilityFloor` | 0, 0–1 | Minimum cloud brightness/visibility retained at night. |
| `TerminatorSoftness` | 0.22, at least 0.001 | Softness of the day/night cloud boundary. |
| `TerminatorOffset` | 0, -1–1 | Offset of the cloud terminator. |
| `GroundAlbedo` | (0.4,0.4,0.4,1) | Linear ground reflectance used for cloud lighting. |
| `bUsePerSampleAtmosphericLightTransmittance` | false | Evaluates atmosphere transmittance per cloud sample, increasing both quality and cost. |
| `SkyLightCloudBottomOcclusion` | 0.5 | Sky Light occlusion at the cloud bottom. |
| `AerialPerspectiveRayleighStartDistanceKm` / `AerialPerspectiveRayleighFadeDistanceKm` | 0 / 0 | Start/fade distances for cloud Rayleigh aerial perspective. Zero preserves engine-default behavior. |
| `AerialPerspectiveMieStartDistanceKm` / `AerialPerspectiveMieFadeDistanceKm` | 0 / 0 | Start/fade distances for cloud Mie aerial perspective. |
| `StopTracingTransmittanceThreshold` | 0.005 | Stops cloud tracing once accumulated transmittance falls below this value. |

### Planet Asset: Sun and Cloud Shadow Profile

| Setting | Default | Purpose |
| --- | --- | --- |
| `bAtmosphereSunLight` | true | Uses the Directional Light as an Atmosphere Sun Light. |
| `bCastShadowsOnClouds` | true | Allows the light to cast onto clouds. |
| `bCastShadowsOnAtmosphere` | true | Allows the light to cast onto atmosphere. |
| `bCastCloudShadows` | true | Enables cloud shadow maps. |
| `CloudShadowExtentKm` | 400 km, at least 1 | Coverage of the cloud shadow map. |
| `CloudShadowMapResolutionScale` | 4.0, at least 0.25 | Cloud shadow map resolution multiplier. |
| `CloudShadowRaySampleCountScale` | 1.0, at least 0.25 | Cloud shadow ray-sample multiplier. |
| `CloudShadowStrength` | 1.0, at least 0 | Overall cloud shadow strength. |
| `CloudShadowOnAtmosphereStrength` | 1.0, at least 0 | Cloud shadow strength visible on atmosphere. |
| `CloudShadowOnSurfaceStrength` | 1.0, at least 0 | Cloud shadow strength visible on surfaces. |
| `CloudShadowDepthBias` | 0 | Cloud shadow depth bias. |
| `bUseSeparateGroundOverride` | false | Uses a separate Ground extent/resolution/sample profile. |
| `GroundCloudShadowExtentKm` | 400 km | Ground-only shadow extent. |
| `GroundCloudShadowMapResolutionScale` | 4.0 | Ground-only resolution multiplier. |
| `GroundCloudShadowRaySampleCountScale` | 1.0 | Ground-only ray-sample multiplier. |

### Planet Asset: Post Process and Space Background

| Setting | Default | Purpose |
| --- | --- | --- |
| `PostProcess.bEnabled` | true | Applies the per-planet Post Process profile. |
| `bUseConvolutionBloom` | true | Uses Convolution Bloom. |
| `bEnableLensFlare` | true | Allows lens flare for this planet. PlanetX Rendering must also enable it at project level. |
| `LensFlareIntensity` | 0.12, at least 0 | Per-planet lens-flare intensity. |
| `SpaceBackground.bEnabled` | true | Uses the Environment Manager's single space-background sphere. |
| `Material` | PlanetX default space-background Material | Material on the background sphere, stored as a soft reference. |
| `VisibilityMode` | `OrbitOnly` | Shows it in `OrbitOnly` or `OrbitAndGround`. |

### Environment Manager: Domains and profile sources

| Setting | Default | Purpose |
| --- | --- | --- |
| `CloudMode` | `PlanetXManaged` | `PlanetXManaged` creates and controls PlanetX cloud presentation; `UseExistingLevel` adopts an existing Level cloud. |
| `CloudProfileSource` | `PlanetAssetDefaults` | Uses the Asset Cloud Profile or a `LevelOverride`. |
| `CloudProfileOverride` | Profile defaults | Complete Cloud Profile editable only for a Level Override. |
| `GroundCloudSource` | `SamePlanetXCloud` | Uses the same PlanetX cloud on Ground or selects `ExistingLevelCloud`. |
| `AtmosphereMode` | `PlanetXManaged` | Manages PlanetX atmosphere or uses the existing Level atmosphere. |
| `AtmosphereProfileSource` | `PlanetAssetDefaults` | Selects the Asset Atmosphere or a Level Override. |
| `AtmosphereProfileOverride` | Profile defaults | Complete Atmosphere Profile editable only for a Level Override. |
| `SunProfileSource` | `PlanetAssetDefaults` | Selects Asset Sun/Cloud Shadow or a Level Override. |
| `SunProfileOverride` | Profile defaults | Complete Sun/Shadow Profile editable only for a Level Override. |
| `SpaceBackgroundMode` | `PlanetXManaged` | Manages the PlanetX background or leaves existing Level presentation in place. |
| `SpaceBackgroundProfileSource` | `PlanetAssetDefaults` | Selects the Asset Background or a Level Override. |
| `SpaceBackgroundProfileOverride` | Profile defaults | Complete Background Profile editable only for a Level Override. |

Resolved Profiles and resolved heights are read-only results. `CloudShadow` is also a runtime cache derived from the Sun Profile and must not be edited directly.

### Environment Manager: runtime and bindings

| Setting | Default | Purpose |
| --- | --- | --- |
| `bApplyOnConstruction` | true | Applies the current profile during editor construction. |
| `InitialRuntimeSpace` | `Auto` | Leaves startup space to transition state or forces `Orbit`/`Ground`. `Ground` is useful for a Level that begins directly in Ground gameplay without a Transition Endpoint. |
| `bUpdateEveryTick` | true | Updates sun, bindings, and transition-dependent environment each tick. Follow the external-runtime-driver contract when another service owns updates. |
| `ManagedPlanetActor` | None | Supplies environment center, radius, and the Planet Asset profile. |
| `ExistingVolumetricCloud` / `ExistingVolumetricCloudComponent` | None | Existing cloud Actor or Component to use. A Component reference is more direct. |
| `ExistingSkyAtmosphere` / `ExistingSkyAtmosphereComponent` | None | Existing Sky Atmosphere Actor or Component. |
| `ExistingSunLight` | None | Directional Light that supplies sun and cloud shadows. |
| `ExistingSkyLight` | None | Existing Sky Light binding. |
| `ExistingHeightFog` | None | Existing Exponential Height Fog binding. |
| `bAutoBindEnvironmentActors` | true | Searches the World for suitable environment Actors when explicit references are empty. |
| `AutoBindRetryIntervalSeconds` | 1 s, at least 0.1 | Delay after an auto-bind miss before searching again for streamed Actors. |
| `bDeriveSunDirectionFromDirectionalLight` | true | Resolves sun direction from the bound Directional Light. |
| `bUseNegativeDirectionalLightForward` | true | Treats Directional Light -Forward as the planet-to-sun direction. Change it only when the consuming Material uses the opposite convention. |
| `bDerivePlanetSettingsFromSkyAtmosphere` | true | Reads Planet Center/Radius from an existing Sky Atmosphere. |
| `bDeriveCloudLayerAltitudeFromVolumetricCloud` | true | Reads cloud-layer altitude from an existing Volumetric Cloud. |

### Orbit Cloud Lighting and Existing Cloud Sync

| Setting | Default | Purpose |
| --- | --- | --- |
| `OrbitCloudLighting.PlanetCenter` | (0,0,0) | Fallback planet center for cloud-material lighting. |
| `PlanetRadius` | 250,000 cm, at least 1 | Fallback radius for cloud lighting. |
| `CloudLayerAltitude` | 10,000 cm, at least 0 | Cloud-layer altitude used by lighting. |
| `NightCloudVisibilityFloor` | 0, 0–1 | Minimum night cloud visibility. |
| `TerminatorSoftness` | 0.22, at least 0.001 | Cloud terminator softness. |
| `CloudTerminatorOffset` | 0, -1–1 | Cloud terminator offset. |
| `CloudSync.bReadExistingCloudAsGroundTruth` | true | Reads current parameters from the existing cloud as ground truth. |
| `CoverageParameterName` | `Coverage` | Coverage parameter name. |
| `DensityParameterName` | `Density` | Density parameter name. |
| `WindDirectionParameterName` | `WindDirection` | Wind-direction parameter name. |
| `WindSpeedParameterName` | `WindSpeed` | Wind-speed parameter name. |
| `CloudTimeParameterName` | `CloudTime` | Cloud-time parameter name. |

Sync names must match the consuming Material parameters exactly, including case.

### Orbit render quality and Ground presentation

`GroundEnvironmentPresentation` owns the Ground-presentation setting group below.

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `bOverrideVolumetricRenderTargetQuality` | true | Overrides Volumetric Render Target mode/scale in Orbit. |
| `bOverrideVolumetricRenderTargetEnabled` | true | Overrides use of the Volumetric Render Target for Orbit cloud. |
| `VolumetricRenderTargetMode` | 1, 0–3 | Unreal Volumetric Render Target mode. Verify project quality and compatibility. |
| `VolumetricRenderTargetScale` | 1.0, 0.1–1 | Render-target resolution scale. |
| `bEnableReprojectionBoxConstraint` | true | Constrains volumetric reprojection to its valid box. |
| `OrbitCloudRenderQuality.OrbitOverrideActivationThreshold` | 0.5, 0–1 | Transition Alpha at which the Orbit cloud-quality override activates. |
| `bOverrideAerialPerspectiveLUTDepth` | true | Overrides Aerial Perspective LUT depth in Orbit. |
| `AerialPerspectiveLUTDepthKm` | 512 km, at least 1 | Atmosphere depth represented by the LUT. |
| `OrbitAtmosphereRenderQuality.OrbitOverrideActivationThreshold` | 0.5, 0–1 | Activation threshold for atmosphere-quality override. |
| `bEnableGroundPresentation` | true | Uses a fixed, nearly flat atmosphere presentation on Ground. |
| `bUseAdaptiveGroundRadius` | true | Derives a practical Ground radius from the baked Level footprint. |
| `MinimumGroundRadiusKm` | 6,360 km, 1–10,000 | Fallback Ground radius when adaptive bounds are unavailable. |
| `MaximumGroundSurfaceDropKm` | 2.5 km, 0.01–100 | Maximum allowed surface drop below the tangent plane at the Level edge. |
| `GroundSurfaceClearanceKm` | 0.1 km, 0–10 | Keeps the virtual atmosphere surface below the lowest Ground geometry. |
| `TransitionBlendStartAlpha` | 0.75, 0–0.99 | Alpha at which atmosphere begins moving into its Ground presentation frame. |
| `bPreviewInEditor` | true | Applies the same Ground presentation in PlanetX Mode's Level view. |

### Orbit Cloud Tracing

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `bOverrideVolumetricCloudTracing` | true | Overrides cloud-tracing distances in Orbit. |
| `TracingStartMaxDistanceKm` | 10,000 km, at least 1 | Maximum permitted tracing-start distance. |
| `TracingStartDistanceFromCameraKm` | 0 km, at least 0 | Distance from camera to tracing start. |
| `TracingMaxDistanceMode` | `DistanceFromPointOfView` | Selects how Unreal interprets maximum tracing distance. |
| `TracingMaxDistanceKm` | 10,000 km, at least 0.1 | Maximum cloud-tracing distance. |
| `OrbitCloudTracing.OrbitOverrideActivationThreshold` | 0.5, 0–1 | Alpha threshold for tracing override activation. |

### Material Parameter Collection

Assign the MPC through `EnvironmentParameterCollection`. `MpcParameters` maps the names PlanetX writes.

| Values | Default parameter names |
| --- | --- |
| `PlanetCenter`, `PlanetRadius`, `CloudLayerRadius`, `SunDirection` | `PlanetX_PlanetCenter`, `PlanetX_PlanetRadius`, `PlanetX_CloudLayerRadius`, `PlanetX_SunDirection` |
| `NightCloudVisibilityFloor`, `TerminatorSoftness`, `CloudTerminatorOffset` | `PlanetX_NightCloudVisibilityFloor`, `PlanetX_TerminatorSoftness`, `PlanetX_CloudTerminatorOffset` |
| `OrbitCloudVisibility`, `GroundCloudVisibility`, `EnvironmentTransitionAlpha` | `PlanetX_OrbitCloudVisibility`, `PlanetX_GroundCloudVisibility`, `PlanetX_EnvironmentTransitionAlpha` |
| `OrbitCloudShadowStrength`, `CloudShadowOnAtmosphereStrength`, `CloudShadowOnSurfaceStrength` | `PlanetX_OrbitCloudShadowStrength`, `PlanetX_CloudShadowOnAtmosphereStrength`, `PlanetX_CloudShadowOnSurfaceStrength` |
| `CloudShadowDepthBias`, `CloudShadowExtentKm`, `CloudShadowMapResolutionScale`, `CloudShadowRaySampleCountScale` | The same names with the default `PlanetX_` prefix |

If you rename a mapping, update the MPC and every consuming Material as well. A missing parameter prevents that value from reaching the Material.

### Derived Cloud Shadow runtime cache

The Manager's `CloudShadow` is a cache resolved from `SunProfileOverride` or the Asset Sun Profile, not an authoring source. Its internal `Mode` defaults to `PlanetXManagedOverride`, with `bEnableOrbitCloudShadow=true` and `bRestoreSourceLightWhenGroundActive=true`. `DesiredOrbitLightShadow` serves Orbit Material Approximation, `DirectionalLightOverrideShadow` serves the Orbit Directional Light, and `GroundDirectionalLightOverrideShadow` serves Ground. When `bUseSeparateGroundDirectionalLightOverride=false`, Ground shares the Orbit override. Edit the Sun/Cloud Shadow Profile above instead of this cache.

## Project and Performance Settings

PlanetX Project Settings are available under **Edit > Project Settings > Plugins**. Both settings objects are stored in the `DefaultEngine.ini` configuration hierarchy.

### PlanetX Runtime

`RuntimeBudgetPolicy` controls how much work baked Section Proxies, Transition Morph, and Runtime Preview may perform in one frame and one streaming request. It is independent from Proxy Bake Quality, so changing it does not regenerate baked assets.

| Policy | Behavior |
| --- | --- |
| `Follow Engine Scalability` | Default. Follows Unreal's current single Quality Level. When scalability groups are mixed, it conservatively uses the lowest level. |
| `Low` | Fixes the smallest runtime streaming/realization budget. |
| `Medium` | Fixes the intermediate budget. |
| `High` | Fixes the default PlanetX product budget. |
| `Epic` | Fixes the largest bounded budget. Cinematic scalability also resolves to the Epic profile. |

#### Resolved budget values

| Profile | Payloads / request | Dependencies / request | Components / frame | Instances / frame | Correction vertices / frame | Transition deps / components | Time / frame |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Low | 2 | 16 | 1 | 128 | 1,024 | 16 / 1 | 0.5 ms |
| Medium | 4 | 32 | 1 | 256 | 2,048 | 32 / 1 | 1.0 ms |
| High | 8 | 64 | 2 | 512 | 4,096 | 64 / 2 | 2.0 ms |
| Epic | 16 | 128 | 4 | 1,024 | 8,192 | 128 / 4 | 3.0 ms |

Engine Quality Level 0 maps to Low, 1 to Medium, 2 to High, and 3 or higher to Epic.

#### Per-Actor override precedence

The following overrides take precedence over the project profile for their owning Actor or Component:

1. `bOverrideSectionProxyRuntimeBudget` on Planet Proxy Component
2. `bOverrideTransitionRuntimeBudget` on Transition Morph Component
3. `bOverrideRuntimeBudget` on Runtime Preview Actor

Use an override only for diagnosis or when one Actor genuinely requires different throughput. Values that are too high can create Game Thread spikes and streaming bursts; values that are too low spread Section realization over more frames.

### PlanetX Rendering

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `bEnableLensFlares` | true | Enables Unreal's image-based lens-flare feature for PlanetX presentation. |
| `LensFlareQuality` | 3, 0–3 | Maps to `r.LensFlareQuality`: 0=Off, 1=Low, 2=High, and 3=Very High. |

PlanetX applies these as Project Setting console-variable values. Ordinary scalability changes do not silently lower them, although command-line and higher-priority runtime overrides can still win.

The per-planet `EnvironmentSettings.PostProcess.bEnableLensFlare` and `LensFlareIntensity` settings also apply. Enabling only the per-planet switch cannot activate the renderer feature when lens flare is disabled at project level.

### Recommended tuning order

1. Keep `Follow Engine Scalability` and measure at the target platform's scalability level.
2. Use runtime diagnostics to identify whether payload, dependency, component, or instance throughput is the actual limit.
3. Select a fixed project profile only when the whole project consistently needs a smaller or larger budget.
4. Use a Component override when only one Actor is exceptional.
5. If proxy quality or triangle count is the problem, change Proxy Bake Quality or Source Scope and bake again; Runtime Budget is not a mesh-quality control.

### Configuration review

After changing Project Settings, review the resulting `Config/DefaultEngine.ini` change for source control. If only a user-local `Saved/Config` value changes, teammates and packaged builds may not receive the same setting.

## Public API Overview

PlanetX gameplay integrations use the `PlanetX` runtime module. The primary Blueprint facade is `UPlanetXSubsystem`; actors and components provide registration, coordinate, movement, transition, environment, and arrival behavior.

This reference is based on the public headers shipped with PlanetX 1.0 under `Source/PlanetX/Public/PlanetX`.

### API support tiers

| Tier | Intended use |
| --- | --- |
| Stable Gameplay API | Supported gameplay integration surface. Signatures, reflected shape, documented behavior, and failure or consume contracts are protected. |
| Advanced and Diagnostics API | Supported specialist surface. Breaking changes require deprecation and migration guidance. |
| Authoring and Editor API | Supported for editor workflows; cooked-runtime support is not implied. |
| Internal or Test-only API | No external compatibility guarantee. |

The presence of a type in a public header does not by itself assign it to a support tier. Avoid treating generated-mesh intermediates, bake passes, runtime services, or serialized implementation payloads as game-facing contracts.

### Primary types

| Area | Primary types |
| --- | --- |
| Runtime facade | `UPlanetXSubsystem` |
| Planet representation | `APlanetXPlanetActor`, `UPlanetXPlanetComponent`, `UPlanetXPlanetProxyComponent` |
| Participating actors | `UPlanetXCoordinateComponent`, `UPlanetXMovementComponent`, `UPlanetXViewpointComponent`, `UPlanetXTravelReceiverComponent` |
| Authoring data | `UPlanetXPlanetAsset`, `UPlanetXSurfacePreset` |
| Movement handoff | `UPlanetXMovementHandoffLibrary` |

### Module and subsystem access

Add the runtime module to the consuming game's `Build.cs`:

```csharp
PublicDependencyModuleNames.AddRange(new[] { "PlanetX" });
```

Use a valid Game Instance to obtain the subsystem in C++:

```cpp
#include "PlanetX/Subsystems/PlanetXSubsystem.h"

UPlanetXSubsystem* PlanetX = GameInstance->GetSubsystem<UPlanetXSubsystem>();
```

In Blueprint, use the Game Instance Subsystem node. Do not call World Context functions while the world is unavailable or tearing down.

### Shared failure rules

- A `bool` return reports whether the operation completed. Do not consume output parameters after `false` unless that function explicitly documents diagnostic output.
- For enum-returning queries, accept output only for a success status.
- Treat `None` IDs, invalid object references, expired handles, and non-success error enums as normal failure states.
- Pass explicit Planet, Binding, Section, and Level Pair IDs when more than one candidate can exist.
- Refresh runtime context after registration or streaming changes.

Blueprint display names can differ from C++ symbols. The names and include paths in this reference use the C++ declarations.

## UPlanetXSubsystem

Header: `PlanetX/Subsystems/PlanetXSubsystem.h`

`UPlanetXSubsystem` is the Game Instance Subsystem facade for the supported runtime API. Every function with a World Context parameter requires a valid game world. `CancelLevelHandoff` is the stable exception and accepts only a ticket.

### Stable surface queries

| Function | Contract |
| --- | --- |
| `QuerySurfaceAtWorldRay` | Evaluates `FPlanetXSurfaceQueryInput` and writes `FPlanetXSurfaceQueryResult`; returns `bool`. |
| `QuerySurfaceAtWorldRayDetailed` | Performs the same query and returns `EPlanetXSurfaceQueryStatus`. |
| `QuerySurfaceAtGeo` | Queries by Planet ID, `FPlanetXGeoCoordinate`, and optional Binding ID. |
| `QuerySurfaceAtPlanetXTransform` | Queries at a canonical `FPlanetXTransform`. |
| `BuildLandingTransform` | Builds `FPlanetXLandingTransform` from a successful surface result. |

Do not use hit data after a failed `bool` result or a non-success detailed status.

### Stable coordinates

| Function | Contract |
| --- | --- |
| `ResolvePlanetXTransform` | Resolves `FPlanetXTransform` to `FTransform` and writes `FPlanetXTransformResolveResult`. |
| `CapturePlanetXTransform` | Captures a World transform for a Planet ID and Binding ID. |
| `CaptureActorPlanetXTransform` | Captures an Actor using the supplied Planet and Binding IDs. |
| `ApplyPlanetXTransformToActor` | Resolves a canonical pose and applies it to an Actor. |

The Blueprint category for these functions is `PlanetX|Coordinates`.

### Stable travel

| Function | Contract |
| --- | --- |
| `EnterGroundSameWorld` | Enters Ground in the current World using a request Actor and successful surface query. |
| `ReturnToOrbitSameWorld` | Returns the request Actor through its active Same World journey. |
| `BeginLevelHandoff` | Creates an `FPlanetXLevelHandoffTicket` and result from a source Actor and surface query. |
| `ResolveLevelHandoffTicket` | Resolves a ticket into the destination World transform without applying it. |
| `CompleteLevelHandoff` | Applies a ticket to the target Actor; `bApplyControlRotation` defaults to `true`. |
| `CancelLevelHandoff` | Cancels a ticket. This function has no World Context parameter. |

PlanetX prepares and restores handoff state but does not call Open Level, spawn the destination Actor, possess a pawn, or choose a GameMode. Game code owns those steps.

### Advanced travel and state inspection

- Travel: `PrepareTravel`, `ResumePendingTravel`, `BeginReturnLevelHandoff`, `ResolveLevelHandoffEntryTransform`
- Stored state: `GetStoredLevelHandoffCapture`, `GetTransitionJourney`, `GetActiveTransitionJourneys`
- Runtime state: `GetActorRuntimeContext`, `GetMovementRuntimeState`, `GetMovementRuntimeStates`
- Transition state: `GetTransitionRuntimeResult`, `GetTransitionRuntimeResults`, `GetTransitionManagedActorState`
- Transition math and sync: `EvaluateTransitionCylinderState`, `CaptureTransitionActorSyncPose`, `ApplyTransitionActorSyncPose`

`PrepareTravel` accepts `FPlanetXTravelRoute`. PlanetX selects automatically only when exactly one Planet Actor candidate exists. An explicit index of `0` is valid; if both `PlanetActorIndex` and `PlanetBindingId` are supplied, both must identify the same candidate.

### Advanced data, preview, and diagnostics

- Section and Level Pair: `GetSectionTransform`, `GetSectionDesc`, `GetSectionRuntimeState`, `GetLevelPair`, `GetLevelPairForSection`
- Coordinate frame: `ResolveCoordinateFrame`
- Runtime Preview: `LoadRuntimePreview`, `SetRuntimePreviewVisible`, `UnloadRuntimePreview`, `GetRuntimePreviewStatus`
- Validation: `ValidatePlanetAsset`
- Diagnostics: `DiagnoseProxySync`, `ResolvePlanetAlignmentForSection`, `DiagnoseSectionPlanetOverlapFromBounds`
- Transient drawing: `DrawPlanetDebug`, `DrawSectionDebug`, `DrawActorContextDebug`, `DrawCaptureStackDebug`

Diagnostic drawing functions do not return a success value. Validation execution success and a validation result with no issues are separate conditions.

## Actor API

### APlanetXPlanetActor

Header: `PlanetX/Actors/PlanetXPlanetActor.h`

`RegisterToPlanetXRuntime` returns whether registration succeeded. `UnregisterFromPlanetXRuntime` returns `void`. Both are in the `PlanetX|Planet` Blueprint category.

The actor exposes Blueprint-read-only references to `Root`, `PlanetComponent`, `PlanetProxyComponent`, `TransitionMorphComponent`, `SkyAtmosphereComponent`, and `VolumetricCloudComponent`. Assign the Planet Asset through the Planet Component and keep Planet and Binding IDs unambiguous.

### APlanetXTransitionEndpoint

Header: `PlanetX/Actors/PlanetXTransitionEndpoint.h`

This actor has no Blueprint-callable functions. Its reflected properties define the authoring contract:

| Properties | Purpose |
| --- | --- |
| `PlanetId`, `SectionId`, `LevelPairId`, `EndpointRole` | Identifies the endpoint and whether it represents Orbit or Ground. |
| `PlanetAsset`, `PlanetActor`, `EnvironmentManagerActor` | Links policy data and participating actors. `PlanetActor` applies to Orbit endpoints. |
| `CoordinateComponent` | Holds the endpoint's canonical reference and pose. |
| `TransitionCylinder` | Defines the transition region. |
| `bAutoSizeTransitionCylinderToSectionBounds` | Derives the cylinder from Section bounds when enabled. |
| `RuntimeAlphaUpdateThreshold` | Limits small runtime alpha updates. |

IDs must match a real Section and Level Pair in the resolved Planet Asset. Ground endpoints require the Planet Asset; Orbit endpoints can infer it from the Planet Actor when available.

### APlanetXEnvironmentManager

Header: `PlanetX/Actors/PlanetXEnvironmentManager.h`

`ValidateEnvironmentBinding` is the only main environment command that returns `bool`. Use it before the `void` mutation functions and resolve reported binding problems first.

| Return | Functions |
| --- | --- |
| `bool` | `ValidateEnvironmentBinding` |
| `void` | `CaptureEnvironmentStateFromBindings`, `ApplyEnvironmentState`, `SetEnvironmentTransition`, `ApplyInitialRuntimeSpace` |
| `void` | `ApplyOrbitCloudRenderQualityOverride`, `RestoreSourceCloudRenderQuality` |
| `void` | `ApplyOrbitAtmosphereRenderQualityOverride`, `RestoreSourceAtmosphereRenderQuality` |
| `void` | `ApplyOrbitCloudTracingOverride`, `RestoreSourceCloudTracing` |
| `bool` | `IsOrbitCloudRenderQualityOverrideActive`, `IsOrbitAtmosphereRenderQualityOverrideActive`, `IsOrbitCloudTracingOverrideActive` |

Apply and restore overrides as matched operations. A `void` command does not provide a success result; validate bindings and inspect the matching active-state query where one exists.

### APlanetXRuntimePreviewActor

Header: `PlanetX/Preview/PlanetXRuntimePreviewActor.h`

Prefer `UPlanetXSubsystem::LoadRuntimePreview` for normal runtime use.

| Return | Functions |
| --- | --- |
| `bool` | `LoadPreviewFromBakeData` |
| `void` | `AssignPreviewBakeData`, `SetPreviewVisible`, `UnloadPreview` |
| `bool` | `IsPreviewLoaded`, `IsPreviewRenderable` |
| `int32` | `GetRenderableComponentCount`, `GetRealizedComponentCount` |
| enum or object | `GetPreviewResidencyState`, `GetSourceBakeData` |

Loaded and renderable are distinct states. Runtime budgets can make the realized count smaller than the renderable count.

## Coordinate and Movement Component API

### UPlanetXCoordinateComponent

Header: `PlanetX/Components/PlanetXCoordinateComponent.h`

The Coordinate Component stores a canonical PlanetX pose and resolves the Planet, Binding, Section, and coordinate frame used by its owner. Configure a reference, make sure the Planet Actor is registered, and call `RefreshRuntimeContext` after relevant streaming or registration changes.

#### Stable coordinate state and policy

| Functions | Contract |
| --- | --- |
| `RefreshRuntimeContext` | Re-resolves the runtime context; returns `false` when no valid context can be built. |
| `SetPlanetXTransform`, `GetPlanetXTransform` | Writes or reads the canonical pose. The setter's `bApplyToOwner` controls immediate application. |
| `SetCoordinateFrameReference` | Replaces the coordinate-frame reference and reports whether it resolves. |
| `SetAutomaticSameWorldEntryEnabled`, `SetAutomaticSameWorldReturnEnabled`, `SetSameWorldReturnPosePolicy` | Updates Spatial Entry behavior. |
| `GetSpatialEntryPolicy`, `IsAutomaticSpatialEntryParticipant` | Reads the effective Spatial Entry configuration. |

The editor-callable helpers `RefreshCoordinateSnapshot`, `PullFromWorld`, `PushToWorld`, `CaptureOwnerTransformToPlanetX`, and `ApplyPlanetXTransformToOwner` synchronize the stored pose and the owner transform explicitly.

#### Stable surface frame and vectors

| Functions | Contract |
| --- | --- |
| `GetCurrentSurfaceFrame` | Writes the current surface frame. |
| `GetPlanetUpVectorWorld`, `GetPlanetDownVectorWorld` | Writes planet-relative unit directions. |
| `GetSurfaceEastVectorWorld`, `GetSurfaceNorthVectorWorld` | Writes tangent directions for the resolved surface frame. |
| `ProjectVectorToSurfaceTangent` | Projects a World vector onto the current tangent plane. |
| `ConvertSurfaceVectorToWorld` | Converts East/North/Up input to World space, with optional tangent projection. |
| `ConvertPlanetLocalVectorToWorld`, `ConvertSectionLocalVectorToWorld` | Converts a vector from the named local space. |
| `ConvertCoordinateVectorToWorld`, `ConvertWorldVectorToCoordinate` | Converts using `EPlanetXMovementVectorSpace`. |
| `BuildPlanetSurfaceWorldLocation` | Builds a World location at `TargetAltitudeCm`. |
| `BuildSurfaceAlignedRotation` | Builds a rotation from `FPlanetXSurfaceAlignmentSettings`. |

All functions in this table return `bool`. Do not use their output after `false`.

#### Advanced reads and spatial loading

`RefreshReferenceDetails`, `GetResolvedPlanetComponent`, `GetCachedRuntimeContext`, and `GetRepresentationDomain` expose the resolved reference and context. `GetActorSpatialLoadingPolicy`, `ShouldForceOwnerAlwaysLoaded`, and `ApplySpatialLoadingPolicyToOwner` implement the current spatial-loading policy. Data Layers and Streaming Sources remain project-owned.

### UPlanetXMovementComponent

Header: `PlanetX/Components/PlanetXMovementComponent.h`

The owner requires a Coordinate Component and a committed runtime context.

| Stable function | Contract |
| --- | --- |
| `AddPlanetXInputVector` | Adds input in a selected vector space. Defaults to `SurfaceFrame` with tangent projection enabled. |
| `SetPlanetXVelocity` | Sets velocity in the selected vector space; the default is `World`. |
| `GetPlanetXVelocity` | Converts current velocity to the requested vector space. |
| `AddPlanetXForce` | Adds force; the default space is `World`, and `bAccelerationChange` defaults to `false`. |
| `AddPlanetXImpulse` | Adds impulse; the default space is `World`, and `bVelocityChange` defaults to `false`. |
| `SnapToPlanetSurface` | Uses `FPlanetXSurfaceSnapSettings` to move to the resolved surface. |
| `AlignUpToPlanetSurface` | Uses `FPlanetXSurfaceAlignmentSettings` to align the owner. |
| `ValidateMovementConfiguration` | Writes an error message when configuration is invalid. |

Every stable function returns `bool`. `GetMovementRuntimeState` and `GetCommittedRuntimeContext` are the approved advanced state reads. When another Movement Component or a physics body owns velocity across a representation change, use [Movement Handoff](/docs/en/movement-handoff-api).

## Planet and Transition Component API

### UPlanetXPlanetComponent

Header: `PlanetX/Components/PlanetXPlanetComponent.h`

| Return | Functions |
| --- | --- |
| `bool` | `RegisterToPlanetXRuntime`, `RefreshRuntimeRegistration`, `GetGravityAccelerationAtWorldLocation` |
| `void` | `UnregisterFromPlanetXRuntime`, `SetTransitionMorphAlpha`, `SetTransitionMorphActive`, `SetTransitionMorphVisible`, `SetTransitionMorphState` |
| value or object | `GetPlanetId`, `GetPlanetBindingId`, `GetPlanetAsset`, `GetPlanetToWorldTransform`, `GetGravitySettings`, `GetTransitionMorphState` |

Registration requires a valid World, Planet Asset, and identity. When several components share a Planet ID, use the Binding ID for deterministic lookup.

### UPlanetXPlanetProxyComponent

Header: `PlanetX/Components/PlanetXPlanetProxyComponent.h`

#### Planet-wide presentation

- Set or read sources with `SetPlanetAsset`, `GetPlanetAsset`, `SetPlanetMaterialOverride`, `GetPlanetMaterialOverride`, `SetPlanetSphereMeshOverride`, and `GetPlanetSphereMeshOverride`.
- Rebuild or clear presentation with `RefreshProxy`, `RebuildPlanetProxy`, `RebuildSectionProxiesFromPlanetAsset`, and `ClearSectionProxies`.
- Control visibility with `SetPlanetProxyVisible`, `SetSectionProxiesVisible`, `SetSectionProxyMorphAlpha`, and `GetSectionProxyMorphAlpha`.
- Inspect presentation with `GetPlanetSphereComponent`, `GetSectionProxyResidencyState`, and `GetSectionProxyRealizedComponentCount`.

`RebuildSectionProxiesFromPlanetAsset` returns the number created. The other rebuild, clear, and visibility commands in this group return `void`; inspect residency and counts afterward when the result matters.

#### Section and layer presentation

| Return | Functions |
| --- | --- |
| `int32` | `SetSectionProxyBakeData`, `ClearSectionProxyBakeData`, `SetProxyLayerVisible`, `SetSectionProxyPartitionVisible`, `RemoveProxyLayer`, `GetSectionProxyLayerCount`, `GetProxyLayerCount` |
| `bool` | `SetSectionProxyLayer`, `SetSectionProxyMesh`, `RemoveSectionProxyLayer`, `SetSectionProxyLayerVisible`, `HasSectionProxyLayer` |
| `void` | `RemoveSectionProxyLayers` |
| array | `GetSectionProxyLayerIds`, `GetSectionProxySectionIds` |

Count-returning mutations use the affected-entry count; `0` means no matching entry was changed. Boolean mutations report whether their requested operation succeeded.

Debug presentation uses `SetDebugOverlaySettings`, `GetDebugOverlaySettings`, and `SetDebugOverlaysVisible`.

### UPlanetXTransitionMorphComponent

Header: `PlanetX/Components/PlanetXTransitionMorphComponent.h`

| Return | Functions |
| --- | --- |
| `void` | `SetProxyBakeData`, `SetProxyMeshOverride`, `SetTransitionResources` |
| object | `GetProxyBakeData`, `GetProxyMeshOverride`, `GetTransitionResources` |
| `bool` | `HasCompatibleTransitionResources`, `IsUsingGpuMorph`, `IsUsingStaticMeshGpuMorph`, `HasRenderableTransitionPresentation` |
| `void` | `BuildMorphMesh`, `ApplyMorphState`, `SetTransitionAlpha`, `SetTransitionActive`, `SetMorphVisible`, `ApplyMorphRenderPolicy` |

Build and apply commands are `void`; use compatibility and renderability queries to verify the selected presentation path.

### Viewpoint and Travel Receiver

`UPlanetXViewpointComponent` is declared in `PlanetX/Components/PlanetXViewpointComponent.h`. `GetTransitionFrame` and `MapViewDirectionToMovement` return `bool`; use their outputs only after success.

`UPlanetXTravelReceiverComponent` is declared in `PlanetX/Components/PlanetXTravelReceiverComponent.h`. It has no Blueprint-callable functions. Configure `bAutoResumePendingTravel`, `bApplyControlRotation`, and `ArrivalRetryTimeoutSeconds`; inspect `bLastResumeSucceeded`, `LastResumeError`, and `State`, or bind `OnTravelResumed` and `OnTravelResumeFailed`. The component does not own level opening, spawning, possession, or GameMode selection.

## Assets and Project Settings API

### UPlanetXPlanetAsset

Header: `PlanetX/Assets/PlanetXPlanetAsset.h`

#### Identity and revision reads

| Category | Functions |
| --- | --- |
| Planet Asset | `GetPlanetId`, `GetRadiusCm` |
| Bake revision | `GetBakeContractRevision`, `GetLastSuccessfulBakeRevision`, `IsProxyBakeStale` |
| Visual and material revision | `GetVisualSettingsRevision`, `GetMaterialBindingRevision`, `GetLastSuccessfulVisualBuildRevision`, `HasSuccessfulVisualBuild`, `IsVisualBuildStale` |
| Environment and preview revision | `GetEnvironmentSettingsRevision`, `GetLastSuccessfulPreviewRevision`, `IsVisualPreviewStale` |

These are Blueprint-pure reads. A zero revision can indicate that no corresponding successful output has been published yet.

#### Visual authoring mutations

All functions below are in the `PlanetX|Visual` Blueprint category and return `bool` unless noted.

| Functions | Contract |
| --- | --- |
| `SetSurfaceCompletionSettings`, `SetProxyPaddingSettings`, `SetVisualGenerationSettings` | Updates completion and padding inputs through revision-aware setters. |
| `SetEnvironmentSettings`, `SetActiveSurfacePreset` | Updates environment settings or the active surface preset. |
| `SetSectionPlacement`, `SetSectionGroundProxyVisibility` | Updates a named Section. |
| `IsSectionPlacementLockedToNorthPole`, `IsSectionAtCanonicalNorthPole` | Reads the Same World placement contract for a named Section. |
| `ValidateSectionPlacement`, `ValidateLevelTopology` | Validates placement or the complete topology; reason text is supplied where declared. |
| `SetSectionSurfaceCorrectionSettings`, `RefreshSectionProxyBakeLink` | Updates correction settings or re-links authoritative Bake Data. |

`MarkVisualPreviewBuildSucceeded` is a `void` Blueprint-callable function in `PlanetX|Revision`; call it only after a successful preview build. Prefer these methods and the Planet Asset Editor over direct mutation so revision and staleness tracking remains coherent.

### UPlanetXSurfacePreset

Header: `PlanetX/Visual/Assets/PlanetXSurfacePreset.h`

This Blueprint type has no Blueprint-callable functions. Its editable fields are `PresetId`, `DisplayName`, `PresetType`, `CompletionSettings`, `PaddingSettings`, `BaseSurfaceMaterial`, `OptionalBiomeMask`, and `OptionalHeightMask`. Keep `PresetId` stable and make sure referenced materials and textures are included in the cook.

### Project settings

`UPlanetXRuntimeDeveloperSettings` is declared in `PlanetX/Settings/PlanetXRuntimeDeveloperSettings.h`. Its project-wide config field is `RuntimeBudgetPolicy`, which defaults to `EPlanetXRuntimeBudgetPolicy::FollowEngineScalability`.

`UPlanetXRenderingDeveloperSettings` is declared in `PlanetX/Settings/PlanetXRenderingDeveloperSettings.h`. Its config fields are `bEnableLensFlares`, defaulting to `true`, and `LensFlareQuality`, defaulting to `3` with a valid range of 0 through 3. `ApplyConsoleVariables` is a C++ member, not a Blueprint function.

## Movement Handoff API

Header: `PlanetX/Blueprint/PlanetXMovementHandoffLibrary.h`

Class: `UPlanetXMovementHandoffLibrary`

Blueprint category: `PlanetX|Movement Handoff`

The library stores a versioned movement snapshot and returns an `FPlanetXMovementHandoffHandle`. Later calls resolve, apply, consume, or cancel that handle. All ten public operations return `bool` and also write `FPlanetXMovementHandoffResult`; inspect both before using outputs.

### Capture

| Function | Inputs and output |
| --- | --- |
| `CaptureMovementComponentHandoff` | Captures a `UMovementComponent` with `FPlanetXMovementHandoffCaptureRequest`; writes snapshot and result. |
| `CapturePhysicsBodyHandoff` | Captures a `UPrimitiveComponent` physics body; writes snapshot and result. |
| `CaptureMovementHandoffVelocity` | Captures supplied linear and angular World velocity for a source Actor; writes snapshot and result. |

`FPlanetXMovementHandoffCaptureRequest` specifies source and target coordinate frames, source and target actor-space states, and snapshot lifetime.

### Resolve and apply

| Function | Inputs and output |
| --- | --- |
| `ResolveMovementHandoffVelocity` | Resolves a handle to destination World linear and angular velocity using `EPlanetXMovementContinuityPolicy`. |
| `ApplyMovementComponentHandoff` | Applies a handle to a destination `UMovementComponent` using `FPlanetXMovementHandoffApplyOptions`. |
| `ApplyPhysicsBodyHandoff` | Applies a handle to a destination physics body. |
| `SwitchMovementComponentsWithHandoff` | Captures the source, switches component activity according to the options, and applies to the target. |

Apply options control continuity, source deactivation, target activation, component-velocity update, consume-on-success, and same-Actor enforcement. A failed switch is not permission to assume component activity or velocity changed as intended; inspect the result and current components.

### Inspect and finish

| Function | Contract |
| --- | --- |
| `GetMovementHandoffSnapshot` | Reads the snapshot identified by a handle without consuming it. |
| `ConsumeMovementHandoff` | Marks a pending handle consumed. |
| `CancelMovementHandoff` | Marks a pending handle cancelled. |

Use the returned handle rather than looking up state by Actor. A handle can fail because it is invalid, expired, consumed, cancelled, or no longer matches the stored generation. Capture immediately before the transition, resolve and apply after the destination frame is available, and consume only after successful application.

## Data Types and C++ Integration

### Module setup

Add the `PlanetX` runtime module to the consuming game's `Build.cs`:

```csharp
PublicDependencyModuleNames.AddRange(new[] { "PlanetX" });
```

Use the header that owns each type. Common entry points include:

- `PlanetX/Core/PlanetXTypes.h`
- `PlanetX/Coordinates/PlanetXTransform.h`
- `PlanetX/Coordinates/PlanetXCoordinateUtils.h`
- `PlanetX/Movement/PlanetXMovementTypes.h`
- `PlanetX/Movement/Handoff/PlanetXMovementHandoffTypes.h`
- `PlanetX/Travel/PlanetXLevelPair.h`
- `PlanetX/Transition/PlanetXTransitionTypes.h`
- `PlanetX/Validation/PlanetXValidation.h`

### Stable transform contract

`FPlanetXTransform` is a Blueprint type with these reflected fields: `DataVersion`, `PlanetId`, `PlanetBindingId`, `PlanetFixedPositionCm`, `PlanetFixedRotation`, and `Scale3D`. Position is stored in centimeters. Use `UPlanetXSubsystem` or `UPlanetXCoordinateComponent` to resolve and capture it; do not treat a World transform as a representation-independent saved pose.

### Stable movement handoff types

The stable handoff contract includes:

- `FPlanetXMovementHandoffHandle`: `SnapshotId`, `Generation`
- `FPlanetXMovementHandoffCaptureRequest`: source and target frames, source and target actor-space states, `LifetimeSeconds`
- `FPlanetXMovementHandoffApplyOptions`: continuity and activation, velocity-update, consume, and same-Actor policies
- `FPlanetXMovementHandoffSnapshot`: version, handle, source identity and frames, movement state, capture time, lifetime, and state
- `FPlanetXMovementHandoffResult`: `bSucceeded`, `Error`, `Handle`, `DiagnosticContext`

Stable reflected enums include `EPlanetXTransformSource`, `EPlanetXMovementHandoffState`, `EPlanetXMovementContinuityPolicy`, and `EPlanetXMovementVectorSpace`. Compile and serialize against the headers from the plugin version you ship; do not invent numeric values or layouts.

### Travel route selection

`FPlanetXTravelRoute` is declared in `PlanetX/Transition/PlanetXTransitionTypes.h` and contains `World`, `PlanetId`, `SectionId`, `PlanetActorIndex`, and `PlanetBindingId`. `PlanetActorIndex` defaults to `INDEX_NONE`. Automatic selection is allowed only when exactly one candidate exists; `0` explicitly selects the first deterministic candidate. If both selectors are set, the index and Binding ID must agree.

### Coordinate and validation helpers

`FPlanetXCoordinateUtils` provides pure C++ conversions among supported coordinate representations. Use `UPlanetXSubsystem` when a conversion requires the runtime registry. Preserve centimeter units, finite values, and normalized direction assumptions, and check every success result.

`PlanetXValidation` provides structured validation for C++ tools. Preserve severity, code, subject, and remediation text. Validation does not implicitly repair or save assets.

### Excluded implementation surface

Generated-mesh data, boundary reconstruction intermediates, bake passes, internal runtime services, and shard or serialization payloads are not stable game save or network contracts merely because a declaration is publicly visible.

## Setup and Configuration

### Plugin does not load

Check `PlanetX.uplugin` and the project's EngineAssociation. The current baseline is UE 5.8 with Runtime and Editor modules. GeometryProcessing and PCG must be enabled, and the target-platform toolchain must be installed.

Inspect the first module-load error in the Editor log. Later compile failures can be cascading results.

### Planet Asset is missing from Add

- Confirm that PlanetXEditor loaded.
- Use the correct Content Browser Add menu.
- Confirm that the project built an Editor target.
- Restart the Editor after enabling the plugin.

### Actor cannot resolve a planet

A valid Reference Planet Actor on the Coordinate Component takes priority over Planet ID. Confirm that its Planet Component has a Planet Asset and registered successfully at runtime.

When multiple actors share one Planet ID, provide Planet Binding ID. The Section dropdown is populated from enabled Sections on planets placed in the current World, not from every asset in the Content Browser.

### World Partition warning

`EPlanetXActorSpatialLoadingPolicy::PlanetXManaged` keeps Orbit actors non-spatial. With `ActorManaged`, the project owns Is Spatially Loaded. Data Layers and Streaming Sources are not modified automatically. Use `GetActorSpatialLoadingPolicy`, `ShouldForceOwnerAlwaysLoaded`, and `ApplySpatialLoadingPolicyToOwner` when diagnosing the effective setting.

## Proxy Bake Issues

### Scan Sources is disabled

Confirm a valid Planet Asset, Section, and Source World. Stop PIE and ensure another external worker does not own the operation. If an External Level Section is opened from a different Level, the editor can request a move to the required Level.

### CompletedWithWarnings

Inspect SourceOmissions on BakeData. Each record stores Reason, PassId, actor and component path, class, and detail.

Typical reasons include:

- Spline Mesh deformation
- Unsupported component class
- Cloth or deformable content
- Missing mesh or LOD
- Projection range exceeded
- Unsupported or sky material
- Nondeterministic dynamic source
- Unavailable saved PCG managed resource

For intentional exclusion, author an explicit source policy or NoBake tag. For missing visible content, convert it to a supported Static Mesh, Instance, or Landscape source.

### Bake is stale

Changes to Planet Asset structure, Section placement, Source World content, Source Material, quality, or visual-generation input can make the revision stale. Scan, recalculate the plan, bake again, and run Full Validate.

### External Bake Monitor does not open

The browser Monitor is optional and does not own the Bake. If its local service or system browser cannot open, External Bake continues; use the Editor status and Unreal log for progress. Do not copy or share a complete Monitor URL because it contains a local session token.

The direct Worker hosts the Monitor while the Bake is active. Its service ends when the Worker exits, so an existing tab may show **Disconnected** after completion. Restart or return to Unreal Editor and select **Open External Bake Monitor** to host the latest durable result again. The previous tab is not migrated automatically.

### Large package

Packages over 512 MiB warn; publication fails over 1 GiB. Split large indivisible sources and review partition, shard, and instance-aggregation output. The 128 MiB source-spool target is not the final uasset size.

## Runtime and Travel Issues

### RuntimeUnavailable

The Planet Actor, Planet Asset, current World, or World runtime service is not ready. Check Begin Play and streaming order. Use RefreshRuntimeRegistration on the Planet Component and RefreshRuntimeContext on participants.

### Surface query fails

Use the detailed status to distinguish InvalidInput, RuntimeUnavailable, and Miss. Verify a nonzero ray direction, a Planet and Binding present in the current World, and valid Section bounds and BakeData.

### ResumePendingTravel fails

| Error | Meaning |
| --- | --- |
| PendingTravelNotFound | No matching pending capture in the current World |
| AmbiguousPendingTravel | More than one capture matches |
| StaleGeneration | A newer ticket has already been issued |
| TargetPlanetBindingNotFound | Target planet instance has not registered yet |
| ArrivalTimedOut | Retryable state exceeded its timeout |

For concurrent travel, keep Ticket or Journey identity in gameplay state instead of relying on unqualified resume.

### Incorrect position or rotation

The SectionLocalToGroundWorld mapping stored in the capture is authoritative for a Level Handoff Ground pose. Do not overwrite it by manually aligning Source and Target Planet Actor transforms. Use DiagnoseProxySync and ResolvePlanetAlignmentForSection.

### Velocity is lost

When switching a Movement Component or Physics Body, Capture and Apply a Movement Handoff snapshot and verify that it was consumed.

## Diagnostic Tools

PlanetX provides editor UI, Blueprint queries, console stats, and dump commands.

### Live stats

```text
Stat PlanetXMemory
Stat PlanetXResources
Stat PlanetXProxy
Stat PlanetXProxyDetail
Stat PlanetXRuntime
```

Memory reports runtime resources and budget; Resources reports counts; Proxy reports render coverage; Runtime reports service cost. The diagnostic World is selected by PIE/Game and preferred Preview World priority.

### Dump commands

| Command | Output |
| --- | --- |
| PlanetX.ProxyStats.Dump | Proxy render summary for the current World |
| PlanetX.ProxyStats.DumpInstanceCoverage | Instance source and realized coverage |
| PlanetX.VisualEdit.Status | Visual Edit session state |
| PlanetX.VisualEdit.Dump | Visual build, Section failures, and diagnostic snapshot |

`PlanetX.ProxyStats.LogIntervalSeconds` adjusts recurring proxy logging; `PlanetX.MemoryBudgetMB` adjusts the diagnostic memory budget.

### Blueprint diagnostics

`UPlanetXSubsystem` can query actor runtime context, movement state, transition result, managed-actor state, Section runtime state, and Journeys. DrawPlanetDebug, DrawSectionDebug, DrawActorContextDebug, and DrawCaptureStackDebug visualize spatial state in development builds.

### Collecting support evidence

Record the reproduction World, Planet/Binding/Section IDs, asset validation, Proxy Bake revision and omissions, Travel Result error, and relevant Stat or Dump output. Review path data for sensitive information before external sharing.

## Version 1.0 Mercury

### Release contract

| Item | Value |
| --- | --- |
| Release name | 1.0 Mercury |
| Version | 1 |
| VersionName | 1.0 |
| Engine baseline | Unreal Engine 5.8 project |
| Runtime module | PlanetX |
| Editor module | PlanetXEditor |
| SupportedTargetPlatforms | Win64 |
| Required plugins | GeometryProcessing, PCG |
| CanContainContent | true |
| Beta / Experimental | false / false |

### Included capabilities

- Planet Asset, Section, and Level Pair authoring
- PlanetX Mode and dedicated Planet Asset Editor
- Proxy Bake and external progress monitor
- Coordinates, surface queries, movement, and gravity
- Same World and Level Handoff travel
- Runtime Preview and transition presentation
- Completion, Padding, and generated materials
- Atmosphere, clouds, sun, post process, and space background
- Validation, runtime stats, and diagnostics

### Distribution note

The plugin package includes this local-file `Docs` static site. The source does not provide a release-by-release changelog or historical compatibility matrix, so this page does not invent one.

## Third-Party Notices

### Distribution terms

PlanetX is distributed through Fab. Acquisition and use are governed by the Fab End User License Agreement.

| Item | Value |
| --- | --- |
| Distribution channel | Fab |
| Applicable terms | Fab End User License Agreement |
| Terms URL | https://www.fab.com/eula |
| Copyright | Copyright (c) 2026 LabX. All Rights Reserved. |

These notices do not replace or modify the Fab End User License Agreement, and they do not add any separate terms of use to PlanetX.

### Development program notice

This product was independently developed by me(us) while participating in the Epic Project, a developer-support program of the KRAFTON JUNGLE GameTech Lab. All rights, title, and interest in and to the product are exclusively vested in me(us). Krafton, Inc. was not involved in its development and distribution and disclaims all representations and warranties, express or implied, and assumes no responsibility or liability for any consequences arising from the use of this product.

### Solar System Scope planet surface and space background textures

The PlanetX sample planet surface textures and the space background texture contain or are derived from texture data provided by Solar System Scope / INOVE. The Unreal Engine Materials and Material Instances that reference those textures fall under the same scope.

| Item | Value |
| --- | --- |
| Creator | Solar System Scope / INOVE |
| Work | Solar Textures |
| Source | https://www.solarsystemscope.com/textures/ |
| License | Creative Commons Attribution 4.0 International (CC BY 4.0) |
| License URL | https://creativecommons.org/licenses/by/4.0/ |

#### Where it is included

All texture assets live under `Content/PlanetX/Textures/Samples/Solar_System_Scope`.

| Purpose | Assets |
| --- | --- |
| Planet surface | `T_PlanetX_Earth`, `T_PlanetX_Earth_Normal`, `T_PlanetX_Mars`, `T_PlanetX_Mars_Normal`, `T_PlanetX_Moon`, `T_PlanetX_Moon_Normal` |
| Space background | `T_PlanetX_SpaceBackground` |

The sample planet Material Instances and the space background Material that reference these textures are also covered by this notice.

#### Changes made

- Imported and converted the source planet surface textures and space background texture into Unreal Engine content asset format.
- Incorporated the converted textures into sample planet Materials, the space background Material, and their related Texture, Material, and Material Instance assets.
- Unreal Engine import, compression, mipmap, sampling, and Material settings may alter the presentation of the original textures.

#### Scope

CC BY 4.0 applies only to the planet surface textures, the space background texture, and the content that uses them as identified above. It does not apply to the PlanetX source code or to any other original PlanetX asset.

Nothing in this notice is intended to restrict any rights granted under CC BY 4.0 with respect to the Solar System Scope-derived content.

Solar System Scope and INOVE do not endorse, sponsor, or officially support PlanetX.

### Everything else

Apart from the planet surface textures and the space background texture identified above, PlanetX uses no third-party works. All other source code, Materials, Meshes, icons, documentation, and Proxy Bake Monitor web resources were authored by LabX. The documentation site loads no external scripts, fonts, or stylesheets and works without a network connection.
