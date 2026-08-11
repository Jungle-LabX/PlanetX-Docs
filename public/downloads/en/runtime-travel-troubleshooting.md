# Runtime and Travel Issues

## RuntimeUnavailable

The Planet Actor, Planet Asset, current World, or World runtime service is not ready. Check Begin Play and streaming order. Use RefreshRuntimeRegistration on the Planet Component and RefreshRuntimeContext on participants.

## Surface query fails

Use the detailed status to distinguish InvalidInput, RuntimeUnavailable, and Miss. Verify a nonzero ray direction, a Planet and Binding present in the current World, and valid Section bounds and BakeData.

## ResumePendingTravel fails

| Error | Meaning |
| --- | --- |
| PendingTravelNotFound | No matching pending capture in the current World |
| AmbiguousPendingTravel | More than one capture matches |
| StaleGeneration | A newer ticket has already been issued |
| TargetPlanetBindingNotFound | Target planet instance has not registered yet |
| ArrivalTimedOut | Retryable state exceeded its timeout |

For concurrent travel, keep Ticket or Journey identity in gameplay state instead of relying on unqualified resume.

## Incorrect position or rotation

The SectionLocalToGroundWorld mapping stored in the capture is authoritative for a Level Handoff Ground pose. Do not overwrite it by manually aligning Source and Target Planet Actor transforms. Use DiagnoseProxySync and ResolvePlanetAlignmentForSection.

## Velocity is lost

When switching a Movement Component or Physics Body, Capture and Apply a Movement Handoff snapshot and verify that it was consumed.
