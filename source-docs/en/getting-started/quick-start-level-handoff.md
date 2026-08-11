# Advanced Guide — Multi-Level Handoff

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

Before using this advanced workflow, complete [Start Here — Same World Quick Start](?lang=en&doc=quick-start-same-world). This guide assumes that the basic Planet Asset, Proxy Bake, Visual Build, PlanetX Mode, and transition concepts are already familiar.

---

## Before you begin

Level Handoff requires two separate Levels. This guide uses the following example names:

```text
L_Orbit
L_Ground
```

### L_Orbit

This Level displays the planet from space and lets the player approach it.

You will later place the following items in it:

```text
L_Orbit
├─ PlanetX Planet
├─ PlanetX Environment Manager
├─ PlanetX Transition Endpoint
└─ Orbit Player / SpaceShip
```

### L_Ground

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

## Phase checkpoints

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

## 1. Prepare a Planet Asset

Create one Planet Asset by following [Create Your First Planet Asset](?lang=en&doc=create-first-planet). Complete the following steps, then return here:

- Create the Planet Asset
- Set its Planet ID
- Set its Planet Radius
- Save the Planet Asset

**You do not need to create a Section manually yet.**

The first Proxy Bake from the Ground Level creates the required Section and Level Pair automatically.

---

## 2. Open the Ground Level

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

## 3. Open Proxy Bake Editor

With `L_Ground` open, use the Unreal Editor **Tools** menu, find the **PlanetX** section, and select **Proxy Bake Editor**. Use this single path for the first External Section.

First, confirm **Target Planet Asset**:

```text
1 Target Planet Asset
└─ Planet Asset
```

Assign the Planet Asset created in the previous step. There is no existing Section to select before the first Bake.

---

## 4. Set Runtime Role to External Level

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

### Confirm Ground World

**Ground World** automatically displays the currently open `L_Ground`:

```text
Ground World
    L_Ground
```

This is not a manually selected value. It is determined from the source World used by the current scan and Bake.

### Assign Planet World

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

## 5. Choose the Source Scope

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

## 6. Scan the Ground sources

Select **Scan Sources** or press `F5`:

```text
Scan Sources
```

PlanetX inspects the current Ground Level and discovers sources that can be converted into a Proxy.

### Review Source Review

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

## 7. Run Proxy Bake

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

### What is Runtime Preview World?

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

## 8. Review the Bake result

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

## 9. Review the Section placement on the planet

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

## 10. Build the planet visuals

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

## 11. Place the Planet Actor in Orbit World

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

## 12. Align the Planet Actor

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

## 13. Add an Environment Manager

Open the **Environment** Palette in PlanetX Mode. If the current Planet has no Manager, select:

```text
Environment
└─ Add Manager
```

PlanetX creates an Environment Manager associated with the active Planet.

The Manager is part of the Planet's runtime infrastructure even when individual atmosphere or cloud features are disabled. Keep exactly one Environment Manager for each Planet.

---

## 14. Add the Orbit Transition Endpoint

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

### Transition Cylinder

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

## 15. Connect the Orbit Player to PlanetX

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

### Coordinate Component

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

### Viewpoint Component

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

## 16. Prepare the Ground Player

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

## 17. Store travel data in GameInstance

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

## 18. Query a landing point from Orbit

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

### Surface Query Input

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

### Check the query result

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

## 19. Prepare the Orbit → Ground Handoff

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

## 20. Store the Handoff Ticket

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

## 21. Open the actual Ground Level

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

## 22. Spawn and possess the Ground Player first

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

## 23. Apply the stored Ticket to the Ground Player

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

## 24. Store the Ground arrival result

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

## 25. Verify the Ground arrival pose

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

## 26. Simpler arrival option: Travel Receiver

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

## 27. Prepare the Ground → Orbit return

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

## 28. Store the Return Ticket and open Orbit World

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

## 29. Apply the return state in Orbit World

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

## 30. If Orbit restoration runs before runtime registration

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

## 31. Verify Runtime Preview behavior

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

## 32. Validate before running

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

## 33. Test the complete flow

Start PIE from `L_Orbit`.

### Step 1: Verify Orbit

Confirm that:

- The planet renders correctly
- The Section Proxy is visible
- The Player can be controlled
- The Planet is registered with PlanetX Runtime

### Step 2: Approach the planet

Move toward the Section and confirm:

```text
Orbit
→ Transition
→ Ground Presentation
```

Runtime Preview should appear when required.

### Step 3: Use the landing input

Aim the camera at the Section and trigger `IA_Land`:

```text
Surface Query Hit
→ Begin Level Handoff succeeds
→ Store Ticket
→ Open L_Ground
```

### Step 4: Arrive on Ground

After the Ground Player is spawned and possessed:

```text
Complete Level Handoff
→ Apply stored Ground pose
→ Journey = Ground Active
```

### Step 5: Return to Orbit

Trigger `IA_ReturnOrbit`:

```text
Begin Return Level Handoff
→ Create Return Ticket
→ Open L_Orbit
→ Apply Return Ticket
→ Journey Completed
```

---

## 34. Inspect PlanetX Runtime Palette

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

## If Level Handoff does not work

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

## Common errors

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

## If Ground World also needs PlanetX features

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

## Complete

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
