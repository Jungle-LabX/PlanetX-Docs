# Quick Start: 첫 Planet Proxy 만들기

이 문서는 PlanetX 플러그인을 활성화한 뒤, 기존 Level을 Ground Section으로 Bake하고 PlanetX Planet Actor를 통해 PIE에서 확인하는 가장 기본적인 과정을 설명합니다.

이 문서는 PlanetX 플러그인을 활성화한 뒤, 기존 Level을 Ground Section으로 Bake하고 `PlanetX Planet Actor`를 통해 PIE에서 확인하는 가장 기본적인 과정을 설명합니다.

처음에는 다음 구성으로 진행합니다.

```
Runtime Role = Same World
Source Scope = Current Level
Bake Mode    = Bake In Editor
Section Name = Main
```

## 1. PlanetX 플러그인 활성화하기

![Unreal Editor의 PlanetX 플러그인 활성화 화면](/images/docs/1-plugin-install.png)

Unreal Editor 상단 메뉴에서 **Edit > Plugins**를 엽니다.

검색창에 `PlanetX`를 입력하고 PlanetX 플러그인의 **Enabled**를 켭니다. 의존 플러그인 활성화 안내가 표시되면 함께 활성화합니다.

변경 후 **Restart Now**를 눌러 Unreal Editor를 다시 시작합니다.

> **Edit > Plugins**에서 수행하는 작업은 플러그인 파일 설치가 아니라 **활성화**입니다. PlanetX 플러그인 파일은 먼저 프로젝트의 `Plugins` 폴더 또는 Engine의 `Plugins` 폴더에 설치되어 있어야 합니다.

Editor를 다시 시작한 뒤 **Tools > PlanetX** 메뉴가 표시되면 활성화가 완료된 것입니다.

## 2. PlanetX Asset 생성하기

## PlanetX Planet Asset 생성하기

Content Drawer에서 **Add > Miscellaneous > PlanetX Planet Asset**을 선택합니다.

Asset 이름은 프로젝트 규칙에 맞게 지정합니다. 이 문서에서는 다음 이름을 사용합니다.

```
PA_FirstPlanet
```

![Content Drawer의 PlanetX Planet Asset 생성 메뉴](/images/docs/2-1-planetxasset-creater.png)

이 단계에서는 Asset을 생성한 뒤 한 번 저장하면 됩니다. Section과 Level Pair 같은 세부 설정은 Bake가 끝난 뒤 Planet Asset Editor에서 확인합니다.

> `Planet Radius`처럼 Proxy의 곡률에 영향을 주는 값이 기본값과 다르다면 Bake 전에 올바른 값으로 지정해야 합니다. 이러한 Bake 입력값을 나중에 변경하면 다시 Bake해야 합니다.

## 3. Ground로 사용할 Level 열기

Planet Proxy의 원본으로 사용할 Ground Level을 엽니다.

Level에는 Bake할 Landscape, Static Mesh, ISM/HISM 또는 Foliage 등의 Ground 콘텐츠가 배치되어 있어야 합니다. Untitled Level이나 Orbit 전용 Level이 아니라 실제 Ground Gameplay에 사용할 Level인지 확인합니다.

Level을 연 뒤 먼저 저장합니다.

> Quick Start에서는 현재 열려 있는 Level을 `Current Level` Source로 사용합니다. 다른 Level을 연 상태에서 Bake하면 의도하지 않은 Source가 선택될 수 있습니다.

## 4. BakeEditor에서 Bake 실행

상단 메뉴에서 **Tools > PlanetX > Proxy Bake Editor**를 엽니다.

다음 값을 지정합니다.

|설정|값|
|---|---|
|**Planet Asset**|`PA_FirstPlanet`|
|**Runtime Role**|`Same World`|
|**Source Scope**|`Current Level`|
|**Bake Quality**|`High`|

![PlanetX Proxy Bake Editor 설정 화면](/images/docs/4-1-bakeeditor.png)

Partition, Memory Budget와 Workers는 기본값을 사용합니다.

설정이 끝나면 **BAKE IN EDITOR**를 누릅니다. 현재 Source Scan이 없거나 오래된 경우 Bake 시작 과정에서 Source Refresh가 자동으로 수행됩니다.

- Bake 전에 대상을 직접 검토하고 싶다면 **Refresh**를 먼저 눌러 `Source Review`와 `Output Plan`을 확인해도 됩니다.
- Bake가 진행되는 동안 Editor를 종료하거나 대상 Level과 Planet Asset을 변경하지 마십시오.

[성공 이미지 필요]

Bake가 성공하면 다음 결과가 생성되거나 갱신됩니다.

