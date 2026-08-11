# Same World 이동

Same World 이동은 Orbit과 Ground가 같은 World package에 있을 때 Actor를 Section의 Ground pose로 옮기고 다시 Orbit pose로 반환합니다.

## 계약

Level Pair의 OrbitWorld와 GroundWorld가 같은 package여야 합니다. Section의 GroundSyncMapping, transition bounds와 Surface Query가 유효해야 합니다. 이동할 Actor는 현재 World에서 resolve 가능한 Planet/Section context를 가져야 합니다.

## 명시 호출

1. Ray 또는 Geo query로 `FPlanetXSurfaceQueryResult`를 얻습니다.
2. `EnterGroundSameWorld(WorldContext, Actor, SurfaceQuery)`를 호출합니다.
3. Ground gameplay를 수행합니다.
4. `ReturnToOrbitSameWorld(WorldContext, Actor)`를 호출합니다.

진입 시 Journey와 capture가 만들어지고 Actor에 연결됩니다. 반환은 Actor에 연결된 정확한 Journey를 사용합니다.

## 자동 Spatial Entry

Coordinate Component에서 automatic same-world entry/return을 켤 수 있습니다. Runtime은 viewpoint/participant가 transition 경계를 넘는지 평가하고 안전한 시점에 pose를 적용합니다.

Return Pose Policy는 캡처한 Orbit pose 또는 현재 Ground Section-relative pose에서 복원하는 방식을 선택합니다. 현재 pose 기반 반환은 Ground에서 움직인 결과를 Orbit Section frame에 이어야 할 때 사용합니다.

## 실패 처리

Surface Query가 다른 Section/Planet이거나 Actor의 context가 모호하면 실패합니다. 자동 반환은 Orbit 표현이 준비될 때까지 기다릴 수 있습니다. `GetTransitionJourney`와 managed actor state로 상태를 확인하세요.
