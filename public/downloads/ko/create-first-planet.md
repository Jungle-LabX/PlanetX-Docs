# 첫 Planet Asset 만들기

Planet Asset은 PlanetX에서 하나의 행성을 정의하는 중심 Asset입니다.

행성의 크기와 좌표 기준을 저장하며, 이후 생성되는 Section, Proxy Bake 결과와 행성 비주얼이 모두 이 Planet Asset을 기준으로 연결됩니다.

## Planet Asset 생성하기

**Content Browser > Add > Miscellaneous**에서 **Planet Asset**을 선택합니다.

생성 창에서는 다음 세 가지 기본 정보를 설정합니다.

- Planet ID
- Planet Radius
- Coordinate Convention

처음 PlanetX를 사용한다면 Coordinate Convention은 기본값을 유지하고, **Planet ID와 Planet Radius만 확인한 뒤 생성해도 충분합니다.**

---

## Planet ID

**Planet ID**는 PlanetX가 행성을 구분하기 위해 사용하는 고유한 이름입니다.

예를 들어 지구와 화성을 각각 만든다면 다음처럼 지정할 수 있습니다.

```text
Earth
Mars
```

Planet ID는 프로젝트 안의 다른 Planet Asset과 중복되지 않도록 지정하세요.

파일 이름이나 화면에 표시하기 위한 이름보다는, 프로젝트가 진행되는 동안 계속 유지할 **안정적인 식별자**로 정하는 것을 권장합니다.

예를 들어 다음과 같이 사용하는 것이 좋습니다.

```text
Earth
Mars
Moon
MainPlanet
```

반대로 작업 단계에 따라 자주 바뀔 가능성이 있는 이름은 피하는 것이 좋습니다.

```text
TestPlanet
NewPlanet
Planet_Final_Final2
```

> 같은 행성을 여러 Level에서 사용할 때는 새로운 Planet Asset을 다시 만드는 것이 아니라 **같은 Planet Asset을 재사용**하는 것이 기본적인 사용 방법입니다.

여러 World에서 동일한 행성의 서로 다른 Runtime 인스턴스를 구분해야 하는 고급 구성에서는 별도의 Planet Binding을 사용할 수 있습니다.

처음 Planet Asset을 만드는 단계에서는 Planet Binding을 신경 쓰지 않아도 됩니다.

---

## Planet Radius

**Planet Radius**는 행성 중심에서 기본 표면까지의 거리를 의미합니다.

Planet Asset 생성 창에서는 **km 단위**로 입력합니다.

Same World 빠른 시작에서 사용할 첫 Planet은 다음과 같이 입력합니다.

```text
Planet Radius
    100 km
```

PlanetX는 이 값을 기준으로 다음과 같은 요소를 계산합니다.

- 행성의 전체 크기
- Section의 행성 표면 배치
- Section Proxy의 곡면 변환
- 행성 비주얼 생성
- Orbit과 Ground 사이의 좌표 변환

따라서 Planet Radius는 단순히 화면에 보이는 행성 Mesh의 크기만 결정하는 값이 아닙니다.

**실제 제작을 시작하기 전에 사용할 행성 크기를 먼저 정하는 것을 권장합니다.**

> Planet Radius는 이후 Section과 Proxy Bake의 기준이 되는 중요한 값입니다.
>
> Proxy Bake와 행성 제작을 시작한 뒤에는 반지름을 임의로 변경하기보다, 다른 크기의 행성이 필요하다면 새로운 Planet Asset을 만드는 것을 권장합니다.

---

## Coordinate Convention

**Coordinate Convention**은 PlanetX가 행성의 북쪽과 경도 방향을 Unreal Engine World에서 어느 방향으로 해석할지를 정의합니다.

쉽게 말하면 다음과 같은 질문에 대한 규칙입니다.

```text
행성의 북극은 어느 방향인가?
경도 0°는 어느 방향인가?
행성의 동쪽은 어느 방향인가?
```

