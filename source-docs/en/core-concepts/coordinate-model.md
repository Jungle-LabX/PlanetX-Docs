# Coordinate Model

PlanetX does not overload one World coordinate with every meaning. It uses explicit frames for distinct responsibilities.

## Coordinate spaces

| Coordinate | Meaning |
| --- | --- |
| World | Transform in the current Unreal World |
| Planet Local | 3D position relative to the Planet Actor origin |
| Canonical Geo | Latitude, Longitude, and AltitudeCm |
| Section Local | Tangent frame of a specific Section |
| Surface Frame | East, North, and Up basis |
| FPlanetXTransform | Canonical pose carrying Planet ID/Binding and rotation |

`FPlanetXCoordinateConvention` defines the North Pole and longitude axes. Geo altitude is measured in centimeters from Planet Radius.

## Coordinate Component authority

When `UPlanetXCoordinateComponent.CoordinateMode` is Unreal, the owner's World Transform is authoritative and the PlanetX snapshot is captured from it. In PlanetX mode, `FPlanetXTransform` is authoritative and Apply produces the World Transform. Capture and Apply are explicit operations.

Reference resolution prefers Reference Planet Actor, then Reference Planet ID. An explicit Section ID makes that Section frame authoritative.

## Vector conversion

Positions use point conversion; movement input uses vector conversion. With Surface Frame in `ConvertCoordinateVectorToWorld`, X/Y/Z represent East/North/Up. Surface movement can enable `bProjectToSurfaceTangent` to remove the Up component.

## Failure handling

Do not inspect only the boolean return value. Read `FPlanetXTransformResolveResult` or the detailed query status to distinguish invalid versions, unregistered planets, ambiguous bindings, unsupported planet scale, and invalid Sections.
