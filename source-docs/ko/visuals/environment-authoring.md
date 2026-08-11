# 환경 제작

환경 프로필은 **Planet Asset Editor > Preview > Advanced > Environment**에서 제작합니다. Atmosphere, Clouds, Sun, Post Process, Space Background가 하나의 `FPlanetXEnvironmentAuthoringSettings`에 저장됩니다.

## Atmosphere와 Clouds

Atmosphere 높이는 Planet Radius 비율로 자동 계산하거나 수동 km 값으로 지정할 수 있습니다. Rayleigh, Mie, absorption, aerial perspective와 ground albedo를 조정합니다.

Clouds는 layer bottom/height, lighting, atmosphere interaction, shadow parameter를 가집니다. 기존 Level cloud를 사용할 때 PlanetX cloud와 설정이 다르면 Orbit/Ground 전환에서 불일치가 생길 수 있습니다.

## Sun과 Post Process

Sun profile은 atmosphere sun light, cloud shadow, shadow extent와 품질을 정의합니다. Post Process에서는 planet profile, convolution bloom, lens flare를 제어합니다. Project Settings의 PlanetX Rendering도 lens flare 기본 console variable을 적용합니다.

## Space Background

Space Background material은 Surface domain, Opaque, Unlit, Is Sky 설정을 권장합니다. Planet Asset Defaults를 source로 선택하면 연결된 Managed Planet Actor와 Planet Asset이 필요합니다.

## Runtime 연결

레벨의 `APlanetXEnvironmentManager`에 Planet Actor, Sun, Atmosphere, Volumetric Cloud와 MPC를 연결합니다. ValidateEnvironmentBinding으로 누락·불일치를 확인한 뒤 ApplyInitialRuntimeSpace 또는 SetEnvironmentTransition을 사용합니다.
