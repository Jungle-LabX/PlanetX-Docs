# Installation

PlanetX can be installed for Unreal Engine through Fab.

## Prerequisites

Before installing PlanetX, please confirm the following environment:

- Unreal Engine 5.8
- GeometryProcessing plugin
- PCG plugin

PlanetX is configured to enable the required Unreal Engine plugins alongside it.

> If you build PlanetX directly from source or use a source-built Unreal Engine, you may also need a C++ development environment and toolchain for the target platform.

## Installing from Fab

1. Open the **Epic Games Launcher**.
2. Go to **Unreal Engine > Library**.
3. Find PlanetX in your **Fab Library**.
4. Select **Install to Engine**.
5. Choose a supported Unreal Engine 5.8 installation.
6. After installation completes, launch Unreal Editor.

The Fab Library lists only the Unreal Engine versions supported by PlanetX as installation targets.

Open your project and confirm that PlanetX is enabled under **Edit > Plugins**. You may need to restart Unreal Editor the first time you enable it.

## Manual installation

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

## Verifying the installation

After installation, confirm that the following items are available:

- **Planet Asset** appears under **Content Browser > Add > Miscellaneous**.
- **PlanetX Proxy Bake Editor** can be opened from the Editor menus.
- **PlanetX Mode** is available in the Editor.

If all three are available, PlanetX has been installed successfully.

## Showing Plugin Content

PlanetX includes several Unreal Engine Content Assets.

If you need to inspect them, enable **Show Plugin Content** in the Content Browser settings.

You do not normally need to modify PlanetX Plugin Content.

## Opening the documentation

The latest PlanetX documentation is available from the [online documentation site](https://jungle-labx.github.io/PlanetX-Docs/).

If an internet connection is unavailable, open the following file in the installed PlanetX plugin to use the offline documentation:

```text
PlanetX/Docs/index.html
```

After opening the documentation, begin with [Start Here — Same World Quick Start](/docs/en/quick-start-same-world). It is the canonical first-use path.
