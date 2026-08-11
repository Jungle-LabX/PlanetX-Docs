# PlanetX 문서에 오신 것을 환영합니다!

![우주에서 바라본 PlanetX 행성](/images/docs/overview-introduction-0.png)

PlanetX를 다운로드해주셔서 감사합니다.

이 문서에서는 PlanetX의 설치부터 행성 생성, Ground Level 연결, Proxy Bake, 비주얼 편집, 그리고 Orbit과 Ground 사이의 전환까지 전반적인 사용 방법을 안내합니다.

처음 PlanetX를 사용하신다면 공식 첫 사용 경로인 [여기서 시작 — Same World 빠른 시작](/docs/ko/quick-start-same-world)부터 진행하세요.

## PlanetX란 무엇인가요?

PlanetX는 기존 Unreal Engine Level을 **행성 표면의 일부로 활용할 수 있도록 도와주는 Unreal Engine 플러그인**입니다.

평소처럼 제작한 Landscape와 Level을 행성의 특정 지역으로 등록하고, 멀리서 보았을 때는 하나의 행성처럼 표현하면서 가까이 접근하면 실제 Ground Level에서 플레이할 수 있도록 연결합니다.

이를 통해 기존 Level 제작 방식을 크게 변경하지 않고도 **우주에서 바라보는 행성과 실제 지표면 플레이를 하나의 흐름으로 구성**할 수 있습니다.

## 무엇을 해결하나요?

Unreal Engine의 일반적인 Level과 Landscape는 평면 공간을 중심으로 제작됩니다. 때문에 우주에서 행성을 바라보다가 그대로 지표면까지 이동하는 게임을 만들려면 원거리 행성 표현, 실제 Ground Level, 좌표 변환과 전환 과정을 별도로 구현해야 합니다.

PlanetX는 기존 Ground Level을 그대로 활용하면서, 해당 영역을 행성 표면의 **Section**으로 연결합니다. Orbit에서는 가볍게 제작된 Proxy와 행성 표면을 보여주고, 플레이어가 지표면으로 접근하면 실제 Ground 콘텐츠로 자연스럽게 이어지도록 구성할 수 있습니다.

## 기본 작업 흐름

1. **Planet Asset 생성**

   행성의 크기와 기본 설정을 지정합니다.

2. **Ground Level 등록**

   기존 Unreal Engine Level에서 행성 표면으로 사용할 영역을 Section으로 등록합니다.

3. **Section Proxy Bake**

   Ground Level을 Orbit에서 보여주기 위한 Proxy로 변환합니다.

4. **행성 비주얼 편집**

   **Planet Asset Editor > Preview**에서 Section의 위치와 행성 표면, Material 등의 모습을 조정합니다.

5. **Planet Actor 배치**

   완성된 Planet Asset을 Level에 배치하여 행성을 표시합니다.

6. **Orbit ↔ Ground 전환 확인**

   플레이어 또는 카메라를 이동하며 Orbit 표현과 실제 Ground Level 사이의 전환을 테스트합니다.

> **💡 Tip**
> PlanetX를 처음 사용한다면 모든 기능을 한 번에 이해하려고 할 필요는 없습니다.
> 먼저 Planet Asset을 만들고 하나의 Ground Level을 행성에 연결하는 기본 흐름부터 따라 해보세요.

다음 단계에서는 [설치](/docs/ko/installation)를 진행하거나, 바로 [여기서 시작 — Same World 빠른 시작](/docs/ko/quick-start-same-world)을 따라 PlanetX를 사용해볼 수 있습니다.
