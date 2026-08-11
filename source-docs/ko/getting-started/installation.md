# 설치

PlanetX는 Fab을 통해 Unreal Engine에 설치할 수 있습니다.

## 사전 조건

PlanetX를 설치하기 전에 다음 환경을 확인해 주세요.

- Unreal Engine 5.8
- GeometryProcessing 플러그인
- PCG 플러그인

PlanetX는 필요한 Unreal Engine 플러그인을 함께 활성화하도록 구성되어 있습니다.

> 소스에서 직접 PlanetX를 빌드하거나 Source Build Unreal Engine을 사용하는 경우에는 대상 플랫폼에 맞는 C++ 개발 환경과 Toolchain이 추가로 필요할 수 있습니다.

## Fab에서 설치하기

1. **Epic Games Launcher**를 실행합니다.
2. **Unreal Engine > Library**로 이동합니다.
3. **Fab Library**에서 PlanetX를 찾습니다.
4. **Install to Engine**을 클릭합니다.
5. PlanetX를 사용할 Unreal Engine 5.8 설치를 선택합니다.
6. 설치가 완료되면 Unreal Editor를 실행합니다.

Fab Library에는 PlanetX가 지원하는 Unreal Engine 버전만 설치 대상으로 표시됩니다.

설치 후 프로젝트를 열고 **Edit > Plugins**에서 PlanetX가 활성화되어 있는지 확인하세요.  
처음 활성화한 경우 Unreal Editor를 다시 시작해야 할 수 있습니다.

## 수동 설치

Fab을 사용하지 않고 별도로 제공된 PlanetX 패키지를 설치해야 하는 경우에는 프로젝트의 `Plugins` 디렉터리에 직접 설치할 수 있습니다.

1. Unreal Editor를 종료합니다.
2. PlanetX 디렉터리를 다음 위치에 복사합니다.

   ```
   <Project>/Plugins/PlanetX
   ```

3. 프로젝트를 다시 엽니다.
4. 필요한 경우 Project Files를 재생성하고 프로젝트를 빌드합니다.
5. **Edit > Plugins**에서 PlanetX가 활성화되어 있는지 확인합니다.

수동 설치는 개발용 빌드나 별도로 제공된 패키지를 사용하는 경우를 위한 방법입니다. 일반적인 설치에는 Fab 사용을 권장합니다.

## 설치 확인

설치가 완료되었다면 다음 항목을 확인할 수 있습니다.

- **Content Browser > Add > Miscellaneous**에서 **Planet Asset**을 생성할 수 있습니다.
- Editor 메뉴에서 **PlanetX Proxy Bake Editor**를 열 수 있습니다.
- Editor의 **PlanetX Mode**를 사용할 수 있습니다.

위 항목이 정상적으로 표시된다면 PlanetX 설치가 완료된 것입니다.

## Plugin Content 보기

PlanetX에는 일부 Unreal Engine Content Asset이 포함되어 있습니다.

PlanetX의 Plugin Content를 직접 확인해야 하는 경우 Content Browser의 설정에서 **Show Plugin Content**를 활성화하세요.

일반적인 PlanetX 사용에는 Plugin Content를 직접 수정할 필요가 없습니다.

## 문서 열기

최신 PlanetX 문서는 [온라인 문서 사이트](https://jungle-labx.github.io/PlanetX-Docs/)에서 확인할 수 있습니다.

인터넷에 연결할 수 없는 환경에서는 설치된 PlanetX 플러그인의 다음 파일을 직접 열어 오프라인 문서를 사용할 수 있습니다.

```text
PlanetX/Docs/index.html
```

문서를 연 뒤 [여기서 시작 — Same World 빠른 시작](?lang=ko&doc=quick-start-same-world)부터 진행하세요. 이 문서가 공식 첫 사용 경로입니다.
