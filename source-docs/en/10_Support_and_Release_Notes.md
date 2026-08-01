# Support and Release Notes

[Previous: Troubleshooting](09_Troubleshooting.md) · [Documentation Home](../../PlanetX_User_Guide_EN.md)

Before reporting:

- Confirm the current binary and a single plugin path.
- Fully restart the Editor.
- Confirm Ground Map and Planet Asset.
- Refresh and run Diagnostics.
- Create a minimal Selected Actors reproduction.
- Preserve the full log and screenshots.

Bug report template:

```text
Unreal Engine version:
PlanetX version/commit:
Source scope:
Runtime role:
World Partition enabled:
Source/partition count:
Steps to reproduce:
Expected result:
Actual result:
First error:
Attached full log:
```

The current `.uplugin` declares no public SupportURL, Discord, or email. Use the project's official issue tracker or designated PlanetX team channel.

## Version 1.0

- Runtime module: PlanetX
- Editor module: PlanetXEditor
- Dependency: GeometryProcessing

After an update, rebuild modules, restart the Editor, validate Planet Assets, rebake `LEGACY HASH`/stale results, and test the target-platform cook.

Known limitations:

- No official Engine/platform compatibility matrix
- No bundled user Demo Map
- Multiplayer travel/replication is game-owned
- Skeletal/Cloth/Spline deformation/dynamic mesh unsupported
- New Section names from External Bake require a post-Bake Rename