- `Main` Section
- Section에 연결된 Bake Data
- 생성된 Proxy Mesh와 Payload
- Runtime Preview 연결 정보
- Planet Asset의 Bake Revision 정보

> Bake가 실패하면 오류 창의 요약과 Proxy Bake 로그를 먼저 확인합니다. `ManualReview`, `Unsupported`, Level Pair 충돌 또는 저장 실패가 있으면 해당 원인을 해결한 뒤 다시 실행합니다.

## 5. PlanetAssetEditor에서 설정하기

이후 자동으로 열리는 Planet Asset Editor에서 다음 항목을 순서대로 확인합니다.

상단에서 **Basic > Planet**을 선택합니다.

![Planet Asset Editor의 Basic Planet 메뉴](/images/docs/5-1-planetxasseteditor-basicpart.png)

![Planet Asset Editor의 Planet 설정 화면](/images/docs/5-2-planetxasseteditor.png)

먼저 **Completion Material**에 행성의 기본 표면으로 사용할  
Material 또는 Material Instance를 지정합니다.

Completion Material은 Bake된 Ground Section을 제외한 나머지  
행성 표면을 표시하는 데 사용됩니다.

처음에는 나머지 설정을 기본값으로 유지합니다.

`Terrain Height`, `Terrain Frequency`, `Padding Width`는 처음에는  
기본값을 유지합니다.

|항목|구현 기준 설명|
|---|---|
|Completion Material|Bake된 Ground Section 밖의 **Completion Surface** 머티리얼입니다. Padding에서는 Ground 머티리얼과 이 머티리얼을 연결·블렌딩하는 기준으로도 사용됩니다.|
|Terrain Height|Completion Surface에만 적용되는 노이즈 최대 변위입니다. 행성 반지름 대비 %이며, `0`이면 자동 지형 노이즈가 꺼집니다.|
|Terrain Frequency|Completion 노이즈의 주파수입니다. 값이 클수록 더 작고 촘촘한 지형이 생성됩니다.|
|Randomize Terrain|새 **결정적 Seed**를 골라 다른 지형 패턴을 만듭니다. 같은 Seed면 항상 같은 결과가 나옵니다.|
|Padding Width (km)|Bake된 Ground Section 둘레에 생성되는 **Geometry Padding**의 폭입니다. 기본값은 정확히 `1.0 km`입니다.|
|Apply & Build|Padding 머티리얼을 먼저 Bake하고, 설정을 Asset에 반영한 뒤 Runtime Visual을 생성/재사용합니다. Padding Bake가 실패하면 설정은 반영될 수 있지만 최종 Visual Build는 건너뜁니다.|

설정이 끝나면 **Apply & Build**를 누르고 Planet Asset을 저장합니다.

## 6. PlanetXActor 배치 후 Planet Asset 지정

Place Actors 패널에서 **PlanetX Planet Actor**를 검색해 현재 Level에 배치합니다.

Actor를 선택하고 Details 패널에서 다음 값을 지정합니다.

```
Planet Component
└─ Planet Asset = PA_FirstPlanet
```

`Auto Register Runtime`은 활성화된 상태로 유지합니다.

![PlanetX Planet Actor의 Planet Asset 설정](/images/docs/8-runtime-planetxactor.png)

같은 Planet Asset을 사용하는 Planet Actor가 현재 World에 하나뿐이라면 `Planet Binding ID`는 비워 두어도 됩니다. 여러 Planet Actor가 같은 Planet Asset을 사용한다면 각각 고유한 Binding ID를 지정합니다.

설정을 마친 뒤 Level을 저장합니다.

## 7. Diagnostics 확인 후 PIE

Planet Asset Editor의 **Diagnostics** 탭에서 Validation 결과를 확인합니다.

다음 조건을 만족해야 합니다.

- `Main` Section과 Bake Data 연결이 유효합니다.
- 진행을 차단하는 Error가 없습니다.
- Generated Visual Build가 최신 상태입니다.
- 필요한 Transition Resource가 준비되어 있습니다.
- Level과 Planet Asset이 모두 저장되어 있습니다.

문제가 없다면 PIE를 실행합니다.

PIE가 `Transition resources are not ready` 메시지와 함께 취소되면 Level과 Planet Asset을 다시 저장하고 자동 Build가 완료될 때까지 상태를 확인합니다. 정확한 실패 원인은 Diagnostics의 Validation 결과에서 확인합니다.

PIE가 정상적으로 시작되고 `PlanetX Planet Actor`가 Planet Asset을 등록하면 첫 Planet Proxy 구성이 완료된 것입니다.