처음 PlanetX를 사용하는 경우에는 **기본 Coordinate Convention을 그대로 사용하는 것을 권장합니다.**

일반적인 PlanetX 작업에서는 이 설정을 직접 변경할 필요가 없습니다.

기존 프로젝트에서 이미 특정한 World 축 규칙을 사용하고 있거나, 다른 좌표 시스템과 PlanetX를 연동해야 하는 경우에만 Coordinate Convention을 변경하세요.

> Coordinate Convention을 변경하면 Section 배치와 좌표 변환의 기준 자체가 달라집니다.
>
> 특별한 이유가 없다면 프로젝트 제작을 시작한 이후에는 변경하지 않는 것이 좋습니다.

---

## Planet Asset 생성 완료하기

설정을 확인했다면 Planet Asset을 생성합니다.

처음 테스트에서는 예를 들어 다음과 같은 설정으로 시작할 수 있습니다.

```text
Planet ID
    FirstPlanet

Planet Radius
    100 km

Coordinate Convention
    Default
```

생성이 완료되면 Content Browser에 새로운 Planet Asset이 나타납니다.

Planet Asset을 더블 클릭하면 **Planet Asset Editor**가 열립니다.

---

## Planet Asset Editor 확인하기

Planet Asset Editor는 PlanetX 행성을 제작하고 상태를 확인하는 중심 Editor입니다.

다음은 코드와 동일한 이름의 다섯 도킹 탭입니다. 기본 레이아웃에서는 중앙의 **Preview**와 오른쪽의 **Configuration**이 열립니다. 다른 탭이 닫혀 있으면 **Window > Planet Asset**에서 다시 여세요.

### Overview

현재 Planet Asset의 기본 상태와 주요 작업으로 이동할 수 있는 탭입니다.

처음 Asset을 열었다면 이곳에서 전체 상태를 확인할 수 있습니다.

### Sections

행성에 연결된 Ground 영역인 **Section**을 확인하고 관리하는 탭입니다.

처음 Planet Asset을 만들었을 때는 Section이 아직 없어도 정상입니다.

첫 Proxy Bake를 실행하면 Ground Level에 대응하는 Section이 생성되어 Planet Asset에 연결됩니다.

### Configuration

행성의 제작 및 동작에 사용되는 추가 설정을 확인하는 탭입니다.

처음 빠른 시작을 진행할 때는 대부분의 값을 기본값으로 유지해도 됩니다.

### Preview

Section Proxy와 나머지 행성 표면을 함께 보면서 행성의 비주얼을 제작하는 탭입니다.

Proxy Bake를 완료한 뒤 본격적으로 사용하게 됩니다.

### Diagnostics

Planet Asset과 연결된 Section, Proxy Bake 결과와 기타 설정에 문제가 없는지 검사하는 탭입니다.

문제가 발생했을 때 가장 먼저 확인하기 좋은 공간입니다.

---

## 처음에는 무엇을 해야 하나요?

Planet Asset을 만든 직후에는 복잡한 설정을 모두 수정할 필요가 없습니다.

우선 다음 세 가지만 확인하세요.

1. **Planet ID가 다른 Planet Asset과 중복되지 않는지 확인합니다.**
2. **Planet Radius가 만들고자 하는 행성 크기에 맞는지 확인합니다.**
3. 특별한 좌표 규칙이 필요하지 않다면 **Coordinate Convention은 기본값을 유지합니다.**

Planet Asset을 저장하면 기본 준비가 완료됩니다.

**Section을 직접 추가할 필요는 없습니다.**

다음 단계에서 Ground Level을 대상으로 첫 **Proxy Bake**를 실행하면 PlanetX가 필요한 Section과 연결 정보를 생성합니다.

> Planet Asset을 만들었다면 [여기서 시작 — Same World 빠른 시작](/docs/ko/quick-start-same-world)을 따라 첫 Ground Level을 행성에 연결해 보세요.
