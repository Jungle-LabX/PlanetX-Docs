# Planet Asset Editor

Double-click a Planet Asset to open its dedicated editor. The editor provides five dockable tabs for the asset contract.

## Tabs

| Tab | Purpose |
| --- | --- |
| Overview | Planet status and recommended next action |
| Sections | Search, filters, runtime role, and bake entry |
| Configuration | Planet structure and authoring settings |
| Preview | Basic and Advanced visual authoring |
| Diagnostics | Quick/Full validation and resolution actions |

The default layout opens **Preview** in the main area and **Configuration** on the right. **Overview**, **Sections**, and **Diagnostics** may be closed until a command opens them. If a tab is not visible, reopen it from **Window > Planet Asset**.

Configuration intentionally hides EnvironmentSettings. The single authoring surface for the environment profile is **Preview > Advanced > Environment**.

## Primary commands

- Open Preview: `Alt+P`
- Sections: `Alt+T`
- Open Proxy Bake: `Alt+B`
- Refresh: `F5`
- Validate: `Shift+F`
- Search Sections: `Ctrl+F`
- Focus selected Section: `F`
- Delete selected Section: `Delete`

Section filters include All, Same World, External Level, Needs Bake, Needs Transition, and Invalid. Changing runtime role must satisfy the required World and Proxy Bake contract.

## Deletion and preservation

Delete Selected Section removes the Section and Level Pair from the Planet Asset. It does not delete referenced source Worlds, Proxy BakeData, or Runtime Preview assets. Clean generated assets through a separate, reviewed operation.

## Recommended flow

For a new Planet Asset, open **Overview** when you need the status summary, then open Proxy Bake from the saved Ground Level. Do not create or select a Section first; the first successful Proxy Bake creates the Section and Level Pair. Return to **Sections** to verify `Linked` after the Bake, adjust visuals in **Preview**, and pass Full Validate in **Diagnostics**.

For an existing Planet Asset, open **Sections**, select the Section that needs work, and use its Proxy Bake entry. This is the only flow that begins by selecting a Section.
